-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  role USER-DEFINED NOT NULL DEFAULT 'user'::role,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);