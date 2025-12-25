import { useState } from "react";
import { User } from "@supabase/supabase-js";
import AdminSidebar from "./AdminSidebar";
import ProductsManager from "./ProductsManager";
import VideosManager from "./VideosManager";
import TikTokManager from "./TikTokManager";
import SocialLinksManager from "./SocialLinksManager";
import AdSpacesManager from "./AdSpacesManager";
import AdRequestsManager from "./AdRequestsManager";
import AdminStats from "./AdminStats";
import AdAnalyticsDashboard from "./AdAnalyticsDashboard";
import MixpanelDashboard from "./MixpanelDashboard";
import EngagementDashboard from "./EngagementDashboard";
import NotificationEmailsManager from "./NotificationEmailsManager";
import { ProductReviewsManager } from "./ProductReviewsManager";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminView = "products" | "videos" | "tiktok" | "social" | "ads" | "ad-requests" | "stats" | "analytics" | "mixpanel" | "engagement" | "notifications" | "reviews";

const viewTitles: Record<AdminView, string> = {
  products: "إدارة المنتجات",
  videos: "إدارة الفيديوهات",
  tiktok: "إدارة TikTok",
  social: "روابط التواصل الاجتماعي",
  ads: "إدارة المساحات الإعلانية",
  "ad-requests": "طلبات المعلنين",
  stats: "الإحصائيات",
  analytics: "تحليلات الإعلانات",
  mixpanel: "تحليلات Mixpanel",
  engagement: "نقاط التفاعل",
  notifications: "إيميلات الإشعارات",
  reviews: "إدارة المراجعات",
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
            {currentView === "tiktok" && <TikTokManager />}
            {currentView === "social" && <SocialLinksManager />}
            {currentView === "ads" && <AdSpacesManager />}
            {currentView === "ad-requests" && <AdRequestsManager />}
            {currentView === "stats" && <AdminStats />}
            {currentView === "analytics" && <AdAnalyticsDashboard />}
            {currentView === "mixpanel" && <MixpanelDashboard />}
            {currentView === "engagement" && <EngagementDashboard />}
            {currentView === "notifications" && <NotificationEmailsManager />}
            {currentView === "reviews" && <ProductReviewsManager />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
