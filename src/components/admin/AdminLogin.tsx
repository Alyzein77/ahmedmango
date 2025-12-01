import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("البريد الإلكتروني غير صالح").max(255);

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    const validation = emailSchema.safeParse(email.trim());
    if (!validation.success) {
      setError("البريد الإلكتروني غير صالح");
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/admin`;
      
      // Call edge function to validate email and send magic link
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            redirectTo: redirectUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "حدث خطأ أثناء تسجيل الدخول");
        return;
      }

      setSent(true);
      toast({
        title: "تم الإرسال",
        description: "تحقق من بريدك الإلكتروني للحصول على رابط الدخول",
      });
    } catch (err) {
      console.error("Login error:", err);
      setError("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary/10 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Logo/Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-tajawal">
            تسجيل الدخول – لوحة التحكم
          </h1>
          <p className="text-muted-foreground font-tajawal mt-2">
            هذه الصفحة للمسؤولين فقط
          </p>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-foreground font-tajawal mb-2">
              تم إرسال الرابط!
            </h2>
            <p className="text-muted-foreground font-tajawal mb-4">
              تحقق من بريدك الإلكتروني
              <br />
              <span className="text-primary font-medium">{email}</span>
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="font-tajawal"
            >
              إعادة المحاولة
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground font-tajawal mb-2 text-right">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pr-10 text-right font-tajawal"
                  dir="ltr"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                <p className="text-destructive text-sm font-tajawal">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-tajawal py-6 text-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin ml-2" />
                  جاري الإرسال...
                </>
              ) : (
                "أرسل رابط الدخول"
              )}
            </Button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-tajawal">
            🥭 Ahmed Mango Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
