import { Button } from "@/components/ui/button";
import heroMango from "@/assets/hero-mango.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-4 py-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-30">🥭</div>
        <div className="absolute top-40 right-20 text-4xl animate-float opacity-20" style={{ animationDelay: '1s' }}>✅</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-float opacity-25" style={{ animationDelay: '2s' }}>❌</div>
        <div className="absolute bottom-20 right-10 text-6xl animate-float opacity-30" style={{ animationDelay: '0.5s' }}>🔥</div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-right space-y-6 animate-slide-up order-2 md:order-1">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 bg-primary/10 border-2 border-primary rounded-full text-primary font-bold text-sm mb-4 animate-pulse-glow">
                🎯 نظام التقييم الأشهر في المنطقة
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="block text-secondary">أحمد مانجو</span>
              <span className="block bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent animate-pulse-glow">
                2استكا أو فاستكا؟
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              مراجعات صادقة للمنتجات اليومية 🍿<br />
              لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end pt-4">
              <Button 
                size="lg" 
                className="text-lg font-bold bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-full px-8"
              >
                🎮 العب واكسب جوائز
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8"
              >
                📱 شوف المراجعات
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center md:justify-end pt-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-black text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">متابع</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-accent">1000+</div>
                <div className="text-sm text-muted-foreground">منتج مراجع</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-destructive">200+</div>
                <div className="text-sm text-muted-foreground">فيديو</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 md:order-2 animate-bounce-in">
            <div className="relative w-full max-w-md mx-auto">
              <img 
                src={heroMango} 
                alt="Ahmed Mango Mascot" 
                className="w-full h-auto drop-shadow-2xl animate-float"
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
