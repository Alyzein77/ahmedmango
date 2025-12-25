-- Create product_reviews table
CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  product_image TEXT,
  video_url TEXT NOT NULL,
  platform TEXT CHECK (platform IN ('TikTok', 'YouTube', 'Instagram')),
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verdict TEXT CHECK (verdict IN ('2astaka', 'fastaka')),
  score INTEGER CHECK (score >= 1 AND score <= 10),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view product reviews
CREATE POLICY "Anyone can view product_reviews"
ON public.product_reviews
FOR SELECT
USING (true);

-- Admins can insert
CREATE POLICY "Admins can insert product_reviews"
ON public.product_reviews
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update
CREATE POLICY "Admins can update product_reviews"
ON public.product_reviews
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete
CREATE POLICY "Admins can delete product_reviews"
ON public.product_reviews
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));