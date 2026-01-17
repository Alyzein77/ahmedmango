-- Table: otp_attempts (Rate Limiting)
CREATE TABLE public.otp_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  attempt_count INTEGER DEFAULT 1,
  first_attempt_at TIMESTAMPTZ DEFAULT NOW(),
  reset_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_otp_attempts_phone ON public.otp_attempts(phone_number);
CREATE INDEX idx_otp_attempts_reset ON public.otp_attempts(reset_at);

-- Enable RLS
ALTER TABLE public.otp_attempts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and updates for rate limiting
CREATE POLICY "Anyone can insert otp_attempts" ON public.otp_attempts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update otp_attempts" ON public.otp_attempts
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can select otp_attempts" ON public.otp_attempts
  FOR SELECT USING (true);

-- Table: auth_tokens (Webhook Token Storage)
CREATE TABLE public.auth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_auth_tokens_transaction ON public.auth_tokens(transaction_id);
CREATE INDEX idx_auth_tokens_expires ON public.auth_tokens(expires_at);

-- Enable RLS
ALTER TABLE public.auth_tokens ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for webhook
CREATE POLICY "Anyone can insert auth_tokens" ON public.auth_tokens
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update auth_tokens" ON public.auth_tokens
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can select auth_tokens" ON public.auth_tokens
  FOR SELECT USING (true);

CREATE POLICY "Anyone can delete auth_tokens" ON public.auth_tokens
  FOR DELETE USING (true);

-- Table: verified_phones (Verified Users)
CREATE TABLE public.verified_phones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT UNIQUE NOT NULL,
  verification_count INTEGER DEFAULT 1,
  first_verified_at TIMESTAMPTZ DEFAULT NOW(),
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_verified_phones_phone ON public.verified_phones(phone_number);