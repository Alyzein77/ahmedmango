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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "./ImageUpload";

type Video = Database["public"]["Tables"]["videos"]["Row"];
type VideoInsert = Database["public"]["Tables"]["videos"]["Insert"];
type VideoUpdate = Database["public"]["Tables"]["videos"]["Update"];
type Platform = Database["public"]["Enums"]["video_platform"];
type Category = Database["public"]["Enums"]["video_category"];

const platforms: Platform[] = ["YouTube", "TikTok", "Instagram", "Facebook"];
const categories: Category[] = ["Review", "Challenge", "Announcement", "Collaboration"];

const categoryLabels: Record<Category, string> = {
  Review: "مراجعة",
  Challenge: "تحدي",
  Announcement: "إعلان",
  Collaboration: "تعاون",
};

interface VideoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
  onSubmit: (data: VideoInsert | VideoUpdate) => void;
}

const VideoFormDialog = ({ open, onOpenChange, video, onSubmit }: VideoFormDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "YouTube" as Platform,
    video_url: "",
    thumbnail_url: "",
    category: "Review" as Category,
    duration: "",
    is_featured: false,
  });

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title,
        description: video.description || "",
        platform: video.platform,
        video_url: video.video_url,
        thumbnail_url: video.thumbnail_url,
        category: video.category,
        duration: video.duration || "",
        is_featured: video.is_featured || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        platform: "YouTube",
        video_url: "",
        thumbnail_url: "",
        category: "Review",
        duration: "",
        is_featured: false,
      });
    }
  }, [video, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description || null,
      platform: formData.platform,
      video_url: formData.video_url,
      thumbnail_url: formData.thumbnail_url,
      category: formData.category,
      duration: formData.duration || null,
      is_featured: formData.is_featured,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-tajawal text-xl">
            {video ? "تعديل الفيديو" : "إضافة فيديو جديد"}
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

          <div className="space-y-2">
            <Label className="font-tajawal">الوصف</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="font-tajawal"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label className="font-tajawal">الفئة *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="font-tajawal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="font-tajawal">
                      {categoryLabels[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-tajawal">رابط الفيديو *</Label>
            <Input
              type="url"
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              required
              className="font-tajawal"
              dir="ltr"
            />
          </div>

          <ImageUpload
            label="الصورة المصغرة"
            value={formData.thumbnail_url}
            onChange={(url) => setFormData({ ...formData, thumbnail_url: url })}
            required
          />

          <div className="space-y-2">
            <Label className="font-tajawal">المدة (مثال: 5:30)</Label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="font-tajawal"
              dir="ltr"
              placeholder="5:30"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="font-tajawal">فيديو مميز</Label>
            <Switch
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 font-tajawal">
              {video ? "تحديث" : "إضافة"}
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

export default VideoFormDialog;
