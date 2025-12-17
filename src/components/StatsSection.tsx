import { Sparkles, Star, Video, Users } from "lucide-react";

const stats = [
  { 
    icon: Users,
    value: "2.6M+", 
    label: "متابع",
    color: "bg-accent"
  },
  { 
    icon: Star,
    value: "1000+", 
    label: "منتج مراجع",
    color: "bg-primary"
  },
  { 
    icon: Video,
    value: "500M+", 
    label: "مشاهدة",
    color: "bg-orange"
  },
  { 
    icon: Sparkles,
    value: "745K", 
    label: "مشترك يوتيوب",
    color: "bg-sky"
  },
];

export const StatsSection = () => {
  return (
    <section className="relative py-10 sm:py-16 px-3 sm:px-4 overflow-hidden bg-orange">
      {/* Solid background with subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            hsl(var(--foreground)) 0px,
            hsl(var(--foreground)) 2px,
            transparent 2px,
            transparent 20px
          )`
        }} />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-1 sm:mb-2 font-lalezar uppercase tracking-wide">
            إحصائيات أحمد مانجو 📊
          </h2>
          <p className="text-foreground/80 text-sm sm:text-base font-tajawal font-bold">
            أرقام بتتكلم عن نفسها
          </p>
        </div>

        {/* Stats Grid - 2x2 on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="group relative bg-background rounded-xl p-4 sm:p-6 text-center border-2 border-foreground shadow-bold hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-lg ${stat.color} border-2 border-foreground flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
              </div>
              
              {/* Value */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-0.5 sm:mb-1 font-lalezar">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-xs sm:text-sm text-foreground/80 font-bold uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
