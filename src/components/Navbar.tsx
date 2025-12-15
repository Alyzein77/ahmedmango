import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [{
    title: "الرئيسية",
    href: "#hero"
  }, {
    title: "المنتجات",
    href: "/products",
    isPage: true
  }, {
    title: "العب واكسب",
    href: "#game"
  }, {
    title: "الفيديوهات",
    href: "#videos"
  }, {
    title: "تابعنا",
    href: "#feeds"
  }, {
    title: "من نحن",
    href: "/about",
    isPage: true
  }];
  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <nav className="sticky top-0 z-50 bg-sky border-b-4 border-foreground">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <img alt="Mango Snacks Logo" className="h-[5.625rem] sm:h-[6.75rem] w-auto" src="/lovable-uploads/88e2436f-26ab-4234-a5ba-a613e3bc664f.png" />
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map(link => link.isPage ? <Link key={link.href} to={link.href} className="text-foreground text-sm font-black uppercase tracking-wide hover:text-accent transition-colors relative group">
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-200" />
                </Link> : <a key={link.href} href={link.href} onClick={e => {
            e.preventDefault();
            scrollToSection(link.href);
          }} className="text-foreground text-sm font-black uppercase tracking-wide hover:text-accent transition-colors relative group">
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-200" />
                </a>)}
            <Button className="text-sm font-black uppercase tracking-wide rounded-lg" onClick={() => scrollToSection("#game")}>
              🎮 ابدأ اللعب
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 bg-primary border-2 border-foreground rounded-lg shadow-bold-sm hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden py-3 border-t-2 border-foreground animate-slide-up bg-background">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => link.isPage ? <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)} className="text-foreground font-black uppercase py-3 px-4 hover:bg-primary rounded-lg transition-colors text-right">
                    {link.title}
                  </Link> : <a key={link.href} href={link.href} onClick={e => {
            e.preventDefault();
            scrollToSection(link.href);
          }} className="text-foreground font-black uppercase py-3 px-4 hover:bg-primary rounded-lg transition-colors text-right">
                    {link.title}
                  </a>)}
              <Button className="font-black uppercase rounded-lg w-full mt-2 h-12" onClick={() => scrollToSection("#game")}>
                🎮 ابدأ اللعب
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
