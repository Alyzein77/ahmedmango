declare global {
  interface Window {
    mixpanel: {
      track: (event: string, properties?: Record<string, any>) => void;
      identify: (id: string) => void;
      people: {
        set: (properties: Record<string, any>) => void;
      };
    };
  }
}

export const useMixpanel = () => {
  const track = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.track(event, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const identify = (userId: string) => {
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.identify(userId);
    }
  };

  const setUserProperties = (properties: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.mixpanel?.people) {
      window.mixpanel.people.set(properties);
    }
  };

  // Pre-defined events
  const trackButtonClick = (buttonName: string, location?: string) => {
    track('Button Clicked', { button_name: buttonName, location });
  };

  const trackFormSubmission = (formName: string, data?: Record<string, any>) => {
    track('Form Submitted', { form_name: formName, ...data });
  };

  const trackProductView = (productId: string, productName: string, category?: string) => {
    track('Product Viewed', { product_id: productId, product_name: productName, category });
  };

  const trackProductClick = (productId: string, productName: string, action: string) => {
    track('Product Action', { product_id: productId, product_name: productName, action });
  };

  const trackSectionView = (sectionName: string) => {
    track('Section Viewed', { section_name: sectionName });
  };

  const trackGamePlay = (action: string, score?: number) => {
    track('Game Action', { action, score });
  };

  const trackAdClick = (adId: string, adTitle?: string) => {
    track('Ad Clicked', { ad_id: adId, ad_title: adTitle });
  };

  const trackVideoPlay = (videoId: string, videoTitle: string, platform: string) => {
    track('Video Played', { video_id: videoId, video_title: videoTitle, platform });
  };

  const trackNavigation = (from: string, to: string) => {
    track('Navigation', { from, to });
  };

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
    trackVideoPlay,
    trackNavigation,
  };
};
