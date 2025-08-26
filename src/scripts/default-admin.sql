INSERT INTO admin_users (email) 
VALUES ('admin@itsa.edu') 
ON CONFLICT (email) DO NOTHING;