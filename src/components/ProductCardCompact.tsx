import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { Product } from "@/pages/Products";

interface ProductCardCompactProps {
  product: Product;
  variant: "good" | "bad";
}

export const ProductCardCompact = ({ product, variant }: ProductCardCompactProps) => {
  const borderColor = variant === "good" ? "border-primary/30" : "border-accent/30";
  const ratingBg = variant === "good" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground";

  return (
    <div className={`flex items-center gap-4 p-3 bg-card rounded-xl border ${borderColor} hover:shadow-md transition-all`}>
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
        {product.thumbnail_url ? (
          <img
            src={product.thumbnail_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <span className="text-2xl">🥭</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-right">
        <h4 className="font-bold text-foreground truncate">{product.name}</h4>
        {product.brand && (
          <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
        )}
      </div>

      {/* Rating */}
      <div className={`px-3 py-1.5 rounded-full font-black text-sm ${ratingBg}`}>
        {product.rating}/10
      </div>

      {/* Review Button */}
      {product.review_url ? (
        <Button 
          asChild
          size="sm"
          variant="outline"
          className="flex-shrink-0"
        >
          <a 
            href={product.review_url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      ) : (
        <Button 
          size="sm"
          variant="outline"
          disabled
          className="flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};