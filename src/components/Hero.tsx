import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="hero" className="relative w-full overflow-hidden font-poppins pt-6 pb-16 sm:pt-10 sm:pb-20">
      {/* Background Image Only */}
      <div className="absolute inset-0">
        <img src="/hero-background.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* White fade at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 max-w-md mx-auto">
        
        {/* TOP SECTION — CENTERED IMAGE WITH CIRCLE */}
        <div className="relative flex items-center justify-center mb-4 sm:mb-6">
          {/* Large circular gradient background */}
          <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full bg-gradient-to-br from-[#FFCF45]/60 via-[#FBA919]/50 to-[#FFCF45]/40" />
          <div className="absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full bg-gradient-to-br from-[#FFCF45]/40 to-[#FBA919]/30" />
          
          {/* Soft shadow behind image */}
          <div className="absolute w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] bg-[#1A1349]/12 rounded-full blur-2xl translate-y-3" />
          
          {/* Man image */}
          <img alt="Ahmed Mango" className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover object-center rounded-full drop-shadow-xl" src="/lovable-uploads/ahmed-mango-hero.png" />
        </div>

        {/* TEXT STACKED UNDER THE IMAGE */}
        <div className="flex flex-col items-center text-center">
          <h1 style={{
          fontFamily: 'Poppins, sans-serif'
        }} className="sm:text-3xl leading-none text-[#1A1349] font-extrabold tracking-tight mb-2 text-6xl font-sans text-center">
            أحمد مانجو
          </h1>
          
          <h2 className="text-base sm:text-lg font-bold leading-tight mb-2" style={{
          fontFamily: 'Poppins, sans-serif',
          textShadow: '0 1px 3px rgba(0,0,0,0.12)'
        }}>
            <span className="text-[#1A1349]">2استكا</span>{" "}
            <span className="text-[#C0006B]">أو فاستكا؟</span>
          </h2>
          
          <p className="text-xs sm:text-sm font-medium text-[#1A1349] leading-relaxed mb-2">
            مراجعات صادقة للمنتجات اليومية 🍿
          </p>
          
          {/* Rating Rules */}
          <div className="text-xs sm:text-sm font-medium text-[#1A1349] space-y-1">
            <p>✔️ لو حلو = 2استكا</p>
            <p>✖️ لو وحش = فاستكا</p>
          </div>
        </div>

        {/* BUTTONS SECTION */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 mt-4 mb-4 sm:mb-6 w-full">
          <Button style={{
          background: 'linear-gradient(135deg, #FBA919 0%, #FFCF45 100%)',
          boxShadow: '0 6px 16px -4px rgba(251, 169, 25, 0.5)'
        }} onClick={() => scrollToSection("#game")} className="h-11 sm:h-10 px-5 w-full sm:w-auto sm:min-w-[140px] text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 bg-[#ffd028] text-orange-50 border-2 shadow-xl">
            <span className="text-[#1A1349]">العب واكسب جوائز 🎮</span>
          </Button>

          <Button className="h-11 sm:h-10 px-5 w-full sm:w-auto sm:min-w-[140px] text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 bg-white border border-[#1A1349]/20" style={{
          color: '#1A1349',
          boxShadow: '0 2px 8px rgba(26, 19, 73, 0.08)'
        }} onClick={() => scrollToSection("#products")}>
            <span>شوف المراجعات 📱</span>
          </Button>
        </div>

        {/* STATS ROW */}
        <div className="flex justify-center items-start gap-4 sm:gap-5">
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-xs sm:text-sm font-semibold text-[#1A1349]" style={{
            fontFamily: 'Poppins, sans-serif'
          }}>
              +٥٠٠ ألف
            </div>
            <div className="text-[9px] sm:text-[10px] font-medium text-[#1A1349]/70">متابع</div>
          </div>

          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-xs sm:text-sm font-semibold text-[#1A1349]" style={{
            fontFamily: 'Poppins, sans-serif'
          }}>
              +١٠٠٠
            </div>
            <div className="text-[9px] sm:text-[10px] font-medium text-[#1A1349]/70">منتج مراجع</div>
          </div>

          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-xs sm:text-sm font-semibold text-[#1A1349]" style={{
            fontFamily: 'Poppins, sans-serif'
          }}>
              +٢٠٠
            </div>
            <div className="text-[9px] sm:text-[10px] font-medium text-[#1A1349]/70">فيديو</div>
          </div>
        </div>
      </div>

    </section>;
};