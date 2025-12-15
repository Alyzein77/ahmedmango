import { Card } from "@/components/ui/card";
export const AdSpaces = () => {
  return <section className="py-6 sm:py-8 px-3 sm:px-4" style={{
    backgroundImage: 'url(/images/ad-background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      <div className="container mx-auto max-w-6xl space-y-4 sm:space-y-6">
        
        {/* Wide Banner Ad */}
        <div className="relative w-full bg-primary/20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
          {/* Mango-style decorative border */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-orange/20 rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          
          {/* Ad Label */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-secondary text-secondary-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full z-10">
            مساحة إعلانية
          </div>
          
          {/* Ad Content */}
          <div className="relative p-4 sm:p-8 md:p-12 flex flex-col items-center text-center gap-4 min-h-[120px] sm:min-h-[160px] bg-white">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-secondary mb-1 sm:mb-2 font-lalezar">
                🥭 أعلن مع أحمد مانجو
              </h3>
              <p className="text-secondary/70 font-medium text-sm sm:text-base font-tajawal">
                وصّل منتجك لآلاف المتابعين المهتمين
              </p>
            </div>
            
            {/* Ad Image */}
            <div className="w-full max-w-[300px] sm:max-w-[400px] h-20 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden" style={{
            backgroundImage: 'url(/lovable-uploads/blazo-ad.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          </div>
        </div>

        {/* Two Square Ads */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {[1, 2].map(idx => <Card key={idx} className="relative overflow-hidden border-2 border-primary/30 hover:border-primary/40 transition-colors bg-primary/20">
              {/* Ad Label */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-accent text-accent-foreground text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-full z-10">
                إعلان
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 sm:w-16 h-10 sm:h-16 bg-pink/40 rounded-full" />
              
              
              {/* Ad Content */}
              <div className="relative p-3 sm:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[200px] bg-white">
                <div className="w-full aspect-square max-w-[80px] sm:max-w-[150px] rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-4" style={{
              backgroundImage: 'url(/lovable-uploads/juhayna-mix-ad.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />

                <p className="text-secondary font-bold text-center text-xs sm:text-base">
                  مساحة إعلانية
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-sm text-center hidden sm:block">
                  تواصل معنا للحجز
                </p>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
};