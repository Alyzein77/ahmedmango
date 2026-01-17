import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

    // Detect if request is coming through ngrok (for debugging)
    const isNgrok = req.headers.get('x-forwarded-host')?.includes('ngrok') ||
                    req.headers.get('host')?.includes('ngrok') ||
                    req.headers.get('x-forwarded-proto') === 'https';
    
    if (isNgrok) {
      console.log('🌐 Akedly webhook V2 received via ngrok tunnel');
    } else {
      console.log('📡 Akedly webhook V2 received (direct)');
    }

    const payload = await req.json();
    console.log('Akedly webhook V2 payload:', JSON.stringify(payload));

    // Validate payload structure
    if (!payload.status || payload.status !== 'success') {
      console.log('Webhook status is not success:', payload.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Webhook status is not success' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!payload.transaction || payload.transaction.status !== 'Successful') {
      console.log('Transaction status is not Successful:', payload.transaction?.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Transaction status is not Successful' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract phone number from transaction
    const phoneNumber = payload.transaction?.verificationAddress?.phoneNumber;
    if (!phoneNumber) {
      console.log('Phone number not found in webhook payload');
      return new Response(
        JSON.stringify({ success: false, error: 'Phone number not found in webhook payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone number format
    if (!phoneNumber.startsWith('+')) {
      console.log('Invalid phone number format:', phoneNumber);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid phone number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract transaction ID
    const transactionID = payload.transaction?.transactionID ||
                          payload.widgetAttempt?.attemptId ||
                          payload.transactionReq?._id;

    if (!transactionID) {
      console.error('No transaction ID found in webhook payload');
      return new Response(
        JSON.stringify({ success: false, error: 'Transaction ID missing from webhook' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing successful verification for ${phoneNumber}, transaction: ${transactionID}`);

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store verification token in auth_tokens table
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes TTL

    const { error: insertError } = await supabase
      .from('auth_tokens')
      .upsert({
        transaction_id: transactionID,
        phone_number: phoneNumber,
        verified: true,
        verified_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        used: false,
      }, { onConflict: 'transaction_id' });

    if (insertError) {
      console.error('Error storing auth token:', insertError);
      // Continue even if storage fails - webhook should still respond successfully
    } else {
      console.log(`Token stored for transaction: ${transactionID}`);
    }

    // Upsert verified phone
    const { error: upsertError } = await supabase
      .from('verified_phones')
      .upsert({
        phone_number: phoneNumber,
        last_verified_at: new Date().toISOString(),
        verification_count: 1,
      }, { 
        onConflict: 'phone_number',
        ignoreDuplicates: false 
      });

    if (upsertError) {
      console.error('Error upserting verified phone:', upsertError);
    } else {
      console.log(`Verified phone recorded: ${phoneNumber}`);
    }

    // Note: verification_count is handled by the upsert above

    return new Response(
      JSON.stringify({
        success: true,
        transactionID,
        phoneNumber,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Akedly webhook V2:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process webhook', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
