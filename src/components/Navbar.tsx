import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { title: "الرئيسية", href: "#hero" },
    { title: "المنتجات", href: "#products" },
    { title: "العب واكسب", href: "#game" },
    { title: "الفيديوهات", href: "#videos" },
    { title: "تابعنا", href: "#feeds" },
    { title: "من نحن", href: "/about", isPage: true },
  ];
  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 hover:scale-105 transition-transform" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img 
              alt="Mango Snacks Logo" 
              className="h-10 sm:h-12 w-auto" 
              src="/lovable-uploads/88e2436f-26ab-4234-a5ba-a613e3bc664f.png" 
            />
            <span className="font-black text-lg sm:text-xl text-primary">
              أحمد مانجو
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link 
                  key={link.href} 
                  to={link.href}
                  className="text-foreground text-sm font-bold hover:text-primary transition-colors relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }} 
                  className="text-foreground text-sm font-bold hover:text-primary transition-colors relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              )
            ))}
            <Button 
              className="bg-primary text-primary-foreground text-sm font-bold hover:scale-105 transition-transform rounded-full px-4" 
              onClick={() => scrollToSection("#game")}
            >
              🎮 ابدأ اللعب
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors active:scale-95" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-primary/20 animate-slide-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                link.isPage ? (
                  <Link 
                    key={link.href} 
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground font-bold py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors text-right active:bg-primary/20"
                  >
                    {link.title}
                  </Link>
                ) : (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }} 
                    className="text-foreground font-bold py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors text-right active:bg-primary/20"
                  >
                    {link.title}
                  </a>
                )
              ))}
              <Button 
                className="bg-primary text-primary-foreground font-bold rounded-full w-full mt-2 h-12" 
                onClick={() => scrollToSection("#game")}
              >
                🎮 ابدأ اللعب
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};