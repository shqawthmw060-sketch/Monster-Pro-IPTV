-- Run once in Neon. Safe to re-run and does not delete existing data.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'access_account_status') THEN
    CREATE TYPE public.access_account_status AS ENUM ('pending', 'active', 'suspended', 'expired');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.iptv_accounts (
  account_id text PRIMARY KEY,
  user_id text NOT NULL,
  display_name text NOT NULL,
  phone_number text,
  mac_address text NOT NULL,
  username text NOT NULL,
  password_hash text NOT NULL,
  status public.access_account_status NOT NULL DEFAULT 'pending',
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS phone_number text;
ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS mac_address text;
ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS password_hash text;
ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS status public.access_account_status NOT NULL DEFAULT 'pending';
ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS expires_at timestamptz;
ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.iptv_accounts ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE UNIQUE INDEX IF NOT EXISTS iptv_accounts_mac_address_idx ON public.iptv_accounts (mac_address);
CREATE UNIQUE INDEX IF NOT EXISTS iptv_accounts_username_idx ON public.iptv_accounts (username);

CREATE TABLE IF NOT EXISTS public.iptv_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id text NOT NULL,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);

CREATE INDEX IF NOT EXISTS iptv_sessions_account_id_idx ON public.iptv_sessions (account_id);
