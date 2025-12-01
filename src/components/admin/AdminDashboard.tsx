import { useState } from "react";
import { User } from "@supabase/supabase-js";
import AdminSidebar from "./AdminSidebar";
import ProductsManager from "./ProductsManager";
import VideosManager from "./VideosManager";
import LatestContentManager from "./LatestContentManager";
import TikTokManager from "./TikTokManager";
import AdminStats from "./AdminStats";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminView = "products" | "videos" | "content" | "tiktok" | "stats";

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [currentView, setCurrentView] = useState<AdminView>("products");

  return (
    <div className="min-h-screen bg-muted flex" dir="rtl">
      {/* Sidebar */}
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        userEmail={user.email || ""}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {currentView === "products" && <ProductsManager />}
          {currentView === "videos" && <VideosManager />}
          {currentView === "content" && <LatestContentManager />}
          {currentView === "tiktok" && <TikTokManager />}
          {currentView === "stats" && <AdminStats />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
