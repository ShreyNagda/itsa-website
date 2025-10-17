-- Create table to store featured media metadata
CREATE TABLE IF NOT EXISTS public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  path text NOT NULL,
  type text NOT NULL,
  title text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Optional index to speed ordering
CREATE INDEX IF NOT EXISTS media_order_idx ON public.media ("order");
