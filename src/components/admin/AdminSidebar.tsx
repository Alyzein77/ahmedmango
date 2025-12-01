import { Package, BarChart3, LogOut, User, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  currentView: "products" | "videos" | "content" | "stats";
  onViewChange: (view: "products" | "videos" | "content" | "stats") => void;
  onLogout: () => void;
  userEmail: string;
}

const AdminSidebar = ({ currentView, onViewChange, onLogout, userEmail }: AdminSidebarProps) => {
  const menuItems = [
    { id: "products" as const, label: "لوحة المنتجات", icon: Package },
    { id: "videos" as const, label: "الفيديوهات", icon: Video },
    { id: "content" as const, label: "آخر المحتوى", icon: FileText },
    { id: "stats" as const, label: "إحصائيات", icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xl">🥭</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground font-lalezar text-lg">
              Ahmed Mango
            </h1>
            <p className="text-xs text-muted-foreground font-tajawal">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-tajawal transition-all",
                  currentView === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-xl mb-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-tajawal truncate" dir="ltr">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full font-tajawal border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4 ml-2" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
