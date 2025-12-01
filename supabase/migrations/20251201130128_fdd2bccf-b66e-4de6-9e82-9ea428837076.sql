-- Create tiktok_tagged_videos table
CREATE TABLE public.tiktok_tagged_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tiktok_id TEXT NOT NULL UNIQUE,
  caption TEXT,
  author_name TEXT,
  author_username TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  hashtags TEXT[] DEFAULT '{}',
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tiktok_tagged_videos ENABLE ROW LEVEL SECURITY;

-- Public read access for RSS feed
CREATE POLICY "Anyone can view tiktok videos"
ON public.tiktok_tagged_videos
FOR SELECT
USING (true);

-- Admins can manage
CREATE POLICY "Admins can insert tiktok videos"
ON public.tiktok_tagged_videos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tiktok videos"
ON public.tiktok_tagged_videos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tiktok videos"
ON public.tiktok_tagged_videos
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_tiktok_videos_posted_at ON public.tiktok_tagged_videos(posted_at DESC);
CREATE INDEX idx_tiktok_videos_tiktok_id ON public.tiktok_tagged_videos(tiktok_id);

-- Trigger for updated_at
CREATE TRIGGER update_tiktok_videos_updated_at
BEFORE UPDATE ON public.tiktok_tagged_videos
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();