import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import rewardsGame from "@/assets/rewards-game.png";
import { Gift, Trophy, Star, Zap } from "lucide-react";

export const RewardsSection = () => {
  return (
    <section id="rewards" className="py-20 px-4 bg-gradient-to-b from-primary/5 via-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold animate-pulse-glow">
              🎁 جديد!
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-primary via-orange-500 to-destructive bg-clip-text text-transparent">
              العب واكسب جوائز! 🎮
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            شارك، تفاعل، واكسب نقاط لجوائز حقيقية كل أسبوع
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Image */}
          <div className="relative animate-bounce-in order-2 md:order-1">
            <img 
              src={rewardsGame} 
              alt="Rewards Game" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-orange-500/10 blur-2xl -z-10 rounded-2xl"></div>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-slide-up order-1 md:order-2">
            <h3 className="text-2xl md:text-3xl font-black text-secondary">
              طريقة اللعبة سهلة! 🎯
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 bg-card rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-primary-foreground" fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">شاهد الفيديوهات 📱</h4>
                  <p className="text-muted-foreground">كل فيديو تشوفه يكسبك نقاط</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-card rounded-xl border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">تفاعل وعلق 💬</h4>
                  <p className="text-muted-foreground">كومنتاتك وشيراتك تزود نقاطك</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-card rounded-xl border-2 border-destructive/20 hover:border-destructive/50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">اسحب واكسب 🎁</h4>
                  <p className="text-muted-foreground">جوائز كل أسبوع للفائزين</p>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full text-xl font-black bg-gradient-to-r from-primary via-orange-500 to-primary hover:scale-105 transition-transform shadow-xl rounded-full py-6"
            >
              🚀 ابدأ اللعب دلوقتي
            </Button>
          </div>
        </div>

        {/* Prize Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: "🎁", title: "منتجات مجانية", color: "primary" },
            { icon: "💰", title: "كاش برايز", color: "accent" },
            { icon: "🎟️", title: "كوبونات خصم", color: "destructive" },
            { icon: "⭐", title: "جوائز مفاجأة", color: "primary" }
          ].map((prize, idx) => (
            <Card 
              key={idx}
              className="p-6 text-center hover:scale-105 transition-transform cursor-pointer animate-bounce-in bg-card/50 backdrop-blur"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-2">{prize.icon}</div>
              <p className="font-bold text-sm">{prize.title}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
