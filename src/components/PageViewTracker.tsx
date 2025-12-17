import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMixpanel } from '@/hooks/useMixpanel';

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
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const pageName = pageNames[currentPath] || 'Unknown Page';

    // Track page view
    track('Page View', {
      page_path: currentPath,
      page_name: pageName,
      page_search: location.search,
      page_hash: location.hash,
      referrer: document.referrer,
    });

    // Track navigation if coming from another page
    if (previousPath.current && previousPath.current !== currentPath) {
      const fromPageName = pageNames[previousPath.current] || 'Unknown Page';
      trackNavigation(fromPageName, pageName);
    }

    previousPath.current = currentPath;
  }, [location, track, trackNavigation]);

  return null;
};
