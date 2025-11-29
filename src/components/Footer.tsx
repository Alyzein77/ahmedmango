import { Music2, Instagram, Facebook, Youtube, Mail, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: "TikTok",
      url: "https://www.tiktok.com/@ahmed_mangoo",
      Icon: Music2
    },
    {
      name: "Instagram", 
      url: "https://www.instagram.com/ahmedmango.official/",
      Icon: Instagram
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@AhmedMango",
      Icon: Youtube
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/AhmedMango.Official/",
      Icon: Facebook
    }
  ];

  return (
    <footer className="relative bg-secondary text-secondary-foreground pt-16 pb-8 px-4 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-pink/10 rounded-full" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Logo */}
          <div className="md:col-span-1 text-center md:text-right">
            <div className="text-4xl mb-3">🥭</div>
            <h3 className="text-2xl font-black mb-3">
              أحمد مانجو
            </h3>
            <p className="text-secondary-foreground/80 leading-relaxed text-sm">
              مراجعات صادقة للمنتجات اليومية<br />
              2استكا أو فاستكا - مافيش وسط!
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-4 text-primary">روابط سريعة</h4>
            <ul className="space-y-2 text-secondary-foreground/80 text-sm">
              <li><a href="#products" className="hover:text-primary transition-colors">المراجعات</a></li>
              <li><a href="#game" className="hover:text-primary transition-colors">العب واكسب</a></li>
              <li><a href="#videos" className="hover:text-primary transition-colors">الفيديوهات</a></li>
              <li><a href="#feeds" className="hover:text-primary transition-colors">السوشيال ميديا</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-4 text-primary">معلومات</h4>
            <ul className="space-y-2 text-secondary-foreground/80 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <FileText className="w-4 h-4" />
                  من نحن
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Shield className="w-4 h-4" />
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <FileText className="w-4 h-4" />
                  الشروط والأحكام
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-4 text-primary">تواصل معنا</h4>
            
            {/* Social Icons */}
            <div className="flex gap-3 justify-center md:justify-start mb-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-primary flex items-center justify-center hover:scale-110 transition-all group"
                  aria-label={social.name}
                >
                  <social.Icon className="w-5 h-5 text-secondary-foreground group-hover:text-primary-foreground" />
                </a>
              ))}
            </div>
            
            {/* Contact Button */}
            <Button 
              variant="outline"
              className="rounded-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.location.href = 'mailto:business@ahmedmango.com'}
            >
              <Mail className="w-4 h-4 ml-2" />
              تواصل للإعلانات
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-secondary-foreground/60 text-sm">
            <p>© {currentYear} أحمد مانجو. جميع الحقوق محفوظة 🥭</p>
            <p>صنع بـ ❤️ في مصر</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
