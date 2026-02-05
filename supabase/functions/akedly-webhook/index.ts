// @ts-nocheck
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

    // Parse the webhook payload
    const payload = await req.json();
    console.log('Akedly webhook received:', JSON.stringify(payload, null, 2));

    // Log metadata for debugging
    const logMetadata = {
      raw_payload: payload,
      received_at: new Date().toISOString(),
    };

    // Extract verification data from different payload structures
    const status = payload.status || payload.transaction?.status;
    const transactionStatus = payload.transaction?.status || payload.transactionStatus;
    
    // Check if verification was successful
    if (status !== 'success') {
      console.log('Verification not successful:', { status, transactionStatus });
      
      // Log failed webhook
      await supabase.from('otp_logs').insert({
        phone_number: payload.verificationAddress?.phoneNumber || payload.transaction?.verificationAddress?.phoneNumber || 'unknown',
        attempt_id: payload.widgetAttempt?.attemptId || payload.attemptId,
        transaction_id: payload.transaction?.transactionID || payload.transactionID,
        event_type: 'webhook_received',
        status: 'failed',
        error_message: `Verification not successful: status=${status}, transactionStatus=${transactionStatus}`,
        metadata: logMetadata,
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ success: false, error: 'Verification not successful' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract phone number from different possible locations
    const phoneNumber = 
      payload.verificationAddress?.phoneNumber || 
      payload.transaction?.verificationAddress?.phoneNumber ||
      payload.phoneNumber;

    // Extract transaction ID and attempt ID
    const transactionID = payload.transaction?.transactionID || payload.transactionID;
    const attemptId = payload.widgetAttempt?.attemptId || payload.attemptId;

    if (!phoneNumber) {
      console.error('No phone number in webhook payload');
      
      // Log missing phone
      await supabase.from('otp_logs').insert({
        phone_number: 'missing',
        attempt_id: attemptId,
        transaction_id: transactionID,
        event_type: 'webhook_received',
        status: 'failed',
        error_message: 'No phone number in webhook payload',
        metadata: logMetadata,
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ success: false, error: 'No phone number in payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!transactionID && !attemptId) {
      console.error('No transaction ID or attempt ID in webhook payload');
      
      // Log missing IDs
      await supabase.from('otp_logs').insert({
        phone_number: phoneNumber,
        event_type: 'webhook_received',
        status: 'failed',
        error_message: 'No transaction ID or attempt ID in webhook payload',
        metadata: logMetadata,
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ success: false, error: 'No transaction ID or attempt ID in payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Storing verified token for phone: ${phoneNumber}, transactionID: ${transactionID}, attemptId: ${attemptId}`);

    // Store/update the auth token with BOTH transaction_id and attempt_id
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now

    // Try to find existing token by attempt_id first
    const { data: existingByAttempt } = await supabase
      .from('auth_tokens')
      .select('*')
      .eq('attempt_id', attemptId || '')
      .maybeSingle();

    // If not found by attempt_id, try transaction_id
    const { data: existingByTx } = !existingByAttempt && transactionID ? await supabase
      .from('auth_tokens')
      .select('*')
      .eq('transaction_id', transactionID)
      .maybeSingle() : { data: null };

    const existingToken = existingByAttempt || existingByTx;

    let upsertError = null;
    if (existingToken) {
      // Update existing token
      const { error } = await supabase
        .from('auth_tokens')
        .update({
          phone_number: phoneNumber,
          verified: true,
          verified_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          transaction_id: transactionID || existingToken.transaction_id,
          attempt_id: attemptId || existingToken.attempt_id,
        } as Record<string, unknown>)
        .eq('id', existingToken.id);
      upsertError = error;
    } else {
      // Insert new token
      const { error } = await supabase
        .from('auth_tokens')
        .insert({
          transaction_id: transactionID || attemptId,
          attempt_id: attemptId,
          phone_number: phoneNumber,
          verified: true,
          verified_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
        } as Record<string, unknown>);
      upsertError = error;
    }

    if (upsertError) {
      console.error('Error storing auth token:', upsertError);
      
      // Log database error
      await supabase.from('otp_logs').insert({
        phone_number: phoneNumber,
        attempt_id: attemptId,
        transaction_id: transactionID,
        event_type: 'webhook_received',
        status: 'failed',
        error_message: `Database error: ${upsertError.message}`,
        metadata: logMetadata,
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ success: false, error: 'Failed to store verification' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Also store/update in verified_phones table
    await supabase
      .from('verified_phones')
      .upsert({
        phone_number: phoneNumber,
        last_verified_at: now.toISOString(),
        verification_count: 1,
      } as Record<string, unknown>, { 
        onConflict: 'phone_number',
        ignoreDuplicates: false 
      });

    // Log successful webhook
    await supabase.from('otp_logs').insert({
      phone_number: phoneNumber,
      attempt_id: attemptId,
      transaction_id: transactionID,
      event_type: 'webhook_received',
      status: 'success',
      metadata: {
        ...logMetadata,
        stored_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
      },
    } as Record<string, unknown>);

    console.log(`Successfully stored verification for ${phoneNumber}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Verification stored successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Akedly webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
