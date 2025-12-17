import { Package, BarChart3, LogOut, User, Video, Music2, Home, Share2, Megaphone, LineChart, ClipboardList, Activity, Trophy, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface AdminSidebarProps {
  currentView: "products" | "videos" | "tiktok" | "social" | "ads" | "ad-requests" | "stats" | "analytics" | "mixpanel" | "engagement" | "notifications";
  onViewChange: (view: "products" | "videos" | "tiktok" | "social" | "ads" | "ad-requests" | "stats" | "analytics" | "mixpanel" | "engagement" | "notifications") => void;
  onLogout: () => void;
  userEmail: string;
}

const AdminSidebar = ({ currentView, onViewChange, onLogout, userEmail }: AdminSidebarProps) => {
  const menuItems = [
    { id: "products" as const, label: "المنتجات", icon: Package },
    { id: "videos" as const, label: "الفيديوهات", icon: Video },
    { id: "tiktok" as const, label: "TikTok", icon: Music2 },
    { id: "social" as const, label: "روابط التواصل", icon: Share2 },
    { id: "ads" as const, label: "المساحات الإعلانية", icon: Megaphone },
    { id: "ad-requests" as const, label: "طلبات المعلنين", icon: ClipboardList },
    { id: "notifications" as const, label: "إيميلات الإشعارات", icon: Bell },
    { id: "analytics" as const, label: "تحليلات الإعلانات", icon: LineChart },
    { id: "mixpanel" as const, label: "Mixpanel", icon: Activity },
    { id: "engagement" as const, label: "نقاط التفاعل", icon: Trophy },
    { id: "stats" as const, label: "إحصائيات", icon: BarChart3 },
  ];

  return (
    <aside className="w-72 bg-primary border-l-4 border-foreground flex flex-col">
      {/* Header */}
      <div className="p-6 border-b-4 border-foreground bg-orange">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center border-4 border-foreground shadow-bold">
            <span className="text-3xl">🥭</span>
          </div>
          <div>
            <h1 className="font-black text-foreground font-lalezar text-xl">
              أحمد مانجو
            </h1>
            <p className="text-sm text-foreground/80 font-tajawal font-bold">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 bg-primary">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-tajawal font-bold transition-all border-2",
                  currentView === item.id
                    ? "bg-background text-foreground border-foreground shadow-bold"
                    : "text-foreground/80 border-transparent hover:bg-background/20 hover:border-foreground/30"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Back to site link */}
        <div className="mt-6 pt-4 border-t-2 border-foreground/20">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-tajawal font-bold text-foreground/80 hover:bg-background/20 transition-all border-2 border-transparent hover:border-foreground/30"
          >
            <Home className="w-5 h-5" />
            <span>العودة للموقع</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-4 border-foreground bg-secondary">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl mb-3 border-2 border-foreground">
          <div className="w-10 h-10 bg-sky rounded-full flex items-center justify-center border-2 border-foreground">
            <User className="w-5 h-5 text-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground/70 font-tajawal font-bold truncate" dir="ltr">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full font-tajawal font-bold bg-background border-2 border-foreground text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-bold-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          <LogOut className="w-4 h-4 ml-2" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
