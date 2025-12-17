-- Add views, engagements, and ranking columns to latest_content table
ALTER TABLE public.latest_content 
ADD COLUMN views INTEGER DEFAULT 0,
ADD COLUMN engagements INTEGER DEFAULT 0,
ADD COLUMN ranking INTEGER DEFAULT 0;

-- Create index for ranking to improve query performance
CREATE INDEX idx_latest_content_ranking ON public.latest_content(ranking DESC);