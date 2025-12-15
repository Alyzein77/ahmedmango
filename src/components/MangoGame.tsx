import { Button } from "@/components/ui/button";
import { Trophy, Gift, Zap, Star } from "lucide-react";
export const MangoGame = () => {
  return <section id="game" className="relative py-12 sm:py-20 px-3 sm:px-4 overflow-hidden">
      {/* Orange pop-art background */}
      <div className="absolute inset-0 bg-cover bg-bottom sm:bg-center bg-no-repeat" style={{
      backgroundImage: "url('/images/game-bg.png')"
    }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content - Always first on mobile */}
          <div className="text-center lg:text-right order-1">
            {/* Game header image - visible on mobile */}
            <div className="mb-4 sm:mb-6 lg:hidden">
              
            </div>
            
            
            
            <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 lg:mr-0">
              ساعد القرد الجعان يمسك المنجا… اللعبة بسيطة بس صدقني مش سهلة.
              حرّك يمين وشمال، امسك المنجا النازلة، وخلي بالك ما توقعهاش! 🥭
            </p>

            {/* Features - 2x2 grid */}
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
            }].map((feature, idx) => <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-white font-medium text-xs sm:text-sm">{feature.text}</span>
                </div>)}
            </div>

            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-xl font-black px-8 sm:px-10 py-6 sm:py-7 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-glow" onClick={() => window.open('https://mango.risca.dev/ar', '_blank')}>
              يلا نلعب 🥭
            </Button>
            
            {/* Secondary Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full font-bold px-6 py-3" onClick={() => window.open('https://mango.risca.dev/ar/leaderboard', '_blank')}>
                <Trophy className="w-4 h-4 ml-2" />
                المتصدرين
              </Button>
            </div>
          </div>

          {/* Right Side - Game Header Image */}
          <div className="order-2 w-full hidden lg:flex justify-center">
            <div className="relative">
              <img src="/lovable-uploads/game-header.png" alt="العب واكسب مع أحمد مانجو" className="w-full max-w-md rounded-2xl shadow-2xl animate-float" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};