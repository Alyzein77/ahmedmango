import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyOtpRequest {
  verificationId: string;
  otp: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { verificationId, otp }: VerifyOtpRequest = await req.json();
    
    if (!verificationId || !otp) {
      throw new Error("Verification ID and OTP are required");
    }

    console.log('Verifying OTP for verification ID:', verificationId);

    // Verify OTP with Akedly
    const verifyResponse = await fetch(
      `https://api.akedly.io/api/v1/transactions/verify/${verificationId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      }
    );

    const verifyText = await verifyResponse.text();
    console.log('Verify response:', verifyText);

    if (!verifyResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Invalid OTP", verified: false }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        verified: true,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to verify OTP", verified: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
