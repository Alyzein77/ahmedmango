import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

export const WinnersSection = () => {
  const winners = [
    {
      name: "محمد أحمد",
      prize: "🎁 منتجات بـ 500 جنيه",
      points: "2,500 نقطة",
      avatar: "🧔",
      date: "الأسبوع الماضي"
    },
    {
      name: "سارة محمود",
      prize: "💰 كاش 300 جنيه",
      points: "2,200 نقطة",
      avatar: "👩",
      date: "الأسبوع الماضي"
    },
    {
      name: "أحمد علي",
      prize: "🎟️ كوبونات خصم",
      points: "1,800 نقطة",
      avatar: "👨",
      date: "قبل أسبوعين"
    }
  ];

  return (
    <section id="winners" className="py-12 sm:py-16 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4 flex-wrap justify-center">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-wiggle" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
              <span className="text-secondary">الفائزين الأخيرين 🏆</span>
            </h2>
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-wiggle" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            ممكن تكون انت الفائز الجاي!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {winners.map((winner, idx) => (
            <Card 
              key={idx}
              className="p-6 text-center hover:scale-105 transition-transform cursor-pointer animate-slide-up bg-gradient-to-br from-primary/5 to-background border-2 hover:border-primary/50"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {idx === 0 && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-bold px-4 py-1 shadow-lg">
                  🥇 الفائز الأول
                </Badge>
              )}
              
              <div className="text-6xl mb-4">{winner.avatar}</div>
              
              <h3 className="text-xl font-black mb-2 text-secondary">
                {winner.name}
              </h3>
              
              <div className="text-2xl mb-3 font-bold">
                {winner.prize}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="secondary" className="font-bold">
                  {winner.points}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {winner.date}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center p-6 sm:p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl border-2 border-primary/20">
          <p className="text-xl sm:text-2xl font-black mb-2 text-secondary">
            🎯 السحب القادم خلال 3 أيام!
          </p>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            اكسب نقاط أكتر عشان تزود فرصك في الفوز
          </p>
        </div>
      </div>
    </section>
  );
};
