-- Create table for ad requests
CREATE TABLE public.ad_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  brand_title TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  brand_link TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ad_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (after OTP verification happens client-side)
CREATE POLICY "Anyone can insert ad requests"
ON public.ad_requests
FOR INSERT
WITH CHECK (true);

-- Only admins can view/manage
CREATE POLICY "Admins can view ad requests"
ON public.ad_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update ad requests"
ON public.ad_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete ad requests"
ON public.ad_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger
CREATE TRIGGER update_ad_requests_updated_at
BEFORE UPDATE ON public.ad_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();