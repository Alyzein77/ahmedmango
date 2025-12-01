import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ThumbsUp, ThumbsDown, Star, TrendingUp } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Stats {
  totalProducts: number;
  goodProducts: number;
  badProducts: number;
  averageRating: number;
  featuredCount: number;
  categoryBreakdown: Record<string, number>;
}

const AdminStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select("*");

      if (error) throw error;

      if (products) {
        const goodProducts = products.filter((p) => p.verdict === "2استكا").length;
        const badProducts = products.filter((p) => p.verdict === "فاستكا").length;
        const averageRating =
          products.length > 0
            ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
            : 0;
        const featuredCount = products.filter((p) => p.is_featured).length;

        const categoryBreakdown: Record<string, number> = {};
        products.forEach((p) => {
          categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
        });

        setStats({
          totalProducts: products.length,
          goodProducts,
          badProducts,
          averageRating: Math.round(averageRating * 10) / 10,
          featuredCount,
          categoryBreakdown,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground font-tajawal">
          فشل في تحميل الإحصائيات
        </p>
      </div>
    );
  }

  const statCards = [
    {
      title: "إجمالي المنتجات",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "2استكا (جيد)",
      value: stats.goodProducts,
      icon: ThumbsUp,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "فاستكا (سيء)",
      value: stats.badProducts,
      icon: ThumbsDown,
      color: "bg-pink/50 text-accent",
    },
    {
      title: "متوسط التقييم",
      value: `${stats.averageRating}/10`,
      icon: Star,
      color: "bg-orange/20 text-orange",
    },
    {
      title: "منتجات مميزة",
      value: stats.featuredCount,
      icon: TrendingUp,
      color: "bg-sky/50 text-sky-foreground",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground font-tajawal">
          إحصائيات
        </h1>
        <p className="text-muted-foreground font-tajawal">
          نظرة عامة على المنتجات المراجعة
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-tajawal text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Breakdown */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-tajawal">توزيع الفئات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
              <div key={category} className="flex items-center gap-4">
                <span className="font-tajawal text-muted-foreground w-24">
                  {category}
                </span>
                <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(count / stats.totalProducts) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-bold text-foreground w-8 text-left">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
