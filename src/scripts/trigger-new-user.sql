-- First, create the function that will run on insert
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'admin',               -- default role
    NEW.created_at,
    NOW()                 -- updated_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
SECURITY DEFINER;  -- runs as the function owner

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Then, create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_auth_user();
