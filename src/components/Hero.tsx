import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden font-poppins pt-12 pb-24">
      {/* Premium Abstract Background - Softer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCF45] via-[#FBA919]/80 to-[#FFCF45]" />
        
        {/* Layered curves with reduced opacity */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="90%" cy="20%" rx="180" ry="240" fill="#F8CBDF" opacity="0.12" />
          <ellipse cx="5%" cy="60%" rx="160" ry="200" fill="#9CDAEB" opacity="0.10" />
          <ellipse cx="80%" cy="75%" rx="120" ry="160" fill="#F8CBDF" opacity="0.10" />
          <ellipse cx="15%" cy="30%" rx="80" ry="120" fill="#9CDAEB" opacity="0.08" />
          <circle cx="85%" cy="50%" r="50" fill="#D1007C" opacity="0.06" />
          <circle cx="10%" cy="80%" r="35" fill="#FBA919" opacity="0.08" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center px-4">
        
        {/* TOP SECTION — CENTERED IMAGE WITH CIRCLE */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Large circular gradient background - tighter around man */}
          <div className="absolute w-[220px] h-[220px] rounded-full bg-gradient-to-br from-[#FFCF45]/60 via-[#FBA919]/50 to-[#FFCF45]/40" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#FFCF45]/40 to-[#FBA919]/30" />
          
          {/* Soft shadow behind image */}
          <div className="absolute w-[180px] h-[180px] bg-[#1A1349]/12 rounded-full blur-2xl translate-y-3" />
          
          {/* Man image - centered inside circle */}
          <img 
            alt="Ahmed Mango" 
            className="relative w-[200px] h-[200px] object-cover object-top rounded-full drop-shadow-xl" 
            src="/lovable-uploads/0a148d67-bdd7-4ad2-ac49-3dfa0bd03f40.png" 
          />
        </div>

        {/* TEXT STACKED UNDER THE IMAGE (CENTERED & TIGHT) */}
        <div className="flex flex-col items-center text-center space-y-2">
          {/* Heading - Large, Navy */}
          <h1 
            className="text-3xl leading-none text-[#1A1349] font-extrabold tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            أحمد مانجو
          </h1>
          
          {/* Subheading - Bold, Two-color with better contrast */}
          <h2 
            className="text-lg font-bold leading-tight"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.08)'
            }}
          >
            <span className="text-[#1A1349]">2استكا</span>{" "}
            <span className="text-[#C0006B]">أو فاستكا؟</span>
          </h2>
          
          {/* Description - Medium, Navy */}
          <p className="text-sm font-medium text-[#1A1349] leading-relaxed">
            مراجعات صادقة للمنتجات اليومية 🍿
          </p>
          
          {/* Rating Rules - Clean, Centered */}
          <div className="text-sm font-medium text-[#1A1349] space-y-1">
            <p>✔️ لو حلو = 2استكا</p>
            <p>✖️ لو وحش = فاستكا</p>
          </div>
        </div>

        {/* BUTTONS SECTION - Perfectly Aligned */}
        <div className="flex justify-center items-center gap-3 mt-5 mb-8">
          <Button 
            className="h-10 px-5 text-xs font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 border-0"
            style={{
              background: 'linear-gradient(135deg, #FBA919 0%, #FFCF45 100%)',
              boxShadow: '0 6px 16px -4px rgba(251, 169, 25, 0.5)'
            }}
          >
            <span className="text-[#1A1349]">العب واكسب جوائز 🎮</span>
          </Button>

          <Button 
            className="h-10 px-5 text-xs font-bold rounded-full hover:scale-105 transition-all duration-300 bg-white border border-[#1A1349]/20"
            style={{
              color: '#1A1349',
              boxShadow: '0 2px 8px rgba(26, 19, 73, 0.08)'
            }}
          >
            <span>شوف المراجعات 📱</span>
          </Button>
        </div>

        {/* STATS ROW - Tighter spacing */}
        <div className="flex justify-center items-start gap-6">
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-sm font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +٥٠٠ ألف
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">متابع</div>
          </div>

          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-sm font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +١٠٠٠
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">منتج مراجع</div>
          </div>

          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-sm font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +٢٠٠
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">فيديو</div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[70px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C240,120 480,140 720,130 C960,120 1200,140 1440,160 L1440,320 L0,320 Z" fill="#FBA919" opacity="0.3"></path>
          <path d="M0,180 C240,150 480,170 720,160 C960,150 1200,170 1440,180 L1440,320 L0,320 Z" fill="#FFCF45" opacity="0.4"></path>
          <path d="M0,200 C240,170 480,190 720,180 C960,170 1200,190 1440,200 L1440,320 L0,320 Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};
