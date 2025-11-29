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
  instagram: { icon: Instagram, color: "bg-gradient-to-br from-purple-500 to-pink-500", label: "Instagram" },
  youtube: { icon: Youtube, color: "bg-red-600", label: "YouTube" },
};

const videos: Video[] = [
  { id: 1, title: "مراجعة شيبسي جديد 🔥", thumbnail: "/placeholder.svg", platform: "tiktok", views: "250K", url: "#" },
  { id: 2, title: "أسوأ منتج جربته!", thumbnail: "/placeholder.svg", platform: "instagram", views: "180K", url: "#" },
  { id: 3, title: "تحدي السناكس المصرية", thumbnail: "/placeholder.svg", platform: "youtube", views: "500K", url: "#" },
  { id: 4, title: "فاستكا ولا 2استكا؟", thumbnail: "/placeholder.svg", platform: "tiktok", views: "320K", url: "#" },
  { id: 5, title: "منتجات لازم تجربها", thumbnail: "/placeholder.svg", platform: "instagram", views: "145K", url: "#" },
  { id: 6, title: "مقارنة بين الشيبسيات", thumbnail: "/placeholder.svg", platform: "youtube", views: "420K", url: "#" },
];

export const RecentVideos = () => {
  return (
    <section id="videos" className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-3">
            آخر الفيديوهات 🎬
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            شوف أحدث المراجعات والتحديات
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => {
            const config = platformConfig[video.platform];
            
            return (
              <Card 
                key={video.id}
                className="group overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => window.open(video.url, '_blank')}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                      <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                    </div>
                  </div>
                  
                  {/* Platform badge */}
                  <div className={`absolute top-3 left-3 ${config.color} text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold`}>
                    <config.icon className="w-3.5 h-3.5" />
                    {config.label}
                  </div>
                  
                  {/* Views */}
                  <div className="absolute bottom-3 right-3 bg-secondary/80 text-secondary-foreground px-2 py-1 rounded text-xs font-bold">
                    {video.views} مشاهدة
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-secondary text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <Button 
                    size="sm"
                    className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    شوف الفيديو 📺
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="rounded-full font-bold px-8 border-secondary/30 text-secondary hover:bg-secondary/10"
          >
            شوف كل الفيديوهات 🎥
          </Button>
        </div>
      </div>
    </section>
  );
};
