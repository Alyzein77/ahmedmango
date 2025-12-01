import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * TikTok RSS Feed Endpoint
 * 
 * Returns an RSS 2.0 feed of the latest TikTok videos tagged with #2astaka or #fastaka
 * 
 * Feed URL: /functions/v1/tiktok-rss
 * Content-Type: application/rss+xml; charset=utf-8
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Convert date to RFC822 format for RSS
function toRFC822(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const d = new Date(date);
  const dayName = days[d.getUTCDay()];
  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const hours = d.getUTCHours().toString().padStart(2, "0");
  const minutes = d.getUTCMinutes().toString().padStart(2, "0");
  const seconds = d.getUTCSeconds().toString().padStart(2, "0");
  
  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} +0000`;
}

// Escape XML special characters
function escapeXml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Truncate text with ellipsis
function truncate(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow GET
  if (req.method !== "GET") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    console.log("Generating RSS feed...");

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch latest 50 videos
    const { data: videos, error } = await supabase
      .from("tiktok_tagged_videos")
      .select("*")
      .order("posted_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`Found ${videos?.length || 0} videos`);

    // Site URL (placeholder - can be updated later)
    const siteUrl = "https://ahmedmango.com";
    const feedUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/tiktok-rss`;

    // Build RSS XML
    const now = toRFC822(new Date());
    
    let rssItems = "";
    
    for (const video of videos || []) {
      const title = escapeXml(truncate(video.caption || "TikTok Video", 100));
      const link = escapeXml(video.video_url);
      const guid = escapeXml(video.tiktok_id);
      const pubDate = toRFC822(new Date(video.posted_at));
      
      // Build description with optional thumbnail
      let description = "";
      if (video.thumbnail_url) {
        description += `<img src="${escapeXml(video.thumbnail_url)}" alt="Video thumbnail" style="max-width: 300px; margin-bottom: 10px;" /><br/>`;
      }
      if (video.caption) {
        description += `<p>${escapeXml(video.caption)}</p>`;
      }
      if (video.author_name || video.author_username) {
        description += `<p><strong>By:</strong> ${escapeXml(video.author_name || "")}`;
        if (video.author_username) {
          description += ` (@${escapeXml(video.author_username)})`;
        }
        description += `</p>`;
      }
      if (video.hashtags && video.hashtags.length > 0) {
        description += `<p><strong>Tags:</strong> ${video.hashtags.map((t: string) => escapeXml(t)).join(", ")}</p>`;
      }

      rssItems += `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
    }

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ahmed Mango – TikTok Hashtag Feed (2astaka / Fastaka)</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>Latest TikTok videos tagged with 2astaka or Fastaka.</description>
    <language>ar</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`;

    console.log("RSS feed generated successfully");

    return new Response(rssXml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
    });

  } catch (error) {
    console.error("RSS feed error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><error>${errorMessage}</error>`,
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/xml; charset=utf-8" 
        } 
      }
    );
  }
});
