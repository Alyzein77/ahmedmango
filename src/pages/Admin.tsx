import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Loader2 } from "lucide-react";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin role after auth state changes
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    setCheckingRole(true);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      setIsAdmin(false);
    } finally {
      setCheckingRole(false);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
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
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-foreground shadow-bold">
            <Loader2 className="w-10 h-10 animate-spin text-orange" />
          </div>
          <p className="text-foreground font-tajawal font-bold text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show login form
  if (!user || !session) {
    return <AdminLogin />;
  }

  // Logged in but not admin - show error
  if (!isAdmin) {
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
        <div className="bg-background rounded-2xl border-4 border-foreground shadow-bold p-8 max-w-md w-full text-center relative z-10">
          <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-foreground">
            <span className="text-4xl">🚫</span>
          </div>
          <h1 className="text-2xl font-black text-foreground font-lalezar mb-2">
            غير مصرح
          </h1>
          <p className="text-foreground/70 font-tajawal mb-6 font-bold">
            هذا الحساب ليس لديه صلاحيات المسؤول.
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-tajawal font-bold border-2 border-foreground shadow-bold hover:shadow-bold-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  // Admin user - show dashboard
  return <AdminDashboard user={user} onLogout={handleLogout} />;
};

export default Admin;
