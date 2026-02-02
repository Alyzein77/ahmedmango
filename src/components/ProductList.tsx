import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useMixpanel } from "@/hooks/useMixpanel";
import { useTrackSection } from "@/hooks/useTrackSection";

interface Product {
  id: string;
  name: string;
  thumbnail_url: string | null;
  verdict: string;
  short_note: string | null;
  category: string;
  review_url: string | null;
}

export const ProductList = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "2استكا" | "فاستكا">("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { trackProductClick, trackFilterChange } = useMixpanel();
  const sectionRef = useTrackSection('Products Section');

  const handleFilterChange = (filter: "all" | "2استكا" | "فاستكا") => {
    setActiveFilter(filter);
    trackFilterChange('verdict', filter, 'homepage');
  };

  const handleProductClick = (product: Product, index: number) => {
    trackProductClick(product.id, product.name, {
      action: 'view_review',
      category: product.category,
      verdict: product.verdict as '2استكا' | 'فاستكا',
      source: 'homepage',
      position: index + 1,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [activeFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("id, name, thumbnail_url, verdict, short_note, category, review_url")
      .order("ranking", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(15);

    if (activeFilter !== "all") {
      query = query.eq("verdict", activeFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} id="products" className="py-10 sm:py-16 px-3 sm:px-4 bg-primary relative overflow-hidden">
      {/* Feastables-style diagonal stripes pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            hsl(var(--foreground)) 0px,
            hsl(var(--foreground)) 3px,
            transparent 3px,
            transparent 20px
          )`
        }} 
      />
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2 sm:mb-3 font-lalezar">
            قائمة المنتجات
          </h2>
          <p className="text-foreground/80 text-sm sm:text-lg max-w-xl mx-auto px-4 font-tajawal font-bold">
            كل المنتجات اللي راجعتها بتقييم صادق
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 px-2 relative z-10">
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"} 
            onClick={() => handleFilterChange("all")} 
            className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap h-9 sm:h-10 border-2 border-foreground ${
              activeFilter === "all" 
                ? "bg-secondary text-secondary-foreground shadow-bold-sm" 
                : "bg-background text-foreground hover:bg-secondary/10"
            }`}
          >
            الكل
          </Button>
          <Button 
            variant={activeFilter === "2استكا" ? "default" : "outline"} 
            onClick={() => handleFilterChange("2استكا")} 
            className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap h-9 sm:h-10 border-2 border-foreground ${
              activeFilter === "2استكا" 
                ? "bg-sky text-foreground shadow-bold-sm" 
                : "bg-background text-foreground hover:bg-sky/10"
            }`}
          >
            <Check className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            2استكا
          </Button>
          <Button 
            variant={activeFilter === "فاستكا" ? "default" : "outline"} 
            onClick={() => handleFilterChange("فاستكا")} 
            className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap h-9 sm:h-10 border-2 border-foreground ${
              activeFilter === "فاستكا" 
                ? "bg-accent text-accent-foreground shadow-bold-sm" 
                : "bg-background text-foreground hover:bg-accent/10"
            }`}
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            فاستكا
          </Button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12 relative z-10">
            <Loader2 className="w-8 h-8 text-foreground animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 relative z-10">
            <p className="text-foreground/80 font-tajawal">مفيش منتجات لسه</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative z-10">
            {products.map((product, idx) => (
              <Card 
                key={product.id} 
                className="group relative overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-slide-up flex flex-col h-full" 
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Rating Badge */}
                <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
                  product.verdict === "2استكا" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-accent-foreground"
                }`}>
                  {product.verdict === "2استكا" 
                    ? <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} /> 
                    : <X className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} />
                  }
                </div>

                {/* Decorative shape */}
                <div className={`absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-20 ${
                  product.verdict === "2استكا" ? "bg-primary" : "bg-accent"
                }`} />

                {/* Product Image */}
                <div className="relative aspect-square bg-sky/20 overflow-hidden">
                  <img 
                    src={product.thumbnail_url || "/placeholder.svg"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>

                {/* Product Info */}
                <div className="p-2.5 sm:p-4 relative flex-1 flex flex-col">
                  <span className="text-[10px] sm:text-xs font-bold text-accent mb-0.5 sm:mb-1 block uppercase">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-foreground text-sm sm:text-lg mb-0.5 sm:mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-foreground/70 mb-2 sm:mb-3 line-clamp-1 font-medium flex-1">
                    {product.short_note || ""}
                  </p>
                  <div className="mt-auto">
                    {product.review_url ? (
                      <a 
                        href={product.review_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleProductClick(product, idx)}
                      >
                        <Button size="sm" className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 text-[10px] sm:text-sm h-8 sm:h-9">
                          شوف الريڤيو 🎬
                        </Button>
                      </a>
                    ) : (
                      <Button size="sm" disabled className="w-full rounded-full font-bold text-[10px] sm:text-sm h-8 sm:h-9">
                        الريڤيو قريباً
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* See All Button */}
        <div className="text-center mt-6 sm:mt-8 relative z-10">
          <Link to="/products">
            <Button 
              variant="outline" 
              className="rounded-full font-bold px-6 sm:px-8 bg-secondary text-secondary-foreground border-2 border-foreground shadow-bold hover:shadow-bold-sm hover:translate-x-[2px] hover:translate-y-[2px] h-10 sm:h-11 gap-2"
            >
              شاهد الكل
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
