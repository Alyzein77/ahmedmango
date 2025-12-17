import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Star, 
  Zap, 
  Eye,
  TrendingUp,
  Clock,
  MousePointer,
  Play,
  Gamepad2,
  ShoppingBag,
  Layers,
  RotateCcw
} from "lucide-react";
import { useEngagementScore, EngagementScore } from '@/hooks/useEngagementScore';

const levelConfig = {
  visitor: { icon: Eye, label: 'زائر', color: 'bg-gray-500', range: '0-29' },
  interested: { icon: Star, label: 'مهتم', color: 'bg-blue-500', range: '30-99' },
  engaged: { icon: Zap, label: 'متفاعل', color: 'bg-orange-500', range: '100-199' },
  superfan: { icon: Trophy, label: 'سوبر فان', color: 'bg-primary', range: '200+' },
};

const EngagementDashboard = () => {
  const { getScore, resetScore, SCORE_WEIGHTS } = useEngagementScore();
  const [score, setScore] = useState<EngagementScore | null>(null);

  useEffect(() => {
    setScore(getScore());
    const interval = setInterval(() => setScore(getScore()), 2000);
    return () => clearInterval(interval);
  }, [getScore]);

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين نقاط التفاعل؟')) {
      setScore(resetScore());
    }
  };

  if (!score) return null;

  const currentConfig = levelConfig[score.level];
  const CurrentIcon = currentConfig.icon;

  return (
    <div className="space-y-6">
      {/* Current Score Card */}
      <Card className="border-2 border-foreground shadow-bold bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 ${currentConfig.color} rounded-xl flex items-center justify-center`}>
                <CurrentIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-black">نقاط التفاعل الحالية</CardTitle>
                <CardDescription>تتبع تفاعل المستخدم مع الموقع</CardDescription>
              </div>
            </div>
            <div className="text-left">
              <div className="text-4xl font-black text-primary">{score.total}</div>
              <Badge className={currentConfig.color}>{currentConfig.label}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <BreakdownCard 
              icon={Eye} 
              label="صفحات" 
              value={score.breakdown.pageViews}
              color="bg-blue-500"
            />
            <BreakdownCard 
              icon={Layers} 
              label="أقسام" 
              value={score.breakdown.sectionViews}
              color="bg-purple-500"
            />
            <BreakdownCard 
              icon={ShoppingBag} 
              label="منتجات" 
              value={score.breakdown.productClicks}
              color="bg-green-500"
            />
            <BreakdownCard 
              icon={Play} 
              label="فيديوهات" 
              value={score.breakdown.videoPlays}
              color="bg-red-500"
            />
            <BreakdownCard 
              icon={Gamepad2} 
              label="ألعاب" 
              value={score.breakdown.gameActions}
              color="bg-yellow-500"
            />
            <BreakdownCard 
              icon={MousePointer} 
              label="إعلانات" 
              value={score.breakdown.adClicks}
              color="bg-orange-500"
            />
            <BreakdownCard 
              icon={Clock} 
              label="وقت" 
              value={score.breakdown.timeOnSite}
              color="bg-indigo-500"
            />
            <BreakdownCard 
              icon={TrendingUp} 
              label="تمرير" 
              value={score.breakdown.scrollDepth}
              color="bg-pink-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Scoring System */}
      <Card className="border-2 border-foreground shadow-bold">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            نظام النقاط
          </CardTitle>
          <CardDescription>النقاط المكتسبة لكل تفاعل</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ScoreRule label="مشاهدة صفحة" points={SCORE_WEIGHTS.pageView} />
            <ScoreRule label="مشاهدة قسم" points={SCORE_WEIGHTS.sectionView} />
            <ScoreRule label="ضغط على منتج" points={SCORE_WEIGHTS.productClick} />
            <ScoreRule label="تشغيل فيديو" points={SCORE_WEIGHTS.videoPlay} />
            <ScoreRule label="تفاعل مع اللعبة" points={SCORE_WEIGHTS.gameAction} />
            <ScoreRule label="ضغط على إعلان" points={SCORE_WEIGHTS.adClick} />
            <ScoreRule label="كل دقيقة" points={SCORE_WEIGHTS.timeOnSitePerMinute} />
            <ScoreRule label="كل 25% تمرير" points={SCORE_WEIGHTS.scrollDepthPer25} />
          </div>
        </CardContent>
      </Card>

      {/* Levels */}
      <Card className="border-2 border-foreground shadow-bold">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            مستويات التفاعل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(levelConfig).map(([key, config]) => {
              const Icon = config.icon;
              const isActive = key === score.level;
              return (
                <div 
                  key={key}
                  className={`p-4 rounded-xl border-2 ${isActive ? 'border-foreground shadow-bold' : 'border-border'}`}
                >
                  <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-bold text-foreground">{config.label}</p>
                  <p className="text-xs text-muted-foreground">{config.range} نقطة</p>
                  {isActive && (
                    <Badge className="mt-2 bg-primary">المستوى الحالي</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة تعيين النقاط
        </Button>
      </div>
    </div>
  );
};

const BreakdownCard = ({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: number;
  color: string;
}) => (
  <div className="bg-card rounded-xl border-2 border-border p-3">
    <div className="flex items-center gap-2 mb-1">
      <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-2xl font-black text-foreground">{value}</p>
  </div>
);

const ScoreRule = ({ label, points }: { label: string; points: number }) => (
  <div className="bg-muted/50 rounded-lg p-3 flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{label}</span>
    <Badge variant="secondary" className="font-bold">+{points}</Badge>
  </div>
);

export default EngagementDashboard;
