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
import ImageUpload from "./ImageUpload";

interface AdSpace {
  id: string;
  card_type: string;
  title: string | null;
  tag_text: string | null;
  tag_color: string | null;
  sub_text: string | null;
  image_url: string | null;
  background_color: string | null;
  background_image_url: string | null;
  overlay_image_url: string | null;
  redirect_url: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

interface AdSpaceFormData {
  card_type: string;
  title: string;
  tag_text: string;
  tag_color: string;
  sub_text: string;
  image_url: string;
  background_color: string;
  background_image_url: string;
  overlay_image_url: string;
  redirect_url: string;
  display_order: number;
  is_active: boolean;
}

const AdSpaceFormDialog = ({
  open,
  onOpenChange,
  adSpace,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adSpace: AdSpace | null;
  onSubmit: (data: AdSpaceFormData) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AdSpaceFormData>({
    card_type: "1x",
    title: "",
    tag_text: "",
    tag_color: "#FFD700",
    sub_text: "",
    image_url: "",
    background_color: "#FF6B35",
    background_image_url: "",
    overlay_image_url: "",
    redirect_url: "",
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (adSpace) {
      setFormData({
        card_type: adSpace.card_type || "1x",
        title: adSpace.title || "",
        tag_text: adSpace.tag_text || "",
        tag_color: adSpace.tag_color || "#FFD700",
        sub_text: adSpace.sub_text || "",
        image_url: adSpace.image_url || "",
        background_color: adSpace.background_color || "#FF6B35",
        background_image_url: adSpace.background_image_url || "",
        overlay_image_url: adSpace.overlay_image_url || "",
        redirect_url: adSpace.redirect_url || "",
        display_order: adSpace.display_order || 0,
        is_active: adSpace.is_active ?? true,
      });
    } else {
      setFormData({
        card_type: "1x",
        title: "",
        tag_text: "",
        tag_color: "#FFD700",
        sub_text: "",
        image_url: "",
        background_color: "#FF6B35",
        background_image_url: "",
        overlay_image_url: "",
        redirect_url: "",
        display_order: 0,
        is_active: true,
      });
    }
  }, [adSpace, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-tajawal text-xl">
            {adSpace ? "تعديل المساحة الإعلانية" : "إضافة مساحة إعلانية جديدة"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Card Type & Display Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-tajawal">نوع الكارت *</Label>
              <Select
                value={formData.card_type}
                onValueChange={(value) => setFormData({ ...formData, card_type: value })}
              >
                <SelectTrigger className="mt-1 font-tajawal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2x" className="font-tajawal">2X - بانر كبير</SelectItem>
                  <SelectItem value="1x" className="font-tajawal">1X - كارت صغير</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-tajawal">ترتيب العرض</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="font-tajawal mt-1"
              />
            </div>
          </div>

          {/* Title (2x only) */}
          {formData.card_type === "2x" && (
            <div>
              <Label className="font-tajawal">العنوان</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="font-tajawal mt-1"
                placeholder="مثال: أعلن مع أحمد مانجو"
              />
            </div>
          )}

          {/* Tag (2x only) */}
          {formData.card_type === "2x" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-tajawal">نص التاج</Label>
                <Input
                  value={formData.tag_text}
                  onChange={(e) => setFormData({ ...formData, tag_text: e.target.value })}
                  className="font-tajawal mt-1"
                  placeholder="مثال: جديد!"
                />
              </div>
              <div>
                <Label className="font-tajawal">لون التاج</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={formData.tag_color}
                    onChange={(e) => setFormData({ ...formData, tag_color: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={formData.tag_color}
                    onChange={(e) => setFormData({ ...formData, tag_color: e.target.value })}
                    className="flex-1"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sub Text */}
          <div>
            <Label className="font-tajawal">النص الفرعي</Label>
            <Textarea
              value={formData.sub_text}
              onChange={(e) => setFormData({ ...formData, sub_text: e.target.value })}
              className="font-tajawal mt-1"
              placeholder="مثال: وصّل منتجك لآلاف المتابعين"
              rows={2}
            />
          </div>

          {/* Background Color */}
          <div>
            <Label className="font-tajawal">لون الخلفية</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="color"
                value={formData.background_color}
                onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                value={formData.background_color}
                onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                className="flex-1"
                dir="ltr"
              />
            </div>
          </div>

          {/* Redirect URL */}
          <div>
            <Label className="font-tajawal">رابط التحويل</Label>
            <Input
              type="url"
              value={formData.redirect_url}
              onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })}
              className="mt-1"
              dir="ltr"
              placeholder="https://..."
            />
          </div>

          {/* Image Upload */}
          <ImageUpload
            label="صورة الكارت"
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
          />

          {/* Background Image Upload */}
          <ImageUpload
            label="صورة الخلفية (اختياري)"
            value={formData.background_image_url}
            onChange={(url) => setFormData({ ...formData, background_image_url: url })}
          />

          {/* Overlay Image Upload */}
          <ImageUpload
            label="صورة الغلاف الكامل (اختياري - يغطي كل المحتوى)"
            value={formData.overlay_image_url}
            onChange={(url) => setFormData({ ...formData, overlay_image_url: url })}
          />

          {/* Active */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
            />
            <Label htmlFor="is_active" className="font-tajawal cursor-pointer">
              نشط (يظهر في الموقع)
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
              ) : adSpace ? (
                "حفظ التعديلات"
              ) : (
                "إضافة المساحة"
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

export default AdSpaceFormDialog;
