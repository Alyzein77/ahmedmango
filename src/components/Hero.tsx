import { Button } from "@/components/ui/button";
import heroMango from "@/assets/hero-mango.png";
import mangoSmile from "@/assets/mango-smile.jpg";
export const Hero = () => {
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-orange to-primary px-4 py-20">
      {/* Playful Doodles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mango outlines */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float" style={{
        animationDelay: '0s'
      }}>
          <svg width="80" height="80" viewBox="0 0 80 80" className="stroke-secondary fill-none stroke-[3]">
            <ellipse cx="40" cy="45" rx="25" ry="30" />
            <path d="M 35 15 Q 40 10, 45 15 L 42 25" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 text-5xl opacity-15 animate-float" style={{
        animationDelay: '1s'
      }}>
          <svg width="60" height="60" viewBox="0 0 60 60" className="stroke-secondary fill-none stroke-[3]">
            <path d="M 30 10 L 35 25 L 50 25 L 38 35 L 43 50 L 30 40 L 17 50 L 22 35 L 10 25 L 25 25 Z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-16 text-4xl opacity-20 animate-float" style={{
        animationDelay: '2s'
      }}>
          <svg width="50" height="50" viewBox="0 0 50 50" className="stroke-secondary fill-none stroke-[3]">
            <circle cx="25" cy="25" r="20" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-10 text-3xl opacity-15 rotate-45">
          <svg width="40" height="40" viewBox="0 0 40 40" className="stroke-secondary fill-none stroke-[3]">
            <line x1="20" y1="5" x2="20" y2="35" />
            <line x1="5" y1="20" x2="35" y2="20" />
          </svg>
        </div>
        {/* More scattered doodles */}
        <div className="absolute bottom-20 right-32 text-4xl opacity-20 -rotate-12">✨</div>
        <div className="absolute top-1/2 left-1/4 text-3xl opacity-15 rotate-45">⭐</div>
        <div className="absolute top-3/4 right-1/4 text-5xl opacity-10">🥭</div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right space-y-8 animate-slide-up order-2 lg:order-2">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-white drop-shadow-lg">
              Welcome to<br />
              <span className="inline-block mt-2">the Mangoverse.</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white font-bold leading-relaxed drop-shadow-md">
              مراجعات صادقة...<br />
              مش كره.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end pt-6">
              <Button size="lg" className="text-xl font-black bg-accent text-white hover:scale-105 transition-all shadow-2xl hover:shadow-accent/50 rounded-full px-10 py-7 border-4 border-secondary">
                شوف المراجعات
              </Button>
              <Button size="lg" variant="outline" className="text-xl font-black border-4 border-secondary text-secondary bg-sky/50 hover:bg-sky hover:text-secondary-foreground rounded-full px-10 py-7 backdrop-blur-sm">
                للبراندات + تعاون معانا
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-1 animate-bounce-in">
            <div className="relative w-full max-w-lg mx-auto">
              <img alt="Ahmed Mango" className="w-full h-auto drop-shadow-2xl relative z-10" src="/lovable-uploads/12855d71-3a47-446c-910e-d726e50937b4.png" />
              {/* Decorative smile element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-30 animate-wiggle">
                <img src={mangoSmile} alt="" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy Pink Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 0C240 40 480 60 720 50C960 40 1200 20 1440 40V120H0V0Z" fill="hsl(var(--accent))" />
        </svg>
      </div>
    </section>;
};