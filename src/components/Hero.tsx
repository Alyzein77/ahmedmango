import { Button } from "@/components/ui/button";
import { useMixpanel } from "@/hooks/useMixpanel";
import { useTrackSection } from "@/hooks/useTrackSection";
export const Hero = () => {
  const {
    trackButtonClick
  } = useMixpanel();
  const sectionRef = useTrackSection('Hero Section');
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      trackButtonClick('Scroll to Section', `Hero - ${href}`);
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section ref={sectionRef as React.RefObject<HTMLElement>} id="hero" className="relative w-full overflow-hidden font-poppins pt-6 pb-16 sm:pt-10 sm:pb-20">
      {/* Static Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img alt="" className="w-full h-full object-cover" src="/lovable-uploads/a0b1042a-0f80-4031-aa41-87ba64e82ff3.png" />
      </div>
      
      {/* Solid color fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 max-w-md mx-auto">
        
        {/* TOP SECTION — CENTERED IMAGE WITH MANGO FRAME */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-10">
          {/* Subtle glow effect behind profile */}
          <div className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-full bg-orange/40 blur-2xl animate-pulse" />
          <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full bg-primary/30 blur-xl animate-pulse" style={{
          animationDelay: '0.5s'
        }} />
          
          {/* Mango-shaped frame with slow rotation */}
          <svg className="absolute w-[195px] h-[195px] sm:w-[240px] sm:h-[240px] animate-spin-slow" viewBox="0 0 200 200" fill="none">
            {/* Outer mango shape - more stylized */}
            <path d="M100 15 Q160 15, 175 70 Q190 125, 150 170 Q110 200, 70 175 Q20 145, 15 90 Q10 40, 60 20 Q80 15, 100 15 Z" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="4" />
            {/* Inner mango shape */}
            <path d="M100 28 Q150 28, 162 75 Q175 120, 140 158 Q108 182, 75 162 Q35 138, 30 90 Q26 50, 68 33 Q84 28, 100 28 Z" fill="hsl(var(--orange))" stroke="hsl(var(--foreground))" strokeWidth="2" />
            {/* Mango stem/leaf */}
            <path d="M95 15 Q85 5, 75 8 Q65 12, 70 20 Q75 15, 85 14 Q90 13, 95 15 Z" fill="hsl(142 76% 36%)" stroke="hsl(var(--foreground))" strokeWidth="2" />
            {/* Small leaf detail */}
            <path d="M72 12 Q60 0, 50 5 Q55 12, 68 15 Z" fill="hsl(142 76% 30%)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          </svg>
          
          {/* Man image - clipped circle container */}
          <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden border-4 border-foreground shadow-bold">
            <img alt="Ahmed Mango" className="w-full h-auto object-cover translate-y-6" src="/lovable-uploads/4f8a2edd-4a1c-4daa-929b-7e6e57e47a2f.png" />
          </div>
        </div>

        {/* TEXT STACKED UNDER THE IMAGE - with plain background for legibility */}
        <div className="flex flex-col items-center text-center bg-orange/95 rounded-2xl px-6 py-4 backdrop-blur-sm">
          <h1 className="font-oi sm:text-3xl leading-none text-foreground tracking-tight mb-2 text-center text-4xl">
            أحمد مانجو
          </h1>
          
          <h2 className="text-base sm:text-lg leading-tight mb-2 font-lalezar">
            <span className="text-orange text-3xl font-black">استكا</span>{" "}
            <span className="text-foreground text-3xl font-black">ولا فستكا؟</span>
          </h2>
        </div>

        {/* BUTTONS SECTION - Feastables style */}
        <div className="flex flex-col justify-center items-center gap-3 mt-4 mb-4 sm:mb-6 w-full">
          <Button onClick={() => window.open('https://www.kharbsh.com/ahmed-mango/campaign/3775071ae46c47f4b41f5688e66406a0', '_blank')} className="h-11 px-6 w-[180px] text-sm font-black rounded-lg text-accent-foreground border-2 border-foreground shadow-bold hover:shadow-bold-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 uppercase tracking-wide bg-[#1a1349]">
            العب واكسب جوائز
          </Button>

          <Button variant="outline" className="h-11 px-6 w-[180px] text-sm font-black rounded-lg bg-background border-2 border-foreground shadow-bold hover:shadow-bold-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 uppercase tracking-wide" onClick={() => scrollToSection("#products")}>
            شوف المراجعات
          </Button>
        </div>

        {/* STATS ROW */}
        
      </div>

      {/* Custom slow spin animation */}
      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

    </section>;
};