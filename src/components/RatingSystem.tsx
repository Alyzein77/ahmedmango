import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
export const RatingSystem = () => {
  return <section id="rating" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="text-secondary font-sans">نظام التقييم 🎯</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            كل منتج بجربه بيتقيم بطريقة واحدة بسيطة وصادقة
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {/* 2استكا - Good */}
          <Card className="p-3 sm:p-5 text-center hover:scale-105 transition-transform cursor-pointer group animate-slide-up border-0 bg-[#ffbd24]">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow bg-[#1a1349]">
              <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 text-white" strokeWidth={3} />
            </div>
            
            <h3 className="text-lg sm:text-2xl font-black mb-2 font-sans text-[#1a1349]">2استكا</h3>
            
            <p className="text-xs sm:text-sm leading-relaxed font-sans font-extrabold text-[#1a1349]">
              المنتج ممتاز! طعمه حلو، سعره مناسب، وجودته عالية 🔥
            </p>

            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
              <span className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gray-50 text-[#1a1349]">طعم حلو 😋</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gray-50 text-[#1a1349]">سعر كويس 💰</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gray-50 text-[#1a1349]">جودة عالية ⭐</span>
            </div>
          </Card>

          {/* فاستكا - Bad */}
          <Card style={{ animationDelay: '0.2s' }} className="p-3 sm:p-5 text-center hover:scale-105 transition-transform cursor-pointer group animate-slide-up bg-[#1a1349] border-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
              <XCircle className="w-7 h-7 sm:w-9 sm:h-9 text-white" strokeWidth={3} />
            </div>
            
            <h3 className="text-lg sm:text-2xl font-black mb-2 text-slate-50">فاستكا</h3>
            
            <p className="text-xs sm:text-sm leading-relaxed text-gray-50">
              المنتج سيء! طعمه وحش، مش يستاهل السعر، وجودته ضعيفة 🚫
            </p>

            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
              <span className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gray-50 text-[#1a1349]">طعم وحش 🤢</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gray-50 text-[#1a1349]">سعر غالي 💸</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gray-50 text-[#1a1349]">جودة ضعيفة 👎</span>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 md:mt-12 text-center px-4">
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            <span className="font-bold text-foreground">100% صادق</span> - مش بعمل إعلانات مدفوعة، كل مراجعاتي حقيقية وصادقة من تجربتي الشخصية 🎯
          </p>
        </div>
      </div>
    </section>;
};