import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Database, Constants } from "@/integrations/supabase/types";
import ImageUpload from "./ImageUpload";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

const categories = Constants.public.Enums.product_category;
const verdicts = Constants.public.Enums.product_verdict;
const platforms = ["YouTube", "TikTok", "Instagram", "Facebook"];

const ProductFormDialog = ({
  open,
  onOpenChange,
  product,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSubmit: (data: ProductInsert | ProductUpdate) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Other" as typeof categories[number],
    rating: 5,
    verdict: "2استكا" as typeof verdicts[number],
    short_note: "",
    review_url: "",
    thumbnail_url: "",
    platforms: [] as string[],
    is_featured: false,
    ranking: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand || "",
        category: product.category,
        rating: product.rating,
        verdict: product.verdict,
        short_note: product.short_note || "",
        review_url: product.review_url || "",
        thumbnail_url: product.thumbnail_url || "",
        platforms: product.platforms || [],
        is_featured: product.is_featured || false,
        ranking: product.ranking || 0,
      });
    } else {
      setFormData({
        name: "",
        brand: "",
        category: "Other",
        rating: 5,
        verdict: "2استكا",
        short_note: "",
        review_url: "",
        thumbnail_url: "",
        platforms: [],
        is_featured: false,
        ranking: 0,
      });
    }
  }, [product, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-tajawal text-xl">
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name & Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-tajawal">اسم المنتج *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="font-tajawal mt-1"
                required
              />
            </div>
            <div>
              <Label className="font-tajawal">العلامة التجارية</Label>
              <Input
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="font-tajawal mt-1"
              />
            </div>
          </div>

          {/* Category & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-tajawal">الفئة *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: typeof categories[number]) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="mt-1 font-tajawal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="font-tajawal">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-tajawal">التقييم (1-10) *</Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) || 1 })
                }
                className="font-tajawal mt-1"
                required
              />
            </div>
          </div>

          {/* Ranking */}
          <div>
            <Label className="font-tajawal">الترتيب (الأعلى يظهر أولاً)</Label>
            <Input
              type="number"
              min={0}
              value={formData.ranking}
              onChange={(e) =>
                setFormData({ ...formData, ranking: parseInt(e.target.value) || 0 })
              }
              className="font-tajawal mt-1"
              placeholder="0"
            />
          </div>

          {/* Verdict */}
          <div>
            <Label className="font-tajawal">الحكم *</Label>
            <Select
              value={formData.verdict}
              onValueChange={(value: typeof verdicts[number]) =>
                setFormData({ ...formData, verdict: value })
              }
            >
              <SelectTrigger className="mt-1 font-tajawal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {verdicts.map((v) => (
                  <SelectItem key={v} value={v} className="font-tajawal">
                    {v === "2استكا" ? "✔️ 2استكا (جيد)" : "✖️ فاستكا (سيء)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Short Note */}
          <div>
            <Label className="font-tajawal">ملاحظة قصيرة (150 حرف كحد أقصى)</Label>
            <Textarea
              value={formData.short_note}
              onChange={(e) =>
                setFormData({ ...formData, short_note: e.target.value.slice(0, 150) })
              }
              className="font-tajawal mt-1"
              maxLength={150}
              rows={2}
            />
            <p className="text-xs text-muted-foreground mt-1 font-tajawal">
              {formData.short_note.length}/150
            </p>
          </div>

          {/* Review URL */}
          <div>
            <Label className="font-tajawal">رابط الريڤيو</Label>
            <Input
              type="url"
              value={formData.review_url}
              onChange={(e) => setFormData({ ...formData, review_url: e.target.value })}
              className="mt-1"
              dir="ltr"
              placeholder="https://..."
            />
          </div>

          {/* Image Upload */}
          <ImageUpload
            label="صورة المنتج"
            value={formData.thumbnail_url}
            onChange={(url) => setFormData({ ...formData, thumbnail_url: url })}
          />

          {/* Platforms */}
          <div>
            <Label className="font-tajawal mb-2 block">المنصات</Label>
            <div className="flex flex-wrap gap-3">
              {platforms.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={formData.platforms.includes(platform)}
                    onCheckedChange={() => handlePlatformToggle(platform)}
                  />
                  <span className="font-tajawal text-sm">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_featured: checked as boolean })
              }
            />
            <Label htmlFor="is_featured" className="font-tajawal cursor-pointer">
              منتج مميز
            </Label>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-tajawal"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : product ? (
                "حفظ التعديلات"
              ) : (
                "إضافة المنتج"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="font-tajawal"
              disabled={loading}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
