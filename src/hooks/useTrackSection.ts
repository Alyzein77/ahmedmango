import { useEffect, useRef } from 'react';
import { useMixpanel } from './useMixpanel';

export const useTrackSection = (sectionName: string, threshold = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);
  const { trackSectionView } = useMixpanel();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView(sectionName);
            hasTracked.current = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, threshold, trackSectionView]);

  return ref;
};
