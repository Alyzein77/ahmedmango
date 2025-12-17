-- Add ranking and views columns to videos table
ALTER TABLE public.videos 
ADD COLUMN IF NOT EXISTS ranking integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS views integer DEFAULT 0;