import { useEffect, useState } from 'react';
import { useEngagementScore, EngagementScore } from '@/hooks/useEngagementScore';
import { Trophy, Star, Zap, Eye } from 'lucide-react';

const levelConfig = {
  visitor: {
    icon: Eye,
    label: 'زائر',
    color: 'bg-gray-500',
    textColor: 'text-gray-500',
    description: 'مرحباً بك!',
  },
  interested: {
    icon: Star,
    label: 'مهتم',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
    description: 'أنت مهتم بالمحتوى',
  },
  engaged: {
    icon: Zap,
    label: 'متفاعل',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    description: 'أنت متفاعل جداً!',
  },
  superfan: {
    icon: Trophy,
    label: 'سوبر فان',
    color: 'bg-primary',
    textColor: 'text-primary',
    description: 'أنت من أكبر المعجبين! 🥭',
  },
};

interface EngagementBadgeProps {
  showDetails?: boolean;
  className?: string;
}

export const EngagementBadge = ({ showDetails = false, className = '' }: EngagementBadgeProps) => {
  const { getScore } = useEngagementScore();
  const [score, setScore] = useState<EngagementScore | null>(null);

  useEffect(() => {
    setScore(getScore());
    
    // Update periodically
    const interval = setInterval(() => {
      setScore(getScore());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [getScore]);

  if (!score) return null;

  const config = levelConfig[score.level];
  const Icon = config.icon;

  if (!showDetails) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.color} text-white text-sm font-bold ${className}`}>
        <Icon className="w-4 h-4" />
        <span>{config.label}</span>
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
          {score.total}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-card border-2 border-border rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${config.textColor}`}>{config.label}</span>
            <span className="bg-muted px-2 py-1 rounded-full text-xs font-bold">
              {score.total} نقطة
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>
      </div>

      {/* Progress to next level */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>التقدم للمستوى التالي</span>
          <span>{getProgressPercent(score)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${config.color} transition-all duration-500`}
            style={{ width: `${getProgressPercent(score)}%` }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <ScoreItem label="صفحات" value={score.breakdown.pageViews} />
        <ScoreItem label="أقسام" value={score.breakdown.sectionViews} />
        <ScoreItem label="منتجات" value={score.breakdown.productClicks} />
        <ScoreItem label="فيديوهات" value={score.breakdown.videoPlays} />
        <ScoreItem label="ألعاب" value={score.breakdown.gameActions} />
        <ScoreItem label="وقت" value={score.breakdown.timeOnSite} />
      </div>
    </div>
  );
};

const ScoreItem = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-muted/50 rounded-lg px-3 py-2 flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

const getProgressPercent = (score: EngagementScore): number => {
  const thresholds = { visitor: 0, interested: 30, engaged: 100, superfan: 200 };
  const nextThresholds = { visitor: 30, interested: 100, engaged: 200, superfan: 500 };
  
  const current = thresholds[score.level];
  const next = nextThresholds[score.level];
  const progress = ((score.total - current) / (next - current)) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
};

export default EngagementBadge;
