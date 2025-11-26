import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
export const RatingSystem = () => {
  return <section id="rating" className="py-12 sm:py-16 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="text-secondary font-sans">نظام التقييم 🎯</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            كل منتج بجربه بيتقيم بطريقة واحدة بسيطة وصادقة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 2استكا - Good */}
          <Card className="p-6 sm:p-8 text-center hover:scale-105 transition-transform cursor-pointer group animate-slide-up border-[#1c1250] border-0 bg-[#ffbd24]">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow bg-[#1a1349]">
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={3} />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black mb-3 font-sans text-[#1a1349]">2استكا</h3>
            
            <p className="text-base sm:text-lg leading-relaxed font-sans font-extrabold bg-[#06235c]/0 text-[#1a1349]">
              المنتج ممتاز! طعمه حلو، سعره مناسب، وجودته عالية. ده اللي يستاهل فلوسك 🔥
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-gray-50 text-[#1a1349]">طعم حلو 😋</span>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-gray-50 text-[#1a1349]">سعر كويس 💰</span>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-gray-50 text-[#1a1349]">جودة عالية ⭐</span>
            </div>
          </Card>

          {/* فاستكا - Bad */}
          <Card style={{
          animationDelay: '0.2s'
        }} className="p-6 sm:p-8 text-center hover:scale-105 transition-transform border-destructive/30 hover:border-destructive cursor-pointer group animate-slide-up bg-[#1a1349] border-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
              <XCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={3} />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black mb-3 text-slate-50">فاستكا</h3>
            
            <p className="text-base sm:text-lg leading-relaxed text-gray-50">
              المنتج سيء! طعمه وحش، مش يستاهل السعر، وجودته ضعيفة. متضيعش فلوسك عليه 🚫
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-gray-50 text-[#1a1349]">طعم وحش 🤢</span>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-gray-50 text-[#1a1349]">سعر غالي 💸</span>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-gray-50 text-[#1a1349]">جودة ضعيفة 👎</span>
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