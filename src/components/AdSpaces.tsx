import { Card } from "@/components/ui/card";

export const AdSpaces = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        
        {/* Wide Banner Ad */}
        <div className="relative w-full bg-primary/20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
          {/* Mango-style decorative border */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-20 h-20 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange/20 rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          
          {/* Ad Label */}
          <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
            مساحة إعلانية
          </div>
          
          {/* Ad Content */}
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[160px]">
            <div className="text-center md:text-right">
              <h3 className="text-xl md:text-2xl font-bold text-secondary mb-2">
                🥭 أعلن مع أحمد مانجو
              </h3>
              <p className="text-secondary/70 font-medium">
                وصّل منتجك لآلاف المتابعين المهتمين
              </p>
            </div>
            
            {/* Placeholder Image Area */}
            <div className="w-full md:w-64 h-24 bg-secondary/10 rounded-xl border-2 border-dashed border-secondary/30 flex items-center justify-center">
              <span className="text-secondary/50 font-medium">صورة الإعلان</span>
            </div>
          </div>
        </div>

        {/* Two Square Ads */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((idx) => (
            <Card 
              key={idx}
              className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors"
            >
              {/* Ad Label */}
              <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                مساحة إعلانية
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink/40 rounded-full" />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-sky/40 rounded-full" />
              
              {/* Ad Content */}
              <div className="relative p-6 flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-full aspect-square max-w-[150px] bg-muted rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mb-4">
                  <span className="text-muted-foreground text-sm font-medium">شعار الراعي</span>
                </div>
                <p className="text-secondary font-bold text-center">
                  مساحة إعلانية متاحة
                </p>
                <p className="text-muted-foreground text-sm text-center">
                  تواصل معنا للحجز
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
