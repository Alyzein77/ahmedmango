import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Music2, Youtube, ExternalLink } from "lucide-react";
interface FeedPost {
  id: number;
  thumbnail: string;
  type: "image" | "video";
}
const instagramPosts: FeedPost[] = Array.from({
  length: 6
}, (_, i) => ({
  id: i + 1,
  thumbnail: "/placeholder.svg",
  type: i % 3 === 0 ? "video" : "image"
}));
const tiktokPosts: FeedPost[] = Array.from({
  length: 4
}, (_, i) => ({
  id: i + 1,
  thumbnail: "/placeholder.svg",
  type: "video"
}));
const youtubePosts: FeedPost[] = Array.from({
  length: 3
}, (_, i) => ({
  id: i + 1,
  thumbnail: "/placeholder.svg",
  type: "video"
}));
export const SocialFeeds = () => {
  return <section id="feeds" className="py-10 sm:py-16 px-3 sm:px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary mb-2 sm:mb-3">
            تابعني على السوشيال 📱
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto px-4">
            آخر البوستات والفيديوهات من كل المنصات
          </p>
        </div>

        {/* Feeds - Stack on mobile, 3 cols on desktop */}
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          
          {/* Instagram Feed */}
          <Card className="p-4 sm:p-6 border-2 hover:border-pink/30 transition-colors flex flex-col h-full">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-base sm:text-lg">Instagram</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">آخر بوستات إنستجرام</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-5 flex-1">
              {instagramPosts.map(post => <div key={post.id} className="aspect-square bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer active:scale-95">
                  <img src={post.thumbnail} alt="Instagram post" className="w-full h-full object-cover" />
                </div>)}
            </div>
            
            <Button className="mt-auto w-full rounded-full font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 text-xs sm:text-sm h-10 sm:h-11" onClick={() => window.open('https://www.instagram.com/ahmedmango.official/', '_blank', 'noopener,noreferrer')}>
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
              شوف الصفحة على Instagram
            </Button>
          </Card>

          {/* TikTok Feed */}
          <Card className="p-4 sm:p-6 border-2 hover:border-secondary/30 transition-colors flex flex-col h-full">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <Music2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-base sm:text-lg">TikTok</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">فيديوهات تيك توك الحديثة</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-1.5 sm:gap-2 mb-4 sm:mb-5 flex-1">
              {tiktokPosts.map(post => <div key={post.id} className="aspect-[9/14] sm:aspect-[9/16] bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer active:scale-95">
                  
                </div>)}
            </div>
            
            <Button className="mt-auto w-full rounded-full font-bold bg-black text-white hover:bg-black/90 text-xs sm:text-sm h-10 sm:h-11" onClick={() => window.open('https://www.tiktok.com/@ahmed_mangoo', '_blank', 'noopener,noreferrer')}>
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
              شوف الصفحة على TikTok
            </Button>
          </Card>

          {/* YouTube Feed */}
          <Card className="p-4 sm:p-6 border-2 hover:border-red-500/30 transition-colors sm:col-span-2 lg:col-span-1 flex flex-col h-full">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-base sm:text-lg">YouTube</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">آخر فيديوهات يوتيوب</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-1 gap-1.5 sm:gap-2 mb-4 sm:mb-5 flex-1">
              {youtubePosts.map(post => <div key={post.id} className="aspect-video bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer active:scale-95">
                  <img src={post.thumbnail} alt="YouTube video" className="w-full h-full object-cover" />
                </div>)}
            </div>
            
            <Button className="mt-auto w-full rounded-full font-bold bg-red-600 text-white hover:bg-red-700 text-xs sm:text-sm h-10 sm:h-11" onClick={() => window.open('https://www.youtube.com/@AhmedMango', '_blank', 'noopener,noreferrer')}>
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
              شوف القناة على YouTube
            </Button>
          </Card>
        </div>
      </div>
    </section>;
};