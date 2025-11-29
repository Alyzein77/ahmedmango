import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Gift, Zap, Crown, Medal } from "lucide-react";

const latestWinners = [
  { name: "محمد أحمد", prize: "كارت أمازون 100$", avatar: "🏆" },
  { name: "سارة محمود", prize: "آيفون 15 برو", avatar: "🎉" },
  { name: "أحمد علي", prize: "بلايستيشن 5", avatar: "🎮" },
];

const leaderboard = [
  { rank: 1, name: "يوسف_مانجو", points: 15420, icon: Crown },
  { rank: 2, name: "نورهان_قمر", points: 12850, icon: Medal },
  { rank: 3, name: "عمرو_فاستكا", points: 11200, icon: Star },
];

export const MangoGame = () => {
  return (
    <section id="game" className="relative py-12 sm:py-20 px-3 sm:px-4 overflow-hidden">
      {/* Energetic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/90 to-primary" />
      
      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 sm:w-40 h-24 sm:h-40 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 sm:w-60 h-32 sm:h-60 bg-pink/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-20 sm:w-32 h-20 sm:h-32 bg-secondary/20 rounded-full blur-2xl" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 right-[20%] w-6 sm:w-8 h-6 sm:h-8 bg-primary/40 rounded-full animate-float" />
        <div className="absolute bottom-32 left-[15%] w-4 sm:w-6 h-4 sm:h-6 bg-pink/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-[10%] w-3 sm:w-4 h-3 sm:h-4 bg-sky/60 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content - Always first on mobile */}
          <div className="text-center lg:text-right order-1">
            {/* Game header image - visible on mobile */}
            <div className="mb-4 sm:mb-6 lg:hidden">
              <img 
                src="/lovable-uploads/game-header.png" 
                alt="العب واكسب مع أحمد مانجو" 
                className="w-full max-w-xs mx-auto rounded-2xl shadow-xl"
              />
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              العب واكسب مع مانجو 🎮
            </h2>
            
            <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 lg:mr-0">
              جمّع النقاط من خلال الإجابة على أسئلة السناكس واكسب جوائز حقيقية! 
              كل يوم أسئلة جديدة وفرص ربح أكتر 🎁
            </p>

            {/* Features - 2x2 grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 lg:mr-0">
              {[
                { icon: Zap, text: "أسئلة يومية" },
                { icon: Trophy, text: "جوائز حقيقية" },
                { icon: Gift, text: "هدايا مفاجئة" },
                { icon: Star, text: "نقاط متراكمة" },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3"
                >
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-white font-medium text-xs sm:text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-xl font-black px-8 sm:px-10 py-6 sm:py-7 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-glow"
            >
              ابدأ اللعب الآن 🚀
            </Button>
          </div>

          {/* Right Side - Mango Character + Stats */}
          <div className="order-2 space-y-4 sm:space-y-6 w-full">
            {/* Big Game Header - Desktop only */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/game-header.png" 
                  alt="العب واكسب مع أحمد مانجو" 
                  className="w-full max-w-md rounded-2xl shadow-2xl animate-float"
                />
              </div>
            </div>

            {/* Leaderboard Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-5">
              <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                المتصدرين
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank}
                    className="flex items-center justify-between bg-white/10 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        player.rank === 1 ? 'bg-primary' : 
                        player.rank === 2 ? 'bg-sky' : 'bg-orange'
                      }`}>
                        <player.icon className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
                      </div>
                      <span className="text-white font-medium text-xs sm:text-base">{player.name}</span>
                    </div>
                    <span className="text-primary font-bold text-xs sm:text-base">{player.points.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Latest Winners */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-5">
              <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-pink" />
                آخر الفائزين
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {latestWinners.map((winner, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between bg-white/10 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">{winner.avatar}</span>
                      <span className="text-white font-medium text-xs sm:text-base">{winner.name}</span>
                    </div>
                    <span className="text-pink text-[10px] sm:text-sm font-bold">{winner.prize}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
