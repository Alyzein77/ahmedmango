import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
export const RatingSystem = () => {
  return <section id="rating" className="py-20 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-wide font-lalezar">
            <span className="text-foreground">نظام التقييم 🎯</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 font-bold">
            كل منتج بجربه بيتقيم بطريقة واحدة بسيطة وصادقة
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {/* 2استكا - Good */}
          <Card className="p-3 sm:p-5 text-center hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer group bg-primary border-4 border-foreground">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 rounded-lg flex items-center justify-center bg-secondary border-2 border-foreground">
              <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 text-primary" strokeWidth={3} />
            </div>
            
            <h3 className="text-lg sm:text-2xl font-black mb-2 text-foreground uppercase">2استكا</h3>
            
            <p className="text-xs sm:text-sm leading-relaxed font-bold text-foreground">
              المنتج ممتاز! طعمه حلو، سعره مناسب، وجودته عالية 🔥
            </p>

            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
              <span className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black bg-background border-2 border-foreground text-foreground">طعم حلو 😋</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black bg-background border-2 border-foreground text-foreground">سعر كويس 💰</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black bg-background border-2 border-foreground text-foreground">جودة عالية ⭐</span>
            </div>
          </Card>

          {/* فاستكا - Bad */}
          <Card className="p-3 sm:p-5 text-center hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer group bg-secondary border-4 border-foreground">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 bg-destructive rounded-lg flex items-center justify-center border-2 border-foreground">
              <XCircle className="w-7 h-7 sm:w-9 sm:h-9 text-destructive-foreground" strokeWidth={3} />
            </div>
            
            <h3 className="text-lg sm:text-2xl font-black mb-2 text-secondary-foreground uppercase">فاستكا</h3>
            
            <p className="text-xs sm:text-sm leading-relaxed text-secondary-foreground/80 font-bold">
              المنتج سيء! طعمه وحش، مش يستاهل السعر، وجودته ضعيفة 🚫
            </p>

            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
              <span className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black bg-background border-2 border-foreground text-foreground">طعم وحش 🤢</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black bg-background border-2 border-foreground text-foreground">سعر غالي 💸</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-black bg-background border-2 border-foreground text-foreground">جودة ضعيفة 👎</span>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 md:mt-12 text-center px-4">
          <div className="inline-block bg-background border-2 border-foreground rounded-lg p-4 shadow-bold">
            <p className="text-base sm:text-lg text-foreground max-w-3xl mx-auto font-bold">
              <span className="font-black text-accent">100% صادق</span> - مش بعمل إعلانات مدفوعة، كل مراجعاتي حقيقية وصادقة من تجربتي الشخصية 🎯
            </p>
          </div>
        </div>
      </div>
    </section>;
};
