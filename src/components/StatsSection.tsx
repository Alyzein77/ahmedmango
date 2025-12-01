import { Sparkles, Star, Video, Users } from "lucide-react";

const stats = [
  { 
    icon: Users,
    value: "2.6M+", 
    label: "متابع",
    color: "text-accent"
  },
  { 
    icon: Star,
    value: "1000+", 
    label: "منتج مراجع",
    color: "text-primary"
  },
  { 
    icon: Video,
    value: "500M+", 
    label: "مشاهدة",
    color: "text-orange"
  },
  { 
    icon: Sparkles,
    value: "745K", 
    label: "مشترك يوتيوب",
    color: "text-sky"
  },
];

export const StatsSection = () => {
  return (
    <section className="relative py-10 sm:py-16 px-3 sm:px-4 overflow-hidden">
      {/* Background with curved shapes */}
      <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-background to-muted/50" />
      
      {/* Decorative curves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-16 sm:h-32 text-primary/10" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,64 C240,32 480,96 720,64 C960,32 1200,96 1440,64 L1440,0 L0,0 Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-16 sm:h-32 text-pink/10" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z" />
        </svg>
        
        {/* Abstract circles - hidden on mobile */}
        <div className="hidden sm:block absolute top-1/2 left-10 w-20 h-20 bg-primary/10 rounded-full -translate-y-1/2" />
        <div className="hidden sm:block absolute top-1/2 right-10 w-16 h-16 bg-accent/10 rounded-full -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary mb-1 sm:mb-2 font-lalezar">
            إحصائيات أحمد مانجو 📊
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-tajawal">
            أرقام بتتكلم عن نفسها
          </p>
        </div>

        {/* Stats Grid - 2x2 on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="group relative bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-transparent hover:border-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Decorative blob */}
              <div className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full opacity-20 group-hover:opacity-40 transition-opacity ${
                idx % 2 === 0 ? 'bg-primary' : 'bg-accent'
              }`} />
              
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
              
              {/* Value */}
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-secondary mb-0.5 sm:mb-1 font-lalezar">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
