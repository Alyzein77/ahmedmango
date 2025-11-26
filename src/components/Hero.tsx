import { Button } from "@/components/ui/button";
import heroMango from "@/assets/hero-mango.png";
export const Hero = () => {
  return <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-4 py-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-30">🥭</div>
        <div className="absolute top-40 right-20 text-4xl animate-float opacity-20" style={{
        animationDelay: '1s'
      }}>✅</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-float opacity-25" style={{
        animationDelay: '2s'
      }}>❌</div>
        <div className="absolute bottom-20 right-10 text-6xl animate-float opacity-30" style={{
        animationDelay: '0.5s'
      }}>🔥</div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Content */}
          <div className="text-center md:text-left space-y-10 animate-slide-up order-1 md:order-2">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 bg-primary/10 border-2 border-primary rounded-full text-primary font-bold text-xl mb-4 animate-pulse-glow">
                🎯 نظام التقييم الأشهر في المنطقة
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-tight">
              <span className="block font-sans text-[#1a1349] text-right text-8xl">أحمد مانجو</span>
              <span className="block bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent animate-pulse-glow md:text-9xl font-sans text-right font-medium px-0 my-[31px] mx-0 text-7xl">
                2استكا أو فاستكا؟
              </span>
            </h1>
            
            <p className="text-2xl leading-relaxed text-[#1a1349] font-sans text-right md:text-3xl font-medium">مراجعات صادقة للمنتجات اليومية 🍿  
لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌<br />
              لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-8">
              <Button size="lg" className="text-2xl font-bold bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-full px-12 py-6">
                🎮 العب واكسب جوائز
              </Button>
              <Button size="lg" variant="outline" className="text-2xl font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-12 py-6">
                📱 شوف المراجعات
              </Button>
            </div>

            {/* Stats */}
            <div className="gap-12 justify-center pt-12 flex-wrap flex flex-row md:flex md:items-center md:justify-end text-slate-800">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-[#ffc847]">500K+</div>
                <div className="text-lg md:text-xl text-muted-foreground">متابع</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-[#ffc847]">1000+</div>
                <div className="text-lg md:text-xl text-muted-foreground">منتج مراجع</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-[#ffc847]">200+</div>
                <div className="text-lg md:text-xl text-muted-foreground">فيديو</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-2 md:order-1 animate-bounce-in md:-ml-12 lg:-ml-24">
            <div className="relative w-full max-w-5xl">
              <img alt="Ahmed Mango Mascot" className="w-full h-auto drop-shadow-2xl animate-float" src="/lovable-uploads/f587694f-8ab0-4660-89aa-0cedb7aec52f.png" />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};