import { Button } from "@/components/ui/button";
import { Menu, X, Megaphone } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMixpanel } from "@/hooks/useMixpanel";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { trackButtonClick } = useMixpanel();

  const navLinks = [
    { title: "الرئيسية", href: "#hero" },
    { title: "المنتجات", href: "/products", isPage: true },
    { title: "العب واكسب", href: "#game" },
    { title: "الفيديوهات", href: "/content", isPage: true },
    { title: "عن أحمد", href: "/about", isPage: true },
  ];

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    trackButtonClick(href, 'navbar');

    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-sky border-b-4 border-foreground">
      <div className="container mx-auto px-3 sm:px-4 bg-[#9ad8ea]">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <img
              alt="Mango Snacks Logo"
              className="h-[5.625rem] sm:h-[6.75rem] w-auto"
              src="/lovable-uploads/88e2436f-26ab-4234-a5ba-a613e3bc664f.png"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => trackButtonClick(link.title, 'navbar')}
                  className="text-foreground text-sm font-black uppercase tracking-wide hover:text-accent transition-colors relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-200" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-foreground text-sm font-black uppercase tracking-wide hover:text-accent transition-colors relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-200" />
                </a>
              )
            )}

            {/* Advertise CTA */}
            <Link to="/advertise" onClick={() => trackButtonClick('أعلن معانا', 'navbar')}>
              <Button variant="accent" className="text-sm font-black uppercase tracking-wide rounded-lg">
                <Megaphone className="w-4 h-4 ml-1" />
                أعلن معانا
              </Button>
            </Link>

            {/* Game CTA */}
            <Button
              className="text-sm font-black uppercase tracking-wide rounded-lg"
              onClick={() => {
                trackButtonClick('ابدأ اللعب', 'navbar');
                window.open(
                  'https://www.kharbsh.com/ahmed-mango/campaign/3775071ae46c47f4b41f5688e66406a0',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            >
              🎮 ابدأ اللعب
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 bg-primary border-2 border-foreground rounded-lg shadow-bold-sm hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t-2 border-foreground animate-slide-up bg-background">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.isPage ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      trackButtonClick(link.title, 'navbar-mobile');
                    }}
                    className="text-foreground font-black uppercase py-3 px-4 hover:bg-primary rounded-lg transition-colors text-right"
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
                    className="text-foreground font-black uppercase py-3 px-4 hover:bg-primary rounded-lg transition-colors text-right"
                  >
                    {link.title}
                  </a>
                )
              )}

              {/* Mobile Advertise CTA */}
              <Link
                to="/advertise"
                onClick={() => {
                  setIsMenuOpen(false);
                  trackButtonClick('أعلن معانا', 'navbar-mobile');
                }}
                className="mt-2"
              >
                <Button variant="accent" className="font-black uppercase rounded-lg w-full h-12">
                  <Megaphone className="w-4 h-4 ml-1" />
                  أعلن معانا
                </Button>
              </Link>

              <Button
                className="font-black uppercase rounded-lg w-full mt-2 h-12"
                onClick={() => {
                  trackButtonClick('ابدأ اللعب', 'navbar-mobile');
                  window.open(
                    'https://www.kharbsh.com/ahmed-mango/campaign/3775071ae46c47f4b41f5688e66406a0',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
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
