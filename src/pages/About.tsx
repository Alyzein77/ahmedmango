import { Button } from "@/components/ui/button";
import { ArrowLeft, Youtube, Instagram, Facebook, Star, Users, Trophy, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";

const About = () => {
  useSEO({
    title: "من هو أحمد مانجو - صانع محتوى مراجعات السناكس",
    description: "تعرف على أحمد مانجو، أكبر صانع محتوى مراجعات سناكس ومنتجات غذائية في مصر. أكثر من 2 مليون متابع و50 مليون مشاهدة منذ 2019.",
    canonical: "/about",
    ogImage: "https://ahmedmango.com/lovable-uploads/ahmed-mango-hero.png",
  });
  const stats = [
    { icon: Users, value: "2M+", label: "متابع" },
    { icon: Youtube, value: "500+", label: "فيديو" },
    { icon: Trophy, value: "50M+", label: "مشاهدة" },
    { icon: Heart, value: "1M+", label: "إعجاب" },
  ];

  const timeline = [
    { year: "2019", title: "البداية", desc: "بدأت القناة بفيديوهات بسيطة عن تجربة المنتجات" },
    { year: "2020", title: "النمو", desc: "وصلنا لأول 100 ألف مشترك" },
    { year: "2022", title: "الانتشار", desc: "أصبحنا من أكبر قنوات الريفيوز في مصر" },
    { year: "2024", title: "التطور", desc: "إطلاق الموقع الرسمي والمسابقات" },
  ];

  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/90 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
            <span className="text-primary font-bold">العودة للرئيسية</span>
          </Link>
          <img 
            src="/lovable-uploads/88e2436f-26ab-4234-a5ba-a613e3bc664f.png" 
            alt="Logo" 
            className="h-10"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6 font-bold text-sm">
            <Star className="w-4 h-4" />
            قصتنا
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-primary">أحمد مانجو</span>
            <br />
            <span className="text-secondary-foreground/80">صانع المحتوى الأول</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            منذ 2019 ونحن نقدم لكم أفضل المراجعات والتجارب لأحدث المنتجات في السوق المصري بأسلوب ممتع ومختلف
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary-foreground/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 text-center hover:border-primary/50 transition-all hover:scale-105"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-secondary-foreground/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl">
                <img 
                  src="/lovable-uploads/ahmed-mango-hero.png" 
                  alt="أحمد مانجو"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-black text-lg shadow-lg">
                🥭 Mango
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-primary">من هو أحمد مانجو؟</h2>
              <p className="text-secondary-foreground/80 leading-relaxed text-lg">
                أحمد مانجو هو صانع محتوى مصري متخصص في مراجعة المنتجات الغذائية والمشروبات. 
                بدأ رحلته على يوتيوب في 2019 وسرعان ما أصبح من أشهر صناع المحتوى في هذا المجال.
              </p>
              <p className="text-secondary-foreground/80 leading-relaxed text-lg">
                يتميز بأسلوبه الكوميدي المميز والصادق في تقييم المنتجات، مما جعله محل ثقة لملايين المتابعين 
                الذين يعتمدون على رأيه قبل تجربة أي منتج جديد.
              </p>
              <div className="flex gap-4 pt-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                   className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-transform hover:scale-110">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 rounded-full transition-transform hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-transform hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-secondary-foreground/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
            <span className="text-primary">رحلتنا</span> عبر السنين
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/30 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-card/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all">
                      <div className="text-primary font-black text-2xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-secondary-foreground mb-2">{item.title}</h3>
                      <p className="text-secondary-foreground/70">{item.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-secondary z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            انضم لـ <span className="text-primary">عيلة مانجو</span>
          </h2>
          <p className="text-secondary-foreground/70 mb-8 text-lg">
            تابعنا على جميع المنصات واستمتع بأحدث الفيديوهات والمسابقات والجوائز
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-primary text-primary-foreground font-bold px-8 py-6 text-lg rounded-full hover:scale-105 transition-transform">
                🎮 ابدأ اللعب الآن
              </Button>
            </Link>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-bold px-8 py-6 text-lg rounded-full">
                📺 شاهد القناة
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-primary/20">
        <div className="container mx-auto text-center text-secondary-foreground/50">
          <p>© 2024 أحمد مانجو - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
