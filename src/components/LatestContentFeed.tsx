import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music2, Instagram, Youtube, Facebook, Loader2, ExternalLink } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type LatestContent = Database["public"]["Tables"]["latest_content"]["Row"];
type Platform = Database["public"]["Enums"]["video_platform"];
type ContentType = Database["public"]["Enums"]["content_type"];

const platformConfig: Record<Platform, { icon: typeof Youtube; color: string; label: string }> = {
  YouTube: { icon: Youtube, color: "bg-red-600", label: "YouTube" },
  TikTok: { icon: Music2, color: "bg-black", label: "TikTok" },
  Instagram: { icon: Instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500", label: "Instagram" },
  Facebook: { icon: Facebook, color: "bg-blue-600", label: "Facebook" },
};

const contentTypeLabels: Record<ContentType, string> = {
  Video: "فيديو",
  Post: "منشور",
  Story: "ستوري",
  Reel: "ريلز",
  TikTok: "تيك توك",
};

const contentTypeColors: Record<ContentType, string> = {
  Video: "bg-red-500",
  Post: "bg-blue-500",
  Story: "bg-purple-500",
  Reel: "bg-pink-500",
  TikTok: "bg-black",
};

export const LatestContentFeed = () => {
  const [content, setContent] = useState<LatestContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("latest_content")
        .select("*")
        .order("posted_at", { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error("Error fetching latest content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="latest-content" className="py-10 sm:py-16 px-3 sm:px-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary mb-2 sm:mb-3">
            آخر المحتوى 📱
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto px-4">
            تابع أحدث المنشورات والستوريز
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : content.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا يوجد محتوى حالياً</p>
          </div>
        ) : (
          <>
            {/* Mobile: Horizontal Scroll */}
            <div className="sm:hidden overflow-x-auto pb-4 -mx-3 px-3">
              <div className="flex gap-4" style={{ width: "max-content" }}>
                {content.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {content.map((item, idx) => (
                <ContentCard key={item.id} item={item} delay={idx * 0.1} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

interface ContentCardProps {
  item: LatestContent;
  delay?: number;
}

const ContentCard = ({ item, delay = 0 }: ContentCardProps) => {
  const platformCfg = platformConfig[item.platform];
  const typeColor = contentTypeColors[item.content_type];
  const typeLabel = contentTypeLabels[item.content_type];

  return (
    <Card
      className="group overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up w-[260px] sm:w-auto flex-shrink-0"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Preview Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={item.preview_url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Content Type Badge */}
        <div
          className={`absolute top-3 right-3 ${typeColor} text-white px-2 py-1 rounded-full text-xs font-bold`}
        >
          {typeLabel}
        </div>

        {/* Platform Badge */}
        <div
          className={`absolute top-3 left-3 ${platformCfg.color} text-white p-1.5 rounded-full`}
        >
          <platformCfg.icon className="w-4 h-4" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 text-right" dir="rtl">
        <h3 className="font-bold text-secondary text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        {item.short_note && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {item.short_note}
          </p>
        )}
        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2"
          onClick={() => window.open(item.link_url, "_blank")}
        >
          <ExternalLink className="w-4 h-4" />
          افتح
        </Button>
      </div>
    </Card>
  );
};
