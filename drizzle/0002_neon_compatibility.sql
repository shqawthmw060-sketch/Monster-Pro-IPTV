-- MONSTER IPTV: additive compatibility migration for the existing Neon IPTV tables.
-- This migration never drops tables, columns, rows, or the legacy password column.

ALTER TABLE public.iptv_accounts
  ADD COLUMN IF NOT EXISTS display_name text,
  ADD COLUMN IF NOT EXISTS mac_address text,
  ADD COLUMN IF NOT EXISTS password_hash text;

ALTER TABLE public.iptv_accounts
  ALTER COLUMN display_name SET NOT NULL,
  ALTER COLUMN mac_address SET NOT NULL,
  ALTER COLUMN password_hash SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS iptv_accounts_mac_address_idx
  ON public.iptv_accounts (mac_address);

CREATE UNIQUE INDEX IF NOT EXISTS iptv_accounts_username_idx
  ON public.iptv_accounts (username);

-- The session/account relationship is already present in Neon. This assertion is
-- intentionally omitted here so the migration remains safe to re-run.
