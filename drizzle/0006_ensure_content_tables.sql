-- Safe, additive content tables for movies, series, and channels.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'media_kind') THEN
    CREATE TYPE public.media_kind AS ENUM ('channel', 'movie', 'series', 'episode');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'source_kind') THEN
    CREATE TYPE public.source_kind AS ENUM ('hls', 'dash', 'file', 'external');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.media_kind NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  synopsis text,
  poster_url text,
  backdrop_url text,
  language text,
  country text,
  age_rating integer,
  release_year integer,
  duration_seconds integer,
  is_published boolean NOT NULL DEFAULT false,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.media_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id uuid NOT NULL REFERENCES public.media_items(id) ON DELETE CASCADE,
  kind public.source_kind NOT NULL,
  source_url text NOT NULL,
  provider_name text NOT NULL,
  is_authorized boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS media_sources_media_id_idx
ON public.media_sources (media_id);
