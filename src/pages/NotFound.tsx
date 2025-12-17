import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 50%, hsl(45, 93%, 58%) 100%)' 
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
      
      {/* Main content */}
      <div className="text-center z-10" dir="rtl">
        {/* Big 404 */}
        <h1 className="font-lalezar text-[150px] md:text-[200px] leading-none text-white drop-shadow-lg mb-0 animate-bounce-in">
          404
        </h1>
        
        {/* Mango emoji decoration */}
        <div className="text-6xl md:text-8xl mb-6 animate-float">
          🥭
        </div>
        
        {/* Arabic message */}
        <h2 className="font-lalezar text-3xl md:text-5xl text-white mb-4 drop-shadow-md">
          أوووبس! الصفحة مش موجودة
        </h2>
        
        <p className="font-tajawal text-lg md:text-xl text-white/90 mb-8 max-w-md mx-auto">
          يبدو إنك ضايع زي المانجا في الصحرا! 
          <br />
          الصفحة دي مش موجودة أو اتنقلت
        </p>
        
        {/* Back to home button */}
        <Link to="/">
          <Button 
            size="lg" 
            className="font-tajawal text-lg bg-white text-primary hover:bg-white/90 shadow-bold gap-2 group"
          >
            <Home className="w-5 h-5" />
            رجوع للصفحة الرئيسية
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            fill="hsl(var(--background))" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
