import { useState, useEffect } from "react";
import { Music2, Instagram, Facebook, Youtube, Mail, FileText, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  display_order: number | null;
}

// Fallback icons for known platforms
const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  TikTok: Music2,
  Instagram: Instagram,
  YouTube: Youtube,
  Facebook: Facebook,
};

const openExternalLink = (url: string) => {
  const absoluteUrl = url.startsWith('http') ? url : `https://${url}`;
  const newWindow = window.open(absoluteUrl, "_blank", "noopener,noreferrer");
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    window.location.href = absoluteUrl;
  }
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("id, platform, url, icon, display_order")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setSocialLinks(data);
      }
    };

    fetchSocialLinks();
  }, []);

  // Social links are now fetched from the database

  return (
    <footer className="relative bg-secondary text-secondary-foreground pt-10 sm:pt-16 pb-6 sm:pb-8 px-3 sm:px-4 overflow-hidden border-t-4 border-foreground">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand & Logo */}
          <div className="text-center md:text-right flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/88e2436f-26ab-4234-a5ba-a613e3bc664f.png" 
              alt="أحمد مانجو" 
              className="h-28 sm:h-32 w-auto mb-2 sm:mb-3"
            />
            <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3 uppercase">
              أحمد مانجو
            </h3>
            <p className="text-secondary-foreground/80 leading-relaxed text-xs sm:text-sm font-medium">
              أنا مش بعمل مراجعة، أنا بحكي حكاية ✨
            </p>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-right relative z-20 flex flex-col items-center md:items-start">
            <h4 className="font-black text-sm sm:text-lg mb-3 sm:mb-4 text-primary uppercase">معلومات</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-secondary-foreground/80 text-xs sm:text-sm font-bold">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2 justify-center md:justify-start">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2 justify-center md:justify-start">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2 justify-center md:justify-start">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right flex flex-col items-center md:items-start">
            <h4 className="font-black text-sm sm:text-lg mb-3 sm:mb-4 text-primary uppercase">تواصل معنا</h4>
            
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 justify-center mb-3 sm:mb-4 flex-wrap">
              {socialLinks.map((social) => {
                const IconComponent = platformIcons[social.platform];
                return (
                  <button 
                    key={social.id}
                    type="button"
                    onClick={() => openExternalLink(social.url)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary border-2 border-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                    aria-label={social.platform}
                    title={social.platform}
                  >
                    {social.icon ? (
                      <span className="text-lg pointer-events-none">{social.icon}</span>
                    ) : IconComponent ? (
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground pointer-events-none" />
                    ) : (
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Contact Button */}
            <Link to="/advertise">
              <Button 
                variant="outline"
                className="rounded-lg text-xs sm:text-sm h-9 sm:h-10 px-4 bg-primary text-primary-foreground border-2 border-primary-foreground font-black uppercase"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                تواصل للإعلانات
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-secondary-foreground/30 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4 text-secondary-foreground/80 text-xs sm:text-sm font-bold">
            <p>© {currentYear} أحمد مانجو. جميع الحقوق محفوظة 🥭</p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p>صنع بـ ❤️ في مصر</p>
              <span className="hidden md:inline">•</span>
              <a 
                href="https://www.risca.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors font-bold"
              >
                Made by Risca.dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
