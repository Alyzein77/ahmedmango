import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music2, Instagram, Youtube, Facebook, Loader2, ExternalLink, ArrowRight, Eye } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { Link } from "react-router-dom";

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

const AllContent = () => {
  const [content, setContent] = useState<LatestContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Platform | "all">("all");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("latest_content")
        .select("*")
        .order("ranking", { ascending: false })
        .order("posted_at", { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = activeFilter === "all" 
    ? content 
    : content.filter(item => item.platform === activeFilter);

  const platforms: (Platform | "all")[] = ["all", "YouTube", "TikTok", "Instagram", "Facebook"];

  // Get count per platform
  const getCounts = () => {
    const counts: Record<string, number> = { all: content.length };
    platforms.forEach(p => {
      if (p !== "all") {
        counts[p] = content.filter(item => item.platform === p).length;
      }
    });
    return counts;
  };
  const counts = getCounts();

  return (
    <div className="min-h-screen font-poppins bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
              <ArrowRight className="w-4 h-4" />
              العودة للرئيسية
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary mb-3 font-lalezar">
              مانجو بيحب 💜
            </h1>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-xl">
              أحلى محتوى عجبني وعايزك تشوفه
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {platforms.map((platform) => {
              const isActive = activeFilter === platform;
              const config = platform !== "all" ? platformConfig[platform] : null;
              const Icon = config?.icon;
              const count = counts[platform];
              
              return (
                <Button
                  key={platform}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(platform)}
                  className={`rounded-full font-bold gap-2 transition-all ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                      : "hover:bg-primary/10"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {platform === "all" ? "الكل" : config?.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary-foreground/20" : "bg-muted"}`}>
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {activeFilter === "all" ? "لا يوجد محتوى حالياً" : `لا يوجد محتوى من ${platformConfig[activeFilter].label}`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredContent.map((item, idx) => (
                <ContentCard key={item.id} item={item} delay={idx * 0.05} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
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
      className="group overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up flex flex-col h-full"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Preview Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={item.preview_url}
          alt={item.title}
          loading="lazy"
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
      <div className="p-4 text-right flex flex-col flex-1" dir="rtl">
        <h3 className="font-bold text-secondary text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        <div className="flex-1">
          {item.short_note && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {item.short_note}
            </p>
          )}
        </div>

        {/* Views */}
        {(item.views ?? 0) > 0 && (
          <div className="flex items-center gap-1 text-muted-foreground text-xs mt-2">
            <Eye className="w-3.5 h-3.5" />
            <span>{item.views!.toLocaleString()} مشاهدة</span>
          </div>
        )}

        <Button
          size="sm"
          variant="outline"
          className="mt-3 w-full rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2"
          onClick={() => window.open(item.link_url, "_blank")}
        >
          <ExternalLink className="w-4 h-4" />
          افتح
        </Button>
      </div>
    </Card>
  );
};

export default AllContent;
