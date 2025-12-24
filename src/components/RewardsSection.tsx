import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import rewardsGame from "@/assets/rewards-game.png";
import { Gift, Trophy, Star, Zap } from "lucide-react";
export const RewardsSection = () => {
  return <section id="rewards" className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-xs sm:text-sm font-black uppercase border-2 border-foreground shadow-bold-sm">
              🎁 جديد!
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-primary uppercase tracking-wide font-lalezar">
            العب واكسب جوائز! 🎮
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 max-w-2xl mx-auto px-4 font-bold">
            شارك، تفاعل، واكسب نقاط لجوائز حقيقية كل أسبوع
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Image */}
          <div className="relative order-2 md:order-2">
            <div className="rounded-xl border-4 border-foreground shadow-bold-lg overflow-hidden bg-background">
              <img alt="Rewards Game" className="w-full h-auto" src="/lovable-uploads/de1bfc73-4d03-4bdd-8144-0c7153fec776.png" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 md:space-y-6 order-1 md:order-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-primary uppercase tracking-wide font-lalezar">
              طريقة اللعبة سهلة! 🎯
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 bg-background rounded-xl border-2 border-foreground shadow-bold hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                <div className="w-12 h-12 bg-primary rounded-lg border-2 border-foreground flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-foreground" fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-1 uppercase">شاهد الفيديوهات 📱</h4>
                  <p className="text-foreground/70 font-bold">كل فيديو تشوفه يكسبك نقاط</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-background rounded-xl border-2 border-foreground shadow-bold hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                <div className="w-12 h-12 bg-accent rounded-lg border-2 border-foreground flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-accent-foreground" fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-1 uppercase">تفاعل وعلق 💬</h4>
                  <p className="text-foreground/70 font-bold">كومنتاتك وشيراتك تزود نقاطك</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-background rounded-xl border-2 border-foreground shadow-bold hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                <div className="w-12 h-12 bg-orange rounded-lg border-2 border-foreground flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-1 uppercase">اسحب واكسب 🎁</h4>
                  <p className="text-foreground/70 font-bold">جوائز كل أسبوع للفائزين</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              variant="accent"
              className="w-full text-base sm:text-lg md:text-xl font-black uppercase tracking-wide rounded-lg py-6"
              onClick={() => window.open('https://www.kharbsh.com/ahmed-mango/campaign/3775071ae46c47f4b41f5688e66406a0', '_blank')}
            >
              🚀 ابدأ اللعب دلوقتي
            </Button>
          </div>
        </div>

        {/* Prize Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[{
          icon: "🎁",
          title: "منتجات مجانية",
          color: "bg-primary"
        }, {
          icon: "💰",
          title: "كاش برايز",
          color: "bg-accent"
        }, {
          icon: "🎟️",
          title: "كوبونات خصم",
          color: "bg-sky"
        }, {
          icon: "⭐",
          title: "جوائز مفاجأة",
          color: "bg-orange"
        }].map((prize, idx) => <Card key={idx} className={`p-6 text-center hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer ${prize.color}`}>
              <div className="text-4xl mb-2">{prize.icon}</div>
              <p className="font-black text-sm uppercase tracking-wide text-foreground">{prize.title}</p>
            </Card>)}
        </div>
      </div>
    </section>;
};
