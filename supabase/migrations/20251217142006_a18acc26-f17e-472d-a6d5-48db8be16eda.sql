-- Create function to increment click count
CREATE OR REPLACE FUNCTION public.increment_ad_click_count(ad_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.ad_spaces
  SET click_count = click_count + 1
  WHERE id = ad_id;
END;
$$;