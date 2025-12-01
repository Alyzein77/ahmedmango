-- Create enums for videos
CREATE TYPE public.video_platform AS ENUM ('YouTube', 'TikTok', 'Instagram', 'Facebook');
CREATE TYPE public.video_category AS ENUM ('Review', 'Challenge', 'Announcement', 'Collaboration');

-- Create enums for latest_content
CREATE TYPE public.content_type AS ENUM ('Video', 'Post', 'Story', 'Reel', 'TikTok');

-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  platform video_platform NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  category video_category NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  duration TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- Create latest_content table
CREATE TABLE public.latest_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content_type content_type NOT NULL,
  platform video_platform NOT NULL,
  preview_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  short_note TEXT
);

-- Enable RLS on both tables
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.latest_content ENABLE ROW LEVEL SECURITY;

-- RLS policies for videos
CREATE POLICY "Anyone can view videos"
ON public.videos
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert videos"
ON public.videos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update videos"
ON public.videos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete videos"
ON public.videos
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for latest_content
CREATE POLICY "Anyone can view latest_content"
ON public.latest_content
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert latest_content"
ON public.latest_content
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update latest_content"
ON public.latest_content
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete latest_content"
ON public.latest_content
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));