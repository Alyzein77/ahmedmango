import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
const PrivacyPolicy = () => {
  useSEO({
    title: "سياسة الخصوصية",
    description: "سياسة الخصوصية لموقع أحمد مانجو. تعرف على كيفية جمع واستخدام وحماية بياناتك الشخصية.",
    canonical: "/privacy-policy",
  });
  return <div className="min-h-screen font-poppins bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-24 pb-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl px-4 relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary">
              سياسة الخصوصية
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
              🛡️ سياسة الخصوصية – موقع أحمد مانجو
            </p>
            <p className="text-muted-foreground">
              <strong>آخر تحديث:</strong> ديسمبر 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              مرحبًا بك في الموقع الرسمي لأحمد مانجو (&quot;نحن&quot; أو &quot;الموقع&quot;).
            </p>
            <p className="text-foreground leading-relaxed">
              توضح هذه السياسة كيفية جمع، استخدام، وحماية بياناتك عند زيارة موقعنا أو التفاعل مع خدماتنا.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              1. المعلومات التي نقوم بجمعها
            </h2>
            
            <div className="space-y-4 pr-4">
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  1.1 المعلومات التي تقدمها لنا مباشرة
                </h3>
                <p className="text-foreground mb-2">قد نجمع بيانات مثل:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
                  <li>الاسم</li>
                  <li>البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>معلومات العلامة التجارية (للشركات)</li>
                  <li>الرسائل والاستفسارات</li>
                </ul>
                <p className="text-muted-foreground mt-2 text-sm">
                  خاصة عند استخدامك لنموذج التواصل أو إرسال طلب تعاون أو الاشتراك في مسابقات &quot;العب واكسب&quot;.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  1.2 المعلومات التي يتم جمعها تلقائيًا
                </h3>
                <p className="text-foreground mb-2">قد نجمع بيانات مثل:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
                  <li>عنوان الـ IP</li>
                  <li>نوع الجهاز والمتصفح</li>
                  <li>الصفحات التي تمت زيارتها</li>
                  <li>وقت وتاريخ الزيارة</li>
                </ul>
                <p className="text-muted-foreground mt-2 text-sm">
                  وذلك من خلال أدوات التحليلات والكوكيز.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  1.3 منصات الجهات الخارجية
                </h3>
                <p className="text-foreground">
                  قد تجمع منصات مثل YouTube وTikTok وInstagram بيانات خاصة بك عند التفاعل مع محتوى مدمج من خلالها.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-border" />

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              2. كيف نستخدم بياناتك
            </h2>
            <p className="text-foreground">نستخدم معلوماتك من أجل:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>تحسين تجربة الموقع</li>
              <li>التواصل معك والرد على طلبات التعاون</li>
              <li>تشغيل وتحسين نظام المنتجات (2استكا/فاستكا)</li>
              <li>تشغيل نظام &quot;العب واكسب&quot;</li>
              <li>تحليل أداء الموقع</li>
              <li>إرسال تحديثات أو رسائل مهمة</li>
            </ul>
            <p className="text-primary font-semibold mt-4">
              لا نقوم ببيع بياناتك لأي طرف ثالث.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              3. مشاركة البيانات
            </h2>
            <p className="text-foreground">قد نشارك بياناتك فقط في الحالات التالية:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>مع مقدمي الخدمات (الاستضافة، التحليلات، البريد الإلكتروني)</li>
              <li>التزامًا بالقانون أو أوامر قضائية</li>
              <li>للحماية من الأنشطة الاحتيالية أو الضارة</li>
            </ul>
            <p className="text-primary font-semibold mt-4">
              لا نقوم بتداول أو بيع بياناتك.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              4. الكوكيز وتقنيات التتبع
            </h2>
            <p className="text-foreground">
              نستخدم الكوكيز لتحسين الأداء، تخصيص التجربة، وتحليل تفاعل المستخدم.
            </p>
            <p className="text-muted-foreground">
              يمكنك تعطيلها من المتصفح، وقد يؤثر ذلك على بعض الميزات.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              5. تخزين البيانات وحمايتها
            </h2>
            <p className="text-foreground">
              نقوم بحماية بياناتك باستخدام إجراءات أمان قياسية.
            </p>
            <p className="text-muted-foreground">
              لكن لا توجد طريقة نقل أو تخزين إلكتروني آمنة بنسبة 100%.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              6. حقوقك
            </h2>
            <p className="text-foreground">يحق لك:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground pr-4">
              <li>طلب الوصول لبياناتك</li>
              <li>تعديلها أو حذفها</li>
              <li>إلغاء الاشتراك من رسائل البريد</li>
              <li>الاعتراض على معالجة بياناتك</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              لإرسال طلب، تواصل معنا عبر البريد الموضح أدناه.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              7. خصوصية الأطفال
            </h2>
            <p className="text-foreground">
              لا يستهدف الموقع الأطفال دون 13 عامًا، ولا نقوم بجمع معلومات عنهم عمدًا.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              8. الروابط الخارجية
            </h2>
            <p className="text-foreground">
              قد يحتوي الموقع على روابط لمنصات خارجية.
            </p>
            <p className="text-muted-foreground">
              لسنا مسؤولين عن سياسات الخصوصية الخاصة بها.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              9. التعديلات على سياسة الخصوصية
            </h2>
            <p className="text-foreground">
              قد نقوم بتحديث هذه السياسة عند الحاجة.
            </p>
            <p className="text-muted-foreground">
              سيتم نشر التعديلات هنا مع تغيير تاريخ &quot;آخر تحديث&quot;.
            </p>
          </section>

          <hr className="border-border" />

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-secondary border-r-4 border-primary pr-3">
              10. معلومات التواصل
            </h2>
            <p className="text-foreground">
              لأي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا عبر:
            </p>
            <div className="bg-primary/10 rounded-xl p-4 space-y-2">
              <p className="text-foreground font-semibold">Hello@risca.dev<a href="mailto:admin@ahmedmango.com" className="text-primary hover:underline">admin@ahmedmango.com</a>
              </p>
              <p className="text-foreground">
                📍 القاهرة، مصر
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>;
};
export default PrivacyPolicy;