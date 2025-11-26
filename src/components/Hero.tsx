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
              <span className="block font-sans text-right drop-shadow-lg text-slate-50 text-9xl mt-[103px] mr-[103px] mb-[103px] ml-[103px] py-0 px-0 my-0 mx-0">أحمد مانجو</span>
              <span className="block text-slate-900 drop-shadow-lg font-sans text-right px-0 my-[31px] mx-0 text-7xl md:text-7xl font-normal">
                2استكا أو فاستكا؟
              </span>
            </h1>
            
            <p className="text-2xl leading-relaxed font-sans font-medium drop-shadow-md text-gray-50 text-right md:text-2xl">مراجعات صادقة للمنتجات اليومية 🍿
 لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌<br />
              لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-8">
              <Button size="lg" className="text-2xl font-bold text-white hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-full px-12 py-6 bg-[#e20351]">
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
          <div className="relative order-2 md:order-1 animate-bounce-in md:absolute md:-left-96 lg:-left-[30rem] md:top-1/2 md:-translate-y-1/2">
            <div className="relative w-full max-w-5xl">
              <img alt="Ahmed Mango Mascot" className="w-full h-auto drop-shadow-2xl animate-float" src="/lovable-uploads/f97809ec-51a9-476f-ac07-23c98169f96d.png" />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-orange-500/20 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[120px] md:h-[180px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          {/* Main wave layers for depth */}
          <path d="M0,160 C240,100 480,140 720,120 C960,100 1200,140 1440,160 L1440,320 L0,320 Z" fill="#FFA500" opacity="0.3"></path>
          <path d="M0,180 C240,130 480,170 720,150 C960,130 1200,170 1440,180 L1440,320 L0,320 Z" fill="#FFB84D" opacity="0.5"></path>
          <path d="M0,200 C240,150 480,190 720,170 C960,150 1200,190 1440,200 L1440,320 L0,320 Z" fill="white" className="text-background"></path>
          
          {/* Decorative mango shapes */}
          <ellipse cx="150" cy="155" rx="25" ry="35" fill="#FF6B9D" opacity="0.6" transform="rotate(-20 150 155)" />
          <ellipse cx="850" cy="175" rx="30" ry="40" fill="#FF6B9D" opacity="0.6" transform="rotate(15 850 175)" />
          
          {/* Star decorations */}
          <path d="M280,140 L285,150 L295,152 L287,160 L289,170 L280,165 L271,170 L273,160 L265,152 L275,150 Z" fill="#E91E63" opacity="0.7" />
          <path d="M1100,160 L1105,170 L1115,172 L1107,180 L1109,190 L1100,185 L1091,190 L1093,180 L1085,172 L1095,170 Z" fill="#E91E63" opacity="0.7" />
          
          {/* Small decorative circles */}
          <circle cx="450" cy="165" r="8" fill="#FFB84D" opacity="0.5" />
          <circle cx="600" cy="155" r="10" fill="#FFB84D" opacity="0.5" />
          <circle cx="1250" cy="170" r="7" fill="#FFB84D" opacity="0.5" />
        </svg>
      </div>
    </section>;
};