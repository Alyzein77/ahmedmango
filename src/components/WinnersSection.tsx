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
    <section id="winners" className="py-20 px-4 bg-sky">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4 flex-wrap justify-center">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide font-lalezar">
              <span className="text-foreground">الفائزين الأخيرين 🏆</span>
            </h2>
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 px-4 font-bold">
            ممكن تكون انت الفائز الجاي!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {winners.map((winner, idx) => (
            <Card 
              key={idx}
              className="relative p-6 text-center hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer bg-background"
            >
              {idx === 0 && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-foreground font-black px-4 py-1 border-2 border-foreground shadow-bold-sm uppercase">
                  🥇 الفائز الأول
                </Badge>
              )}
              
              <div className="text-6xl mb-4">{winner.avatar}</div>
              
              <h3 className="text-xl font-black mb-2 text-foreground uppercase">
                {winner.name}
              </h3>
              
              <div className="text-2xl mb-3 font-black">
                {winner.prize}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="secondary" className="font-black border-2 border-foreground">
                  {winner.points}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground font-medium">
                {winner.date}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center p-6 sm:p-8 bg-accent rounded-xl border-4 border-foreground shadow-bold">
          <p className="text-xl sm:text-2xl font-black mb-2 text-accent-foreground uppercase tracking-wide">
            🎯 السحب القادم خلال 3 أيام!
          </p>
          <p className="text-base sm:text-lg text-accent-foreground/80 px-4 font-bold">
            اكسب نقاط أكتر عشان تزود فرصك في الفوز
          </p>
        </div>
      </div>
    </section>
  );
};
