import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SocialLinksTable from "./SocialLinksTable";
import SocialLinkFormDialog from "./SocialLinkFormDialog";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

type SocialLinkInsert = Omit<SocialLink, "id" | "created_at" | "updated_at">;
type SocialLinkUpdate = Partial<SocialLinkInsert>;

const SocialLinksManager = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const { toast } = useToast();

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error("Error fetching social links:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل روابط التواصل",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddLink = async (linkData: SocialLinkInsert) => {
    try {
      const { error } = await supabase.from("social_links").insert([linkData]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تمت إضافة الرابط بنجاح",
      });
      fetchLinks();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding social link:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة الرابط",
        variant: "destructive",
      });
    }
  };

  const handleUpdateLink = async (id: string, linkData: SocialLinkUpdate) => {
    try {
      const { error } = await supabase
        .from("social_links")
        .update(linkData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم تحديث الرابط بنجاح",
      });
      fetchLinks();
      setDialogOpen(false);
      setEditingLink(null);
    } catch (error) {
      console.error("Error updating social link:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الرابط",
        variant: "destructive",
      });
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الرابط؟")) return;

    try {
      const { error } = await supabase.from("social_links").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم حذف الرابط بنجاح",
      });
      fetchLinks();
    } catch (error) {
      console.error("Error deleting social link:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الرابط",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingLink(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-tajawal">
            روابط التواصل الاجتماعي
          </h1>
          <p className="text-muted-foreground font-tajawal">
            إدارة روابط السوشيال ميديا
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-tajawal"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة رابط جديد
        </Button>
      </div>

      {/* Links Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <SocialLinksTable
          links={links}
          onEdit={handleEdit}
          onDelete={handleDeleteLink}
        />
      )}

      {/* Form Dialog */}
      <SocialLinkFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        link={editingLink}
        onSubmit={editingLink 
          ? (data) => handleUpdateLink(editingLink.id, data)
          : handleAddLink
        }
      />
    </div>
  );
};

export default SocialLinksManager;