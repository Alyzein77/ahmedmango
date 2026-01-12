import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productName, brand, existingCategories } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `أنت مساعد متخصص في تصنيف المنتجات الغذائية العربية. 
مهمتك هي اقتراح فئة مناسبة للمنتج بناءً على اسمه والعلامة التجارية.

الفئات المتاحة حالياً: ${existingCategories?.join(", ") || "شيبسي، شوكولاتة، مشروبات، بسكويت، سناكس، حلويات، أخرى"}

قواعد التصنيف:
- إذا كان المنتج شيبس أو رقائق بطاطس: "شيبسي"
- إذا كان المنتج شوكولاتة أو كاكاو: "شوكولاتة"
- إذا كان المنتج عصير أو مشروب غازي أو ماء: "مشروبات"
- إذا كان المنتج بسكويت أو كوكيز: "بسكويت"
- إذا كان المنتج سناك خفيف: "سناكس"
- إذا كان المنتج حلوى أو جيلي: "حلويات"
- إذا لم يناسب أي فئة: "أخرى"

أجب فقط باسم الفئة بالعربية، بدون أي شرح إضافي.`;

    const userPrompt = `اسم المنتج: ${productName}${brand ? `\nالعلامة التجارية: ${brand}` : ""}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "تم تجاوز حد الطلبات، حاول مرة أخرى لاحقاً" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "يرجى إضافة رصيد لاستخدام خاصية الذكاء الاصطناعي" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "حدث خطأ في الاتصال بالذكاء الاصطناعي" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const suggestedCategory = data.choices?.[0]?.message?.content?.trim() || "أخرى";

    return new Response(
      JSON.stringify({ category: suggestedCategory }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("suggest-category error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "حدث خطأ غير متوقع" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});