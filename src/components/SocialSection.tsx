import { Music2, Instagram, Youtube, Facebook } from "lucide-react";

const openExternalLink = (url: string) => {
  const absoluteUrl = url.startsWith('http') ? url : `https://${url}`;
  const newWindow = window.open(absoluteUrl, "_blank", "noopener,noreferrer");
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    window.location.href = absoluteUrl;
  }
};

export const SocialSection = () => {
  const socialPlatforms = [{
    name: "TikTok",
    Icon: Music2,
    color: "bg-foreground",
    url: "https://www.tiktok.com/@ahmed_mangoo"
  }, {
    name: "Instagram",
    Icon: Instagram,
    color: "bg-accent",
    url: "https://www.instagram.com/ahmedmango.official/"
  }, {
    name: "YouTube",
    Icon: Youtube,
    color: "bg-destructive",
    url: "https://www.youtube.com/@AhmedMango"
  }, {
    name: "Facebook",
    Icon: Facebook,
    color: "bg-sky",
    url: "https://www.facebook.com/AhmedMango.Official/"
  }];
  return <section id="social" className="py-12 sm:py-16 px-3 sm:px-4 bg-orange">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 font-lalezar text-foreground uppercase tracking-wide">تابعني على السوشيال ميديا</h2>
        <div className="flex justify-center items-center gap-4 sm:gap-6">
          {socialPlatforms.map((platform, idx) => (
            <button 
              key={idx} 
              onClick={(e) => {
                e.preventDefault();
                openExternalLink(platform.url);
              }}
              className={`w-14 h-14 sm:w-16 sm:h-16 ${platform.color} rounded-lg border-2 border-foreground flex items-center justify-center transition-all duration-150 hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] shadow-bold cursor-pointer`} 
              aria-label={platform.name}
            >
              <platform.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-background" strokeWidth={2.5} />
            </button>
          ))}
        </div>
      </div>
    </section>;
};
