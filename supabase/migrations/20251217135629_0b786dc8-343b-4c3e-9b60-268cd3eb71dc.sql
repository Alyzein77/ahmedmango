-- Change category column from enum to text for flexibility
ALTER TABLE public.products 
  ALTER COLUMN category DROP DEFAULT,
  ALTER COLUMN category TYPE text USING category::text,
  ALTER COLUMN category SET DEFAULT 'أخرى';