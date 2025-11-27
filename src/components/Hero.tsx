import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden font-poppins pt-12 pb-24">
      {/* Premium Abstract Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCF45] via-[#FBA919]/90 to-[#FFCF45]" />
        
        {/* Layered curves with depth */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Large soft organic shapes - back layer */}
          <ellipse cx="90%" cy="20%" rx="200" ry="280" fill="#F8CBDF" opacity="0.25" />
          <ellipse cx="5%" cy="60%" rx="180" ry="240" fill="#9CDAEB" opacity="0.2" />
          
          {/* Mid layer curves */}
          <ellipse cx="80%" cy="75%" rx="150" ry="200" fill="#F8CBDF" opacity="0.2" />
          <ellipse cx="15%" cy="30%" rx="100" ry="140" fill="#9CDAEB" opacity="0.15" />
          
          {/* Subtle accent shapes */}
          <circle cx="85%" cy="50%" r="60" fill="#D1007C" opacity="0.1" />
          <circle cx="10%" cy="80%" r="40" fill="#FBA919" opacity="0.15" />
          
          {/* Very subtle small highlights */}
          <circle cx="70%" cy="25%" r="20" fill="#1A1349" opacity="0.05" />
          <circle cx="25%" cy="70%" r="15" fill="#D1007C" opacity="0.1" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 max-w-md">
        
        {/* Main Content Grid: Image Left, Text Right */}
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center mb-10">
          
          {/* MAN IMAGE - Left Side */}
          <div className="relative flex-shrink-0 -ml-4">
            {/* Subtle shadow behind */}
            <div className="absolute inset-0 bg-[#1A1349]/10 rounded-full blur-2xl scale-90 translate-y-2" />
            <img 
              alt="Ahmed Mango" 
              className="relative w-[140px] h-auto drop-shadow-xl" 
              src="/lovable-uploads/f97809ec-51a9-476f-ac07-23c98169f96d.png" 
            />
          </div>

          {/* TEXT BLOCK - Right Side */}
          <div className="text-right space-y-3">
            {/* Main Heading */}
            <h1 
              className="text-4xl leading-none text-[#1A1349] font-extrabold tracking-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              أحمد مانجو
            </h1>
            
            {/* Subheading with Color Variation */}
            <h2 className="text-xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span className="text-[#1A1349]">2استكا</span>{" "}
              <span className="text-[#D1007C]">أو فاستكا؟</span>
            </h2>
            
            {/* Description */}
            <div className="text-sm font-medium leading-relaxed text-[#1A1349] space-y-1">
              <p>مراجعات صادقة للمنتجات اليومية 🍿</p>
              <p className="flex items-center justify-end gap-1">
                <span>✔️ لو حلو = 2استكا</span>
              </p>
              <p className="flex items-center justify-end gap-1">
                <span>✖️ لو وحش = فاستكا</span>
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS SECTION - Two Horizontal Buttons */}
        <div className="flex justify-center gap-2 mb-10">
          {/* Button 1 - Play & Win (Primary Orange Gradient) */}
          <Button 
            className="h-9 px-4 text-xs font-bold text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 border-0"
            style={{
              background: 'linear-gradient(135deg, #FBA919 0%, #FFCF45 100%)',
              boxShadow: '0 6px 16px -4px rgba(251, 169, 25, 0.5)'
            }}
          >
            <span>العب واكسب جوائز 🎮</span>
          </Button>

          {/* Button 2 - View Reviews (Secondary White) */}
          <Button 
            className="h-9 px-4 text-xs font-bold rounded-full hover:scale-105 transition-all duration-300"
            style={{
              backgroundColor: 'white',
              color: '#1A1349',
              border: '2px solid #1A1349',
              boxShadow: 'inset 0 2px 4px rgba(26, 19, 73, 0.08)'
            }}
            variant="outline"
          >
            <span>شوف المراجعات 📱</span>
          </Button>
        </div>

        {/* STATS ROW - Premium Layout */}
        <div className="flex justify-center items-start gap-8">
          {/* Stat 1 */}
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-base font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +٥٠٠ ألف
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">متابع</div>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-base font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +١٠٠٠
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">منتج مراجع</div>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <Sparkles className="w-4 h-4 text-[#D1007C]/60 mx-auto mb-1" />
            <div className="text-base font-semibold text-[#1A1349]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              +٢٠٠
            </div>
            <div className="text-[10px] font-medium text-[#1A1349]/70">فيديو</div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[80px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C240,120 480,140 720,130 C960,120 1200,140 1440,160 L1440,320 L0,320 Z" fill="#FBA919" opacity="0.3"></path>
          <path d="M0,180 C240,150 480,170 720,160 C960,150 1200,170 1440,180 L1440,320 L0,320 Z" fill="#FFCF45" opacity="0.4"></path>
          <path d="M0,200 C240,170 480,190 720,180 C960,170 1200,190 1440,200 L1440,320 L0,320 Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};
