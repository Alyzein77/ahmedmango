import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  MousePointer, 
  Eye, 
  Play, 
  ShoppingBag, 
  Gamepad2, 
  FileText, 
  ExternalLink,
  Activity,
  Users,
  TrendingUp,
  Layers,
  Filter
} from "lucide-react";

const trackedEvents = [
  {
    category: "Page Views",
    icon: Eye,
    color: "bg-blue-500",
    events: [
      { name: "Page View", description: "عند زيارة أي صفحة" },
      { name: "Navigation", description: "عند الانتقال بين الصفحات" },
    ]
  },
  {
    category: "Section Views",
    icon: Layers,
    color: "bg-purple-500",
    events: [
      { name: "Section Viewed", description: "عند ظهور قسم في الشاشة (Hero, Products, Videos, Game, Ads)" },
    ]
  },
  {
    category: "Product Interactions",
    icon: ShoppingBag,
    color: "bg-green-500",
    events: [
      { 
        name: "Product Clicked", 
        description: "عند الضغط على منتج",
        properties: ["product_id", "product_name", "category", "verdict", "rating", "brand", "source", "position", "action"]
      },
    ]
  },
  {
    category: "Video Interactions",
    icon: Play,
    color: "bg-red-500",
    events: [
      { 
        name: "Video Clicked", 
        description: "عند الضغط على فيديو",
        properties: ["video_id", "video_title", "platform", "category", "views", "source", "position"]
      },
    ]
  },
  {
    category: "Game Interactions",
    icon: Gamepad2,
    color: "bg-yellow-500",
    events: [
      { name: "Game Action", description: "عند الضغط على يلا نلعب أو المتصدرين", properties: ["action"] },
    ]
  },
  {
    category: "Ad Interactions",
    icon: MousePointer,
    color: "bg-orange-500",
    events: [
      { 
        name: "Ad Clicked", 
        description: "عند الضغط على أي إعلان",
        properties: ["ad_id", "ad_title", "card_type", "click_type", "position", "redirect_url"]
      },
    ]
  },
  {
    category: "Filter Changes",
    icon: Filter,
    color: "bg-cyan-500",
    events: [
      { 
        name: "Filter Changed", 
        description: "عند تغيير الفلاتر",
        properties: ["filter_type", "filter_value", "source"]
      },
    ]
  },
  {
    category: "CTA Clicks",
    icon: MousePointer,
    color: "bg-indigo-500",
    events: [
      { 
        name: "CTA Clicked", 
        description: "عند الضغط على أزرار الـ CTA",
        properties: ["button_name", "destination", "source"]
      },
    ]
  },
  {
    category: "Form Submissions",
    icon: FileText,
    color: "bg-pink-500",
    events: [
      { name: "Form Submitted", description: "عند إرسال طلب إعلان" },
    ]
  },
];

const MixpanelDashboard = () => {
  const mixpanelProjectUrl = "https://mixpanel.com/project/3426012";

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-2 border-foreground shadow-bold bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-black">Mixpanel Analytics</CardTitle>
                <CardDescription>تتبع سلوك المستخدمين على الموقع</CardDescription>
              </div>
            </div>
            <Button 
              onClick={() => window.open(mixpanelProjectUrl, '_blank')}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              فتح Mixpanel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard 
              icon={Activity} 
              label="Autocapture" 
              value="مُفعّل" 
              color="bg-green-500" 
            />
            <StatCard 
              icon={Users} 
              label="Session Recording" 
              value="100%" 
              color="bg-blue-500" 
            />
            <StatCard 
              icon={TrendingUp} 
              label="Custom Events" 
              value={trackedEvents.reduce((acc, cat) => acc + cat.events.length, 0).toString()} 
              color="bg-purple-500" 
            />
            <StatCard 
              icon={Layers} 
              label="Tracked Sections" 
              value="6" 
              color="bg-orange-500" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Autocapture Info */}
      <Card className="border-2 border-foreground shadow-bold">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Autocapture Events (تلقائي)
          </CardTitle>
          <CardDescription>
            هذه الأحداث يتم تتبعها تلقائياً بواسطة Mixpanel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <Eye className="w-3 h-3" />
              [Auto] Page View
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <MousePointer className="w-3 h-3" />
              [Auto] Element Click
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <FileText className="w-3 h-3" />
              [Auto] Form Submit
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="w-3 h-3" />
              [Auto] Page Scroll
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <MousePointer className="w-3 h-3" />
              [Auto] Dead Click
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <MousePointer className="w-3 h-3" />
              [Auto] Rage Click
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Custom Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trackedEvents.map((category) => (
          <Card key={category.category} className="border-2 border-foreground shadow-bold">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-4 h-4 text-white" />
                </div>
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {category.events.map((event) => (
                <div key={event.name} className="bg-muted/50 rounded-lg p-3">
                  <p className="font-bold text-sm text-foreground">{event.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                  {'properties' in event && event.properties && (
                    <div className="flex flex-wrap gap-1">
                      {event.properties.map((prop) => (
                        <Badge key={prop} variant="outline" className="text-[10px] px-1.5 py-0">
                          {prop}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Properties Info */}
      <Card className="border-2 border-foreground shadow-bold">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Event Properties Summary</CardTitle>
          <CardDescription>
            كل حدث يتضمن هذه الخصائص الإضافية حسب النوع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-green-500" />
                Product Clicked
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <PropertyCard name="product_id" description="معرف المنتج" />
                <PropertyCard name="product_name" description="اسم المنتج" />
                <PropertyCard name="category" description="التصنيف" />
                <PropertyCard name="verdict" description="2استكا / فاستكا" />
                <PropertyCard name="rating" description="التقييم (1-10)" />
                <PropertyCard name="brand" description="الماركة" />
                <PropertyCard name="source" description="المصدر" />
                <PropertyCard name="position" description="الترتيب في القائمة" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Play className="w-4 h-4 text-red-500" />
                Video Clicked
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <PropertyCard name="video_id" description="معرف الفيديو" />
                <PropertyCard name="video_title" description="عنوان الفيديو" />
                <PropertyCard name="platform" description="المنصة" />
                <PropertyCard name="category" description="نوع المحتوى" />
                <PropertyCard name="views" description="عدد المشاهدات" />
                <PropertyCard name="source" description="المصدر" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-orange-500" />
                Ad Clicked
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <PropertyCard name="ad_id" description="معرف الإعلان" />
                <PropertyCard name="ad_title" description="عنوان الإعلان" />
                <PropertyCard name="card_type" description="1x أو 2x" />
                <PropertyCard name="click_type" description="card أو button" />
                <PropertyCard name="position" description="الترتيب" />
                <PropertyCard name="redirect_url" description="رابط التوجيه" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-500" />
                Filter Changed
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <PropertyCard name="filter_type" description="نوع الفلتر" />
                <PropertyCard name="filter_value" description="القيمة المختارة" />
                <PropertyCard name="source" description="الصفحة/القسم" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-2 border-foreground shadow-bold">
        <CardHeader>
          <CardTitle className="text-lg font-bold">روابط سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open(`${mixpanelProjectUrl}/view/live`, '_blank')}
            >
              <Activity className="w-4 h-4" />
              Live View
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open(`${mixpanelProjectUrl}/view/insights`, '_blank')}
            >
              <TrendingUp className="w-4 h-4" />
              Insights
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open(`${mixpanelProjectUrl}/view/flows`, '_blank')}
            >
              <Layers className="w-4 h-4" />
              User Flows
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open(`${mixpanelProjectUrl}/view/retention`, '_blank')}
            >
              <Users className="w-4 h-4" />
              Retention
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  color: string;
}) => (
  <div className="bg-card rounded-xl border-2 border-border p-4">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-black text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

const PropertyCard = ({ name, description }: { name: string; description: string }) => (
  <div className="bg-muted/50 rounded-lg p-2">
    <code className="text-[10px] font-mono text-primary">{name}</code>
    <p className="text-[10px] text-muted-foreground">{description}</p>
  </div>
);

export default MixpanelDashboard;
