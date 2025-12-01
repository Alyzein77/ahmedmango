import { useState, useEffect } from "react";
import { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LatestContent = Database["public"]["Tables"]["latest_content"]["Row"];
type LatestContentInsert = Database["public"]["Tables"]["latest_content"]["Insert"];
type LatestContentUpdate = Database["public"]["Tables"]["latest_content"]["Update"];
type Platform = Database["public"]["Enums"]["video_platform"];
type ContentType = Database["public"]["Enums"]["content_type"];

const platforms: Platform[] = ["YouTube", "TikTok", "Instagram", "Facebook"];
const contentTypes: ContentType[] = ["Video", "Post", "Story", "Reel", "TikTok"];

const contentTypeLabels: Record<ContentType, string> = {
  Video: "فيديو",
  Post: "منشور",
  Story: "ستوري",
  Reel: "ريلز",
  TikTok: "تيك توك",
};

interface LatestContentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: LatestContent | null;
  onSubmit: (data: LatestContentInsert | LatestContentUpdate) => void;
}

const LatestContentFormDialog = ({ open, onOpenChange, content, onSubmit }: LatestContentFormDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content_type: "Video" as ContentType,
    platform: "YouTube" as Platform,
    preview_url: "",
    link_url: "",
    short_note: "",
  });

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title,
        content_type: content.content_type,
        platform: content.platform,
        preview_url: content.preview_url,
        link_url: content.link_url,
        short_note: content.short_note || "",
      });
    } else {
      setFormData({
        title: "",
        content_type: "Video",
        platform: "YouTube",
        preview_url: "",
        link_url: "",
        short_note: "",
      });
    }
  }, [content, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      content_type: formData.content_type,
      platform: formData.platform,
      preview_url: formData.preview_url,
      link_url: formData.link_url,
      short_note: formData.short_note || null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-tajawal text-xl">
            {content ? "تعديل المحتوى" : "إضافة محتوى جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-tajawal">العنوان *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="font-tajawal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-tajawal">نوع المحتوى *</Label>
              <Select
                value={formData.content_type}
                onValueChange={(value: ContentType) => setFormData({ ...formData, content_type: value })}
              >
                <SelectTrigger className="font-tajawal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type} value={type} className="font-tajawal">
                      {contentTypeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-tajawal">المنصة *</Label>
              <Select
                value={formData.platform}
                onValueChange={(value: Platform) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger className="font-tajawal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform} className="font-tajawal">
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-tajawal">رابط الصورة المصغرة *</Label>
            <Input
              type="url"
              value={formData.preview_url}
              onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
              required
              className="font-tajawal"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-tajawal">رابط المحتوى *</Label>
            <Input
              type="url"
              value={formData.link_url}
              onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
              required
              className="font-tajawal"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-tajawal">ملاحظة قصيرة</Label>
            <Input
              value={formData.short_note}
              onChange={(e) => setFormData({ ...formData, short_note: e.target.value })}
              className="font-tajawal"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 font-tajawal">
              {content ? "تحديث" : "إضافة"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 font-tajawal"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LatestContentFormDialog;
