import { useCallback } from 'react';

declare global {
  interface Window {
    mixpanel?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string) => void;
      people: {
        set: (properties: Record<string, unknown>) => void;
      };
    };
  }
}

export const useMixpanel = () => {
  const track = useCallback((event: string, properties?: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && window.mixpanel?.track) {
        window.mixpanel.track(event, {
          ...properties,
          timestamp: new Date().toISOString(),
        });
        console.log('[Mixpanel] Event tracked:', event, properties);
      }
    } catch (error) {
      console.error('[Mixpanel] Error tracking event:', error);
    }
  }, []);

  const identify = useCallback((userId: string) => {
    try {
      if (typeof window !== 'undefined' && window.mixpanel?.identify) {
        window.mixpanel.identify(userId);
      }
    } catch (error) {
      console.error('[Mixpanel] Error identifying user:', error);
    }
  }, []);

  const setUserProperties = useCallback((properties: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && window.mixpanel?.people?.set) {
        window.mixpanel.people.set(properties);
      }
    } catch (error) {
      console.error('[Mixpanel] Error setting user properties:', error);
    }
  }, []);

  // Pre-defined events
  const trackButtonClick = useCallback((buttonName: string, location?: string) => {
    track('Button Clicked', { button_name: buttonName, location });
  }, [track]);

  const trackFormSubmission = useCallback((formName: string, data?: Record<string, unknown>) => {
    track('Form Submitted', { form_name: formName, ...data });
  }, [track]);

  const trackProductView = useCallback((productId: string, productName: string, category?: string) => {
    track('Product Viewed', { product_id: productId, product_name: productName, category });
  }, [track]);

  // Enhanced product tracking with rich properties
  const trackProductClick = useCallback((
    productId: string, 
    productName: string, 
    properties: {
      action: 'view_review' | 'card_click';
      category: string;
      verdict: '2استكا' | 'فاستكا';
      rating?: number;
      brand?: string;
      source: 'homepage' | 'products_page' | 'compare_page';
      position?: number;
    }
  ) => {
    track('Product Clicked', {
      product_id: productId,
      product_name: productName,
      ...properties,
    });
  }, [track]);

  const trackSectionView = useCallback((sectionName: string) => {
    track('Section Viewed', { section_name: sectionName });
  }, [track]);

  const trackGamePlay = useCallback((action: string, score?: number) => {
    track('Game Action', { action, score });
  }, [track]);

  // Enhanced ad tracking with position and type
  const trackAdClick = useCallback((
    adId: string,
    properties: {
      ad_title?: string;
      card_type: '1x' | '2x';
      click_type: 'card' | 'button';
      position: number;
      redirect_url?: string;
    }
  ) => {
    track('Ad Clicked', {
      ad_id: adId,
      ...properties,
    });
  }, [track]);

  // Enhanced video tracking
  const trackVideoClick = useCallback((
    videoId: string,
    videoTitle: string,
    properties: {
      platform: 'YouTube' | 'TikTok' | 'Instagram' | 'Facebook';
      category?: string;
      views?: number;
      source: 'homepage' | 'content_page';
      position?: number;
    }
  ) => {
    track('Video Clicked', {
      video_id: videoId,
      video_title: videoTitle,
      ...properties,
    });
  }, [track]);

  const trackVideoPlay = useCallback((videoId: string, videoTitle: string, platform: string) => {
    track('Video Played', { video_id: videoId, video_title: videoTitle, platform });
  }, [track]);

  const trackNavigation = useCallback((from: string, to: string) => {
    track('Navigation', { from, to });
  }, [track]);

  // Filter tracking
  const trackFilterChange = useCallback((
    filterType: 'verdict' | 'category' | 'platform',
    filterValue: string,
    source: string
  ) => {
    track('Filter Changed', {
      filter_type: filterType,
      filter_value: filterValue,
      source,
    });
  }, [track]);

  // CTA button tracking
  const trackCTAClick = useCallback((
    buttonName: string,
    destination: string,
    source: string
  ) => {
    track('CTA Clicked', {
      button_name: buttonName,
      destination,
      source,
    });
  }, [track]);

  return {
    track,
    identify,
    setUserProperties,
    trackButtonClick,
    trackFormSubmission,
    trackProductView,
    trackProductClick,
    trackSectionView,
    trackGamePlay,
    trackAdClick,
    trackVideoClick,
    trackVideoPlay,
    trackNavigation,
    trackFilterChange,
    trackCTAClick,
  };
};
