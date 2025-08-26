-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.events (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  media ARRAY,
  event_date date NOT NULL,
  event_time time without time zone NOT NULL,
  location text,
  category text DEFAULT 'general'::text,
  status text DEFAULT 'upcoming'::text,
  created_by uuid DEFAULT auth.uid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_created_by_fkey1 FOREIGN KEY (created_by) REFERENCES public.users(id),
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  role USER-DEFINED NOT NULL DEFAULT 'user'::role,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users (only authenticated users can read)
CREATE POLICY "Admin users can read their own data" ON admin_users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Create policies for events (public read, admin write)
CREATE POLICY "Anyone can view events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert events" ON events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id::text = auth.uid()::text
    )
  );

CREATE POLICY "Only admins can update events" ON events
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id::text = auth.uid()::text
    )
  );

CREATE POLICY "Only admins can delete events" ON events
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id::text = auth.uid()::text
    )
  );
