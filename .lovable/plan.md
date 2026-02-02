

## Plan: Add Game Section Visibility Toggle

### Overview
Create a site settings system that allows admins to toggle the visibility of the Mango Game section from the admin panel. The game section will be hidden until you're ready for launch.

---

### Part 1: Create Site Settings Database Table

Create a new `site_settings` table to store feature flags:

```sql
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value BOOLEAN NOT NULL DEFAULT false,
  label TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the game section toggle (default: hidden)
INSERT INTO public.site_settings (key, value, label, description)
VALUES ('game_section_visible', false, 'قسم اللعبة', 'إظهار أو إخفاء قسم لعبة المانجو في الصفحة الرئيسية');

-- RLS Policies
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed for frontend)
CREATE POLICY "Anyone can view site_settings" ON public.site_settings
  FOR SELECT USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can update site_settings" ON public.site_settings
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
```

---

### Part 2: Create Admin Settings Manager

Create a new admin view `SiteSettingsManager.tsx`:

| Feature | Description |
|---------|-------------|
| Toggle switches | For each setting (game_section_visible) |
| Labels in Arabic | User-friendly names |
| Real-time updates | Changes save immediately |
| Status indicator | Shows current state |

```tsx
// Key components:
- Card with setting name and description
- Switch component for toggling
- Toast notification on save
- Loading state while updating
```

---

### Part 3: Update Admin Dashboard

| File | Change |
|------|--------|
| `AdminSidebar.tsx` | Add "إعدادات الموقع" menu item with Settings icon |
| `AdminDashboard.tsx` | Add "settings" view type and render `SiteSettingsManager` |

Menu item will appear as:
- Icon: ⚙️ Settings
- Label: "إعدادات الموقع"

---

### Part 4: Update Index Page

Modify `Index.tsx` to conditionally render the MangoGame section:

```tsx
const Index = () => {
  const [showGameSection, setShowGameSection] = useState(false);
  
  // Fetch game section visibility setting
  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'game_section_visible')
        .single();
      
      setShowGameSection(data?.value ?? false);
    };
    fetchSettings();
  }, []);

  return (
    <div>
      {/* ... other sections ... */}
      
      {/* Only show game section if enabled */}
      {showGameSection && <MangoGame />}
      
      {/* ... other sections ... */}
    </div>
  );
};
```

---

### Part 5: Create Custom Hook (Optional but Recommended)

Create `useSiteSettings.ts` for reusable settings access:

```tsx
export const useSiteSettings = (key: string) => {
  return useQuery({
    queryKey: ['site-settings', key],
    queryFn: async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();
      return data?.value ?? false;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
```

---

### Files to Create/Modify

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `src/components/admin/SiteSettingsManager.tsx` | Admin UI for toggles |
| **Create** | `src/hooks/useSiteSettings.ts` | Reusable hook for settings |
| **Modify** | `src/components/admin/AdminSidebar.tsx` | Add settings menu item |
| **Modify** | `src/components/admin/AdminDashboard.tsx` | Add settings view |
| **Modify** | `src/pages/Index.tsx` | Conditionally render game section |
| **Database** | Create `site_settings` table with RLS |

---

### Admin UI Preview

```text
┌─────────────────────────────────────────────────┐
│  إعدادات الموقع                                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ 🎮 قسم اللعبة                    [OFF]   │   │
│  │ إظهار أو إخفاء قسم لعبة المانجو          │   │
│  │ في الصفحة الرئيسية                       │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  (Toggle ON when ready for launch)              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### How It Works

1. Admin opens "إعدادات الموقع" in the admin panel
2. Sees the game section toggle (currently OFF)
3. When ready for launch, flips the switch to ON
4. The Index page immediately shows the MangoGame section
5. No code deployment needed - just a database toggle!

