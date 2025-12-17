import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Mail, Bell } from "lucide-react";

interface NotificationEmail {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

const NotificationEmailsManager = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<NotificationEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notification_emails")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching notification emails:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الإيميلات",
        variant: "destructive",
      });
    } else {
      setEmails(data || []);
    }
    setLoading(false);
  };

  const handleAddEmail = async () => {
    if (!newEmail.trim()) {
      toast({
        title: "خطأ",
        description: "اكتب الإيميل الأول",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast({
        title: "خطأ",
        description: "الإيميل مش صحيح",
        variant: "destructive",
      });
      return;
    }

    setAdding(true);
    const { error } = await supabase
      .from("notification_emails")
      .insert({ email: newEmail.trim().toLowerCase() });

    if (error) {
      console.error("Error adding email:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة الإيميل",
        variant: "destructive",
      });
    } else {
      toast({
        title: "تم",
        description: "تم إضافة الإيميل بنجاح",
      });
      setNewEmail("");
      fetchEmails();
    }
    setAdding(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("notification_emails")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating email status:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الحالة",
        variant: "destructive",
      });
    } else {
      setEmails(emails.map(e => 
        e.id === id ? { ...e, is_active: !currentStatus } : e
      ));
    }
  };

  const handleDeleteEmail = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإيميل؟")) return;

    const { error } = await supabase
      .from("notification_emails")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting email:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الإيميل",
        variant: "destructive",
      });
    } else {
      toast({
        title: "تم",
        description: "تم حذف الإيميل",
      });
      setEmails(emails.filter(e => e.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-foreground bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-lalezar">
            <Bell className="w-6 h-6 text-primary" />
            إيميلات الإشعارات
          </CardTitle>
          <CardDescription className="font-tajawal">
            أضف الإيميلات اللي هتوصلها إشعارات لما حد يبعت طلب إعلان جديد
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Add New Email */}
      <Card className="border-2 border-foreground">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="example@email.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 border-2 border-foreground"
              dir="ltr"
            />
            <Button
              onClick={handleAddEmail}
              disabled={adding}
              className="shadow-bold-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {adding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email List */}
      <div className="space-y-3">
        {emails.length === 0 ? (
          <Card className="border-2 border-dashed border-muted-foreground/30">
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-tajawal">
                مفيش إيميلات متضافة لسه
              </p>
            </CardContent>
          </Card>
        ) : (
          emails.map((email) => (
            <Card key={email.id} className="border-2 border-foreground">
              <CardContent className="py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      email.is_active ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Mail className={`w-5 h-5 ${
                        email.is_active ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground" dir="ltr">
                        {email.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {email.is_active ? 'مفعّل' : 'متوقف'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={email.is_active}
                      onCheckedChange={() => handleToggleActive(email.id, email.is_active)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEmail(email.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Info Card */}
      <Card className="border-2 border-sky/50 bg-sky/10">
        <CardContent className="py-4">
          <p className="text-sm text-foreground/80 font-tajawal">
            💡 الإيميلات المفعّلة بس هي اللي هتوصلها إشعارات. لو عايز توقف إيميل مؤقتاً بدون ما تحذفه، اضغط على الزرار.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationEmailsManager;
