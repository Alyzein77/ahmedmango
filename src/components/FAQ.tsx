import { useEffect } from "react";

const faqItems = [
  {
    question: "مين هو أحمد مانجو؟",
    answer: "أحمد مانجو هو صانع محتوى مصري متخصص في مراجعة السناكس والمنتجات الغذائية. عنده أكثر من 2 مليون متابع على يوتيوب وتيك توك وانستجرام، وبيقدم مراجعات صادقة للمنتجات بأسلوب كوميدي مميز.",
  },
  {
    question: "إيه معنى استكا وفاستكا؟",
    answer: "استكا (2استكا) معناها إن المنتج كويس وأحمد مانجو بينصح بيه. فاستكا معناها إن المنتج مش كويس ومش بينصح بيه. ده نظام التقييم الخاص بأحمد مانجو لتبسيط المراجعات.",
  },
  {
    question: "إيه أنواع المنتجات اللي بيراجعها أحمد مانجو؟",
    answer: "أحمد مانجو بيراجع كل أنواع السناكس والمنتجات الغذائية زي الشيبسي، الشوكولاتة، المشروبات، البسكويت، النودلز، وأي منتج جديد بينزل السوق المصري.",
  },
  {
    question: "إزاي أقدر أعلن مع أحمد مانجو؟",
    answer: "تقدر تتواصل معانا من خلال صفحة الإعلانات على الموقع. ابعتلنا بيانات البراند بتاعك والميزانية وهنرد عليك في أقرب وقت. أحمد مانجو بيعلن لسناكس، منتجات غذائية، مشروبات وأكتر.",
  },
  {
    question: "إيه هي لعبة خربش مع أحمد مانجو؟",
    answer: "لعبة خربش هي لعبة تفاعلية على الموقع تقدر تلعبها وتكسب جوائز حقيقية. ساعد أحمد مانجو ياكل المانجو وحرّك يمين وشمال علشان تجمع أكبر عدد نقاط.",
  },
];

export const FAQ = () => {
  useEffect(() => {
    const scriptId = "faq-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-8 sm:mb-10 font-lalezar">
          أسئلة شائعة عن أحمد مانجو
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="group border-2 border-border rounded-xl overflow-hidden bg-card"
            >
              <summary className="flex items-center justify-between cursor-pointer p-4 sm:p-5 font-bold text-sm sm:text-base text-foreground hover:bg-muted/50 transition-colors list-none">
                <span className="font-tajawal">{item.question}</span>
                <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45 mr-3 flex-shrink-0">
                  +
                </span>
              </summary>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-foreground/80 leading-relaxed font-tajawal">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
