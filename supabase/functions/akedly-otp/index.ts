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
      const createResponse = await fetch(AKEDLY_API_URL, {
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
        return new Response(
          JSON.stringify({ error: createData.message || createData.error || 'Failed to create OTP transaction' }),
          { status: createResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const txnId = createData.id || createData.transaction_id;
      console.log('Transaction created with ID:', txnId);

      // Step 2: Activate transaction to send OTP
      const activateResponse = await fetch(`${AKEDLY_API_URL}/${txnId}/activate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AKEDLY_API_KEY}`,
          'Content-Type': 'application/json',
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
        return new Response(
          JSON.stringify({ error: activateData.message || activateData.error || 'Failed to send OTP' }),
          { status: activateResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
      // Verify the OTP code
      const verifyUrl = requestId 
        ? `${AKEDLY_API_URL}/${transactionId}/verify?request_id=${requestId}`
        : `${AKEDLY_API_URL}/${transactionId}/verify`;
        
      console.log('Verifying OTP at:', verifyUrl);
      
      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AKEDLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: code,
          code: code,
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
        return new Response(
          JSON.stringify({ error: data.message || data.error || 'Invalid OTP code', verified: false }),
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
