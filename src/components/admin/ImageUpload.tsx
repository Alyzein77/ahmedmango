import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
}

const ImageUpload = ({ value, onChange, label, required }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">(value ? "url" : "upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف صورة فقط",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "خطأ",
        description: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("admin-uploads")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("admin-uploads")
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast({
        title: "تم الرفع",
        description: "تم رفع الصورة بنجاح",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "خطأ في الرفع",
        description: error.message || "حدث خطأ أثناء رفع الصورة",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="font-tajawal">{label} {required && "*"}</Label>
        <div className="flex gap-1">
          <Button
            type="button"
            variant={mode === "upload" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2 text-xs font-tajawal"
            onClick={() => setMode("upload")}
          >
            <Upload className="w-3 h-3 ml-1" />
            رفع
          </Button>
          <Button
            type="button"
            variant={mode === "url" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2 text-xs font-tajawal"
            onClick={() => setMode("url")}
          >
            <LinkIcon className="w-3 h-3 ml-1" />
            رابط
          </Button>
        </div>
      </div>

      {mode === "upload" ? (
        <div className="space-y-2">
          {value ? (
            <div className="relative group">
              <img
                src={value}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border-2 border-border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 left-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground font-tajawal">جاري الرفع...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-tajawal">اضغط لاختيار صورة</span>
                  <span className="text-xs text-muted-foreground font-tajawal">PNG, JPG, WEBP (حتى 5MB)</span>
                </div>
              )}
            </label>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="font-tajawal"
            dir="ltr"
            required={required}
          />
          {value && (
            <div className="relative group">
              <img
                src={value}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border-2 border-border"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
