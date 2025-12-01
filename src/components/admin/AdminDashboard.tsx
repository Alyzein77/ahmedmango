import { useState } from "react";
import { User } from "@supabase/supabase-js";
import AdminSidebar from "./AdminSidebar";
import ProductsManager from "./ProductsManager";
import AdminStats from "./AdminStats";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminView = "products" | "stats";

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
          {currentView === "stats" && <AdminStats />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
