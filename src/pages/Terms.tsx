import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const Terms = () => {
  useSEO({
    title: "الشروط والأحكام",
    description: "الشروط والأحكام لاستخدام موقع أحمد مانجو. تعرف على القواعد والسياسات المتبعة في الموقع.",
    canonical: "/terms",
  });
  return (
    <div className="min-h-screen font-poppins bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-24 pb-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl px-4 relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary">
              الشروط والأحكام
            </h1>
          </div>
          <p className="text-center text-muted-foreground">
            موقع أحمد مانجو
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12" dir="rtl">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-10 space-y-8">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-border">
            <p className="text-2xl font-bold text-secondary mb-2">
              📜 الشروط والأحكام – موقع أحمد مانجو
            </p>
            <p className="text-muted-foreground">
              <strong>آخر تحديث:</strong> ديسمبر 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              مرحبًا بك في الموقع الرسمي لأحمد مانجو.
            </p>
            <p className="text-foreground leading-relaxed">
              باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام.
            </p>
            <p className="text-foreground leading-relaxed">
              يرجى قراءة هذه الوثيقة بعناية قبل استخدام الموقع.
            </p>
          </div>

          <hr className="border-border" />

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              1. قبول الشروط
            </h2>
            <p className="text-foreground">
              باستخدام الموقع، فإنك تقر بأنك قرأت وفهمت ووافقت على هذه الشروط.
            </p>
            <p className="text-foreground">
              إذا لم توافق على أي جزء منها، يرجى التوقف عن استخدام الموقع فورًا.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              2. استخدام الموقع
            </h2>
            <p className="text-foreground">
              يُسمح لك باستخدام الموقع لأغراض شخصية وغير تجارية فقط.
            </p>
            <p className="text-foreground font-semibold">يُمنع:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>نسخ أو سرقة المحتوى</li>
              <li>إعادة نشر الفيديوهات أو الصور بدون إذن</li>
              <li>استخدام الموقع في أنشطة غير قانونية</li>
              <li>محاولة الدخول إلى لوحة التحكم أو النظام الخلفي بدون تصريح</li>
            </ul>
            <p className="text-primary font-semibold mt-4">
              نحتفظ بالحق في تعليق أو منع الوصول لأي مستخدم يخالف هذه القواعد.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              3. المحتوى والمراجعات
            </h2>
            <p className="text-foreground">
              يقدّم أحمد مانجو مراجعات وآراء شخصية حول المنتجات الغذائية.
            </p>
            <p className="text-foreground font-semibold">لا يُعتبر هذا المحتوى:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>نصيحة غذائية</li>
              <li>تقييمًا طبيًا</li>
              <li>ضمانًا لجودة المنتج</li>
              <li>بديلًا عن تجربة المستخدم الشخصية</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              كل الآراء تعبر عن رؤية صاحب المحتوى فقط.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              4. الملكية الفكرية
            </h2>
            <p className="text-foreground">جميع المواد في الموقع—بما في ذلك:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>الفيديوهات</li>
              <li>الصور</li>
              <li>النصوص</li>
              <li>الشعارات</li>
              <li>نظام 2استكا / فاستكا</li>
              <li>تصميمات الواجهة</li>
            </ul>
            <p className="text-foreground mt-2">
              محمية بموجب قوانين الملكية الفكرية.
            </p>
            <p className="text-primary font-semibold">
              يُمنع استخدامها أو نشرها بدون إذن كتابي مسبق.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              5. الروابط الخارجية
            </h2>
            <p className="text-foreground">
              قد يحتوي الموقع على روابط لجهات خارجية مثل: YouTube, TikTok, Instagram.
            </p>
            <p className="text-foreground font-semibold">لسنا مسؤولين عن:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>محتوى تلك المواقع</li>
              <li>سياساتها</li>
              <li>أمانها</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              استخدامك لأي رابط خارجي يكون على مسؤوليتك الخاصة.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              6. الخصوصية وحماية البيانات
            </h2>
            <p className="text-foreground">
              استخدام الموقع يخضع لسياسة الخصوصية الخاصة بنا.
            </p>
            <p className="text-foreground">
              من خلال استخدامك للموقع، فإنك توافق على طرق جمع ومعالجة البيانات كما هو موضح في صفحة{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">
                سياسة الخصوصية
              </Link>.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              7. مسابقات &quot;العب واكسب&quot;
            </h2>
            <p className="text-foreground">إذا شاركت في أي مسابقة أو لعبة على الموقع:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>قد نطلب بيانات مثل الاسم والبريد الإلكتروني.</li>
              <li>يحق للموقع استبعاد أي مشارك يقدّم معلومات خاطئة.</li>
              <li>القرارات النهائية تخص إدارة الموقع فقط.</li>
              <li>الجوائز تُرسل بناءً على الشروط المنشورة لكل مسابقة.</li>
            </ul>
          </section>

          <hr className="border-border" />

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              8. إخلاء المسؤولية
            </h2>
            <p className="text-foreground font-semibold">لا نضمن أن:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>الموقع سيكون متاحًا دائمًا</li>
              <li>المحتوى خالٍ من الأخطاء</li>
              <li>الروابط تعمل دائمًا</li>
              <li>المنتجات المراجَعة ستكون مناسبة لكل المستخدمين</li>
            </ul>
            <p className="text-primary font-semibold mt-4">
              تستخدم الموقع على مسؤوليتك الشخصية.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              9. التعديلات على الشروط
            </h2>
            <p className="text-foreground">
              قد نقوم بتعديل أو تحديث هذه الشروط من وقت لآخر.
            </p>
            <p className="text-foreground">
              سيتم نشر التغييرات على هذه الصفحة مع تحديث التاريخ في الأعلى.
            </p>
            <p className="text-muted-foreground">
              استمرارك في استخدام الموقع بعد أي تعديل يعني موافقتك على الشروط الجديدة.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              10. القانون المختص
            </h2>
            <p className="text-foreground">
              تخضع هذه الشروط لقوانين <strong>جمهورية مصر العربية</strong>.
            </p>
            <p className="text-foreground">
              في حال حدوث أي نزاع، تكون المحاكم المصرية هي الجهة المختصة.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              11. التواصل معنا
            </h2>
            <p className="text-foreground">
              لأي استفسار بخصوص الشروط والأحكام، يرجى التواصل عبر:
            </p>
            <div className="bg-primary/10 rounded-xl p-4 space-y-2">
              <p className="text-foreground font-semibold">
                📧 <a href="mailto:admin@ahmedmango.com" className="text-primary hover:underline">admin@ahmedmango.com</a>
              </p>
              <p className="text-foreground">
                📍 القاهرة، مصر
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
