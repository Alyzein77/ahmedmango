import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  breadcrumbs?: BreadcrumbItem[];
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
  breadcrumbs,
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
    // BreadcrumbList structured data
    const breadcrumbScriptId = "seo-breadcrumb-jsonld";
    if (breadcrumbs && breadcrumbs.length > 0) {
      let script = document.getElementById(breadcrumbScriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = breadcrumbScriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `${BASE_URL}${item.url}`,
        })),
      });
    } else {
      const existing = document.getElementById(breadcrumbScriptId);
      if (existing) existing.remove();
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, breadcrumbs]);
}
