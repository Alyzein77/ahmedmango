import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const verdicts = [
  { value: "all", label: "الكل" },
  { value: "2استكا", label: "2استكا ✔️" },
  { value: "فاستكا", label: "فاستكا ✖️" },
];

interface ProductFiltersProps {
  category: string;
  setCategory: (value: string) => void;
  verdict: string;
  setVerdict: (value: string) => void;
  ratingRange: [number, number];
  setRatingRange: (value: [number, number]) => void;
}

export const ProductFilters = ({
  category,
  setCategory,
  verdict,
  setVerdict,
  ratingRange,
  setRatingRange,
}: ProductFiltersProps) => {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([
    { value: "all", label: "كل الفئات" },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category");

      if (!error && data) {
        // Get unique categories
        const uniqueCategories = [...new Set(data.map((p) => p.category).filter(Boolean))];
        setCategories([
          { value: "all", label: "كل الفئات" },
          ...uniqueCategories.map((cat) => ({ value: cat, label: cat })),
        ]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-right block font-bold text-foreground">الفئة</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-background text-right">
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value} className="text-right">
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Verdict Filter */}
        <div className="space-y-2">
          <Label className="text-right block font-bold text-foreground">التقييم</Label>
          <Select value={verdict} onValueChange={setVerdict}>
            <SelectTrigger className="w-full bg-background text-right">
              <SelectValue placeholder="اختر التقييم" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {verdicts.map((v) => (
                <SelectItem key={v.value} value={v.value} className="text-right">
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Range */}
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-right block font-bold text-foreground">
            نطاق التقييم: من {ratingRange[0]} إلى {ratingRange[1]}
          </Label>
          <div className="px-2 pt-2">
            <Slider
              min={1}
              max={10}
              step={1}
              value={ratingRange}
              onValueChange={(value) => setRatingRange(value as [number, number])}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>10</span>
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
