import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdRequestData {
  name: string;
  phone: string;
  brandTitle: string;
  brandName: string;
  brandLink?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-ad-notification function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adRequestData: AdRequestData = await req.json();
    console.log("Received ad request data:", { 
      name: adRequestData.name, 
      brandName: adRequestData.brandName 
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch active notification emails
    const { data: emailRecipients, error: fetchError } = await supabase
      .from("notification_emails")
      .select("email")
      .eq("is_active", true);

    if (fetchError) {
      console.error("Error fetching notification emails:", fetchError);
      throw new Error("Failed to fetch notification emails");
    }

    if (!emailRecipients || emailRecipients.length === 0) {
      console.log("No active notification emails configured");
      return new Response(
        JSON.stringify({ success: true, message: "No notification emails configured" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const toEmails = emailRecipients.map((r) => r.email);
    console.log("Sending notification to:", toEmails);

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #FFA500 0%, #FF6B35 100%); padding: 30px; text-align: center; }
          .header h1 { color: #1a1349; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-right: 4px solid #FFA500; }
          .field-label { font-weight: bold; color: #1a1349; margin-bottom: 5px; font-size: 14px; }
          .field-value { color: #333; font-size: 16px; }
          .message-box { background: #fff3e0; padding: 20px; border-radius: 8px; margin-top: 10px; }
          .footer { background: #1a1349; color: white; padding: 20px; text-align: center; font-size: 12px; }
          .emoji { font-size: 48px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="emoji">🥭</div>
            <h1>طلب إعلان جديد!</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">👤 الاسم</div>
              <div class="field-value">${adRequestData.name}</div>
            </div>
            <div class="field">
              <div class="field-label">📱 رقم الموبايل</div>
              <div class="field-value" dir="ltr">${adRequestData.phone}</div>
            </div>
            <div class="field">
              <div class="field-label">📢 عنوان الإعلان</div>
              <div class="field-value">${adRequestData.brandTitle}</div>
            </div>
            <div class="field">
              <div class="field-label">🏢 اسم البراند</div>
              <div class="field-value">${adRequestData.brandName}</div>
            </div>
            ${adRequestData.brandLink ? `
            <div class="field">
              <div class="field-label">🔗 لينك البراند</div>
              <div class="field-value"><a href="${adRequestData.brandLink}" target="_blank">${adRequestData.brandLink}</a></div>
            </div>
            ` : ''}
            <div class="field">
              <div class="field-label">💬 الرسالة</div>
              <div class="message-box">${adRequestData.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>أحمد مانجو - طلبات الإعلانات</p>
            <p>تم الإرسال في: ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Ahmed Mango <notifications@updates.risca.dev>",
      to: toEmails,
      subject: `🥭 طلب إعلان جديد من ${adRequestData.brandName}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-ad-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
