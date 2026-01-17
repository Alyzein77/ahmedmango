-- Add attempt_id column to auth_tokens table
ALTER TABLE public.auth_tokens ADD COLUMN IF NOT EXISTS attempt_id TEXT;

-- Create index for attempt_id lookups
CREATE INDEX IF NOT EXISTS idx_auth_tokens_attempt ON public.auth_tokens(attempt_id);

-- Create otp_logs table for tracking all OTP events
CREATE TABLE public.otp_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  attempt_id TEXT,
  transaction_id TEXT,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL,
  error_message TEXT,
  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX idx_otp_logs_phone ON public.otp_logs(phone_number);
CREATE INDEX idx_otp_logs_event ON public.otp_logs(event_type);
CREATE INDEX idx_otp_logs_status ON public.otp_logs(status);
CREATE INDEX idx_otp_logs_created ON public.otp_logs(created_at DESC);
CREATE INDEX idx_otp_logs_attempt ON public.otp_logs(attempt_id);

-- Enable RLS
ALTER TABLE public.otp_logs ENABLE ROW LEVEL SECURITY;

-- Admins can view all logs
CREATE POLICY "Admins can view otp_logs" 
ON public.otp_logs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert logs (edge functions need this)
CREATE POLICY "Anyone can insert otp_logs" 
ON public.otp_logs 
FOR INSERT 
WITH CHECK (true);

-- Admins can delete logs
CREATE POLICY "Admins can delete otp_logs" 
ON public.otp_logs 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));