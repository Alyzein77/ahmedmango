import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
type ProductRating = "tasteka" | "fasteka";
interface Product {
  id: number;
  name: string;
  image: string;
  rating: ProductRating;
  note: string;
  category: string;
}
const mockProducts: Product[] = [{
  id: 1,
  name: "شيبسي بالكبدة والكفتة",
  image: "/lovable-uploads/chipsy-kebda-kofta.jpg",
  rating: "tasteka",
  note: "طعم جديد ومختلف 😂🙀",
  category: "سناكس"
}, {
  id: 2,
  name: "أصلي ولا التقليد؟",
  image: "/lovable-uploads/asly-vs-takleed.jpg",
  rating: "tasteka",
  note: "مقارنة بين الأصلي والتقليد",
  category: "مقارنات"
}, {
  id: 3,
  name: "أغرب مشروب ممكن تشربه",
  image: "/lovable-uploads/aghrab-mashroub.jpg",
  rating: "fasteka",
  note: "مشروب حار غريب 🥵🌶️",
  category: "مشروبات"
}, {
  id: 4,
  name: "مشروبات الشتاء وبرد المروحة",
  image: "/lovable-uploads/mashrobat-shita.jpg",
  rating: "tasteka",
  note: "مشروبات دافية للشتاء 🥶😊",
  category: "مشروبات"
}, {
  id: 3,
  name: "بسكوت بالتيراميسو",
  image: "/lovable-uploads/biskrem-tiramisu.jpg",
  rating: "tasteka",
  note: "أول مرة اجربه 😍🥮",
  category: "بسكويت"
}, {
  id: 4,
  name: "شيتوس نوتيلا كيندر",
  image: "/lovable-uploads/cheetos-nutella-kinder.jpg",
  rating: "tasteka",
  note: "خليط غريب بس لذيذ 🐯🌰🍫",
  category: "سناكس"
}, {
  id: 5,
  name: "شيبسي بطعم البطيخ",
  image: "/lovable-uploads/chipsy-watermelon.jpg",
  rating: "fasteka",
  note: "جربته وكان غريب 🍉😂",
  category: "سناكس"
}, {
  id: 6,
  name: "فاكهة مجففة بـ4333 جنيه",
  image: "/lovable-uploads/freeze-dried-fruit.jpg",
  rating: "fasteka",
  note: "سعر الكيلو غالي جداً 🤑🍓🍌",
  category: "سناكس"
}, {
  id: 7,
  name: "فيديو مش ليك لو مولود بعد 2000",
  image: "/lovable-uploads/2000-video.jpg",
  rating: "tasteka",
  note: "ذكريات الطفولة 😂🥤",
  category: "فيديوهات"
}, {
  id: 8,
  name: "للرجال فقط! 🤓⚠️",
  image: "/lovable-uploads/for-men-only.jpg",
  rating: "tasteka",
  note: "منتج مخصوص للرجال",
  category: "عناية"
}, {
  id: 9,
  name: "أغرب أنواع العسل 🍯🐝",
  image: "/lovable-uploads/strangest-honey.jpg",
  rating: "tasteka",
  note: "عسل بأشكال غريبة",
  category: "طعام"
}, {
  id: 8,
  name: "عصير تروبيكانا",
  image: "/placeholder.svg",
  rating: "fasteka",
  note: "فيه سكر كتير",
  category: "مشروبات"
}, {
  id: 9,
  name: "كيت كات",
  image: "/placeholder.svg",
  rating: "tasteka",
  note: "الويفر مقرمش",
  category: "حلويات"
}];
export const ProductList = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | ProductRating>("all");
  const [visibleCount, setVisibleCount] = useState(4);
  const filteredProducts = activeFilter === "all" ? mockProducts : mockProducts.filter(p => p.rating === activeFilter);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  return <section id="products" className="py-10 sm:py-16 px-3 sm:px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary mb-2 sm:mb-3 font-lalezar">قائمة المنتجات </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto px-4 font-tajawal">
            كل المنتجات اللي راجعتها بتقييم صادق
          </p>
        </div>

        {/* Filter Tabs - Scrollable on mobile */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 px-2">
          <Button variant={activeFilter === "all" ? "default" : "outline"} onClick={() => setActiveFilter("all")} className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap h-9 sm:h-10 ${activeFilter === "all" ? "bg-secondary text-secondary-foreground" : "border-secondary/30 text-secondary hover:bg-secondary/10"}`}>
            الكل
          </Button>
          <Button variant={activeFilter === "tasteka" ? "default" : "outline"} onClick={() => setActiveFilter("tasteka")} className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap h-9 sm:h-10 ${activeFilter === "tasteka" ? "bg-primary text-primary-foreground" : "border-primary/30 text-secondary hover:bg-primary/10"}`}>
            <Check className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            2استكا
          </Button>
          <Button variant={activeFilter === "fasteka" ? "default" : "outline"} onClick={() => setActiveFilter("fasteka")} className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap h-9 sm:h-10 ${activeFilter === "fasteka" ? "bg-accent text-accent-foreground" : "border-accent/30 text-secondary hover:bg-accent/10"}`}>
            <X className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            فاستكا
          </Button>
        </div>

        {/* Product Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {visibleProducts.map((product, idx) => <Card key={product.id} className="group relative overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up" style={{
          animationDelay: `${idx * 0.05}s`
        }}>
              {/* Rating Badge */}
              <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${product.rating === "tasteka" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                {product.rating === "tasteka" ? <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} /> : <X className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} />}
              </div>

              {/* Decorative mango shape */}
              <div className={`absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-20 ${product.rating === "tasteka" ? "bg-primary" : "bg-accent"}`} />

              {/* Product Image */}
              <div className="relative aspect-square bg-muted/50 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-2.5 sm:p-4 relative">
                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-0.5 sm:mb-1 block">
                  {product.category}
                </span>
                <h3 className="font-bold text-secondary text-sm sm:text-lg mb-0.5 sm:mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-1">
                  {product.note}
                </p>
                <Button size="sm" className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 text-[10px] sm:text-sm h-8 sm:h-9">
                  شوف الريڤيو 🎬
                </Button>
              </div>
            </Card>)}
        </div>

        {/* Load More */}
        {hasMore && <div className="text-center mt-6 sm:mt-8">
            <Button variant="outline" onClick={() => setVisibleCount(prev => prev + 4)} className="rounded-full font-bold px-6 sm:px-8 border-secondary/30 text-secondary hover:bg-secondary/10 h-10 sm:h-11">
              تحميل المزيد ⬇️
            </Button>
          </div>}
      </div>
    </section>;
};
