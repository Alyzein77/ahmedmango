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
        <img alt="" className="w-full h-full object-cover opacity-90 shadow-inner rounded-none" src="/lovable-uploads/cf94522b-12ff-4d72-8aba-4f4ac57f0543.png" />
      </div>
      
      {/* White fade at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 max-w-md mx-auto">
        
        {/* TOP SECTION — CENTERED IMAGE WITH CIRCLE */}
        <div className="relative flex items-center justify-center mb-4 sm:mb-6">
          {/* Large circular gradient background */}
          <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full" style={{
          background: 'linear-gradient(135deg, rgba(232, 93, 4, 0.5) 0%, rgba(244, 140, 6, 0.4) 100%)'
        }} />
          <div className="absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full" style={{
          background: 'linear-gradient(135deg, rgba(232, 93, 4, 0.3) 0%, rgba(244, 140, 6, 0.2) 100%)'
        }} />
          
          {/* Soft shadow behind image */}
          <div className="absolute w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] bg-[#1A1349]/12 rounded-full blur-2xl translate-y-3" />
          
          {/* Man image */}
          <img alt="Ahmed Mango" className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] object-cover object-center rounded-full drop-shadow-xl" src="/lovable-uploads/c71f33e6-ec3e-4a14-8912-886a27f8246d.png" />
        </div>

        {/* TEXT STACKED UNDER THE IMAGE */}
        <div className="flex flex-col items-center text-center">
          <h1 className="font-oi sm:text-3xl leading-none text-[#1A1349] tracking-tight mb-2 text-center text-4xl">
            أحمد مانجو
          </h1>
          
          <h2 className="text-base sm:text-lg leading-tight mb-2" style={{
          fontFamily: 'Lalezar, sans-serif',
          textShadow: '0 1px 3px rgba(0,0,0,0.12)'
        }}>
            <span className="text-orange-foreground text-3xl">استكا</span>{" "}
            <span className="text-[#1d173a] text-3xl">ولا فستكا؟</span>
          </h2>
          
          
          
          {/* Rating Rules */}
          <div className="text-xs sm:text-sm font-medium text-[#1A1349] space-y-1">
            
            
          </div>
        </div>

        {/* BUTTONS SECTION */}
        <div className="flex flex-col justify-center items-center gap-2 mt-4 mb-4 sm:mb-6 w-full">
          <Button style={{
          background: 'linear-gradient(135deg, #E85D04 0%, #F48C06 100%)',
          boxShadow: '0 6px 16px -4px rgba(232, 93, 4, 0.5)'
        }} onClick={() => scrollToSection("#game")} className="h-9 px-3 w-[160px] text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 text-white shadow-xl border-0 font-tajawal flex items-center justify-center">
            العب واكسب جوائز
          </Button>

          <Button className="h-9 px-3 w-[160px] text-xs font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 bg-white border border-[#1A1349]/20 font-tajawal flex items-center justify-center text-orange-600" style={{
          boxShadow: '0 2px 8px rgba(26, 19, 73, 0.08)'
        }} onClick={() => scrollToSection("#products")}>
            شوف المراجعات
          </Button>
        </div>

        {/* STATS ROW */}
        
      </div>

    </section>;
};