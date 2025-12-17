-- Add ranking column to products table for display order control
ALTER TABLE public.products 
ADD COLUMN ranking integer NOT NULL DEFAULT 0;

-- Create index for efficient sorting
CREATE INDEX idx_products_ranking ON public.products(ranking DESC);