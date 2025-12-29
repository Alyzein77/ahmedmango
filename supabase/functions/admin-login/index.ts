import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Allowed admin emails - UPDATE THESE WITH YOUR REAL ADMIN EMAILS
const ALLOWED_ADMIN_EMAILS = [
  "admin@ahmedmango.com",
  "team@ahmedmango.com",
  "amal06499@gmail.com",
];

interface AdminLoginRequest {
  email: string;
  redirectTo: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectTo }: AdminLoginRequest = await req.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "البريد الإلكتروني غير صالح", code: "INVALID_EMAIL" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if email is in allowed list
    const normalizedEmail = email.toLowerCase().trim();
    if (!ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
      return new Response(
        JSON.stringify({ error: "هذا البريد غير مصرح له بالدخول.", code: "UNAUTHORIZED_EMAIL" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Send magic link
    const { error } = await supabaseAdmin.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      console.error("Error sending magic link:", error);
      return new Response(
        JSON.stringify({ error: "حدث خطأ أثناء إرسال رابط الدخول", code: "SEND_ERROR" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "تم إرسال رابط الدخول إلى بريدك الإلكتروني" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in admin-login function:", error);
    return new Response(
      JSON.stringify({ error: "حدث خطأ غير متوقع", code: "UNKNOWN_ERROR" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
