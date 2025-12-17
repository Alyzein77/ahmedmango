import { useEffect, useRef, useCallback } from 'react';
import { useMixpanel } from './useMixpanel';

interface EngagementScore {
  total: number;
  breakdown: {
    pageViews: number;
    sectionViews: number;
    productClicks: number;
    videoPlays: number;
    gameActions: number;
    adClicks: number;
    timeOnSite: number;
    scrollDepth: number;
  };
  level: 'visitor' | 'interested' | 'engaged' | 'superfan';
  sessionDuration: number;
}

const SCORE_WEIGHTS = {
  pageView: 5,
  sectionView: 3,
  productClick: 15,
  videoPlay: 20,
  gameAction: 25,
  adClick: 10,
  timeOnSitePerMinute: 2,
  scrollDepthPer25: 5,
};

const STORAGE_KEY = 'ahmed_mango_engagement';

const getEngagementLevel = (score: number): EngagementScore['level'] => {
  if (score >= 200) return 'superfan';
  if (score >= 100) return 'engaged';
  if (score >= 30) return 'interested';
  return 'visitor';
};

const getStoredScore = (): EngagementScore => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('[Engagement] Error reading stored score:', e);
  }
  return {
    total: 0,
    breakdown: {
      pageViews: 0,
      sectionViews: 0,
      productClicks: 0,
      videoPlays: 0,
      gameActions: 0,
      adClicks: 0,
      timeOnSite: 0,
      scrollDepth: 0,
    },
    level: 'visitor',
    sessionDuration: 0,
  };
};

const saveScore = (score: EngagementScore) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score));
  } catch (e) {
    console.error('[Engagement] Error saving score:', e);
  }
};

export const useEngagementScore = () => {
  const { track } = useMixpanel();
  const scoreRef = useRef<EngagementScore>(getStoredScore());
  const sessionStartRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);

  // Calculate and update total score
  const updateTotalScore = useCallback(() => {
    const { breakdown } = scoreRef.current;
    const total = 
      breakdown.pageViews +
      breakdown.sectionViews +
      breakdown.productClicks +
      breakdown.videoPlays +
      breakdown.gameActions +
      breakdown.adClicks +
      breakdown.timeOnSite +
      breakdown.scrollDepth;
    
    scoreRef.current.total = total;
    scoreRef.current.level = getEngagementLevel(total);
    saveScore(scoreRef.current);
    
    return scoreRef.current;
  }, []);

  // Track page view
  const trackPageView = useCallback(() => {
    scoreRef.current.breakdown.pageViews += SCORE_WEIGHTS.pageView;
    const updated = updateTotalScore();
    track('Engagement Score Updated', { 
      action: 'page_view',
      points_earned: SCORE_WEIGHTS.pageView,
      total_score: updated.total,
      level: updated.level,
    });
    return updated;
  }, [track, updateTotalScore]);

  // Track section view
  const trackSectionView = useCallback((sectionName: string) => {
    scoreRef.current.breakdown.sectionViews += SCORE_WEIGHTS.sectionView;
    const updated = updateTotalScore();
    track('Engagement Score Updated', { 
      action: 'section_view',
      section: sectionName,
      points_earned: SCORE_WEIGHTS.sectionView,
      total_score: updated.total,
      level: updated.level,
    });
    return updated;
  }, [track, updateTotalScore]);

  // Track product click
  const trackProductClick = useCallback((productId: string, productName: string) => {
    scoreRef.current.breakdown.productClicks += SCORE_WEIGHTS.productClick;
    const updated = updateTotalScore();
    track('Engagement Score Updated', { 
      action: 'product_click',
      product_id: productId,
      product_name: productName,
      points_earned: SCORE_WEIGHTS.productClick,
      total_score: updated.total,
      level: updated.level,
    });
    return updated;
  }, [track, updateTotalScore]);

  // Track video play
  const trackVideoPlay = useCallback((videoId: string, videoTitle: string) => {
    scoreRef.current.breakdown.videoPlays += SCORE_WEIGHTS.videoPlay;
    const updated = updateTotalScore();
    track('Engagement Score Updated', { 
      action: 'video_play',
      video_id: videoId,
      video_title: videoTitle,
      points_earned: SCORE_WEIGHTS.videoPlay,
      total_score: updated.total,
      level: updated.level,
    });
    return updated;
  }, [track, updateTotalScore]);

  // Track game action
  const trackGameAction = useCallback((action: string) => {
    scoreRef.current.breakdown.gameActions += SCORE_WEIGHTS.gameAction;
    const updated = updateTotalScore();
    track('Engagement Score Updated', { 
      action: 'game_action',
      game_action: action,
      points_earned: SCORE_WEIGHTS.gameAction,
      total_score: updated.total,
      level: updated.level,
    });
    return updated;
  }, [track, updateTotalScore]);

  // Track ad click
  const trackAdClick = useCallback((adId: string) => {
    scoreRef.current.breakdown.adClicks += SCORE_WEIGHTS.adClick;
    const updated = updateTotalScore();
    track('Engagement Score Updated', { 
      action: 'ad_click',
      ad_id: adId,
      points_earned: SCORE_WEIGHTS.adClick,
      total_score: updated.total,
      level: updated.level,
    });
    return updated;
  }, [track, updateTotalScore]);

  // Get current score
  const getScore = useCallback(() => {
    return scoreRef.current;
  }, []);

  // Reset score
  const resetScore = useCallback(() => {
    scoreRef.current = {
      total: 0,
      breakdown: {
        pageViews: 0,
        sectionViews: 0,
        productClicks: 0,
        videoPlays: 0,
        gameActions: 0,
        adClicks: 0,
        timeOnSite: 0,
        scrollDepth: 0,
      },
      level: 'visitor',
      sessionDuration: 0,
    };
    saveScore(scoreRef.current);
    track('Engagement Score Reset', {});
    return scoreRef.current;
  }, [track]);

  // Track time on site
  useEffect(() => {
    const interval = setInterval(() => {
      const minutesOnSite = Math.floor((Date.now() - sessionStartRef.current) / 60000);
      const newTimeScore = minutesOnSite * SCORE_WEIGHTS.timeOnSitePerMinute;
      
      if (newTimeScore > scoreRef.current.breakdown.timeOnSite) {
        scoreRef.current.breakdown.timeOnSite = newTimeScore;
        scoreRef.current.sessionDuration = Date.now() - sessionStartRef.current;
        updateTotalScore();
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [updateTotalScore]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
        
        // Award points for every 25% milestone
        const milestones = Math.floor(scrollPercent / 25);
        const previousMilestones = Math.floor(scoreRef.current.breakdown.scrollDepth / SCORE_WEIGHTS.scrollDepthPer25);
        
        if (milestones > previousMilestones) {
          scoreRef.current.breakdown.scrollDepth = milestones * SCORE_WEIGHTS.scrollDepthPer25;
          updateTotalScore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateTotalScore]);

  // Send final engagement score on page unload
  useEffect(() => {
    const handleUnload = () => {
      const finalScore = scoreRef.current;
      track('Session Ended', {
        total_score: finalScore.total,
        level: finalScore.level,
        session_duration_ms: Date.now() - sessionStartRef.current,
        ...finalScore.breakdown,
      });
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [track]);

  return {
    getScore,
    trackPageView,
    trackSectionView,
    trackProductClick,
    trackVideoPlay,
    trackGameAction,
    trackAdClick,
    resetScore,
    SCORE_WEIGHTS,
  };
};

export type { EngagementScore };
