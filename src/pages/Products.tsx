import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Check, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  brand: string | null;
  category: string;
  rating: number;
  ranking: number;
  verdict: string;
  short_note: string | null;
  review_url: string | null;
  thumbnail_url: string | null;
  platforms: string[] | null;
  is_featured: boolean | null;
  created_at: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "2استكا" | "فاستكا">("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "Chips", "Chocolate", "Drinks", "Noodles", "Biscuits", "Other"];
  const categoryLabels: Record<string, string> = {
    all: "الكل",
    Chips: "شيبسي",
    Chocolate: "شوكولاتة",
    Drinks: "مشروبات",
    Noodles: "نودلز",
    Biscuits: "بسكويت",
    Other: "أخرى",
  };

  useEffect(() => {
    fetchProducts();
  }, [activeFilter, activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*")
      .order("ranking", { ascending: true })
      .order("created_at", { ascending: false });

    if (activeFilter !== "all") {
      query = query.eq("verdict", activeFilter);
    }

    if (activeCategory !== "all") {
      query = query.eq("category", activeCategory as "Chips" | "Chocolate" | "Drinks" | "Noodles" | "Biscuits" | "Other");
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
    <div className="min-h-screen font-poppins bg-background">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="bg-primary py-12 sm:py-16 px-4 relative">
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
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-3 font-lalezar">
              كل المنتجات 🍫
            </h1>
            <p className="text-foreground/80 text-base sm:text-lg max-w-xl mx-auto font-tajawal font-bold">
              اكتشف كل المنتجات اللي راجعها أحمد مانجو بتقييم صادق
            </p>
            
            {/* Navigation Tabs */}
            <div className="flex justify-center gap-3 mt-6">
              <Button 
                variant="outline" 
                className="rounded-full font-bold px-6 bg-secondary text-secondary-foreground border-2 border-foreground shadow-bold-sm"
              >
                كل المنتجات
              </Button>
              <Link to="/products/compare">
                <Button 
                  variant="outline" 
                  className="rounded-full font-bold px-6 bg-background text-foreground border-2 border-foreground hover:bg-secondary/10 gap-2"
                >
                  2استكا vs فاستكا
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-background py-6 px-4 border-b border-border sticky top-0 z-20">
          <div className="container mx-auto max-w-6xl">
            {/* Verdict Filter */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-4">
              <Button 
                variant={activeFilter === "all" ? "default" : "outline"} 
                onClick={() => setActiveFilter("all")} 
                className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm h-9 sm:h-10 border-2 border-foreground ${
                  activeFilter === "all" 
                    ? "bg-secondary text-secondary-foreground shadow-bold-sm" 
                    : "bg-background text-foreground hover:bg-secondary/10"
                }`}
              >
                الكل
              </Button>
              <Button 
                variant={activeFilter === "2استكا" ? "default" : "outline"} 
                onClick={() => setActiveFilter("2استكا")} 
                className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm h-9 sm:h-10 border-2 border-foreground ${
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
                onClick={() => setActiveFilter("فاستكا")} 
                className={`rounded-full font-bold px-4 sm:px-6 text-xs sm:text-sm h-9 sm:h-10 border-2 border-foreground ${
                  activeFilter === "فاستكا" 
                    ? "bg-accent text-accent-foreground shadow-bold-sm" 
                    : "bg-background text-foreground hover:bg-accent/10"
                }`}
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                فاستكا
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full font-bold text-xs px-3 h-8 ${
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {categoryLabels[cat]}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 sm:py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Results Count */}
            <div className="mb-6 text-center">
              <p className="text-muted-foreground font-tajawal">
                {loading ? "جاري التحميل..." : `${products.length} منتج`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground font-tajawal">
                  مفيش منتجات تطابق الفلاتر دي 🤷‍♂️
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {products.map((product, idx) => (
                  <Card 
                    key={product.id} 
                    className="group relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-slide-up bg-card flex flex-col h-full" 
                    style={{ animationDelay: `${idx * 0.03}s` }}
                  >
                    {/* Rating Badge */}
                    <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-foreground ${
                      product.verdict === "2استكا" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      {product.verdict === "2استكا" 
                        ? <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} /> 
                        : <X className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={3} />
                      }
                    </div>

                    {/* Rating Score */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-foreground text-background px-2 py-0.5 rounded-full text-xs font-bold">
                      {product.rating}/10
                    </div>

                    {/* Product Image */}
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img 
                        src={product.thumbnail_url || "/placeholder.svg"} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-2.5 sm:p-4 flex-1 flex flex-col">
                      <span className="text-[10px] sm:text-xs font-bold text-accent mb-0.5 sm:mb-1 block uppercase">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1 line-clamp-2 font-tajawal">
                        {product.name}
                      </h3>
                      {product.brand && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">
                          {product.brand}
                        </p>
                      )}
                      <p className="text-[10px] sm:text-sm text-foreground/70 mb-2 sm:mb-3 line-clamp-2 font-medium font-tajawal flex-1">
                        {product.short_note || ""}
                      </p>
                      <div className="mt-auto">
                        {product.review_url ? (
                          <a href={product.review_url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 text-[10px] sm:text-sm h-8 sm:h-9 border-2 border-foreground">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;