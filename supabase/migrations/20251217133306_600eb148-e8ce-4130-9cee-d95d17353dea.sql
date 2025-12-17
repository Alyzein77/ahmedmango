-- Create a table for site statistics
CREATE TABLE public.site_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'bg-primary',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active stats" 
ON public.site_stats 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all stats" 
ON public.site_stats 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert stats" 
ON public.site_stats 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update stats" 
ON public.site_stats 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete stats" 
ON public.site_stats 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_stats_updated_at
BEFORE UPDATE ON public.site_stats
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();