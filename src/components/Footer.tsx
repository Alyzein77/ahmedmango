export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-black mb-3">
              🥭 أحمد مانجو
            </h3>
            <p className="text-secondary-foreground/80 leading-relaxed">
              مراجعات صادقة للمنتجات اليومية<br />
              2استكا أو فاستكا - مافيش وسط!
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="font-bold text-lg mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">المراجعات</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">العب واكسب</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">الفائزين</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-3">تابعنا</h4>
            <div className="flex gap-4 justify-center md:justify-start text-2xl">
              <a href="https://www.tiktok.com/@ahmed_mangoo" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">📱</a>
              <a href="https://www.instagram.com/ahmedmango.official/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">📸</a>
              <a href="https://www.facebook.com/AhmedMango.Official/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">👍</a>
            </div>
            <p className="text-secondary-foreground/60 text-sm mt-4">
              للتعاون والإعلانات:<br />
              <a href="mailto:business@ahmedmango.com" className="hover:text-primary transition-colors">
                business@ahmedmango.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/20 pt-6 text-center text-secondary-foreground/60 text-sm">
          <p>© {currentYear} أحمد مانجو. جميع الحقوق محفوظة 🥭</p>
          <p className="mt-2">صنع بـ ❤️ في مصر</p>
        </div>
      </div>
    </footer>
  );
};
