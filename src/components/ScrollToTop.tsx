import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Use useLayoutEffect for synchronous scroll before paint
  useLayoutEffect(() => {
    // Immediate scroll
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
    
    // Fallback for mobile browsers that may delay scroll restoration
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
