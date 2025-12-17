import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

type SocialLinkInsert = Omit<SocialLink, "id" | "created_at" | "updated_at">;

const platformSuggestions = [
  { name: "YouTube", icon: "🎬" },
  { name: "TikTok", icon: "📱" },
  { name: "Instagram", icon: "📸" },
  { name: "Facebook", icon: "👤" },
  { name: "Twitter/X", icon: "🐦" },
  { name: "Snapchat", icon: "👻" },
  { name: "Telegram", icon: "✈️" },
  { name: "WhatsApp", icon: "💬" },
];

const SocialLinkFormDialog = ({
  open,
  onOpenChange,
  link,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: SocialLink | null;
  onSubmit: (data: SocialLinkInsert) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "",
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (link) {
      setFormData({
        platform: link.platform,
        url: link.url,
        icon: link.icon || "",
        display_order: link.display_order || 0,
        is_active: link.is_active ?? true,
      });
    } else {
      setFormData({
        platform: "",
        url: "",
        icon: "",
        display_order: 0,
        is_active: true,
      });
    }
  }, [link, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformSelect = (platform: { name: string; icon: string }) => {
    setFormData({ ...formData, platform: platform.name, icon: platform.icon });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-tajawal text-xl">
            {link ? "تعديل الرابط" : "إضافة رابط جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Platform Suggestions */}
          <div>
            <Label className="font-tajawal mb-2 block">اختر المنصة</Label>
            <div className="flex flex-wrap gap-2">
              {platformSuggestions.map((p) => (
                <Button
                  key={p.name}
                  type="button"
                  variant={formData.platform === p.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePlatformSelect(p)}
                  className="rounded-full text-sm"
                >
                  {p.icon} {p.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Platform Name */}
          <div>
            <Label className="font-tajawal">اسم المنصة *</Label>
            <Input
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="font-tajawal mt-1"
              placeholder="مثال: YouTube"
              required
            />
          </div>

          {/* URL */}
          <div>
            <Label className="font-tajawal">الرابط *</Label>
            <Input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="mt-1"
              dir="ltr"
              placeholder="https://..."
              required
            />
          </div>

          {/* Icon */}
          <div>
            <Label className="font-tajawal">الأيقونة (إيموجي)</Label>
            <Input
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="mt-1 text-xl"
              placeholder="🎬"
              maxLength={4}
            />
          </div>

          {/* Display Order */}
          <div>
            <Label className="font-tajawal">الترتيب</Label>
            <Input
              type="number"
              min={0}
              value={formData.display_order}
              onChange={(e) =>
                setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
              }
              className="font-tajawal mt-1"
            />
          </div>

          {/* Is Active */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked as boolean })
              }
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
              ) : link ? (
                "حفظ التعديلات"
              ) : (
                "إضافة الرابط"
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

export default SocialLinkFormDialog;