import { Music2, Instagram, Youtube } from "lucide-react";
export const SocialSection = () => {
  const socialPlatforms = [{
    name: "TikTok",
    Icon: Music2,
    color: "bg-black hover:bg-gray-800",
    url: "https://www.tiktok.com/@ahmed_mangoo"
  }, {
    name: "Instagram",
    Icon: Instagram,
    color: "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    url: "https://www.instagram.com/ahmedmango.official/"
  }, {
    name: "YouTube",
    Icon: Youtube,
    color: "bg-red-600 hover:bg-red-700",
    url: "https://www.youtube.com/@AhmedMango"
  }];
  return <section id="social" className="py-12 sm:py-16 px-3 sm:px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 font-lalezar text-secondary">تابعني على السوشيال ميديا</h2>
        <div className="flex justify-center items-center gap-6 sm:gap-8">
          {socialPlatforms.map((platform, idx) => <a key={idx} href={platform.url} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 sm:w-16 sm:h-16 ${platform.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg`} aria-label={platform.name}>
              <platform.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
            </a>)}
        </div>
      </div>
    </section>;
};