import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Music2, Instagram, Youtube, Facebook, Loader2, Sparkles } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { useMixpanel } from "@/hooks/useMixpanel";
import { useTrackSection } from "@/hooks/useTrackSection";

type Video = Database["public"]["Tables"]["videos"]["Row"];
type Platform = Database["public"]["Enums"]["video_platform"];
type Category = Database["public"]["Enums"]["video_category"];

const platformConfig: Record<Platform, { icon: typeof Youtube; color: string; label: string }> = {
  YouTube: { icon: Youtube, color: "bg-red-600", label: "YouTube" },
  TikTok: { icon: Music2, color: "bg-black", label: "TikTok" },
  Instagram: { icon: Instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500", label: "Instagram" },
  Facebook: { icon: Facebook, color: "bg-blue-600", label: "Facebook" },
};

const categoryLabels: Record<Category, string> = {
  Review: "مراجعة",
  Challenge: "تحدي",
  Announcement: "إعلان",
  Collaboration: "تعاون",
};

export const VideosSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [visibleCount, setVisibleCount] = useState(2);
  const { trackVideoPlay } = useMixpanel();
  const sectionRef = useTrackSection('Videos Section');

  useEffect(() => {
    fetchVideos();
  }, [platformFilter, categoryFilter]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(2);
  }, [platformFilter, categoryFilter]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (platformFilter !== "all") {
        query = query.eq("platform", platformFilter);
      }
      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const platforms: Platform[] = ["YouTube", "TikTok", "Instagram", "Facebook"];
  const categories: Category[] = ["Review", "Challenge", "Announcement", "Collaboration"];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} id="videos-section" className="py-10 sm:py-16 px-3 sm:px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary mb-2 sm:mb-3">
            أحدث الفيديوهات 🎬
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto px-4">
            شوف أحدث المراجعات والتحديات
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 sm:mb-8">
          {/* Platform Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={platformFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setPlatformFilter("all")}
              className="rounded-full text-xs sm:text-sm"
            >
              الكل
            </Button>
            {platforms.map((platform) => {
              const config = platformConfig[platform];
              return (
                <Button
                  key={platform}
                  variant={platformFilter === platform ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlatformFilter(platform)}
                  className="rounded-full text-xs sm:text-sm gap-1"
                >
                  <config.icon className="w-3 h-3" />
                  {config.label}
                </Button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={categoryFilter === "all" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
              className="rounded-full text-xs sm:text-sm"
            >
              كل الفئات
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className="rounded-full text-xs sm:text-sm"
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا توجد فيديوهات حالياً</p>
          </div>
        ) : (
          <>
            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videos.slice(0, visibleCount).map((video, idx) => {
                const config = platformConfig[video.platform];

                return (
                  <Card
                    key={video.id}
                    className="group overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                          <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
                        </div>
                      </div>

                      {/* Platform badge */}
                      <div
                        className={`absolute top-3 left-3 ${config.color} text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold`}
                      >
                        <config.icon className="w-3.5 h-3.5" />
                        <span>{config.label}</span>
                      </div>

                      {/* Featured badge */}
                      {video.is_featured && (
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>مميز</span>
                        </div>
                      )}

                      {/* Duration */}
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 bg-secondary/80 text-secondary-foreground px-2 py-1 rounded text-xs font-bold">
                          {video.duration}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 text-right" dir="rtl">
                      <h3 className="font-bold text-secondary text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                      <Button
                        size="sm"
                        className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        onClick={() => {
                          trackVideoPlay(video.id, video.title, video.platform);
                          window.open(video.video_url, "_blank");
                        }}
                      >
                        شوف الفيديو 📺
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* View More Button */}
            {visibleCount < videos.length && (
              <div className="text-center mt-6 sm:mt-8">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="rounded-full font-bold px-6 sm:px-8 border-secondary/30 text-secondary hover:bg-secondary/10 h-10 sm:h-11"
                >
                  عرض المزيد ⬇️
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
