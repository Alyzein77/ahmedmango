import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح").max(255),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").max(100),
});

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    const validation = loginSchema.safeParse({ 
      email: email.trim(), 
      password 
    });
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      setError(firstError.message);
      return;
    }

    setLoading(true);

    try {
      // Sign in with email/password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        } else {
          setError("حدث خطأ أثناء تسجيل الدخول");
        }
        return;
      }

      if (!data.user) {
        setError("حدث خطأ أثناء تسجيل الدخول");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) {
        console.error("Error checking admin role:", roleError);
        await supabase.auth.signOut();
        setError("حدث خطأ أثناء التحقق من الصلاحيات");
        return;
      }

      if (!roleData) {
        // User is not an admin, sign them out
        await supabase.auth.signOut();
        setError("هذا الحساب غير مصرح له بالدخول للوحة التحكم");
        return;
      }

      toast({
        title: "تم تسجيل الدخول",
        description: "مرحباً بك في لوحة التحكم",
      });
      
      onLoginSuccess();
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

        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          <div>
            <label className="block text-sm font-black text-foreground font-tajawal mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="pr-10 font-tajawal border-2 border-foreground focus:ring-orange focus:border-orange"
                dir="ltr"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-foreground font-tajawal mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-10 font-tajawal border-2 border-foreground focus:ring-orange focus:border-orange"
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
                جاري تسجيل الدخول...
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </form>

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
