import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Music2, Youtube, ExternalLink } from "lucide-react";

interface FeedPost {
  id: number;
  thumbnail: string;
  type: "image" | "video";
}

const instagramPosts: FeedPost[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  thumbnail: "/placeholder.svg",
  type: i % 3 === 0 ? "video" : "image"
}));

const tiktokPosts: FeedPost[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  thumbnail: "/placeholder.svg",
  type: "video"
}));

const youtubePosts: FeedPost[] = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  thumbnail: "/placeholder.svg",
  type: "video"
}));

export const SocialFeeds = () => {
  return (
    <section id="feeds" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-3">
            تابعني على السوشيال 📱
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            آخر البوستات والفيديوهات من كل المنصات
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Instagram Feed */}
          <Card className="p-6 border-2 hover:border-pink/30 transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">Instagram</h3>
                <p className="text-muted-foreground text-sm">آخر بوستات إنستجرام</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-5">
              {instagramPosts.map((post) => (
                <div 
                  key={post.id}
                  className="aspect-square bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <img 
                    src={post.thumbnail}
                    alt="Instagram post"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full rounded-full font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90"
              onClick={() => window.open('https://www.instagram.com/ahmedmango.official/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 ml-2" />
              شوف الصفحة على Instagram
            </Button>
          </Card>

          {/* TikTok Feed */}
          <Card className="p-6 border-2 hover:border-secondary/30 transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">TikTok</h3>
                <p className="text-muted-foreground text-sm">فيديوهات تيك توك الحديثة</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-5">
              {tiktokPosts.map((post) => (
                <div 
                  key={post.id}
                  className="aspect-[9/16] bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <img 
                    src={post.thumbnail}
                    alt="TikTok video"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full rounded-full font-bold bg-black text-white hover:bg-black/90"
              onClick={() => window.open('https://www.tiktok.com/@ahmed_mangoo', '_blank')}
            >
              <ExternalLink className="w-4 h-4 ml-2" />
              شوف الصفحة على TikTok
            </Button>
          </Card>

          {/* YouTube Feed */}
          <Card className="p-6 border-2 hover:border-red-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">YouTube</h3>
                <p className="text-muted-foreground text-sm">آخر فيديوهات يوتيوب</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-5">
              {youtubePosts.map((post) => (
                <div 
                  key={post.id}
                  className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <img 
                    src={post.thumbnail}
                    alt="YouTube video"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full rounded-full font-bold bg-red-600 text-white hover:bg-red-700"
              onClick={() => window.open('https://www.youtube.com/@AhmedMango', '_blank')}
            >
              <ExternalLink className="w-4 h-4 ml-2" />
              شوف القناة على YouTube
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
