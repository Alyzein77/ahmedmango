import { Button } from "@/components/ui/button";
import heroBgPattern from "@/assets/hero-bg-pattern.png";

export const Hero = () => {
  return <section id="hero" className="relative w-full overflow-hidden font-poppins pt-8 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroBgPattern} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 max-w-md">
        
        {/* Main Content Grid: Text Left, Image Right */}
        <div className="grid grid-cols-[1fr_auto] gap-4 items-start mb-8">
          
          {/* TEXT BLOCK - Left Side */}
          <div className="pt-6 space-y-4">
            {/* Main Heading */}
            <h1 style={{
            textShadow: '2px 2px 0 rgba(26, 19, 73, 0.2)',
            fontWeight: '900',
            letterSpacing: '-0.02em'
          }} className="text-5xl leading-tight text-[#1A1349] font-extrabold font-sans">
              أحمد مانجو
            </h1>
            
            {/* Subheading with Color Variation */}
            <h2 className="text-2xl font-bold leading-snug">
              <span className="text-[#D1007C]">2استكا</span>{" "}
              <span className="text-[#1A1349]">أو</span>{" "}
              <span className="text-[#D1007C]">فاستكا؟</span>
            </h2>
            
            {/* Description */}
            <p className="text-sm font-medium leading-relaxed text-[#1A1349] space-y-1">
              <span className="block">مراجعات صادقة للمنتجات اليومية</span>
              <span className="block font-sans">لو حلو = ✔️ 2استكا
لو وحش = ✖️ فاستكا</span>
            </p>
          </div>

          {/* MAN IMAGE - Top Right */}
          <div className="flex-shrink-0 -mr-6 -mt-2">
            <img alt="Ahmed Mango" className="w-[160px] h-auto drop-shadow-2xl" src="/lovable-uploads/f97809ec-51a9-476f-ac07-23c98169f96d.png" />
          </div>
        </div>

        {/* BUTTONS SECTION - Two Horizontal Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          {/* Button 1 - Play & Win (Primary Pink) */}
          <Button className="h-11 px-5 text-sm font-bold text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300" style={{
          backgroundColor: '#D1007C'
        }}>
            <span>العب واكسب جوائز 🎮</span>
          </Button>

          {/* Button 2 - View Reviews (Secondary White) */}
          <Button className="h-11 px-5 text-sm font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300" style={{
          backgroundColor: 'white',
          color: '#1A1349',
          border: '2px solid #1A1349'
        }} variant="outline">
            <span>شوف المراجعات 📱</span>
          </Button>
        </div>

        {/* STATS ROW - Centered Horizontally */}
        <div className="flex justify-center items-center gap-6 pt-4">
          {/* Stat 1 */}
          <div className="text-center">
            <div className="text-lg font-black text-white" style={{ fontFamily: 'Arial Black, sans-serif' }}>٥٠٠ ألف +</div>
            <div className="text-[10px] font-bold text-white/90">متابع</div>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <div className="text-lg font-black text-white" style={{ fontFamily: 'Arial Black, sans-serif' }}>١٠٠٠+</div>
            <div className="text-[10px] font-bold text-white/90">منتج مراجع</div>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="text-lg font-black text-white" style={{ fontFamily: 'Arial Black, sans-serif' }}>٢٠٠+</div>
            <div className="text-[10px] font-bold text-white/90">فيديو</div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[80px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C240,120 480,140 720,130 C960,120 1200,140 1440,160 L1440,320 L0,320 Z" fill="#FBA919" opacity="0.4"></path>
          <path d="M0,180 C240,150 480,170 720,160 C960,150 1200,170 1440,180 L1440,320 L0,320 Z" fill="#FFCF45" opacity="0.5"></path>
          <path d="M0,200 C240,170 480,190 720,180 C960,170 1200,190 1440,200 L1440,320 L0,320 Z" fill="white"></path>
        </svg>
      </div>
    </section>;
};