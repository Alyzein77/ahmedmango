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
  Layers
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
      { name: "Product Action", description: "عند الضغط على زر شوف الريڤيو" },
    ]
  },
  {
    category: "Video Interactions",
    icon: Play,
    color: "bg-red-500",
    events: [
      { name: "Video Played", description: "عند الضغط على زر شوف الفيديو" },
    ]
  },
  {
    category: "Game Interactions",
    icon: Gamepad2,
    color: "bg-yellow-500",
    events: [
      { name: "Game Action", description: "عند الضغط على يلا نلعب أو المتصدرين" },
    ]
  },
  {
    category: "Ad Interactions",
    icon: MousePointer,
    color: "bg-orange-500",
    events: [
      { name: "Ad Clicked", description: "عند الضغط على أي إعلان" },
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
  {
    category: "Button Clicks",
    icon: MousePointer,
    color: "bg-indigo-500",
    events: [
      { name: "Button Clicked", description: "عند الضغط على أزرار محددة" },
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
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Properties Info */}
      <Card className="border-2 border-foreground shadow-bold">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Event Properties</CardTitle>
          <CardDescription>
            كل حدث يتضمن هذه الخصائص الإضافية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PropertyCard name="timestamp" description="وقت الحدث" />
            <PropertyCard name="page_path" description="مسار الصفحة" />
            <PropertyCard name="page_name" description="اسم الصفحة" />
            <PropertyCard name="referrer" description="المصدر" />
            <PropertyCard name="product_id" description="معرف المنتج" />
            <PropertyCard name="product_name" description="اسم المنتج" />
            <PropertyCard name="video_id" description="معرف الفيديو" />
            <PropertyCard name="ad_id" description="معرف الإعلان" />
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
  <div className="bg-muted/50 rounded-lg p-3">
    <code className="text-xs font-mono text-primary">{name}</code>
    <p className="text-xs text-muted-foreground mt-1">{description}</p>
  </div>
);

export default MixpanelDashboard;
