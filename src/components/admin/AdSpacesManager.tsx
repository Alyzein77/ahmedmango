import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import AdSpaceFormDialog from "./AdSpaceFormDialog";

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
  button_text: string | null;
  button_color: string | null;
  button_link: string | null;
  display_order: number | null;
  is_active: boolean | null;
  click_count: number | null;
  created_at: string;
}

const AdSpacesManager = () => {
  const [adSpaces, setAdSpaces] = useState<AdSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAdSpace, setEditingAdSpace] = useState<AdSpace | null>(null);

  const fetchAdSpaces = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ad_spaces")
      .select("*")
      .order("display_order", { ascending: false });

    if (error) {
      toast.error("فشل في تحميل المساحات الإعلانية");
      console.error(error);
    } else {
      setAdSpaces(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdSpaces();
  }, []);

  const handleCreate = () => {
    setEditingAdSpace(null);
    setDialogOpen(true);
  };

  const handleEdit = (adSpace: AdSpace) => {
    setEditingAdSpace(adSpace);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه المساحة الإعلانية؟")) return;

    const { error } = await supabase.from("ad_spaces").delete().eq("id", id);

    if (error) {
      toast.error("فشل في حذف المساحة الإعلانية");
      console.error(error);
    } else {
      toast.success("تم حذف المساحة الإعلانية");
      fetchAdSpaces();
    }
  };

  const handleSubmit = async (data: any) => {
    if (editingAdSpace) {
      const { error } = await supabase
        .from("ad_spaces")
        .update(data)
        .eq("id", editingAdSpace.id);

      if (error) {
        toast.error("فشل في تحديث المساحة الإعلانية");
        console.error(error);
        return;
      }
      toast.success("تم تحديث المساحة الإعلانية");
    } else {
      const { error } = await supabase.from("ad_spaces").insert(data);

      if (error) {
        toast.error("فشل في إضافة المساحة الإعلانية");
        console.error(error);
        return;
      }
      toast.success("تم إضافة المساحة الإعلانية");
    }

    setDialogOpen(false);
    fetchAdSpaces();
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-tajawal">إدارة المساحات الإعلانية</h2>
        <Button onClick={handleCreate} className="font-tajawal">
          <Plus className="w-4 h-4 ml-2" />
          إضافة مساحة جديدة
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground font-tajawal">جاري التحميل...</div>
      ) : adSpaces.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground font-tajawal">
          لا توجد مساحات إعلانية بعد
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right font-tajawal">النوع</TableHead>
                <TableHead className="text-right font-tajawal">العنوان/النص</TableHead>
                <TableHead className="text-right font-tajawal">الترتيب</TableHead>
                <TableHead className="text-right font-tajawal">النقرات</TableHead>
                <TableHead className="text-right font-tajawal">الحالة</TableHead>
                <TableHead className="text-right font-tajawal">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adSpaces.map((adSpace) => (
                <TableRow key={adSpace.id}>
                  <TableCell>
                    <Badge variant={adSpace.card_type === "2x" ? "default" : "secondary"}>
                      {adSpace.card_type === "2x" ? "بانر كبير" : "كارت صغير"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-tajawal max-w-[200px] truncate">
                    {adSpace.title || adSpace.sub_text || "-"}
                  </TableCell>
                  <TableCell>{adSpace.display_order}</TableCell>
                  <TableCell className="font-tajawal font-bold">
                    {adSpace.click_count || 0}
                  </TableCell>
                  <TableCell>
                    <Badge variant={adSpace.is_active ? "default" : "outline"}>
                      {adSpace.is_active ? "نشط" : "غير نشط"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {adSpace.redirect_url && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(adSpace.redirect_url!, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(adSpace)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(adSpace.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AdSpaceFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        adSpace={editingAdSpace}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdSpacesManager;
