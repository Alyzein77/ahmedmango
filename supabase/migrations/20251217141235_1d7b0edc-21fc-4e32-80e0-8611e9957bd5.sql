-- Create ad_spaces table for dynamic sponsored content
CREATE TABLE public.ad_spaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  card_type TEXT NOT NULL DEFAULT '1x' CHECK (card_type IN ('1x', '2x')),
  title TEXT,
  tag_text TEXT,
  tag_color TEXT DEFAULT '#FFD700',
  sub_text TEXT,
  image_url TEXT,
  background_color TEXT DEFAULT '#FF6B35',
  background_image_url TEXT,
  overlay_image_url TEXT,
  redirect_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ad_spaces ENABLE ROW LEVEL SECURITY;

-- Anyone can view active ad spaces
CREATE POLICY "Anyone can view active ad_spaces"
ON public.ad_spaces
FOR SELECT
USING (is_active = true);

-- Admins can view all ad spaces
CREATE POLICY "Admins can view all ad_spaces"
ON public.ad_spaces
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert ad spaces
CREATE POLICY "Admins can insert ad_spaces"
ON public.ad_spaces
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update ad spaces
CREATE POLICY "Admins can update ad_spaces"
ON public.ad_spaces
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete ad spaces
CREATE POLICY "Admins can delete ad_spaces"
ON public.ad_spaces
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for ordering
CREATE INDEX idx_ad_spaces_display_order ON public.ad_spaces(display_order);

-- Add trigger for updated_at
CREATE TRIGGER update_ad_spaces_updated_at
  BEFORE UPDATE ON public.ad_spaces
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();