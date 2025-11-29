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
    <section id="game" className="relative py-20 px-4 overflow-hidden">
      {/* Energetic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/90 to-primary" />
      
      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-pink/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 right-[20%] w-8 h-8 bg-primary/40 rounded-full animate-float" />
        <div className="absolute bottom-32 left-[15%] w-6 h-6 bg-pink/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-[10%] w-4 h-4 bg-sky/60 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            {/* Fun mango character */}
            <div className="lg:hidden text-8xl mb-6 animate-bounce-in">🥭</div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              العب واكسب مع مانجو 🎮
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 lg:mr-0">
              جمّع النقاط من خلال الإجابة على أسئلة السناكس واكسب جوائز حقيقية! 
              كل يوم أسئلة جديدة وفرص ربح أكتر 🎁
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto lg:mx-0 lg:mr-0">
              {[
                { icon: Zap, text: "أسئلة يومية" },
                { icon: Trophy, text: "جوائز حقيقية" },
                { icon: Gift, text: "هدايا مفاجئة" },
                { icon: Star, text: "نقاط متراكمة" },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-white font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-black px-10 py-7 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              ابدأ اللعب الآن 🚀
            </Button>
          </div>

          {/* Right Side - Mango Character + Stats */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Big Mango Character */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="text-[150px] animate-float">🥭</div>
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-3 py-1 font-bold text-sm animate-bounce">
                  العب!
                </div>
              </div>
            </div>

            {/* Leaderboard Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-5">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                المتصدرين
              </h3>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank}
                    className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        player.rank === 1 ? 'bg-primary' : 
                        player.rank === 2 ? 'bg-sky' : 'bg-orange'
                      }`}>
                        <player.icon className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-white font-medium">{player.name}</span>
                    </div>
                    <span className="text-primary font-bold">{player.points.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Latest Winners */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-5">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-pink" />
                آخر الفائزين
              </h3>
              <div className="space-y-3">
                {latestWinners.map((winner, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{winner.avatar}</span>
                      <span className="text-white font-medium">{winner.name}</span>
                    </div>
                    <span className="text-pink text-sm font-bold">{winner.prize}</span>
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
