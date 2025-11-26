import { Button } from "@/components/ui/button";
import heroMango from "@/assets/hero-mango.png";
export const Hero = () => {
  return <section id="hero" className="relative min-h-[100vh] sm:min-h-[90vh] flex items-center justify-center px-4 py-8 sm:py-12 overflow-hidden" style={{
    backgroundImage: 'url(/hero-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="flex flex-col items-center md:items-end space-y-4 sm:space-y-6 md:space-y-10 animate-slide-up order-2 md:order-2 w-full">
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black leading-tight text-center md:text-right w-full">
              <div className="text-gray-50">أحمد مانجو</div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-medium mt-2 md:mt-4">
                2استكا أو فاستكا؟
              </div>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-sans font-medium drop-shadow-md text-gray-50 text-center md:text-right">
              مراجعات صادقة للمنتجات اليومية 🍿<br />
              لو حلو = 2استكا ✅ | لو وحش = فاستكا ❌
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start pt-4 md:pt-8 w-full">
              <Button size="lg" className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-full px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 bg-[#e20351] w-full sm:w-auto">
                🎮 العب واكسب جوائز
              </Button>
              <Button size="lg" variant="outline" className="text-sm sm:text-base md:text-lg lg:text-xl font-bold border-2 bg-white/90 text-slate-900 hover:bg-slate-900 hover:text-white rounded-full px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 border-white/0 w-full sm:w-auto">
                📱 شوف المراجعات
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 lg:gap-12 pt-6 md:pt-12 w-full">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black drop-shadow-md text-gray-50">٥٠٠+</div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-50">ألف متابع</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black drop-shadow-md text-gray-50">١٠٠٠+</div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-50">منتج</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black drop-shadow-md text-gray-50">٢٠٠+</div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-50">فيديو</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 md:order-1 animate-bounce-in">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl mx-auto md:mx-0">
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