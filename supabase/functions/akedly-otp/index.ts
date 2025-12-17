import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const AKEDLY_API_KEY = Deno.env.get('AKEDLY_API_KEY');
    const AKEDLY_PIPELINE_ID = Deno.env.get('AKEDLY_PIPELINE_ID');

    if (!AKEDLY_API_KEY || !AKEDLY_PIPELINE_ID) {
      console.error('Missing Akedly credentials');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, phone, code, attemptId } = await req.json();
    console.log(`Akedly OTP action: ${action}, phone: ${phone}`);

    if (action === 'send') {
      // Create authentication attempt to send OTP
      const response = await fetch('https://api.akedly.io/v1/auth/attempts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AKEDLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pipeline_id: AKEDLY_PIPELINE_ID,
          phone: phone,
        }),
      });

      const data = await response.json();
      console.log('Akedly send OTP response:', JSON.stringify(data));

      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: data.message || 'Failed to send OTP' }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, attemptId: data.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'verify') {
      // Verify the OTP code
      const response = await fetch(`https://api.akedly.io/v1/auth/attempts/${attemptId}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AKEDLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      const data = await response.json();
      console.log('Akedly verify OTP response:', JSON.stringify(data));

      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: data.message || 'Invalid OTP code', verified: false }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, verified: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Akedly OTP error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
