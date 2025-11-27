import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden font-poppins pt-16 pb-28">
      {/* Premium Abstract Background - Softer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCF45] via-[#FBA919]/85 to-[#FFCF45]" />
        
        {/* Layered curves with reduced opacity for clearer text */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Large soft organic shapes - back layer */}
          <ellipse cx="90%" cy="20%" rx="200" ry="280" fill="#F8CBDF" opacity="0.18" />
          <ellipse cx="5%" cy="60%" rx="180" ry="240" fill="#9CDAEB" opacity="0.15" />
          
          {/* Mid layer curves */}
          <ellipse cx="80%" cy="75%" rx="150" ry="200" fill="#F8CBDF" opacity="0.15" />
          <ellipse cx="15%" cy="30%" rx="100" ry="140" fill="#9CDAEB" opacity="0.12" />
          
          {/* Subtle accent shapes */}
          <circle cx="85%" cy="50%" r="60" fill="#D1007C" opacity="0.08" />
          <circle cx="10%" cy="80%" r="40" fill="#FBA919" opacity="0.1" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        
        {/* Two-Column Layout: Image Left, Text Right */}
        <div className="flex items-center gap-4">
          
          {/* LEFT COLUMN — IMAGE (far left, 2x bigger) */}
          <div className="relative flex-shrink-0 -ml-20">
            {/* Circular container for the image */}
            <div className="relative w-[280px] h-[280px] rounded-full bg-gradient-to-br from-[#FFCF45]/30 to-[#FBA919]/40 p-3 overflow-hidden shadow-xl">
              {/* Inner glow ring */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
              {/* Soft shadow behind image */}
              <div className="absolute inset-0 bg-[#1A1349]/10 rounded-full blur-2xl scale-90 translate-y-2" />
              <img 
                alt="Ahmed Mango" 
                className="relative w-full h-full object-cover object-top rounded-full drop-shadow-lg" 
                src="/lovable-uploads/0a148d67-bdd7-4ad2-ac49-3dfa0bd03f40.png" 
              />
            </div>
          </div>

          {/* RIGHT COLUMN — TEXT BLOCK (55% width) */}
          <div className="flex-1 text-right space-y-3">
            {/* Heading 1 - Large, Navy */}
            <h1 
              className="text-4xl leading-none text-[#1A1349] font-extrabold tracking-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              أحمد مانجو
            </h1>
            
            {/* Heading 2 - Mixed Colors */}
            <h2 
              className="text-xl font-bold leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <span className="text-[#1A1349]">2استكا</span>{" "}
              <span className="text-[#D1007C]">أو فاستكا؟</span>
            </h2>
            
            {/* Description - Medium, Navy */}
            <p className="text-sm font-medium text-[#1A1349] leading-relaxed pt-1">
              مراجعات صادقة للمنتجات اليومية 🍿
            </p>
            
            {/* Rating Rules - Evenly Spaced */}
            <div className="text-sm font-medium text-[#1A1349] space-y-2 pt-2">
              <p className="flex items-center justify-end gap-2">
                <span>✔️ لو حلو = 2استكا</span>
              </p>
              <p className="flex items-center justify-end gap-2">
                <span>✖️ لو وحش = فاستكا</span>
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS SECTION */}
        <div className="flex justify-center gap-3 mb-12">
          {/* Button 1 - Play & Win */}
          <Button 
            className="h-9 px-4 text-xs font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 border-0"
            style={{
              background: 'linear-gradient(135deg, #FBA919 0%, #FFCF45 100%)',
              boxShadow: '0 6px 16px -4px rgba(251, 169, 25, 0.5)'
            }}
          >
            <span className="text-[#1A1349]">العب واكسب جوائز 🎮</span>
          </Button>

          {/* Button 2 - View Reviews */}
          <Button 
            className="h-9 px-4 text-xs font-bold rounded-full hover:scale-105 transition-all duration-300 border-0"
            style={{
              backgroundColor: 'white',
              color: '#1A1349',
              boxShadow: 'inset 0 2px 4px rgba(26, 19, 73, 0.08)'
            }}
            variant="outline"
          >
            <span>شوف المراجعات 📱</span>
          </Button>
        </div>

        {/* STATS ROW */}
        <div className="flex justify-center items-start gap-10">
          {/* Stat 1 */}
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-base font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +٥٠٠ ألف
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">متابع</div>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-base font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +١٠٠٠
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">منتج مراجع</div>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-base font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +٢٠٠
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">فيديو</div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[80px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C240,120 480,140 720,130 C960,120 1200,140 1440,160 L1440,320 L0,320 Z" fill="#FBA919" opacity="0.3"></path>
          <path d="M0,180 C240,150 480,170 720,160 C960,150 1200,170 1440,180 L1440,320 L0,320 Z" fill="#FFCF45" opacity="0.4"></path>
          <path d="M0,200 C240,170 480,190 720,180 C960,170 1200,190 1440,200 L1440,320 L0,320 Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};