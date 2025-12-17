import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCardCompact } from "@/components/ProductCardCompact";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Product } from "./Products";

const ProductsCompare = () => {
  const [goodProducts, setGoodProducts] = useState<Product[]>([]);
  const [badProducts, setBadProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    
    const [goodRes, badRes] = await Promise.all([
      supabase
        .from("products")
        .select("*")
        .eq("verdict", "2استكا")
        .order("ranking", { ascending: true })
        .order("rating", { ascending: false }),
      supabase
        .from("products")
        .select("*")
        .eq("verdict", "فاستكا")
        .order("ranking", { ascending: true })
        .order("rating", { ascending: true }),
    ]);

    if (goodRes.error) console.error("Error fetching good products:", goodRes.error);
    if (badRes.error) console.error("Error fetching bad products:", badRes.error);

    setGoodProducts(goodRes.data || []);
    setBadProducts(badRes.data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen font-poppins bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header with Tabs */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            2استكا vs فاستكا
          </h1>
          <p className="text-muted-foreground mb-6">
            المنتجات الكويسة vs المنتجات الوحشة
          </p>
          
          <Tabs defaultValue="compare" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="all" asChild>
                <Link to="/products" className="font-bold">
                  كل المنتجات
                </Link>
              </TabsTrigger>
              <TabsTrigger value="compare" className="font-bold">
                2استكا vs فاستكا
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Good Products Column */}
            <div className="bg-primary/10 rounded-2xl p-6 border-2 border-primary/30">
              <div className="flex items-center justify-center gap-3 mb-6">
                <ThumbsUp className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-black text-primary">2استكا</h2>
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                  {goodProducts.length} منتج
                </span>
              </div>
              
              {goodProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">
                  مفيش منتجات لسه
                </p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {goodProducts.map((product) => (
                    <ProductCardCompact 
                      key={product.id} 
                      product={product} 
                      variant="good" 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bad Products Column */}
            <div className="bg-accent/10 rounded-2xl p-6 border-2 border-accent/30">
              <div className="flex items-center justify-center gap-3 mb-6">
                <ThumbsDown className="w-8 h-8 text-accent" />
                <h2 className="text-2xl font-black text-accent">فاستكا</h2>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  {badProducts.length} منتج
                </span>
              </div>
              
              {badProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">
                  مفيش منتجات لسه
                </p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {badProducts.map((product) => (
                    <ProductCardCompact 
                      key={product.id} 
                      product={product} 
                      variant="bad" 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductsCompare;