-- Create table for notification email recipients
CREATE TABLE public.notification_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notification_emails ENABLE ROW LEVEL SECURITY;

-- Only admins can manage notification emails
CREATE POLICY "Admins can view notification emails"
ON public.notification_emails
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert notification emails"
ON public.notification_emails
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update notification emails"
ON public.notification_emails
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete notification emails"
ON public.notification_emails
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_notification_emails_updated_at
BEFORE UPDATE ON public.notification_emails
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default email
INSERT INTO public.notification_emails (email) VALUES ('Hello@risca.dev');