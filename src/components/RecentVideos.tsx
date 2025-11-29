import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Music2, Instagram, Youtube } from "lucide-react";

type Platform = "tiktok" | "instagram" | "youtube";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  platform: Platform;
  views: string;
  url: string;
}

const platformConfig = {
  tiktok: { icon: Music2, color: "bg-black", label: "TikTok" },
  instagram: { icon: Instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500", label: "Reels" },
  youtube: { icon: Youtube, color: "bg-red-600", label: "YouTube" },
};

const videos: Video[] = [
  { id: 1, title: "شيبسي بالكبدة والكفتة 🔥", thumbnail: "/lovable-uploads/chipsy-kebda-kofta.jpg", platform: "tiktok", views: "250K", url: "#" },
  { id: 2, title: "أصلي ولا التقليد؟", thumbnail: "/lovable-uploads/asly-vs-takleed.jpg", platform: "instagram", views: "180K", url: "#" },
  { id: 3, title: "أغرب مشروب ممكن تشربه", thumbnail: "/lovable-uploads/aghrab-mashroub.jpg", platform: "youtube", views: "500K", url: "#" },
  { id: 4, title: "مشروبات الشتاء 🥶", thumbnail: "/lovable-uploads/mashrobat-shita.jpg", platform: "tiktok", views: "320K", url: "#" },
  { id: 5, title: "بسكوت بالتيراميسو 😍", thumbnail: "/lovable-uploads/biskrem-tiramisu.jpg", platform: "instagram", views: "145K", url: "#" },
  { id: 6, title: "شيتوس نوتيلا كيندر", thumbnail: "/lovable-uploads/cheetos-nutella-kinder.jpg", platform: "youtube", views: "420K", url: "#" },
];

export const RecentVideos = () => {
  return (
    <section id="videos" className="py-10 sm:py-16 px-3 sm:px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary mb-2 sm:mb-3">
            آخر الفيديوهات 🎬
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto px-4">
            شوف أحدث المراجعات والتحديات
          </p>
        </div>

        {/* Video Grid - 2 cols mobile, 3 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {videos.map((video, idx) => {
            const config = platformConfig[video.platform];
            
            return (
              <Card 
                key={video.id}
                className="group overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => window.open(video.url, '_blank')}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[9/12] sm:aspect-video bg-muted overflow-hidden">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground fill-current ml-1" />
                    </div>
                  </div>
                  
                  {/* Platform badge */}
                  <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${config.color} text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 text-[10px] sm:text-xs font-bold`}>
                    <config.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">{config.label}</span>
                  </div>
                  
                  {/* Views */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-secondary/80 text-secondary-foreground px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-bold">
                    {video.views}
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 sm:p-4">
                  <h3 className="font-bold text-secondary text-xs sm:text-lg mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <Button 
                    size="sm"
                    className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 text-[10px] sm:text-sm h-8 sm:h-9"
                  >
                    شوف الفيديو 📺
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6 sm:mt-10">
          <Button
            variant="outline"
            className="rounded-full font-bold px-6 sm:px-8 border-secondary/30 text-secondary hover:bg-secondary/10 h-10 sm:h-11"
          >
            شوف كل الفيديوهات 🎥
          </Button>
        </div>
      </div>
    </section>
  );
};
