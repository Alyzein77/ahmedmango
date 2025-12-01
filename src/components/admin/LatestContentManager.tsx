import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Pencil, Trash2, Youtube, Music2, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LatestContentFormDialog from "./LatestContentFormDialog";
import { Database } from "@/integrations/supabase/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LatestContent = Database["public"]["Tables"]["latest_content"]["Row"];
type LatestContentInsert = Database["public"]["Tables"]["latest_content"]["Insert"];
type LatestContentUpdate = Database["public"]["Tables"]["latest_content"]["Update"];
type Platform = Database["public"]["Enums"]["video_platform"];

const platformIcons: Record<Platform, typeof Youtube> = {
  YouTube: Youtube,
  TikTok: Music2,
  Instagram: Instagram,
  Facebook: Facebook,
};

const contentTypeLabels: Record<string, string> = {
  Video: "فيديو",
  Post: "منشور",
  Story: "ستوري",
  Reel: "ريلز",
  TikTok: "تيك توك",
};

const LatestContentManager = () => {
  const [content, setContent] = useState<LatestContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<LatestContent | null>(null);
  const { toast } = useToast();

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("latest_content")
        .select("*")
        .order("posted_at", { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل المحتوى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleAddContent = async (contentData: LatestContentInsert) => {
    try {
      const { error } = await supabase.from("latest_content").insert([contentData]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تمت إضافة المحتوى بنجاح",
      });
      fetchContent();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding content:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المحتوى",
        variant: "destructive",
      });
    }
  };

  const handleUpdateContent = async (id: string, contentData: LatestContentUpdate) => {
    try {
      const { error } = await supabase
        .from("latest_content")
        .update(contentData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم تحديث المحتوى بنجاح",
      });
      fetchContent();
      setDialogOpen(false);
      setEditingContent(null);
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث المحتوى",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return;

    try {
      const { error } = await supabase.from("latest_content").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم حذف المحتوى بنجاح",
      });
      fetchContent();
    } catch (error) {
      console.error("Error deleting content:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف المحتوى",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: LatestContent) => {
    setEditingContent(item);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingContent(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-tajawal">
            آخر المحتوى
          </h1>
          <p className="text-muted-foreground font-tajawal">
            إدارة المنشورات والستوريز
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-tajawal"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة محتوى جديد
        </Button>
      </div>

      {/* Content Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-tajawal">العنوان</TableHead>
                <TableHead className="text-right font-tajawal">النوع</TableHead>
                <TableHead className="text-right font-tajawal">المنصة</TableHead>
                <TableHead className="text-right font-tajawal">ملاحظة</TableHead>
                <TableHead className="text-right font-tajawal">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8 font-tajawal">
                    لا يوجد محتوى
                  </TableCell>
                </TableRow>
              ) : (
                content.map((item) => {
                  const PlatformIcon = platformIcons[item.platform];
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-tajawal font-medium">{item.title}</TableCell>
                      <TableCell className="font-tajawal">
                        {contentTypeLabels[item.content_type] || item.content_type}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PlatformIcon className="w-4 h-4" />
                          <span className="font-tajawal">{item.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-tajawal max-w-[200px] truncate">
                        {item.short_note || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(item)}
                            className="h-8 w-8"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteContent(item.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Content Form Dialog */}
      <LatestContentFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        content={editingContent}
        onSubmit={editingContent
          ? (data) => handleUpdateContent(editingContent.id, data)
          : handleAddContent
        }
      />
    </div>
  );
};

export default LatestContentManager;
