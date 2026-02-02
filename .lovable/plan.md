

## Plan: Enhanced Mixpanel Tracking with Proper Tagging

### Current State Analysis

After reviewing the codebase, here's what's currently being tracked vs what's missing:

| Component | Current Tracking | Missing |
|-----------|-----------------|---------|
| ProductList | Section view only | Product clicks, category, verdict, source |
| LatestContentFeed | None | Video clicks, platform, category |
| ProductCard | Basic product click | Category, verdict, rating, brand |
| AdSpaces | Ad ID + title | Position, card type (1x/2x), button vs card |
| MangoGame | Basic game start | Button type (play vs leaderboard) |
| Products page | None | Filter changes, category selection |

---

### Part 1: Update useMixpanel Hook

Add more detailed tracking functions with rich properties:

```typescript
// Enhanced product tracking
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

// Enhanced ad tracking
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

// NEW: Filter tracking
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

// NEW: CTA button tracking
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
```

---

### Part 2: Update ProductList Component

Add tracking when users click on products and filter:

```typescript
// Track filter changes
const handleFilterChange = (filter: "all" | "2استكا" | "فاستكا") => {
  setActiveFilter(filter);
  trackFilterChange('verdict', filter, 'homepage');
};

// Track product clicks with full details
const handleProductClick = (product: Product, index: number) => {
  trackProductClick(product.id, product.name, {
    action: 'view_review',
    category: product.category,
    verdict: product.verdict as '2استكا' | 'فاستكا',
    source: 'homepage',
    position: index + 1,
  });
};
```

---

### Part 3: Update LatestContentFeed Component

Add tracking for video/content clicks:

```typescript
const { trackVideoClick, trackFilterChange } = useMixpanel();

// Track platform filter changes
const handlePlatformFilter = (platform: Platform | "all") => {
  setActiveFilter(platform);
  trackFilterChange('platform', platform, 'content_feed');
};

// In ContentCard - track video clicks
const handleContentClick = () => {
  trackVideoClick(item.id, item.title, {
    platform: item.platform,
    category: item.content_type,
    views: item.views || undefined,
    source: 'homepage',
    position: index + 1,
  });
  window.open(item.link_url, "_blank");
};
```

---

### Part 4: Update AdSpaces Component

Enhance ad tracking with position and type:

```typescript
const handleAdClick = (ad: AdSpace, index: number) => {
  if (ad.redirect_url) {
    trackClick(ad.id, "card");
    trackAdClick(ad.id, {
      ad_title: ad.title || undefined,
      card_type: ad.card_type as '1x' | '2x',
      click_type: 'card',
      position: index + 1,
      redirect_url: ad.redirect_url,
    });
    window.open(ad.redirect_url, "_blank");
  }
};

const handleButtonClick = (e: React.MouseEvent, ad: AdSpace, index: number) => {
  e.stopPropagation();
  if (ad.button_link) {
    trackClick(ad.id, "button");
    trackAdClick(ad.id, {
      ad_title: ad.title || undefined,
      card_type: ad.card_type as '1x' | '2x',
      click_type: 'button',
      position: index + 1,
      redirect_url: ad.button_link,
    });
    window.open(ad.button_link, "_blank");
  }
};
```

---

### Part 5: Update Products Page

Add tracking for the dedicated products page:

```typescript
const { trackProductClick, trackFilterChange } = useMixpanel();

// Track verdict filter changes
const handleVerdictFilter = (verdict: "all" | "2استكا" | "فاستكا") => {
  setActiveFilter(verdict);
  trackFilterChange('verdict', verdict, 'products_page');
};

// Track category filter changes
const handleCategoryFilter = (category: string) => {
  setActiveCategory(category);
  trackFilterChange('category', category, 'products_page');
};

// Track product review clicks with full data
const handleReviewClick = (product: Product, index: number) => {
  trackProductClick(product.id, product.name, {
    action: 'view_review',
    category: product.category,
    verdict: product.verdict as '2استكا' | 'فاستكا',
    rating: product.rating,
    brand: product.brand || undefined,
    source: 'products_page',
    position: index + 1,
  });
};
```

---

### Part 6: Update MangoGame Component

Track specific game actions:

```typescript
const handlePlayGame = () => {
  trackGamePlay('start', undefined);
  trackCTAClick('يلا نلعب', 'kharbsh_game', 'game_section');
  window.open('...', '_blank');
};

const handleLeaderboard = () => {
  trackGamePlay('leaderboard', undefined);
  trackCTAClick('المتصدرين', 'kharbsh_leaderboard', 'game_section');
  window.open('...', '_blank');
};
```

---

### Part 7: Update MixpanelDashboard

Update the admin dashboard to reflect new events:

| Event | Properties |
|-------|------------|
| Product Clicked | product_id, product_name, category, verdict, rating, brand, source, position, action |
| Video Clicked | video_id, video_title, platform, category, views, source, position |
| Ad Clicked | ad_id, ad_title, card_type, click_type, position, redirect_url |
| Filter Changed | filter_type, filter_value, source |
| CTA Clicked | button_name, destination, source |
| Game Action | action (start/leaderboard), score |

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useMixpanel.ts` | Add enhanced tracking functions with rich properties |
| `src/components/ProductList.tsx` | Add product click + filter tracking |
| `src/components/LatestContentFeed.tsx` | Add video click + platform filter tracking |
| `src/components/AdSpaces.tsx` | Enhance ad tracking with position + type |
| `src/components/MangoGame.tsx` | Add specific CTA tracking |
| `src/pages/Products.tsx` | Add filter + product click tracking |
| `src/components/admin/MixpanelDashboard.tsx` | Update documented events |

---

### Event Properties Summary

**Product Clicked:**
- `product_id` - Unique ID
- `product_name` - Arabic name
- `category` - شيبسي, شوكولاتة, مشروبات, etc.
- `verdict` - 2استكا or فاستكا
- `rating` - 1-10 score
- `brand` - Brand name if available
- `source` - homepage, products_page, compare_page
- `position` - Card position in list (1, 2, 3...)
- `action` - view_review or card_click

**Video Clicked:**
- `video_id` - Unique ID
- `video_title` - Video title
- `platform` - YouTube, TikTok, Instagram, Facebook
- `category` - Video, Reel, etc.
- `views` - View count
- `source` - homepage, content_page
- `position` - Position in feed

**Ad Clicked:**
- `ad_id` - Unique ID
- `ad_title` - Ad headline
- `card_type` - 1x or 2x
- `click_type` - card or button
- `position` - Display order
- `redirect_url` - Where user goes

**Filter Changed:**
- `filter_type` - verdict, category, platform
- `filter_value` - The selected value
- `source` - Which page/section

