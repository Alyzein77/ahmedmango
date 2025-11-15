import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const SocialSection = () => {
  const socialPlatforms = [
    {
      name: "TikTok",
      icon: "📱",
      followers: "350K+",
      handle: "@ahmed_mangoo",
      color: "from-pink-500 to-purple-600",
      url: "https://www.tiktok.com/@ahmed_mangoo"
    },
    {
      name: "Instagram",
      icon: "📸",
      followers: "120K+",
      handle: "@ahmedmango.official",
      color: "from-purple-500 to-pink-500",
      url: "https://www.instagram.com/ahmedmango.official/"
    },
    {
      name: "Facebook",
      icon: "👍",
      followers: "80K+",
      handle: "AhmedMango.Official",
      color: "from-blue-500 to-blue-600",
      url: "https://www.facebook.com/AhmedMango.Official/"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-secondary">تابعني على السوشيال ميديا 📱</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            فيديوهات يومية، مراجعات حصرية، وتفاعل مباشر معاك
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {socialPlatforms.map((platform, idx) => (
            <Card 
              key={idx}
              className="p-6 text-center hover:scale-105 transition-transform cursor-pointer animate-bounce-in border-2 hover:shadow-2xl group"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => window.open(platform.url, '_blank')}
            >
              <div className={`text-6xl mb-4 group-hover:scale-110 transition-transform`}>
                {platform.icon}
              </div>
              
              <h3 className="text-2xl font-black mb-2 text-secondary">
                {platform.name}
              </h3>
              
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent group-hover:animate-pulse-glow" style={{
                backgroundImage: `linear-gradient(135deg, hsl(42 100% 54%), hsl(30 100% 50%))`
              }}>
                {platform.followers}
              </div>
              
              <p className="text-muted-foreground font-medium mb-4">
                {platform.handle}
              </p>
              
              <Button 
                className="w-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                تابع دلوقتي 🚀
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary via-orange-500 to-primary p-8 md:p-12 rounded-2xl text-center shadow-2xl animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black mb-4 text-primary-foreground">
              🔥 متفوتش أي فيديو جديد!
            </h3>
            <p className="text-xl mb-6 text-primary-foreground/90 font-medium">
              فعّل الإشعارات عشان توصلك كل المراجعات والجوائز الجديدة
            </p>
            <Button 
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xl font-black px-8 py-6 rounded-full hover:scale-105 transition-transform shadow-xl"
            >
              🔔 فعّل الإشعارات
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
