import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

const BASE_URL = "https://ahmedmango.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image-v2.png`;
const SITE_NAME = "أحمد مانجو | Ahmed Mango";

export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
}: SEOConfig) {
  useEffect(() => {
    // Set document title
    document.title = `${title} | ${SITE_NAME}`;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Primary meta
    setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:title", ogTitle || title);
    setMeta("property", "og:description", ogDescription || description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage || DEFAULT_OG_IMAGE);
    if (canonical) {
      setMeta("property", "og:url", `${BASE_URL}${canonical}`);
    }

    // Twitter
    setMeta("name", "twitter:title", ogTitle || title);
    setMeta("name", "twitter:description", ogDescription || description);
    setMeta("name", "twitter:image", ogImage || DEFAULT_OG_IMAGE);

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", `${BASE_URL}${canonical}`);
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType]);
}
