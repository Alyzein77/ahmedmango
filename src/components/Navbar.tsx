import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import mangoLogo from "@/assets/mango-logo.jpg";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: "الرئيسية", href: "#hero" },
    { title: "نظام التقييم", href: "#rating" },
    { title: "العب واكسب", href: "#rewards" },
    { title: "الفائزين", href: "#winners" },
    { title: "تابعنا", href: "#social" },
  ];

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b-2 border-primary/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - on the right in RTL */}
          <a 
            href="#" 
            className="flex items-center gap-3 hover:scale-105 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img 
              src={mangoLogo} 
              alt="Mango Snacks Logo" 
              className="h-12 w-auto"
            />
            <span className="text-2xl font-black text-secondary">
              أحمد مانجو
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-foreground font-bold hover:text-primary transition-colors relative group"
              >
                {link.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <Button 
              className="bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform rounded-full"
              onClick={() => scrollToSection("#rewards")}
            >
              🎮 ابدأ اللعب
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 animate-slide-up">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-foreground font-bold py-2 px-4 hover:bg-primary/10 rounded-lg transition-colors text-right"
                >
                  {link.title}
                </a>
              ))}
              <Button 
                className="bg-primary text-primary-foreground font-bold rounded-full w-full"
                onClick={() => scrollToSection("#rewards")}
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
