-- CODEWISE ENHANCED - COMPLETE DATABASE SCHEMA
-- This creates all tables required for your app to run smoothly

-- Drop existing tables if they exist (CAREFUL - this will delete data!)
-- Uncomment only if you want to start fresh
-- DROP TABLE IF EXISTS achievements CASCADE;
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS user_progress CASCADE;
-- DROP TABLE IF EXISTS robotics_activities CASCADE;
-- DROP TABLE IF EXISTS lessons CASCADE;
-- DROP TABLE IF EXISTS courses CASCADE;
-- DROP TABLE IF EXISTS parent_child_relations CASCADE;
-- DROP TABLE IF EXISTS user_sessions CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS schools CASCADE;
-- DROP TABLE IF EXISTS packages CASCADE;

-- 1. PACKAGES TABLE (subscription packages)
CREATE TABLE IF NOT EXISTS packages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  duration TEXT NOT NULL, -- 'monthly', 'yearly'
  features TEXT, -- JSON array of features
  max_students INTEGER, -- for school packages
  package_type TEXT NOT NULL, -- 'individual', 'school'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. SCHOOLS TABLE
CREATE TABLE IF NOT EXISTS schools (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  admin_user_id VARCHAR, -- references users.id (added later)
  package_id VARCHAR REFERENCES packages(id),
  subscription_status TEXT DEFAULT 'active', -- 'active', 'suspended', 'cancelled'
  subscription_start TIMESTAMP,
  subscription_end TIMESTAMP,
  max_students INTEGER DEFAULT 100,
  current_students INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. USERS TABLE (with all required columns for authentication)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE, -- for children created by parents
  password_hash TEXT, -- CRITICAL for authentication
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'student', 'teacher', 'parent', 'school_admin'
  age_group TEXT, -- '6-11', '12-17' for students
  
  -- Package and subscription info
  package_id VARCHAR REFERENCES packages(id),
  subscription_status TEXT DEFAULT 'pending', -- 'pending', 'active', 'expired', 'cancelled'
  subscription_start TIMESTAMP,
  subscription_end TIMESTAMP,
  
  -- School association
  school_id VARCHAR REFERENCES schools(id),
  
  -- Parent-child relationship
  parent_id VARCHAR, -- references users.id for parent linking
  
  -- Additional info
  grade TEXT, -- for students
  subjects TEXT, -- JSON array for teachers
  last_login_at TIMESTAMP, -- CRITICAL for authentication
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. USER SESSIONS TABLE (CRITICAL for authentication)
CREATE TABLE IF NOT EXISTS user_sessions (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. PARENT-CHILD RELATIONS TABLE
CREATE TABLE IF NOT EXISTS parent_child_relations (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_user_id VARCHAR REFERENCES users(id) NOT NULL,
  child_user_id VARCHAR REFERENCES users(id) NOT NULL,
  relationship_type TEXT DEFAULT 'parent', -- 'parent', 'guardian'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  age_group TEXT NOT NULL,
  difficulty TEXT, -- 'beginner', 'intermediate', 'advanced'
  category TEXT, -- 'programming', 'robotics', 'web-development'
  image_url TEXT,
  estimated_hours INTEGER DEFAULT 10,
  teacher_id VARCHAR REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. LESSONS TABLE
CREATE TABLE IF NOT EXISTS lessons (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id VARCHAR REFERENCES courses(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT, -- JSON string for rich content
  order_index INTEGER NOT NULL,
  type TEXT, -- 'video', 'interactive', 'quiz', 'project'
  estimated_minutes INTEGER DEFAULT 30,
  video_url TEXT,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. ROBOTICS ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS robotics_activities (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT, -- 'puzzle', 'maze', 'challenge'
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  age_group TEXT NOT NULL,
  instructions TEXT, -- JSON string
  solution TEXT, -- JSON string
  estimated_minutes INTEGER DEFAULT 15,
  points INTEGER DEFAULT 100,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS user_progress (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR REFERENCES users(id),
  course_id VARCHAR REFERENCES courses(id),
  lessons_completed INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  code TEXT,
  project_type TEXT, -- 'blockly', 'javascript', 'microbit'
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR REFERENCES users(id),
  badge_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ADD FOREIGN KEY CONSTRAINTS
-- Add school admin constraint (after users table exists)
ALTER TABLE schools 
ADD CONSTRAINT IF NOT EXISTS fk_schools_admin_user 
FOREIGN KEY (admin_user_id) REFERENCES users(id);

-- CREATE PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_package_id ON users(package_id);
CREATE INDEX IF NOT EXISTS idx_users_parent_id ON users(parent_id);

CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_parent_child_parent ON parent_child_relations(parent_user_id);
CREATE INDEX IF NOT EXISTS idx_parent_child_child ON parent_child_relations(child_user_id);

CREATE INDEX IF NOT EXISTS idx_courses_age_group ON courses(age_group);
CREATE INDEX IF NOT EXISTS idx_courses_teacher ON courses(teacher_id);

CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(order_index);

CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course ON user_progress(course_id);

CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);

-- INSERT DEFAULT DATA
-- Insert default packages (required for your app)
INSERT INTO packages (name, description, price, duration, features, package_type, max_students) VALUES
('Free Explorer', 'Perfect for getting started with coding', 0.00, 'monthly', '["5 Coding Lessons", "Basic Projects", "Community Support", "Progress Tracking"]', 'individual', NULL),
('Basic Coder', 'For serious young coders', 49.00, 'monthly', '["Unlimited Lessons", "Advanced Projects", "AI Tutor Access", "Certificates", "Parent Reports"]', 'individual', NULL),
('Premium Pro', 'Complete learning experience', 99.00, 'monthly', '["Everything in Basic", "1-on-1 Mentoring", "Advanced Robotics", "Portfolio Building", "Priority Support"]', 'individual', NULL),
('School Basic', 'For small schools and classrooms', 199.00, 'monthly', '["Up to 50 students", "Teacher Dashboard", "Progress Analytics", "Curriculum Planning"]', 'school', 50),
('School Premium', 'For large institutions', 499.00, 'monthly', '["Up to 500 students", "Advanced Analytics", "Custom Courses", "Priority Support", "API Access"]', 'school', 500)
ON CONFLICT DO NOTHING;

-- VERIFY SCHEMA
-- List all tables to confirm everything was created
SELECT 
  table_name,
  (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;