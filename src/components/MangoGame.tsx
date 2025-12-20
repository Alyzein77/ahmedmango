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
            
            {/* Paragraph sticker card */}
            <div className="mb-6 sm:mb-8 max-w-[90%] mx-auto lg:mx-0 lg:mr-0 lg:max-w-lg relative">
              <div 
                className="relative rounded-[20px] px-4 py-3 sm:px-5 sm:py-4 border-[3px] overflow-hidden"
                style={{
                  background: '#FFE08A',
                  borderColor: '#1A1A2A',
                  boxShadow: '8px 8px 0px #1A1A2A'
                }}
              >
                {/* Halftone texture overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.07]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #1A1A2A 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                  }}
                />
                <p className="text-sm sm:text-lg md:text-xl leading-relaxed font-bold relative z-10" style={{ color: '#1A1A2A' }}>
                  ساعد القرد الجعان يمسك المنجا… اللعبة بسيطة بس صدقني مش سهلة.
                  حرّك يمين وشمال، امسك المنجا النازلة، وخلي بالك ما توقعهاش! 🥭
                </p>
              </div>
            </div>

            {/* Features - 2x2 grid as mini stickers */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 lg:mr-0 relative">
              {/* Subtle comic sparkles decoration */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 5 L31 10 L30 15 L29 10 Z M30 45 L31 50 L30 55 L29 50 Z M5 30 L10 29 L15 30 L10 31 Z M45 30 L50 29 L55 30 L50 31 Z' fill='%231A1A2A'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }} />
              
              {[{
                icon: Zap,
                text: "اللعبة بتسرّع",
                badgeColor: '#FFD44D'
              }, {
                icon: Trophy,
                text: "سجّل رقمك القياسي",
                badgeColor: '#E848A6'
              }, {
                icon: Gift,
                text: "كل منجاية 10 نقاط",
                badgeColor: '#61D6F2'
              }, {
                icon: Star,
                text: "دخول سريع",
                badgeColor: '#FF9A3D'
              }].map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 sm:gap-3 rounded-[16px] px-3 py-3 sm:px-4 sm:py-4 border-[3px]"
                  style={{
                    background: '#FFFFFF',
                    borderColor: '#1A1A2A',
                    boxShadow: '6px 6px 0px #1A1A2A'
                  }}
                >
                  {/* Icon badge */}
                  <div 
                    className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-lg border-[2px] flex items-center justify-center flex-shrink-0"
                    style={{
                      background: feature.badgeColor,
                      borderColor: '#1A1A2A',
                      boxShadow: '3px 3px 0px #1A1A2A'
                    }}
                  >
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#1A1A2A' }} />
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm" style={{ color: '#1A1A2A' }}>
                    {feature.text}
                  </span>
                </div>
              ))}
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