import { Button } from "@/components/ui/button";
import heroMango from "@/assets/hero-mango.png";
export const Hero = () => {
  return <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-4 py-12" style={{
    backgroundImage: 'url(/mango-pattern-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Content */}
          <div className="text-center md:text-left space-y-10 animate-slide-up order-1 md:order-2">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 bg-white/90 border-2 border-slate-900 rounded-full text-slate-900 font-bold text-xl mb-4 shadow-lg">
                🎯 نظام التقييم الأشهر في المنطقة
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-tight">
              <span className="block font-sans text-slate-900 text-right text-8xl drop-shadow-lg">أحمد مانجو</span>
              <span className="block text-slate-900 drop-shadow-lg md:text-9xl font-sans text-right font-medium px-0 my-[31px] mx-0 text-7xl">
                2استكا أو فاستكا؟
              </span>
            </h1>
            
            <p className="text-2xl leading-relaxed text-slate-900 font-sans text-right md:text-3xl font-medium drop-shadow-md">مراجعات صادقة للمنتجات اليومية 🍿  
لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌<br />
              لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-8">
              <Button size="lg" className="text-2xl font-bold bg-slate-900 text-white hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-full px-12 py-6">
                🎮 العب واكسب جوائز
              </Button>
              <Button size="lg" variant="outline" className="text-2xl font-bold border-2 border-slate-900 bg-white/90 text-slate-900 hover:bg-slate-900 hover:text-white rounded-full px-12 py-6">
                📱 شوف المراجعات
              </Button>
            </div>

            {/* Stats */}
            <div className="gap-12 justify-center pt-12 flex-wrap flex flex-row md:flex md:items-center md:justify-end">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-slate-900 drop-shadow-md">500K+</div>
                <div className="text-lg md:text-xl text-slate-800 font-semibold">متابع</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-slate-900 drop-shadow-md">1000+</div>
                <div className="text-lg md:text-xl text-slate-800 font-semibold">منتج مراجع</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-slate-900 drop-shadow-md">200+</div>
                <div className="text-lg md:text-xl text-slate-800 font-semibold">فيديو</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-2 md:order-1 animate-bounce-in md:absolute md:-left-48 md:top-1/2 md:-translate-y-1/2">
            <div className="relative w-full max-w-5xl">
              <img alt="Ahmed Mango Mascot" className="w-full h-auto drop-shadow-2xl animate-float" src="/lovable-uploads/f97809ec-51a9-476f-ac07-23c98169f96d.png" />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};