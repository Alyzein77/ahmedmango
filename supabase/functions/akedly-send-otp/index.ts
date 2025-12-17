import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendOtpRequest {
  phoneNumber: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber }: SendOtpRequest = await req.json();
    
    if (!phoneNumber) {
      throw new Error("Phone number is required");
    }

    const apiKey = Deno.env.get('AKEDLY_API_KEY');
    const pipelineId = Deno.env.get('AKEDLY_PIPELINE_ID');

    if (!apiKey || !pipelineId) {
      throw new Error("Akedly credentials not configured");
    }

    console.log('Sending OTP to:', phoneNumber);
    console.log('Pipeline ID:', pipelineId);

    // Step 1: Create transaction
    const createResponse = await fetch('https://api.akedly.io/api/v1/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        APIKey: apiKey,
        pipelineID: pipelineId,
        verificationAddress: { phoneNumber },
        digits: 6,
      }),
    });

    const createText = await createResponse.text();
    console.log('Create transaction response:', createText);

    if (!createResponse.ok) {
      if (createResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait and try again.", rateLimited: true }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`Failed to create transaction: ${createText}`);
    }

    const createData = JSON.parse(createText);
    const transactionID = createData.data?.transactionID;

    if (!transactionID) {
      console.error('No transaction ID in response:', createData);
      throw new Error("No transaction ID received");
    }

    console.log('Transaction ID:', transactionID);

    // Step 2: Activate transaction (sends OTP)
    const activateResponse = await fetch(
      `https://api.akedly.io/api/v1/transactions/activate/${transactionID}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }
    );

    const activateText = await activateResponse.text();
    console.log('Activate response:', activateText);

    if (!activateResponse.ok) {
      if (activateResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded.", rateLimited: true }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`Failed to activate transaction: ${activateText}`);
    }

    const activateData = JSON.parse(activateText);
    const verificationId = activateData.data?._id;

    if (!verificationId) {
      console.error('No verification ID in response:', activateData);
      throw new Error("No verification ID received");
    }

    console.log('Verification ID:', verificationId);

    return new Response(
      JSON.stringify({
        success: true,
        verificationId,
        transactionID,
        channels: { whatsapp: activateData.WhatsApp || false, sms: activateData.sms || false },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending OTP:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to send OTP" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
