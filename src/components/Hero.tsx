import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[85vh] w-full overflow-hidden font-poppins">
      {/* Bright Mango-Themed Background with Abstract Shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFCF45] via-[#FBA919] to-[#FFCF45]">
        {/* Abstract Mango Shapes */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Large organic blob shapes */}
          <ellipse cx="80%" cy="20%" rx="120" ry="180" fill="#F8CBDF" opacity="0.6" transform="rotate(-25 80 20)" />
          <ellipse cx="15%" cy="60%" rx="100" ry="140" fill="#9CDAEB" opacity="0.5" transform="rotate(15 15 60)" />
          <ellipse cx="85%" cy="75%" rx="90" ry="130" fill="#F8CBDF" opacity="0.4" transform="rotate(-35 85 75)" />
          
          {/* Medium shapes */}
          <circle cx="25%" cy="25%" r="50" fill="#9CDAEB" opacity="0.4" />
          <ellipse cx="70%" cy="50%" rx="70" ry="100" fill="#D1007C" opacity="0.3" transform="rotate(20 70 50)" />
          <circle cx="10%" cy="85%" r="60" fill="#F8CBDF" opacity="0.5" />
          
          {/* Small decorative circles */}
          <circle cx="40%" cy="15%" r="25" fill="#1A1349" opacity="0.2" />
          <circle cx="90%" cy="40%" r="30" fill="#9CDAEB" opacity="0.4" />
          <circle cx="50%" cy="70%" r="20" fill="#D1007C" opacity="0.3" />
          <circle cx="30%" cy="90%" r="35" fill="#FBA919" opacity="0.4" />
          
          {/* Abstract curved lines */}
          <path d="M 0,50 Q 25,30 50,50 T 100,50" stroke="#1A1349" strokeWidth="3" fill="none" opacity="0.15" transform="translate(0, 100)" />
          <path d="M 0,30 Q 30,10 60,30 T 120,30" stroke="#D1007C" strokeWidth="2.5" fill="none" opacity="0.2" transform="translate(50, 200)" />
          
          {/* Star/sparkle decorations */}
          <path d="M 10,10 L 12,16 L 18,18 L 12,20 L 10,26 L 8,20 L 2,18 L 8,16 Z" fill="#FBA919" opacity="0.6" transform="translate(60, 120)" />
          <path d="M 10,10 L 12,16 L 18,18 L 12,20 L 10,26 L 8,20 L 2,18 L 8,16 Z" fill="#D1007C" opacity="0.5" transform="translate(300, 80)" />
          <path d="M 10,10 L 12,16 L 18,18 L 12,20 L 10,26 L 8,20 L 2,18 L 8,16 Z" fill="#9CDAEB" opacity="0.6" transform="translate(150, 400)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 pt-6 pb-12">
        {/* TOP SECTION: Image + Text Block */}
        <div className="flex items-start gap-2 mb-8">
          {/* Man's Image - Top Left, Touching Edge */}
          <div className="flex-shrink-0 -ml-4">
            <img 
              alt="Ahmed Mango" 
              className="w-[140px] h-auto drop-shadow-2xl"
              src="/lovable-uploads/f97809ec-51a9-476f-ac07-23c98169f96d.png"
            />
          </div>

          {/* Text Block - Right Side of Image */}
          <div className="flex-1 pt-4 pr-2">
            {/* Headline */}
            <h1 className="text-5xl font-black leading-tight text-[#1A1349] mb-2">
              أحمد مانجو
            </h1>
            
            {/* Sub-headline */}
            <h2 className="text-2xl font-bold text-[#D1007C] mb-3">
              2استكا أو فاستكا؟
            </h2>
            
            {/* Description */}
            <p className="text-sm font-medium leading-relaxed text-[#1A1349]">
              مراجعات صادقة للمنتجات اليومية<br />
              🍿 لو حلو = ✔️ 2استكا | لو وحش = ✖️ فاستكا
            </p>
          </div>
        </div>

        {/* BUTTONS SECTION - Side by Side */}
        <div className="flex gap-3 px-2">
          {/* Button 1 - Play & Win */}
          <Button 
            className="flex-1 h-12 text-base font-bold text-white rounded-full shadow-lg hover:scale-105 transition-transform"
            style={{ backgroundColor: '#D1007C' }}
          >
            🎮 العب واكسب جوائز
          </Button>

          {/* Button 2 - View Reviews */}
          <Button 
            className="flex-1 h-12 text-base font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: 'white', 
              color: '#1A1349',
              border: '2px solid #1A1349'
            }}
            variant="outline"
          >
            📱 شوف المراجعات
          </Button>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-6 mt-12 px-2">
          <div className="text-center">
            <div className="text-3xl font-black text-[#1A1349] drop-shadow-sm">٥٠٠ ألف +</div>
            <div className="text-xs font-semibold text-[#1A1349]">متابع</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[#1A1349] drop-shadow-sm">١٠٠٠+</div>
            <div className="text-xs font-semibold text-[#1A1349]">منتج مراجع</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[#1A1349] drop-shadow-sm">٢٠٠+</div>
            <div className="text-xs font-semibold text-[#1A1349]">فيديو</div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[100px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C240,100 480,140 720,120 C960,100 1200,140 1440,160 L1440,320 L0,320 Z" fill="#FBA919" opacity="0.3"></path>
          <path d="M0,180 C240,130 480,170 720,150 C960,130 1200,170 1440,180 L1440,320 L0,320 Z" fill="#FFCF45" opacity="0.5"></path>
          <path d="M0,200 C240,150 480,190 720,170 C960,150 1200,190 1440,200 L1440,320 L0,320 Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};
