import { useState } from "react";
import { User } from "@supabase/supabase-js";
import AdminSidebar from "./AdminSidebar";
import ProductsManager from "./ProductsManager";
import VideosManager from "./VideosManager";
import LatestContentManager from "./LatestContentManager";
import TikTokManager from "./TikTokManager";
import SocialLinksManager from "./SocialLinksManager";
import AdminStats from "./AdminStats";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminView = "products" | "videos" | "content" | "tiktok" | "social" | "stats";

const viewTitles: Record<AdminView, string> = {
  products: "إدارة المنتجات",
  videos: "إدارة الفيديوهات",
  content: "إدارة آخر المحتوى",
  tiktok: "إدارة TikTok",
  social: "روابط التواصل الاجتماعي",
  stats: "الإحصائيات",
};

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<AdminView>("products");

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar */}
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        userEmail={user.email || ""}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-orange border-b-4 border-foreground p-6">
          <h1 className="text-2xl font-black text-foreground font-lalezar">
            {viewTitles[currentView]}
          </h1>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {currentView === "products" && <ProductsManager />}
            {currentView === "videos" && <VideosManager />}
            {currentView === "content" && <LatestContentManager />}
            {currentView === "tiktok" && <TikTokManager />}
            {currentView === "social" && <SocialLinksManager />}
            {currentView === "stats" && <AdminStats />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
