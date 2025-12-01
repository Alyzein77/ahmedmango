import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * TikTok Hashtag Webhook Endpoint
 * 
 * This endpoint is meant to be called by an external automation tool (e.g., Zapier, Make, Pipedream) that:
 * - Watches the TikTok account @ahmed_mangoo
 * - Triggers when a new TikTok video is posted containing hashtags like:
 *   - #2astaka, #2staka, #2استكا (Arabic)
 *   - #fastaka, #فاستكا (Arabic)
 * - Sends the payload to this webhook with the specified JSON format
 * 
 * Expected JSON payload:
 * {
 *   "tiktok_id": "string (required, unique TikTok video ID)",
 *   "caption": "string (video caption/description)",
 *   "author_name": "string (author display name)",
 *   "author_username": "string (author @username)",
 *   "video_url": "string (required, URL to the TikTok video)",
 *   "thumbnail_url": "string (optional, thumbnail image URL)",
 *   "hashtags": ["array", "of", "hashtags"],
 *   "posted_at": "ISO 8601 date string (required)"
 * }
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Hashtags to match (case-insensitive, with and without #)
const VALID_HASHTAGS = [
  "2astaka", "2staka", "2استكا",
  "fastaka", "فاستكا",
  "#2astaka", "#2staka", "#2استكا",
  "#fastaka", "#فاستكا"
];

function normalizeHashtag(tag: string): string {
  return tag.toLowerCase().trim().replace(/^#/, "");
}

function hasValidHashtag(hashtags: string[]): boolean {
  if (!Array.isArray(hashtags)) return false;
  
  const normalizedValid = VALID_HASHTAGS.map(normalizeHashtag);
  
  return hashtags.some(tag => {
    const normalized = normalizeHashtag(tag);
    return normalizedValid.includes(normalized);
  });
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const payload = await req.json();
    console.log("Received webhook payload:", JSON.stringify(payload, null, 2));

    // Validate required fields
    const { tiktok_id, video_url, posted_at, hashtags } = payload;

    if (!tiktok_id || typeof tiktok_id !== "string") {
      console.log("Missing or invalid tiktok_id");
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid tiktok_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!video_url || typeof video_url !== "string") {
      console.log("Missing or invalid video_url");
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid video_url" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!posted_at) {
      console.log("Missing posted_at");
      return new Response(
        JSON.stringify({ success: false, error: "Missing posted_at" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for valid hashtags
    if (!hasValidHashtag(hashtags || [])) {
      console.log("No matching hashtags found, ignoring payload");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No matching hashtags found (requires #2astaka, #2staka, #2استكا, #fastaka, or #فاستكا)" 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role for upsert
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Prepare record data
    const recordData = {
      tiktok_id: payload.tiktok_id,
      caption: payload.caption || null,
      author_name: payload.author_name || null,
      author_username: payload.author_username || null,
      video_url: payload.video_url,
      thumbnail_url: payload.thumbnail_url || null,
      hashtags: Array.isArray(payload.hashtags) ? payload.hashtags : [],
      posted_at: new Date(payload.posted_at).toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("Upserting record:", JSON.stringify(recordData, null, 2));

    // Upsert: update if exists, insert if not
    const { data, error } = await supabase
      .from("tiktok_tagged_videos")
      .upsert(recordData, { 
        onConflict: "tiktok_id",
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully upserted record:", data?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Video stored/updated successfully",
        id: data?.id 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
