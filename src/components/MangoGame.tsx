import { Button } from "@/components/ui/button";
import { Trophy, Gift, Zap, Star } from "lucide-react";
import mangoIcon from "@/assets/mango-icon.png";
import { useMixpanel } from "@/hooks/useMixpanel";
import { useTrackSection } from "@/hooks/useTrackSection";

export const MangoGame = () => {
  const { trackGamePlay, trackCTAClick } = useMixpanel();
  const sectionRef = useTrackSection('Game Section');

  const handlePlayGame = () => {
    trackGamePlay('start');
    trackCTAClick('يلا نلعب', 'kharbsh_game', 'game_section');
    window.open('https://www.kharbsh.com/ahmed-mango/campaign/3775071ae46c47f4b41f5688e66406a0', '_blank');
  };

  const handleLeaderboard = () => {
    trackGamePlay('leaderboard');
    trackCTAClick('المتصدرين', 'kharbsh_leaderboard', 'game_section');
    window.open('https://www.kharbsh.com/ahmed-mango/campaign/3775071ae46c47f4b41f5688e66406a0', '_blank');
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
                  className="rounded-[14px]"
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
                  ساعد أحمد مانجو يأكل المانجو… اللعبة بسيطة بس صدقني مش سهلة.
                  حرّك يمين وشمال، امسك المانجو النازلة، وخلي بالك ما توقعهاش!
                  <img src={mangoIcon} alt="مانجو" className="inline-block w-6 h-6 align-middle" />
                </p>
              </div>
            </div>

            {/* INFO CARDS (NOT BUTTONS) — flat icons, no colored badges */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 lg:mr-0">
              {[{
                icon: Trophy,
                text: "سجّل رقمك القياسي"
              }, {
                icon: Zap,
                text: "اللعبة بتسرّع"
              }, {
                icon: Star,
                text: "دخول سريع"
              }, {
                icon: Gift,
                text: "كل مانجو 10 نقاط"
              }].map((feature, idx) => (
                <div 
                  key={idx} 
                  className="pointer-events-none select-none cursor-default flex items-center justify-between gap-3 rounded-2xl px-3 py-3 sm:px-4 sm:py-3 border-2 opacity-95"
                  style={{
                    background: '#FFFFFF',
                    borderColor: '#2D1B4F',
                    boxShadow: '0 2px 0 rgba(45,27,79,0.18)'
                  }}
                  aria-hidden="true"
                >
                  <span className="font-semibold text-xs sm:text-base leading-tight" style={{ color: '#2D1B4F' }}>
                    {feature.text}
                  </span>
                  {/* Icon: FLAT (no colored badge), smaller */}
                  <div className="text-xl opacity-70" style={{ color: '#2D1B4F' }}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA BUTTONS (ONLY clickable items) - pill shape with colored badges */}
            <div className="space-y-4">
              {/* Primary CTA Button */}
              <button 
                onClick={handlePlayGame}
                className="group w-full rounded-full border-4 px-5 py-4 flex items-center justify-center gap-3 font-extrabold text-lg transition hover:-translate-y-0.5 active:translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#FFD34D]/50"
                style={{
                  background: '#FFD34D',
                  borderColor: '#2D1B4F',
                  color: '#2D1B4F',
                  boxShadow: '0 8px 0 #2D1B4F'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 0 #2D1B4F'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 0 #2D1B4F'}
                onMouseDown={(e) => e.currentTarget.style.boxShadow = '0 2px 0 #2D1B4F'}
                onMouseUp={(e) => e.currentTarget.style.boxShadow = '0 8px 0 #2D1B4F'}
              >
                {/* Icon in white badge */}
                <span 
                  className="grid place-items-center w-11 h-11 rounded-2xl border-4 transition group-active:translate-y-0.5"
                  style={{
                    background: 'white',
                    borderColor: '#2D1B4F',
                    boxShadow: '0 4px 0 #2D1B4F'
                  }}
                >
                  <Zap className="w-6 h-6" style={{ color: '#2D1B4F' }} />
                </span>
                <span className="leading-none">يلا نلعب</span>
              </button>

              {/* Secondary CTA Button */}
              <button 
                onClick={handleLeaderboard}
                className="group w-full rounded-full border-4 px-5 py-4 flex items-center justify-center gap-3 font-extrabold text-lg transition hover:-translate-y-0.5 active:translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#FFD34D]/50"
                style={{
                  background: 'white',
                  borderColor: '#2D1B4F',
                  color: '#2D1B4F',
                  boxShadow: '0 8px 0 #2D1B4F'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 0 #2D1B4F'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 0 #2D1B4F'}
                onMouseDown={(e) => e.currentTarget.style.boxShadow = '0 2px 0 #2D1B4F'}
                onMouseUp={(e) => e.currentTarget.style.boxShadow = '0 8px 0 #2D1B4F'}
              >
                {/* Icon in yellow badge */}
                <span 
                  className="grid place-items-center w-11 h-11 rounded-2xl border-4 transition group-active:translate-y-0.5"
                  style={{
                    background: '#FFD34D',
                    borderColor: '#2D1B4F',
                    boxShadow: '0 4px 0 #2D1B4F'
                  }}
                >
                  <Trophy className="w-6 h-6" style={{ color: '#2D1B4F' }} />
                </span>
                <span className="leading-none">المتصدرين</span>
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