-- Add button fields to ad_spaces table
ALTER TABLE public.ad_spaces
  ADD COLUMN button_text TEXT,
  ADD COLUMN button_color TEXT DEFAULT '#1a1349',
  ADD COLUMN button_link TEXT;