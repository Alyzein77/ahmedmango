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
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            hsl(var(--orange)) 20px,
            hsl(var(--orange)) 40px
          )`
        }}
      />
      
      <div className="bg-background rounded-2xl border-4 border-foreground shadow-bold p-8 max-w-md w-full relative z-10">
        {/* Logo/Icon */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-orange rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-foreground shadow-bold">
            <span className="text-5xl">🥭</span>
          </div>
          <h1 className="text-3xl font-black text-foreground font-lalezar">
            لوحة التحكم
          </h1>
          <p className="text-foreground/70 font-tajawal mt-2 font-bold">
            للمسؤولين فقط
          </p>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-sky rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-foreground shadow-bold">
              <Mail className="w-10 h-10 text-foreground" />
            </div>
            <h2 className="text-xl font-black text-foreground font-lalezar mb-2">
              تم إرسال الرابط!
            </h2>
            <p className="text-foreground/70 font-tajawal mb-4 font-medium">
              تحقق من بريدك الإلكتروني
              <br />
              <span className="text-orange font-bold">{email}</span>
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="font-tajawal font-bold border-2 border-foreground shadow-bold-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              إعادة المحاولة
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-black text-foreground font-tajawal mb-2 text-right">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pr-10 text-right font-tajawal border-2 border-foreground focus:ring-orange focus:border-orange"
                  dir="ltr"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-3 text-center">
                <p className="text-destructive text-sm font-tajawal font-bold">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange text-foreground hover:bg-orange/90 font-tajawal py-6 text-lg font-black border-2 border-foreground shadow-bold hover:shadow-bold-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
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

        <div className="mt-6 pt-6 border-t-2 border-foreground/20 text-center">
          <p className="text-sm text-foreground font-lalezar font-bold">
            🥭 أحمد مانجو - لوحة التحكم
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
