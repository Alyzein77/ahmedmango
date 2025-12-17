import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, TrendingUp, MousePointerClick, Calendar, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { format, subDays, startOfDay, eachDayOfInterval } from "date-fns";
import { ar } from "date-fns/locale";

interface ClickData {
  id: string;
  ad_space_id: string;
  clicked_at: string;
  click_type: string | null;
  referrer: string | null;
  user_agent: string | null;
}

interface AdSpace {
  id: string;
  title: string | null;
  click_count: number | null;
}

interface DailyClickData {
  date: string;
  clicks: number;
}

interface AdPerformance {
  name: string;
  clicks: number;
}

interface ClickTypeData {
  type: string;
  value: number;
}

const COLORS = ["#FF6B35", "#FFD700", "#4ECDC4", "#FF69B4", "#6366F1"];

const AdAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);
  const [todayClicks, setTodayClicks] = useState(0);
  const [weeklyClicks, setWeeklyClicks] = useState(0);
  const [dailyData, setDailyData] = useState<DailyClickData[]>([]);
  const [adPerformance, setAdPerformance] = useState<AdPerformance[]>([]);
  const [clickTypeData, setClickTypeData] = useState<ClickTypeData[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch all click data
      const { data: clicks, error: clicksError } = await supabase
        .from("ad_clicks")
        .select("*")
        .order("clicked_at", { ascending: false });

      if (clicksError) throw clicksError;

      // Fetch ad spaces for names
      const { data: adSpaces, error: adSpacesError } = await supabase
        .from("ad_spaces")
        .select("id, title, click_count");

      if (adSpacesError) throw adSpacesError;

      const clickData = (clicks || []) as ClickData[];
      const adSpaceData = (adSpaces || []) as AdSpace[];

      // Calculate total clicks
      setTotalClicks(clickData.length);

      // Calculate today's clicks
      const today = startOfDay(new Date());
      const todayClickCount = clickData.filter(
        (c) => new Date(c.clicked_at) >= today
      ).length;
      setTodayClicks(todayClickCount);

      // Calculate weekly clicks
      const weekAgo = subDays(today, 7);
      const weeklyClickCount = clickData.filter(
        (c) => new Date(c.clicked_at) >= weekAgo
      ).length;
      setWeeklyClicks(weeklyClickCount);

      // Generate daily click data for the last 14 days
      const last14Days = eachDayOfInterval({
        start: subDays(today, 13),
        end: today,
      });

      const dailyClickMap = new Map<string, number>();
      last14Days.forEach((day) => {
        dailyClickMap.set(format(day, "yyyy-MM-dd"), 0);
      });

      clickData.forEach((click) => {
        const dateKey = format(new Date(click.clicked_at), "yyyy-MM-dd");
        if (dailyClickMap.has(dateKey)) {
          dailyClickMap.set(dateKey, (dailyClickMap.get(dateKey) || 0) + 1);
        }
      });

      const dailyChartData = Array.from(dailyClickMap.entries()).map(
        ([date, clicks]) => ({
          date: format(new Date(date), "MM/dd", { locale: ar }),
          clicks,
        })
      );
      setDailyData(dailyChartData);

      // Calculate ad performance
      const adClickMap = new Map<string, number>();
      clickData.forEach((click) => {
        const count = adClickMap.get(click.ad_space_id) || 0;
        adClickMap.set(click.ad_space_id, count + 1);
      });

      const performanceData = adSpaceData
        .map((ad) => ({
          name: ad.title || "بدون عنوان",
          clicks: adClickMap.get(ad.id) || 0,
        }))
        .filter((ad) => ad.clicks > 0)
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5);
      setAdPerformance(performanceData);

      // Calculate click types
      const typeMap = new Map<string, number>();
      clickData.forEach((click) => {
        const type = click.click_type || "card";
        typeMap.set(type, (typeMap.get(type) || 0) + 1);
      });

      const typeData = Array.from(typeMap.entries()).map(([type, value]) => ({
        type: type === "card" ? "البطاقة" : type === "button" ? "الزر" : type,
        value,
      }));
      setClickTypeData(typeData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-4 border-foreground shadow-bold bg-orange">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-background rounded-xl border-2 border-foreground">
                <MousePointerClick className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground/80 font-tajawal font-bold">
                  إجمالي النقرات
                </p>
                <p className="text-3xl font-black text-foreground font-lalezar">
                  {totalClicks.toLocaleString("ar-EG")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-bold bg-sky">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-background rounded-xl border-2 border-foreground">
                <Calendar className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground/80 font-tajawal font-bold">
                  نقرات اليوم
                </p>
                <p className="text-3xl font-black text-foreground font-lalezar">
                  {todayClicks.toLocaleString("ar-EG")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-foreground shadow-bold bg-pink">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-background rounded-xl border-2 border-foreground">
                <TrendingUp className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground/80 font-tajawal font-bold">
                  نقرات الأسبوع
                </p>
                <p className="text-3xl font-black text-foreground font-lalezar">
                  {weeklyClicks.toLocaleString("ar-EG")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart - Daily Trends */}
      <Card className="border-4 border-foreground shadow-bold">
        <CardHeader>
          <CardTitle className="font-lalezar text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            اتجاه النقرات (آخر 14 يوم)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#1a1349", fontSize: 12 }}
                  tickLine={{ stroke: "#1a1349" }}
                />
                <YAxis
                  tick={{ fill: "#1a1349", fontSize: 12 }}
                  tickLine={{ stroke: "#1a1349" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "3px solid #1a1349",
                    borderRadius: "12px",
                    fontFamily: "Tajawal",
                  }}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#FF6B35"
                  strokeWidth={3}
                  dot={{ fill: "#FF6B35", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, fill: "#FFD700" }}
                  name="النقرات"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Ad Performance */}
        <Card className="border-4 border-foreground shadow-bold">
          <CardHeader>
            <CardTitle className="font-lalezar text-xl flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              أداء الإعلانات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {adPerformance.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis type="number" tick={{ fill: "#1a1349", fontSize: 12 }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "#1a1349", fontSize: 11 }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "3px solid #1a1349",
                        borderRadius: "12px",
                        fontFamily: "Tajawal",
                      }}
                    />
                    <Bar dataKey="clicks" name="النقرات" radius={[0, 8, 8, 0]}>
                      {adPerformance.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground font-tajawal">
                  لا توجد بيانات متاحة
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Click Types */}
        <Card className="border-4 border-foreground shadow-bold">
          <CardHeader>
            <CardTitle className="font-lalezar text-xl flex items-center gap-2">
              <MousePointerClick className="w-5 h-5" />
              أنواع النقرات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {clickTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clickTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="type"
                      label={({ type, percent }) =>
                        `${type} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {clickTypeData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#1a1349"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "3px solid #1a1349",
                        borderRadius: "12px",
                        fontFamily: "Tajawal",
                      }}
                    />
                    <Legend
                      formatter={(value) => (
                        <span className="font-tajawal font-bold">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground font-tajawal">
                  لا توجد بيانات متاحة
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdAnalyticsDashboard;
