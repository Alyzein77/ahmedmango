// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

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

    // Rate limiting: max 30 requests per minute per transactionID
    const now = Date.now();
    const rateLimit = rateLimitMap.get(transactionID);
    
    if (rateLimit) {
      if (now < rateLimit.resetAt) {
        if (rateLimit.count >= 30) {
          const retryAfter = Math.ceil((rateLimit.resetAt - now) / 1000);
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Rate limit exceeded',
              retryAfter 
            }),
            { 
              status: 429, 
              headers: { 
                ...corsHeaders, 
                'Content-Type': 'application/json',
                'Retry-After': String(retryAfter)
              } 
            }
          );
        }
        rateLimit.count++;
      } else {
        rateLimit.count = 1;
        rateLimit.resetAt = now + 60000;
      }
    } else {
      rateLimitMap.set(transactionID, { count: 1, resetAt: now + 60000 });
    }

    // Clean up old entries periodically
    if (rateLimitMap.size > 1000) {
      for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetAt) {
          rateLimitMap.delete(key);
        }
      }
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Look up token by EITHER transaction_id OR attempt_id
    // This is the key fix - the frontend polls with attemptId but webhook may store as transaction_id
    const { data: token, error: fetchError } = await supabase
      .from('auth_tokens')
      .select('*')
      .or(`transaction_id.eq.${transactionID},attempt_id.eq.${transactionID}`)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching token:', fetchError);
      return new Response(
        JSON.stringify({ success: false, error: 'Database error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Token not found - verification pending
    if (!token) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          verified: false,
          message: 'Verification pending' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if token is expired
    const expiresAt = new Date(token.expires_at);
    if (Date.now() > expiresAt.getTime()) {
      console.log(`Token expired for ${transactionID}`);
      
      // Log expired token retrieval
      await supabase.from('otp_logs').insert({
        phone_number: token.phone_number,
        attempt_id: token.attempt_id,
        transaction_id: token.transaction_id,
        event_type: 'token_retrieved',
        status: 'failed',
        error_message: 'Token expired',
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ 
          success: false, 
          verified: false,
          error: 'Token expired' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if already used
    if (token.used) {
      console.log(`Token already used for ${transactionID}`);
      
      // Log already used token
      await supabase.from('otp_logs').insert({
        phone_number: token.phone_number,
        attempt_id: token.attempt_id,
        transaction_id: token.transaction_id,
        event_type: 'token_retrieved',
        status: 'failed',
        error_message: 'Token already used',
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ 
          success: false, 
          verified: false,
          error: 'Token already used' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if verified
    if (!token.verified) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          verified: false,
          message: 'Verification pending' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Token is valid and verified - mark as used
    await supabase
      .from('auth_tokens')
      .update({ used: true } as Record<string, unknown>)
      .eq('id', token.id);

    // Log successful token retrieval
    await supabase.from('otp_logs').insert({
      phone_number: token.phone_number,
      attempt_id: token.attempt_id,
      transaction_id: token.transaction_id,
      event_type: 'token_retrieved',
      status: 'success',
      metadata: {
        verified_at: token.verified_at,
        retrieved_at: new Date().toISOString(),
      },
    } as Record<string, unknown>);

    // Schedule token deletion after 5 seconds
    setTimeout(async () => {
      try {
        const cleanupClient = createClient(supabaseUrl, supabaseServiceKey);
        await cleanupClient
          .from('auth_tokens')
          .delete()
          .eq('id', token.id);
        console.log(`Deleted token ${token.id}`);
      } catch (e) {
        console.error('Error deleting token:', e);
      }
    }, 5000);

    console.log(`Token retrieved successfully for ${token.phone_number}`);

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
        data: {
          phoneNumber: token.phone_number,
          verifiedAt: token.verified_at,
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Get token error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
