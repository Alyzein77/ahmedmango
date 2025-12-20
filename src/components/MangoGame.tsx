import { Button } from "@/components/ui/button";
import { Trophy, Gift, Zap, Star } from "lucide-react";
import { useMixpanel } from "@/hooks/useMixpanel";
import { useTrackSection } from "@/hooks/useTrackSection";

export const MangoGame = () => {
  const { trackGamePlay, trackButtonClick } = useMixpanel();
  const sectionRef = useTrackSection('Game Section');

  const handlePlayGame = () => {
    trackGamePlay('start');
    trackButtonClick('Play Game', 'Game Section');
    window.open('https://mango.risca.dev/ar', '_blank');
  };

  const handleLeaderboard = () => {
    trackButtonClick('View Leaderboard', 'Game Section');
    window.open('https://mango.risca.dev/ar/leaderboard', '_blank');
  };
  return <section ref={sectionRef as React.RefObject<HTMLElement>} id="game" className="relative py-12 sm:py-20 px-3 sm:px-4 overflow-hidden">
      {/* Orange pop-art rays background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'url(/images/game-rays-bg.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'hsl(25, 95%, 53%)'
        }}
      />
      
      {/* Center vignette overlay for readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsla(30, 100%, 60%, 0.2) 0%, hsla(25, 95%, 40%, 0.4) 100%)'
        }}
      />
      
      {/* Top fade overlay - blend with yellow section above */}
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent z-[1] pointer-events-none" />
      
      {/* Bottom fade overlay - blend with orange section below */}
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-gradient-to-t from-orange/70 via-orange/30 to-transparent z-[1] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content - Always first on mobile */}
          <div className="text-center lg:text-right order-1">
            {/* Game header image - visible on mobile with bold outlines */}
            <div className="mb-4 sm:mb-6 lg:hidden">
              <div 
                className="relative w-full max-w-xs mx-auto rounded-2xl p-[3px]"
                style={{
                  background: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(30, 100%, 50%))',
                  boxShadow: '0 20px 50px -10px hsla(260, 60%, 20%, 0.5), 0 10px 30px -5px hsla(260, 60%, 30%, 0.3)'
                }}
              >
                <div 
                  className="rounded-[14px] p-[8px]"
                  style={{
                    background: 'hsl(260, 50%, 25%)'
                  }}
                >
                  <img 
                    alt="العب واكسب مع أحمد مانجو" 
                    className="w-full rounded-lg" 
                    src="/lovable-uploads/play-and-win-header.png" 
                  />
                </div>
              </div>
            </div>
            
            {/* Paragraph with backplate */}
            <div className="mb-6 sm:mb-8 max-w-[90%] mx-auto lg:mx-0 lg:mr-0 lg:max-w-lg">
              <div 
                className="backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-5 sm:py-4"
                style={{
                  background: 'hsla(260, 50%, 20%, 0.3)'
                }}
              >
                <p 
                  className="text-sm sm:text-lg md:text-xl text-white leading-relaxed"
                  style={{
                    textShadow: '0 2px 8px hsla(0, 0%, 0%, 0.5), 0 1px 3px hsla(0, 0%, 0%, 0.3)'
                  }}
                >
                  ساعد القرد الجعان يمسك المنجا… اللعبة بسيطة بس صدقني مش سهلة.
                  حرّك يمين وشمال، امسك المنجا النازلة، وخلي بالك ما توقعهاش! 🥭
                </p>
              </div>
            </div>

            {/* Features - 2x2 grid with improved contrast */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 lg:mr-0">
              {[{
              icon: Zap,
              text: "اللعبة بتسرّع"
            }, {
              icon: Trophy,
              text: "سجّل رقمك القياسي"
            }, {
              icon: Gift,
              text: "كل منجاية 10 نقاط"
            }, {
              icon: Star,
              text: "دخول سريع"
            }].map((feature, idx) => <div 
                key={idx} 
                className="flex items-center gap-2 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-[hsla(260,50%,25%,0.5)]"
                style={{
                  background: 'hsla(260, 50%, 15%, 0.25)'
                }}
              >
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" style={{ filter: 'drop-shadow(0 0 4px hsla(45, 100%, 50%, 0.5))' }} />
                  <span 
                    className="text-white font-medium text-xs sm:text-sm"
                    style={{ textShadow: '0 1px 3px hsla(0, 0%, 0%, 0.4)' }}
                  >
                    {feature.text}
                  </span>
                </div>)}
            </div>

            {/* Primary CTA Button - Stats card style */}
            <button 
              onClick={handlePlayGame}
              className="group w-full sm:w-auto bg-white hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 rounded-2xl border-[3px] border-foreground flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-4"
              style={{
                boxShadow: '8px 8px 0px hsl(260, 50%, 15%)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '10px 10px 0px hsl(260, 50%, 15%)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 0px hsl(260, 50%, 15%)'}
            >
              {/* Icon badge - Yellow for primary */}
              <div 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary border-[2px] border-foreground flex items-center justify-center flex-shrink-0"
                style={{
                  boxShadow: '4px 4px 0px hsl(260, 50%, 15%)'
                }}
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </div>
              <span className="text-foreground font-black text-lg sm:text-xl">
                يلا نلعب 🥭
              </span>
            </button>
            
            {/* Secondary Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
              <button 
                onClick={handleLeaderboard}
                className="group bg-white hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 rounded-2xl border-[3px] border-foreground flex items-center justify-center gap-3 px-5 sm:px-6 py-3 sm:py-4"
                style={{
                  boxShadow: '8px 8px 0px hsl(260, 50%, 15%)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '10px 10px 0px hsl(260, 50%, 15%)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '8px 8px 0px hsl(260, 50%, 15%)'}
              >
                {/* Icon badge - Cyan/light blue for secondary */}
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border-[2px] border-foreground flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'hsl(185, 80%, 65%)',
                    boxShadow: '4px 4px 0px hsl(260, 50%, 15%)'
                  }}
                >
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <span className="text-foreground font-black text-lg sm:text-xl">
                  المتصدرين
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - Game Header Image with bold outlines */}
          <div className="order-2 w-full hidden lg:flex justify-center">
            <div 
              className="relative rounded-2xl p-[3px] animate-float"
              style={{
                background: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(30, 100%, 50%))',
                boxShadow: '0 25px 60px -15px hsla(260, 60%, 20%, 0.5), 0 15px 40px -10px hsla(260, 60%, 30%, 0.3)'
              }}
            >
              <div 
                className="rounded-[14px] p-[10px]"
                style={{
                  background: 'hsl(260, 50%, 25%)'
                }}
              >
                <img 
                  src="/lovable-uploads/play-and-win-header.png" 
                  alt="العب واكسب مع أحمد مانجو" 
                  className="w-full max-w-md rounded-xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};