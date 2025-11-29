import { Sparkles, Star, Video, Users } from "lucide-react";

const stats = [
  { 
    icon: Users,
    value: "+٥٠٠ ألف", 
    label: "متابع",
    color: "text-accent"
  },
  { 
    icon: Star,
    value: "+١٠٠٠", 
    label: "منتج مراجع",
    color: "text-primary"
  },
  { 
    icon: Video,
    value: "+٢٠٠", 
    label: "فيديو",
    color: "text-orange"
  },
  { 
    icon: Sparkles,
    value: "+٥٠", 
    label: "جائزة موزعة",
    color: "text-sky"
  },
];

export const StatsSection = () => {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Background with curved shapes */}
      <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-background to-muted/50" />
      
      {/* Decorative curves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-32 text-primary/10" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,64 C240,32 480,96 720,64 C960,32 1200,96 1440,64 L1440,0 L0,0 Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-32 text-pink/10" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z" />
        </svg>
        
        {/* Abstract circles */}
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-primary/10 rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-accent/10 rounded-full -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-2">
            إحصائيات أحمد مانجو 📊
          </h2>
          <p className="text-muted-foreground">
            أرقام بتتكلم عن نفسها
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="group relative bg-card rounded-2xl p-6 text-center border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Decorative blob */}
              <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full opacity-20 group-hover:opacity-40 transition-opacity ${
                idx % 2 === 0 ? 'bg-primary' : 'bg-accent'
              }`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              
              {/* Value */}
              <div className="text-2xl md:text-3xl font-black text-secondary mb-1 font-poppins">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
