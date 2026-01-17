// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Format phone number to international format
function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // If starts with 0, replace with +20 (Egypt)
  if (cleaned.startsWith('0')) {
    cleaned = '+20' + cleaned.substring(1);
  }
  // If starts with 20 but no +, add +
  else if (cleaned.startsWith('20') && !cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  // If doesn't start with +, assume Egypt
  else if (!cleaned.startsWith('+')) {
    cleaned = '+20' + cleaned;
  }
  
  return cleaned;
}

// Generate HMAC SHA256 signature for Akedly Widget SDK V2
async function generateAkedlySignature(
  apiKey: string, 
  publicKey: string, 
  secret: string, 
  timestamp: number, 
  phoneNumber: string
): Promise<string> {
  const encoder = new TextEncoder();
  const message = JSON.stringify({ apiKey, publicKey, timestamp, phoneNumber });
  
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get Supabase client early for logging
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  let supabase: ReturnType<typeof createClient> | null = null;
  
  if (supabaseUrl && supabaseServiceKey) {
    supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { phoneNumber } = await req.json();

    // Validate input
    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ success: false, error: 'Phone number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log(`Formatting phone: ${phoneNumber} -> ${formattedPhone}`);

    // Validate formatted phone number
    if (!formattedPhone.startsWith('+')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid phone number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get secrets
    const apiKey = Deno.env.get('AKEDLY_API_KEY');
    const publicKey = Deno.env.get('AKEDLY_WIDGET_PUBLIC_KEY');
    const secret = Deno.env.get('AKEDLY_WIDGET_SECRET');

    if (!apiKey || !publicKey || !secret) {
      console.error('Missing Akedly widget credentials');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!supabase) {
      console.error('Missing Supabase credentials');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit (5 attempts per 60 seconds)
    const now = new Date();

    const { data: existingAttempt } = await supabase
      .from('otp_attempts')
      .select('*')
      .eq('phone_number', formattedPhone)
      .gte('reset_at', now.toISOString())
      .maybeSingle();

    if (existingAttempt) {
      const attemptCount = (existingAttempt as { attempt_count: number }).attempt_count || 0;
      const resetAtStr = (existingAttempt as { reset_at: string }).reset_at;
      const attemptId = (existingAttempt as { id: string }).id;
      
      if (attemptCount >= 5) {
        const resetAt = new Date(resetAtStr);
        const retryAfterSeconds = Math.ceil((resetAt.getTime() - now.getTime()) / 1000);
        
        console.log(`Rate limited: ${formattedPhone}, retry in ${retryAfterSeconds}s`);
        
        // Log rate limit hit
        await supabase.from('otp_logs').insert({
          phone_number: formattedPhone,
          event_type: 'otp_initiated',
          status: 'failed',
          error_message: `Rate limited. Retry in ${retryAfterSeconds}s`,
        } as Record<string, unknown>);

        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Rate limit exceeded. Try again in ${retryAfterSeconds} seconds.`,
            retryAfterSeconds 
          }),
          { 
            status: 429, 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'Retry-After': String(retryAfterSeconds)
            } 
          }
        );
      }

      // Increment attempt count
      await supabase
        .from('otp_attempts')
        .update({ attempt_count: attemptCount + 1 } as Record<string, unknown>)
        .eq('id', attemptId);
    } else {
      // Create new rate limit record
      const resetAt = new Date(now.getTime() + 60000); // Reset after 60 seconds
      await supabase
        .from('otp_attempts')
        .insert({
          phone_number: formattedPhone,
          attempt_count: 1,
          reset_at: resetAt.toISOString(),
        } as Record<string, unknown>);
    }

    // Generate timestamp (Unix timestamp in milliseconds)
    const timestamp = Date.now();

    // Generate signature
    const signature = await generateAkedlySignature(apiKey, publicKey, secret, timestamp, formattedPhone);
    console.log('Generated signature for Akedly Widget SDK V2');

    // Prepare request body for Widget SDK V2
    const requestBody = {
      apiKey,
      publicKey,
      signature,
      timestamp,
      verificationAddress: {
        phoneNumber: formattedPhone,
      },
      digits: 6,
    };

    console.log('Creating Akedly Widget SDK V2 attempt for:', formattedPhone);

    // Make POST request to Akedly Widget SDK endpoint
    const response = await fetch('https://api.akedly.io/api/v1/widget-sdk/create-attempt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    console.log('Akedly Widget SDK response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Akedly response:', e);
      
      // Log parse error
      await supabase.from('otp_logs').insert({
        phone_number: formattedPhone,
        event_type: 'otp_initiated',
        status: 'failed',
        error_message: 'Failed to parse Akedly response',
        metadata: { raw_response: responseText.substring(0, 500) },
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ success: false, error: 'Invalid response from OTP service' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!response.ok || data?.status !== 'success') {
      console.error('Akedly Widget SDK error:', data);
      
      // Log Akedly error
      await supabase.from('otp_logs').insert({
        phone_number: formattedPhone,
        event_type: 'otp_initiated',
        status: 'failed',
        error_message: data?.message || 'Akedly API error',
        metadata: { akedly_response: data },
      } as Record<string, unknown>);
      
      // Handle rate limit from Akedly
      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('retry-after');
        const retryAfterSeconds = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 60;
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Rate limit exceeded. Try again in ${retryAfterSeconds} seconds.`,
            retryAfterSeconds 
          }),
          { 
            status: 429, 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'Retry-After': String(retryAfterSeconds)
            } 
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: false, 
          error: data?.message || 'Failed to create widget attempt' 
        }),
        { status: response.status || 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract attemptId and iframeUrl from response
    const attemptId = data?.data?.attemptId || data?.attemptId;
    const iframeUrl = data?.data?.iframeUrl || data?.iframeUrl;

    if (!attemptId || !iframeUrl) {
      console.error('Missing attemptId or iframeUrl in response:', data);
      
      // Log missing data
      await supabase.from('otp_logs').insert({
        phone_number: formattedPhone,
        event_type: 'otp_initiated',
        status: 'failed',
        error_message: 'Missing attemptId or iframeUrl in Akedly response',
        metadata: { akedly_response: data },
      } as Record<string, unknown>);

      return new Response(
        JSON.stringify({ success: false, error: 'Invalid response from OTP service' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Widget SDK attempt created: ${attemptId}`);

    // Pre-create auth_tokens entry with attempt_id so webhook can find it
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
    await supabase.from('auth_tokens').insert({
      attempt_id: attemptId,
      transaction_id: attemptId, // Use attemptId as initial transaction_id
      phone_number: formattedPhone,
      verified: false,
      expires_at: expiresAt.toISOString(),
    } as Record<string, unknown>);

    // Log successful OTP initiation
    await supabase.from('otp_logs').insert({
      phone_number: formattedPhone,
      attempt_id: attemptId,
      event_type: 'otp_initiated',
      status: 'success',
      metadata: { 
        iframe_url: iframeUrl,
        expires_at: expiresAt.toISOString(),
      },
    } as Record<string, unknown>);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          attemptId,
          iframeUrl,
          phoneNumber: formattedPhone,
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Akedly Widget OTP error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Try to log error
    if (supabase) {
      try {
        await supabase.from('otp_logs').insert({
          phone_number: 'unknown',
          event_type: 'otp_initiated',
          status: 'failed',
          error_message: errorMessage,
        } as Record<string, unknown>);
      } catch (e) {
        console.error('Failed to log error:', e);
      }
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
