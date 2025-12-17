import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AKEDLY_API_URL = 'https://api.akedly.io/api/v1/transactions';

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

    const { action, phone, code, transactionId, requestId } = await req.json();
    console.log(`Akedly OTP action: ${action}, phone: ${phone}`);

    if (action === 'send') {
      // Step 1: Create OTP transaction
      const requestBody = {
        phone: phone,
      };

      console.log('Akedly request URL:', AKEDLY_API_URL);
      console.log('Akedly request body:', JSON.stringify(requestBody));
      console.log('Akedly API key prefix:', AKEDLY_API_KEY?.substring(0, 10) + '...');

      const createResponse = await fetch(AKEDLY_API_URL, {
        method: 'POST',
        headers: {
          'x-api-key': AKEDLY_API_KEY,
          'AKEDLY_PIPELINE_ID': AKEDLY_PIPELINE_ID,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await createResponse.text();
      console.log('Akedly create transaction raw response:', responseText);

      let createData;
      try {
        createData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse create response:', e);
        return new Response(
          JSON.stringify({ error: 'Invalid response from OTP service', details: responseText.substring(0, 200) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!createResponse.ok) {
        console.error('Akedly create transaction error:', createData);

        const message = createData?.message || createData?.error || 'Failed to create OTP transaction';
        const isUserFacing = createResponse.status >= 400 && createResponse.status < 500;
        const isUserNotFound = createData?.message === 'User not found';
        const status = isUserFacing || isUserNotFound ? 200 : createResponse.status;

        return new Response(
          JSON.stringify({
            success: false,
            error: message,
            code: isUserNotFound ? 'USER_NOT_FOUND' : 'AKEDLY_ERROR',
          }),
          { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const txnId = createData.id || createData.transaction_id;
      console.log('Transaction created with ID:', txnId);

      // Step 2: Activate transaction to send OTP
      const activateResponse = await fetch(`${AKEDLY_API_URL}/${txnId}/activate`, {
        method: 'POST',
        headers: {
          'x-api-key': AKEDLY_API_KEY,
          'AKEDLY_PIPELINE_ID': AKEDLY_PIPELINE_ID,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const activateText = await activateResponse.text();
      console.log('Akedly activate raw response:', activateText);

      let activateData;
      try {
        activateData = JSON.parse(activateText);
      } catch (e) {
        console.error('Failed to parse activate response:', e);
        return new Response(
          JSON.stringify({ error: 'Invalid response from OTP service during activation', details: activateText.substring(0, 200) }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!activateResponse.ok) {
        console.error('Akedly activate error:', activateData);

        const message = activateData?.message || activateData?.error || 'Failed to send OTP';
        const isUserFacing = activateResponse.status >= 400 && activateResponse.status < 500;
        const isUserNotFound = activateData?.message === 'User not found';
        const status = isUserFacing || isUserNotFound ? 200 : activateResponse.status;

        return new Response(
          JSON.stringify({
            success: false,
            error: message,
            code: isUserNotFound ? 'USER_NOT_FOUND' : 'AKEDLY_ERROR',
          }),
          { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const reqId = activateData.request_id || activateData.id;
      console.log('OTP sent successfully, request ID:', reqId);

      return new Response(
        JSON.stringify({
          success: true,
          transactionId: txnId,
          requestId: reqId,
          message: 'OTP sent via WhatsApp'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'verify') {
      if (!requestId) {
        return new Response(
          JSON.stringify({ error: 'Missing requestId', verified: false }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the OTP code (Akedly v1 verifies via request_id)
      const verifyUrl = `https://api.akedly.io/api/v1/requests/${requestId}/verify`;
      console.log('Verifying OTP at:', verifyUrl);

      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'x-api-key': AKEDLY_API_KEY,
          'AKEDLY_PIPELINE_ID': AKEDLY_PIPELINE_ID,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          otp: code,
        }),
      });

      const responseText = await response.text();
      console.log('Akedly verify raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse verify response:', e);
        return new Response(
          JSON.stringify({ error: 'Invalid response from OTP service during verification', verified: false }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!response.ok) {
        const message = data?.message || data?.error || 'Invalid OTP code';
        const isUserFacing = response.status >= 400 && response.status < 500;
        const isUserNotFound = data?.message === 'User not found';
        const status = isUserFacing || isUserNotFound ? 200 : response.status;

        return new Response(
          JSON.stringify({
            success: false,
            verified: false,
            error: message,
            code: isUserNotFound ? 'USER_NOT_FOUND' : 'INVALID_OTP',
          }),
          { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
