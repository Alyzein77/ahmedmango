import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ad_space_id, click_type } = await req.json();

    if (!ad_space_id) {
      return new Response(
        JSON.stringify({ error: "ad_space_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user agent and referrer from headers
    const userAgent = req.headers.get("user-agent") || null;
    const referrer = req.headers.get("referer") || null;

    // Insert click record
    const { error: clickError } = await supabase.from("ad_clicks").insert({
      ad_space_id,
      click_type: click_type || "card",
      user_agent: userAgent,
      referrer: referrer,
    });

    if (clickError) {
      console.error("Error inserting click:", clickError);
      return new Response(
        JSON.stringify({ error: "Failed to track click" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update click count on ad_space
    const { error: updateError } = await supabase.rpc("increment_ad_click_count", {
      ad_id: ad_space_id,
    });

    if (updateError) {
      console.error("Error updating click count:", updateError);
      // Don't fail the request, the click is already recorded
    }

    console.log(`Click tracked for ad: ${ad_space_id}, type: ${click_type || "card"}`);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in track-ad-click:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
