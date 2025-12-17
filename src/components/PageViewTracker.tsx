import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMixpanel } from '@/hooks/useMixpanel';
import { useEngagementScore } from '@/hooks/useEngagementScore';

const pageNames: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/products': 'Products',
  '/products/compare': 'Products Compare',
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms',
  '/admin': 'Admin',
  '/content': 'All Content',
  '/advertise': 'Ad Request',
};

export const PageViewTracker = () => {
  const location = useLocation();
  const { track, trackNavigation } = useMixpanel();
  const { trackPageView } = useEngagementScore();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const pageName = pageNames[currentPath] || 'Unknown Page';

    // Track page view in Mixpanel
    track('Page View', {
      page_path: currentPath,
      page_name: pageName,
      page_search: location.search,
      page_hash: location.hash,
      referrer: document.referrer,
    });

    // Track engagement score
    trackPageView();

    // Track navigation if coming from another page
    if (previousPath.current && previousPath.current !== currentPath) {
      const fromPageName = pageNames[previousPath.current] || 'Unknown Page';
      trackNavigation(fromPageName, pageName);
    }

    previousPath.current = currentPath;
  }, [location, track, trackNavigation, trackPageView]);

  return null;
};
