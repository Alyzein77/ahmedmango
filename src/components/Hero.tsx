import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen overflow-hidden font-poppins"
      style={{
        background: `
          linear-gradient(135deg, #FFCF45 0%, #F8CBDF 25%, #9CDAEB 50%, #FFCF45 75%, #FBA919 100%),
          radial-gradient(circle at 20% 30%, #F8CBDF 0%, transparent 50%),
          radial-gradient(circle at 80% 60%, #9CDAEB 0%, transparent 40%)
        `,
      }}
    >
      {/* Abstract Mango Shapes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large mango shapes */}
        <div className="absolute top-10 left-10 w-32 h-40 rounded-full opacity-30 blur-2xl" style={{ background: '#FBA919' }} />
        <div className="absolute top-40 right-20 w-40 h-48 rounded-full opacity-25 blur-3xl" style={{ background: '#D1007C' }} />
        <div className="absolute bottom-32 left-1/4 w-36 h-44 rounded-full opacity-20 blur-2xl" style={{ background: '#9CDAEB' }} />
        <div className="absolute top-1/2 right-10 w-28 h-36 rounded-full opacity-30 blur-xl" style={{ background: '#F8CBDF' }} />
        
        {/* Small decorative circles */}
        <div className="absolute top-20 right-1/3 w-8 h-8 rounded-full" style={{ background: '#1A1349', opacity: 0.4 }} />
        <div className="absolute bottom-40 right-20 w-6 h-6 rounded-full" style={{ background: '#D1007C', opacity: 0.5 }} />
        <div className="absolute top-1/3 left-20 w-10 h-10 rounded-full" style={{ background: '#FFCF45', opacity: 0.3 }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 px-4 pt-8 pb-12">
        
        {/* TOP SECTION: Image + Text Side by Side */}
        <div className="flex items-start gap-4 mb-8">
          
          {/* Man's Image - Top Left, Touching Edge */}
          <div className="flex-shrink-0 -ml-4">
            <img 
              src="/lovable-uploads/f97809ec-51a9-476f-ac07-23c98169f96d.png" 
              alt="Ahmed Mango Mascot" 
              className="w-36 h-auto drop-shadow-2xl"
            />
          </div>

          {/* Text Block - Right Side of Image */}
          <div className="flex-1 pt-4 text-right">
            {/* Headline */}
            <h1 className="text-4xl font-black leading-tight mb-2" style={{ color: '#1A1349' }}>
              أحمد مانجو
            </h1>
            
            {/* Sub-headline */}
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#D1007C' }}>
              2استكا أو فاستكا؟
            </h2>
            
            {/* Description */}
            <p className="text-sm font-medium leading-relaxed" style={{ color: '#1A1349' }}>
              مراجعات صادقة للمنتجات اليومية<br />
              🍿 لو حلو = ✔️ 2استكا | لو وحش = ✖️ فاستكا
            </p>
          </div>
        </div>

        {/* BUTTONS SECTION - Side by Side */}
        <div className="flex gap-3 px-2">
          <Button 
            size="lg"
            className="flex-1 font-bold text-white rounded-full text-sm py-6 shadow-lg hover:scale-105 transition-transform"
            style={{ background: '#D1007C' }}
          >
            العب واكسب جوائز
          </Button>
          
          <Button 
            size="lg"
            className="flex-1 font-bold rounded-full text-sm py-6 shadow-lg hover:scale-105 transition-transform"
            style={{ background: 'white', color: '#1A1349' }}
          >
            شوف المراجعات
          </Button>
        </div>

      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[120px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C240,100 480,140 720,120 C960,100 1200,140 1440,160 L1440,320 L0,320 Z" fill="#FFCF45" opacity="0.3"></path>
          <path d="M0,180 C240,130 480,170 720,150 C960,130 1200,170 1440,180 L1440,320 L0,320 Z" fill="#FBA919" opacity="0.5"></path>
          <path d="M0,200 C240,150 480,190 720,170 C960,150 1200,190 1440,200 L1440,320 L0,320 Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};