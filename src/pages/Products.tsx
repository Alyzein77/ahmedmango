import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Product {
  id: string;
  name: string;
  brand: string | null;
  category: string;
  rating: number;
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
  const [category, setCategory] = useState<string>("all");
  const [verdict, setVerdict] = useState<string>("all");
  const [ratingRange, setRatingRange] = useState<[number, number]>([1, 10]);

  useEffect(() => {
    fetchProducts();
  }, [category, verdict, ratingRange]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*")
      .gte("rating", ratingRange[0])
      .lte("rating", ratingRange[1])
      .order("created_at", { ascending: false });

    if (category !== "all") {
      query = query.eq("category", category as "Chips" | "Chocolate" | "Drinks" | "Noodles" | "Biscuits" | "Other");
    }

    if (verdict !== "all") {
      query = query.eq("verdict", verdict as "2استكا" | "فاستكا");
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
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header with Tabs */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
            كل المنتجات
          </h1>
          <p className="text-muted-foreground mb-6">
            اكتشف كل المنتجات اللي راجعها أحمد مانجو
          </p>
          
          <Tabs defaultValue="all" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="all" className="font-bold">
                كل المنتجات
              </TabsTrigger>
              <TabsTrigger value="compare" asChild>
                <Link to="/products/compare" className="font-bold">
                  2استكا vs فاستكا
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filters */}
        <ProductFilters
          category={category}
          setCategory={setCategory}
          verdict={verdict}
          setVerdict={setVerdict}
          ratingRange={ratingRange}
          setRatingRange={setRatingRange}
        />

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              مفيش منتجات تطابق الفلاتر دي
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;