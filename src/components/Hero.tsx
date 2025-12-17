import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return <section id="hero" className="relative w-full overflow-hidden font-poppins pt-6 pb-16 sm:pt-10 sm:pb-20">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          alt="" 
          className="w-full h-[120%] object-cover rounded-none" 
          src="/hero-background.png"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
      </div>
      
      {/* Solid color fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 max-w-md mx-auto">
        
        {/* TOP SECTION — CENTERED IMAGE WITH MANGO FRAME */}
        <div className="relative flex items-center justify-center mb-4 sm:mb-6">
          {/* Subtle glow effect behind profile */}
          <div className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-full bg-orange/40 blur-2xl animate-pulse" />
          <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full bg-primary/30 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          {/* Mango-shaped frame */}
          <svg 
            className="absolute w-[220px] h-[220px] sm:w-[270px] sm:h-[270px]" 
            viewBox="0 0 200 200" 
            fill="none"
          >
            {/* Outer mango shape */}
            <path 
              d="M100 10 C150 10, 190 50, 190 100 C190 150, 150 190, 100 190 C50 190, 10 150, 10 100 C10 50, 50 10, 100 10 Z" 
              fill="hsl(var(--primary))" 
              stroke="hsl(var(--foreground))" 
              strokeWidth="4"
              transform="rotate(-20 100 100) scale(1 1.15) translate(0 -12)"
            />
            {/* Inner mango shape */}
            <path 
              d="M100 10 C150 10, 190 50, 190 100 C190 150, 150 190, 100 190 C50 190, 10 150, 10 100 C10 50, 50 10, 100 10 Z" 
              fill="hsl(var(--orange))" 
              stroke="hsl(var(--foreground))" 
              strokeWidth="2"
              transform="rotate(-20 100 100) scale(0.85 0.98) translate(18 2)"
            />
            {/* Mango stem */}
            <ellipse 
              cx="100" 
              cy="8" 
              rx="8" 
              ry="12" 
              fill="hsl(142 76% 36%)"
              stroke="hsl(var(--foreground))"
              strokeWidth="2"
              transform="rotate(-20 100 100) translate(0 -8)"
            />
          </svg>
          
          {/* Man image - clipped circle container */}
          <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden border-4 border-foreground shadow-bold">
            <img alt="Ahmed Mango" className="w-full h-auto object-cover translate-y-6" src="/lovable-uploads/4f8a2edd-4a1c-4daa-929b-7e6e57e47a2f.png" />
          </div>
        </div>

        {/* TEXT STACKED UNDER THE IMAGE */}
        <div className="flex flex-col items-center text-center">
          <h1 className="font-oi sm:text-3xl leading-none text-foreground tracking-tight mb-2 text-center text-4xl">
            أحمد مانجو
          </h1>
          
          <h2 className="text-base sm:text-lg leading-tight mb-2 font-lalezar">
            <span className="text-orange text-3xl font-black">استكا</span>{" "}
            <span className="text-foreground text-3xl font-black">ولا فستكا؟</span>
          </h2>
          
          {/* Rating Rules */}
          <div className="text-xs sm:text-sm font-medium text-foreground space-y-1">
          </div>
        </div>

        {/* BUTTONS SECTION - Feastables style */}
        <div className="flex flex-col justify-center items-center gap-3 mt-4 mb-4 sm:mb-6 w-full">
          <Button onClick={() => scrollToSection("#game")} className="h-11 px-6 w-[180px] text-sm font-black rounded-lg text-accent-foreground border-2 border-foreground shadow-bold hover:shadow-bold-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 uppercase tracking-wide bg-[#1a1349]">
            العب واكسب جوائز
          </Button>

          <Button variant="outline" className="h-11 px-6 w-[180px] text-sm font-black rounded-lg bg-background border-2 border-foreground shadow-bold hover:shadow-bold-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 uppercase tracking-wide" onClick={() => scrollToSection("#products")}>
            شوف المراجعات
          </Button>
        </div>

        {/* STATS ROW */}
        
      </div>

    </section>;
};
