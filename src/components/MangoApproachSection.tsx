import { Card } from "@/components/ui/card";
import { Smile, ThumbsDown, PartyPopper } from "lucide-react";

export const MangoApproachSection = () => {
  const approaches = [
    {
      icon: Smile,
      title: "ردود فعل حقيقية",
      description: "شوف ردة فعلي الطبيعية وأنا بجرب المنتج لأول مرة",
      emoji: "😋"
    },
    {
      icon: ThumbsDown,
      title: "مافيش كذب مدفوع",
      description: "كل مراجعاتي صادقة 100% بدون أي دعاية مدفوعة",
      emoji: "🚫"
    },
    {
      icon: PartyPopper,
      title: "محتوى ممتع",
      description: "فيديوهات مسلية وخفيفة تخليك تضحك وتستفيد",
      emoji: "🎉"
    }
  ];

  return (
    <section className="py-24 px-4 bg-secondary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-20 text-9xl">🥭</div>
        <div className="absolute bottom-20 right-20 text-9xl">✨</div>
        <div className="absolute top-1/2 left-10 text-6xl">⭐</div>
        <div className="absolute top-1/3 right-32 text-7xl">😋</div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-primary">
            طريقة مانجو في المراجعات 🥭
          </h2>
          <p className="text-xl md:text-2xl text-secondary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            مش زي أي حد تاني - المراجعات عندي مختلفة وصادقة وممتعة!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {approaches.map((approach, idx) => (
            <Card 
              key={idx}
              className="p-8 text-center hover:scale-105 transition-all duration-300 animate-bounce-in bg-secondary-foreground/5 backdrop-blur-sm border-2 border-primary/30 hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                <approach.icon className="w-12 h-12 text-secondary" strokeWidth={2.5} />
              </div>
              
              <div className="text-5xl mb-4">{approach.emoji}</div>
              
              <h3 className="text-2xl font-black mb-4 text-primary">
                {approach.title}
              </h3>
              
              <p className="text-lg text-secondary-foreground/80 leading-relaxed">
                {approach.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-primary rounded-full">
            <p className="text-2xl md:text-3xl font-black text-secondary">
              ✨ أكتر من 500 ألف متابع بيثقوا في رأيي ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
