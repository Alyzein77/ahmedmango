import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting for token retrieval
const tokenRetrievalAttempts = new Map<string, { count: number; resetTime: number }>();

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { transactionID } = await req.json();

    if (!transactionID) {
      return new Response(
        JSON.stringify({ success: false, error: 'Transaction ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting: max 30 attempts per transaction ID per minute (for polling)
    const now = Date.now();
    const rateLimitKey = `token_${transactionID}`;
    const current = tokenRetrievalAttempts.get(rateLimitKey);

    if (current && now < current.resetTime) {
      if (current.count >= 30) {
        return new Response(
          JSON.stringify({ success: false, error: 'Too many attempts. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      current.count++;
    } else {
      tokenRetrievalAttempts.set(rateLimitKey, { count: 1, resetTime: now + 60000 });
    }

    // Get Supabase credentials
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get token from database
    const { data: token, error } = await supabase
      .from('auth_tokens')
      .select('*')
      .eq('transaction_id', transactionID)
      .maybeSingle();

    if (error) {
      console.error('Error fetching token:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch token' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!token) {
      // Token not found - verification might not be complete yet
      return new Response(
        JSON.stringify({ success: false, verified: false, error: 'Verification pending' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if expired
    if (new Date(token.expires_at) < new Date()) {
      console.log(`Token expired for transaction: ${transactionID}`);
      // Delete expired token
      await supabase.from('auth_tokens').delete().eq('id', token.id);
      return new Response(
        JSON.stringify({ success: false, verified: false, error: 'Token expired' }),
        { status: 410, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if already used (one-time use)
    if (token.used) {
      console.log(`Token already used for transaction: ${transactionID}`);
      return new Response(
        JSON.stringify({ success: false, verified: false, error: 'Token already used' }),
        { status: 410, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if verified
    if (!token.verified) {
      return new Response(
        JSON.stringify({ success: false, verified: false, error: 'Verification pending' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mark as used immediately
    const { error: updateError } = await supabase
      .from('auth_tokens')
      .update({ used: true })
      .eq('id', token.id);

    if (updateError) {
      console.error('Error marking token as used:', updateError);
    }

    console.log(`Token verified and marked as used for transaction: ${transactionID}`);

    // Schedule cleanup (delete after 5 seconds)
    setTimeout(async () => {
      try {
        const cleanupClient = createClient(supabaseUrl, supabaseServiceKey);
        await cleanupClient.from('auth_tokens').delete().eq('id', token.id);
        console.log(`Token deleted for transaction: ${transactionID}`);
      } catch (err) {
        console.error('Error deleting used token:', err);
      }
    }, 5000);

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
        phoneNumber: token.phone_number,
        verifiedAt: token.verified_at,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching auth token:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch token', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
