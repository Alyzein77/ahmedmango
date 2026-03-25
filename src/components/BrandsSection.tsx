import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Megaphone, Users, Eye, Video } from "lucide-react";
import { useTrackSection } from "@/hooks/useTrackSection";
import { useMixpanel } from "@/hooks/useMixpanel";

export const BrandsSection = () => {
  const sectionRef = useTrackSection('Brands CTA Section');
  const { trackCTAClick } = useMixpanel();

  const stats = [
    { icon: Users, value: "2M+", label: "متابع" },
    { icon: Eye, value: "50M+", label: "مشاهدة" },
    { icon: Video, value: "500+", label: "فيديو" },
  ];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-12 sm:py-16 px-3 sm:px-4 bg-secondary text-secondary-foreground"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-4 sm:mb-6">
          <Megaphone className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold text-primary">للبراندات والشركات</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 font-lalezar uppercase tracking-wide">
          عايز تعلن مع أحمد مانجو؟ 🥭
        </h2>
        <p className="text-secondary-foreground/80 text-sm sm:text-base font-tajawal mb-6 sm:mb-8 max-w-xl mx-auto">
          وصّل منتجك لملايين المتابعين بطريقة أصيلة وممتعة. أحمد مانجو هيعمل مراجعة حقيقية لمنتجك!
        </p>

        {/* Quick stats */}
        <div className="flex justify-center gap-6 sm:gap-10 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1.5 rounded-lg bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-black font-lalezar text-primary">{stat.value}</div>
              <div className="text-xs text-secondary-foreground/60 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        <Link to="/advertise">
          <Button
            onClick={() => trackCTAClick('ابعتلنا طلبك', '/advertise', 'brands_section')}
            className="h-12 px-8 text-base font-black rounded-lg bg-primary text-primary-foreground border-2 border-primary-foreground shadow-bold hover:shadow-bold-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 uppercase tracking-wide"
          >
            <Megaphone className="w-5 h-5 ml-2" />
            ابعتلنا طلبك
          </Button>
        </Link>

        <p className="text-secondary-foreground/50 text-xs mt-4 font-bold">
          هنرد عليك خلال 48 ساعة ⚡
        </p>
      </div>
    </section>
  );
};
