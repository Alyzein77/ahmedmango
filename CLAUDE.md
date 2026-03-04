# CLAUDE.md — Ahmed Mango Platform

## Project Overview

Ahmed Mango is a product review and content discovery platform for a popular Egyptian influencer. It showcases FMCG (Fast-Moving Consumer Goods) product reviews using a unique Arabic verdict system ("2استكا" = recommended, "فاستكا" = not recommended), aggregates video content from YouTube/TikTok/Instagram/Facebook, hosts an interactive game section (Kharbsh), and includes a full admin dashboard for content management.

The site is RTL (right-to-left) for Arabic users, built with React + TypeScript + Vite, backed by Supabase (PostgreSQL + Edge Functions), and styled with Tailwind CSS + shadcn-ui.

## Quick Reference

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build to dist/
npm run build:dev  # Development build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5.8 |
| Build | Vite 5.4 with React SWC plugin |
| Routing | React Router DOM 6 |
| UI Components | shadcn-ui (Radix UI primitives) |
| Styling | Tailwind CSS 3.4 (utility-first, HSL custom properties) |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod validation |
| Server State | TanStack React Query 5 |
| Backend | Supabase (PostgreSQL, Edge Functions, Auth) |
| Analytics | Mixpanel (via CDN) with custom engagement scoring |
| Icons | Lucide React |
| Notifications | Sonner (toasts) |
| Charts | Recharts |

## Directory Structure

```
src/
├── assets/              # Static images (logos, hero images)
├── components/
│   ├── admin/           # Admin dashboard components (CRUD managers, analytics dashboards)
│   ├── ui/              # shadcn-ui reusable components (40+ primitives)
│   ├── ProductList.tsx  # Product grid with filtering
│   ├── LatestContentFeed.tsx  # Video carousel
│   ├── AdSpaces.tsx     # Advertisement display
│   ├── Navbar.tsx       # Sticky navigation
│   ├── Footer.tsx       # Footer with social links
│   ├── Hero.tsx         # Hero section
│   └── [feature].tsx    # Section components (MangoGame, StatsSection, etc.)
├── hooks/               # Custom React hooks
│   ├── useMixpanel.ts   # Analytics tracking
│   ├── useEngagementScore.ts  # User engagement calculation
│   ├── useSiteSettings.ts     # Feature flag management
│   └── useTrackSection.ts     # Section visibility tracking
├── integrations/
│   └── supabase/        # Supabase client + auto-generated types
├── lib/
│   └── utils.ts         # Utility functions (cn helper for classnames)
├── pages/               # Route page components
│   ├── Index.tsx        # Homepage
│   ├── Products.tsx     # Products listing
│   ├── ProductsCompare.tsx  # Product comparison
│   ├── AllContent.tsx   # Videos/content page
│   ├── Admin.tsx        # Admin dashboard
│   └── [page].tsx       # About, AdRequest, Terms, PrivacyPolicy, NotFound
├── App.tsx              # Route definitions, main layout
├── main.tsx             # React entry point
└── index.css            # Global styles, Tailwind layers, CSS variables

supabase/
├── config.toml          # Supabase project config
├── functions/           # Edge Functions (Deno)
│   ├── track-ad-click/  # Ad click tracking
│   ├── admin-login/     # Admin authentication
│   ├── akedly-*/        # OTP verification service
│   ├── tiktok-rss/      # TikTok content sync
│   └── [function]/      # Other server-side functions
└── migrations/          # PostgreSQL migrations (17+)

public/
├── lovable-uploads/     # User-uploaded images (products, ads)
├── images/              # Background images
└── _redirects           # Netlify SPA redirect rules
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Index | Homepage with all sections |
| `/products` | Products | Product listings with filtering |
| `/products/compare` | ProductsCompare | Side-by-side product comparison |
| `/content` | AllContent | All video/content feed |
| `/about` | About | About page |
| `/advertise` | AdRequest | Advertising inquiry form |
| `/admin` | Admin | Protected admin dashboard |
| `/privacy-policy` | PrivacyPolicy | Privacy policy |
| `/terms` | Terms | Terms of service |
| `*` | NotFound | 404 page |

## Code Conventions

### File & Naming Patterns
- **Components**: PascalCase filenames and exports (`ProductList.tsx`)
- **Hooks**: camelCase with `use` prefix (`useMixpanel.ts`)
- **One component per file**; props interfaces co-located in the same file
- **Functional components only** with hooks (no class components)

### Import Paths
Always use the `@` alias for absolute imports:
```typescript
import { Button } from "@/components/ui/button";
import { useMixpanel } from "@/hooks/useMixpanel";
import { supabase } from "@/integrations/supabase/client";
```

### Styling
- Use Tailwind utility classes directly — no CSS-in-JS
- Compose classes with `cn()` from `@/lib/utils` (wraps clsx + tailwind-merge)
- Design uses bold shadows, thick borders, candy-stripe patterns
- Color system via HSL CSS custom properties (see `tailwind.config.ts`)
- Brand palette: Yellow primary, Navy secondary, Pink accent
- RTL-aware — the HTML root has `dir="rtl"` and `lang="ar"`

### State Management
- **Server state**: TanStack React Query for all Supabase data
- **Local UI state**: React `useState`/`useRef`
- **No global state library** — data flows through props and query hooks
- **Feature flags**: `site_settings` table queried via `useSiteSettings`
- **Engagement data**: persisted in localStorage (`ahmed_mango_engagement`)

### Data Access
- Supabase client initialized in `src/integrations/supabase/client.ts`
- Database types auto-generated in `src/integrations/supabase/types.ts`
- All queries go through the Supabase JS client — no raw SQL in frontend
- Edge Functions (Deno runtime) in `supabase/functions/` for server-side logic

### TypeScript
- Strict mode is **disabled** in tsconfig
- `noImplicitAny`, `noUnusedLocals`, `strictNullChecks` are all **off**
- `@typescript-eslint/no-unused-vars` is **off** in ESLint
- Database types are auto-generated — do not manually edit `types.ts`

### Error Handling
- `try/catch` in async operations with `console.error` for debugging
- User-facing errors shown via Sonner toasts
- Loading/error/empty fallback states in data-fetching components

## Database Schema (Key Tables)

| Table | Purpose |
|-------|---------|
| `products` | Product reviews with verdict, rating, category |
| `videos` | Video content across platforms |
| `latest_content` | Unified content feed |
| `ad_spaces` | Ad placements (1x/2x card types) |
| `ad_clicks` | Ad interaction tracking |
| `ad_requests` | Advertiser inquiry submissions |
| `site_settings` | Feature flags (key-value) |
| `site_stats` | Display statistics |
| `social_links` | Social media links |
| `sponsors` | Brand sponsors |
| `tiktok_tagged_videos` | Tagged TikTok videos |
| `user_roles` | Role-based access (admin, moderator, user) |
| `auth_tokens` / `otp_*` | OTP authentication records |

### Database Enums
- `product_verdict`: `"2استكا"` | `"فاستكا"`
- `video_platform`: `"YouTube"` | `"TikTok"` | `"Instagram"` | `"Facebook"`
- `video_category`: `"Review"` | `"Challenge"` | `"Announcement"` | `"Collaboration"`
- `product_category`: `"Chips"` | `"Chocolate"` | `"Drinks"` | `"Noodles"` | `"Biscuits"` | `"Other"`
- `app_role`: `"admin"` | `"moderator"` | `"user"`

## Environment Variables

The app requires these `VITE_`-prefixed variables (available at runtime via `import.meta.env`):

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project API URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase public anon key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project identifier |

## Key Integrations

- **Supabase**: Database, auth, edge functions, storage
- **Mixpanel**: User analytics and event tracking (loaded via CDN in `index.html`)
- **Kharbsh Game**: External interactive game embedded via `MangoGame` component
- **Akedly**: OTP verification service (via Supabase edge functions)
- **TikTok RSS**: Content synchronization for TikTok videos

## Deployment

- Deployed to **Netlify** (see `public/_redirects` for SPA routing)
- Production build: `npm run build` outputs to `dist/`
- Both `package-lock.json` (npm) and `bun.lockb` (Bun) are present

## SEO Conventions

- **Per-page SEO**: Every page must call `useSEO()` from `@/hooks/useSEO` with unique `title`, `description`, and `canonical`
- **Structured data**: JSON-LD schemas are in `index.html` (Organization, WebSite, Person) and injected dynamically (BreadcrumbList, FAQPage)
- **Image alt text**: Use keyword-rich Arabic alt text including "أحمد مانجو" (e.g. `مراجعة [product] من أحمد مانجو`)
- **Lazy loading**: All below-fold images must have `loading="lazy"`
- **Code splitting**: Non-critical routes use `React.lazy()` in `App.tsx` — keep Index, Products, AllContent as eager imports
- **Sitemap**: Update `public/sitemap.xml` when adding new public routes
- **FAQ component**: `src/components/FAQ.tsx` renders on homepage with `FAQPage` schema — update when adding new common questions

## Notes for AI Assistants

- This is an Arabic-first platform — preserve RTL layout and Arabic content in templates
- The `src/components/ui/` directory contains shadcn-ui components — add new ones via the shadcn CLI rather than writing from scratch
- Database types in `src/integrations/supabase/types.ts` are auto-generated — do not edit manually
- The `.lovable/` directory contains Lovable platform configuration — treat as read-only
- Admin components in `src/components/admin/` follow a consistent pattern: fetch data with React Query, display in tables, provide CRUD modals
- When adding new pages, register routes in `src/App.tsx` (use `React.lazy` for non-critical pages) and add to `public/sitemap.xml`
- When adding new Supabase tables, create a migration in `supabase/migrations/`
