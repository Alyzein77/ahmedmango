import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { useMixpanel } from "@/hooks/useMixpanel";
import type { Product } from "@/pages/Products";

const categoryLabels: Record<string, string> = {
  Chips: "شيبسي",
  Chocolate: "شوكولاتة",
  Drinks: "مشروبات",
  Noodles: "نودلز",
  Biscuits: "بسكويت",
  Other: "أخرى",
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isGood = product.verdict === "2استكا";
  const { trackProductClick } = useMixpanel();

  const handleReviewClick = () => {
    trackProductClick(product.id, product.name, 'view_review');
  };

  return (
    <Card className="group overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-card">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {product.thumbnail_url ? (
          <img
            src={product.thumbnail_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <span className="text-4xl">🥭</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-black text-lg">
          {product.rating}/10
        </div>
        
        {/* Category Badge */}
        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground border-0">
          {categoryLabels[product.category] || product.category}
        </Badge>
      </div>

      <CardContent className="p-4 text-right">
        {/* Product Name */}
        <h3 className="font-black text-lg text-foreground mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-muted-foreground mb-3">
            {product.brand}
          </p>
        )}

        {/* Verdict Badge */}
        <div className="mb-3">
          {isGood ? (
            <Badge className="bg-primary text-primary-foreground gap-1 px-3 py-1">
              <CheckCircle className="w-4 h-4" />
              2استكا ✔️
            </Badge>
          ) : (
            <Badge className="bg-accent text-accent-foreground gap-1 px-3 py-1">
              <XCircle className="w-4 h-4" />
              فاستكا ✖️
            </Badge>
          )}
        </div>

        {/* Short Note */}
        {product.short_note && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.short_note}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {product.review_url ? (
          <Button 
            asChild
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
          >
            <a 
              href={product.review_url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleReviewClick}
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              شوف الريڤيو
            </a>
          </Button>
        ) : (
          <Button disabled className="w-full font-bold">
            الريڤيو قريبًا
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};