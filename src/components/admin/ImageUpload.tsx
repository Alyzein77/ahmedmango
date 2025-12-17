import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, ImageIcon, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  required?: boolean;
}

const ImageUpload = ({ value, onChange, label, required }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
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
    setImageError(false);

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
    setImageError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label className="font-tajawal">{label} {required && "*"}</Label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {value && !imageError ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover rounded-xl border-2 border-border"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="font-tajawal"
              onClick={handleClick}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin ml-1" />
              ) : (
                <RefreshCw className="w-4 h-4 ml-1" />
              )}
              تغيير
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="font-tajawal"
              onClick={handleRemove}
            >
              <X className="w-4 h-4 ml-1" />
              حذف
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground font-tajawal">جاري الرفع...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-foreground font-tajawal block">اضغط لرفع صورة</span>
                <span className="text-xs text-muted-foreground font-tajawal">PNG, JPG, WEBP (حتى 5MB)</span>
              </div>
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
