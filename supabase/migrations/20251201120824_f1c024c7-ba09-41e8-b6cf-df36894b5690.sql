-- Create enum for product categories
CREATE TYPE public.product_category AS ENUM ('Chips', 'Chocolate', 'Drinks', 'Noodles', 'Biscuits', 'Other');

-- Create enum for verdict
CREATE TYPE public.product_verdict AS ENUM ('2استكا', 'فاستكا');

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  category product_category NOT NULL DEFAULT 'Other',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
  verdict product_verdict NOT NULL,
  short_note TEXT CHECK (char_length(short_note) <= 150),
  review_url TEXT,
  thumbnail_url TEXT,
  platforms TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view products)
CREATE POLICY "Anyone can view products"
ON public.products
FOR SELECT
USING (true);

-- Create policy for admin insert
CREATE POLICY "Admins can insert products"
ON public.products
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admin update
CREATE POLICY "Admins can update products"
ON public.products
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admin delete
CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();