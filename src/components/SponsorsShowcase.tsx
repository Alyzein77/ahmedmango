import { Card, CardContent } from "@/components/ui/card";

interface Sponsor {
  name: string;
  logo?: string;
  description: string;
  website: string;
  tier: "gold" | "silver" | "bronze";
}

const sponsors: Sponsor[] = [
  {
    name: "راعي ذهبي",
    description: "مساحة إعلانية متاحة للشركات والعلامات التجارية",
    website: "#",
    tier: "gold"
  },
  {
    name: "راعي فضي",
    description: "فرصة للترويج لمنتجاتك أمام آلاف المتابعين",
    website: "#",
    tier: "silver"
  },
  {
    name: "راعي فضي",
    description: "انضم كشريك رسمي واحصل على تغطية مميزة",
    website: "#",
    tier: "silver"
  },
  {
    name: "راعي برونزي",
    description: "مساحة إعلانية مثالية للعلامات الناشئة",
    website: "#",
    tier: "bronze"
  },
];

const tierStyles = {
  gold: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50",
  silver: "bg-gradient-to-br from-gray-300/20 to-gray-500/20 border-gray-400/50",
  bronze: "bg-gradient-to-br from-amber-700/20 to-amber-900/20 border-amber-700/50"
};

const tierLabels = {
  gold: "ذهبي",
  silver: "فضي",
  bronze: "برونزي"
};

export const SponsorsShowcase = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4">
            شركاؤنا المميزون
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            نفخر بشراكتنا مع أفضل العلامات التجارية لتقديم أفضل تجربة لمتابعينا
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Featured Gold Sponsor */}
          <Card className={`${tierStyles.gold} border-2 md:col-span-2`}>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <span className="bg-yellow-500 text-yellow-950 px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm">
                    {tierLabels.gold}
                  </span>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-background/80 rounded-2xl flex items-center justify-center border-2 border-border">
                    <span className="text-3xl sm:text-4xl">👑</span>
                  </div>
                  <div className="text-center sm:text-right">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                      {sponsors[0].name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{sponsors[0].description}</p>
                  </div>
                </div>
                <a
                  href={sponsors[0].website}
                  className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:scale-105 transition-transform text-sm sm:text-base md:text-lg shadow-xl w-full sm:w-auto text-center"
                >
                  احجز مساحتك الآن
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sponsors.slice(1).map((sponsor, index) => (
            <Card key={index} className={`${tierStyles[sponsor.tier]} border-2 hover:scale-105 transition-transform`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <span className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    sponsor.tier === 'silver' ? 'bg-gray-400 text-gray-950' : 'bg-amber-700 text-amber-50'
                  }`}>
                    {tierLabels[sponsor.tier]}
                  </span>
                  <div className="w-20 h-20 bg-background/80 rounded-xl flex items-center justify-center border-2 border-border">
                    <span className="text-3xl">
                      {sponsor.tier === 'silver' ? '🥈' : '🥉'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {sponsor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{sponsor.description}</p>
                  </div>
                  <a
                    href={sponsor.website}
                    className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-bold hover:bg-secondary/80 transition-colors text-sm w-full"
                  >
                    اعرف المزيد
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="bg-gradient-to-l from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              هل تريد أن تكون شريكاً؟
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto px-4">
              انضم إلى قائمة شركائنا واحصل على تغطية إعلامية مميزة أمام آلاف المتابعين المهتمين
            </p>
            <a
              href="mailto:business@ahmadmango.com"
              className="inline-block bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl text-sm sm:text-base"
            >
              تواصل معنا للرعاية
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
