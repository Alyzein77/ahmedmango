-- Create site_settings table for feature flags
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

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed for frontend)
CREATE POLICY "Anyone can view site_settings" ON public.site_settings
  FOR SELECT USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can update site_settings" ON public.site_settings
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();