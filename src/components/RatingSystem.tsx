import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export const RatingSystem = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-secondary">نظام التقييم 🎯</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            كل منتج بجربه بيتقيم بطريقة واحدة بسيطة وصادقة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 2استكا - Good */}
          <Card className="p-8 text-center hover:scale-105 transition-transform bg-gradient-to-br from-accent/10 to-background border-2 border-accent/30 hover:border-accent cursor-pointer group animate-slide-up">
            <div className="w-24 h-24 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
              <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
            
            <h3 className="text-3xl font-black mb-3 text-accent">
              2استكا ✅
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              المنتج ممتاز! طعمه حلو، سعره مناسب، وجودته عالية. ده اللي يستاهل فلوسك 🔥
            </p>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold">طعم حلو 😋</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold">سعر كويس 💰</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold">جودة عالية ⭐</span>
            </div>
          </Card>

          {/* فاستكا - Bad */}
          <Card className="p-8 text-center hover:scale-105 transition-transform bg-gradient-to-br from-destructive/10 to-background border-2 border-destructive/30 hover:border-destructive cursor-pointer group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-24 h-24 mx-auto mb-6 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
              <XCircle className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
            
            <h3 className="text-3xl font-black mb-3 text-destructive">
              فاستكا ❌
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              المنتج سيء! طعمه وحش، مش يستاهل السعر، وجودته ضعيفة. متضيعش فلوسك عليه 🚫
            </p>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm font-bold">طعم وحش 🤢</span>
              <span className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm font-bold">سعر غالي 💸</span>
              <span className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm font-bold">جودة ضعيفة 👎</span>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span className="font-bold text-foreground">100% صادق</span> - مش بعمل إعلانات مدفوعة، كل مراجعاتي حقيقية وصادقة من تجربتي الشخصية 🎯
          </p>
        </div>
      </div>
    </section>
  );
};
