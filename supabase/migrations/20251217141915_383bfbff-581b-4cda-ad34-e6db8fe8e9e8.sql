-- Create ad_clicks table for tracking
CREATE TABLE public.ad_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_space_id UUID NOT NULL REFERENCES public.ad_spaces(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  click_type TEXT DEFAULT 'card', -- 'card' or 'button'
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.ad_clicks ENABLE ROW LEVEL SECURITY;

-- Anyone can insert clicks (for anonymous tracking)
CREATE POLICY "Anyone can insert ad_clicks"
ON public.ad_clicks
FOR INSERT
WITH CHECK (true);

-- Admins can view all clicks
CREATE POLICY "Admins can view ad_clicks"
ON public.ad_clicks
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_ad_clicks_ad_space_id ON public.ad_clicks(ad_space_id);
CREATE INDEX idx_ad_clicks_clicked_at ON public.ad_clicks(clicked_at DESC);

-- Add click_count to ad_spaces for quick stats
ALTER TABLE public.ad_spaces ADD COLUMN click_count INTEGER DEFAULT 0;