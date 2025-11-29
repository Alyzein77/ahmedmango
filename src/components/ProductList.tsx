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

const mockProducts: Product[] = [
  { id: 1, name: "شيبسي تشيلي", image: "/placeholder.svg", rating: "tasteka", note: "طعمه حلو وسعره كويس", category: "سناكس" },
  { id: 2, name: "بسكويت أوريو", image: "/placeholder.svg", rating: "tasteka", note: "كريمي ولذيذ", category: "بسكويت" },
  { id: 3, name: "عصير فريش", image: "/placeholder.svg", rating: "fasteka", note: "طعمه صناعي", category: "مشروبات" },
  { id: 4, name: "شوكولاتة جالكسي", image: "/placeholder.svg", rating: "tasteka", note: "ناعمة وكريمية", category: "حلويات" },
  { id: 5, name: "بطاطس ليز", image: "/placeholder.svg", rating: "fasteka", note: "مالحة زيادة", category: "سناكس" },
  { id: 6, name: "آيس كريم كواليتي", image: "/placeholder.svg", rating: "tasteka", note: "طعم الفانيليا رهيب", category: "آيس كريم" },
  { id: 7, name: "عصير تروبيكانا", image: "/placeholder.svg", rating: "fasteka", note: "فيه سكر كتير", category: "مشروبات" },
  { id: 8, name: "كيت كات", image: "/placeholder.svg", rating: "tasteka", note: "الويفر مقرمش", category: "حلويات" },
];

export const ProductList = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | ProductRating>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredProducts = activeFilter === "all" 
    ? mockProducts 
    : mockProducts.filter(p => p.rating === activeFilter);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section id="products" className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-3">
            قائمة المنتجات 📋
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            كل المنتجات اللي راجعتها بتقييم صادق
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => setActiveFilter("all")}
            className={`rounded-full font-bold px-6 ${
              activeFilter === "all" 
                ? "bg-secondary text-secondary-foreground" 
                : "border-secondary/30 text-secondary hover:bg-secondary/10"
            }`}
          >
            الكل
          </Button>
          <Button
            variant={activeFilter === "tasteka" ? "default" : "outline"}
            onClick={() => setActiveFilter("tasteka")}
            className={`rounded-full font-bold px-6 ${
              activeFilter === "tasteka" 
                ? "bg-primary text-primary-foreground" 
                : "border-primary/30 text-secondary hover:bg-primary/10"
            }`}
          >
            <Check className="w-4 h-4 ml-1" />
            2استكا
          </Button>
          <Button
            variant={activeFilter === "fasteka" ? "default" : "outline"}
            onClick={() => setActiveFilter("fasteka")}
            className={`rounded-full font-bold px-6 ${
              activeFilter === "fasteka" 
                ? "bg-accent text-accent-foreground" 
                : "border-accent/30 text-secondary hover:bg-accent/10"
            }`}
          >
            <X className="w-4 h-4 ml-1" />
            فاستكا
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {visibleProducts.map((product, idx) => (
            <Card 
              key={product.id}
              className="group relative overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Rating Badge */}
              <div className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                product.rating === "tasteka" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-accent text-accent-foreground"
              }`}>
                {product.rating === "tasteka" ? (
                  <Check className="w-5 h-5" strokeWidth={3} />
                ) : (
                  <X className="w-5 h-5" strokeWidth={3} />
                )}
              </div>

              {/* Decorative mango shape */}
              <div className={`absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-20 ${
                product.rating === "tasteka" ? "bg-primary" : "bg-accent"
              }`} />

              {/* Product Image */}
              <div className="relative aspect-square bg-muted/50 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 relative">
                <span className="text-xs font-medium text-muted-foreground mb-1 block">
                  {product.category}
                </span>
                <h3 className="font-bold text-secondary text-lg mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                  {product.note}
                </p>
                <Button 
                  size="sm"
                  className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  شوف الريڤيو 🎬
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="rounded-full font-bold px-8 border-secondary/30 text-secondary hover:bg-secondary/10"
            >
              تحميل المزيد ⬇️
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
