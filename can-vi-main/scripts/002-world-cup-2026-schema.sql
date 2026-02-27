-- FIFA World Cup 2026 North America - Complete Database Schema
-- Production-ready schema with authentication, data management, and RLS policies

-- =====================================================
-- 1. AUTHENTICATION & USER MANAGEMENT
-- =====================================================

-- Users Table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('fan', 'volunteer', 'admin')),
  phone TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles (extended info)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  bio TEXT,
  preferred_language TEXT DEFAULT 'en',
  notification_preferences JSONB DEFAULT '{"email": true, "push": false}',
  is_newsletter_subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. VOLUNTEERS MANAGEMENT
-- =====================================================

CREATE TABLE IF NOT EXISTS public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  birth_date DATE NOT NULL,
  nationality TEXT NOT NULL,
  city TEXT NOT NULL,
  mission TEXT NOT NULL CHECK (mission IN ('Reception', 'Security', 'Transport', 'Medical', 'Media', 'Logistics', 'Other')),
  availability TEXT NOT NULL CHECK (availability IN ('Full-time', 'Part-time', 'Weekend')),
  language_skills TEXT[] DEFAULT '{}',
  experience_level TEXT DEFAULT 'Beginner' CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
  message TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Withdrawn')),
  approval_date TIMESTAMPTZ,
  approved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  rejection_reason TEXT,
  background_check_status TEXT DEFAULT 'Not Started' CHECK (background_check_status IN ('Not Started', 'In Progress', 'Approved', 'Failed')),
  training_completed BOOLEAN DEFAULT false,
  hours_available INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. MATCHES & TOURNAMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  country TEXT NOT NULL UNIQUE,
  flag_url TEXT,
  description TEXT,
  group_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_date TIMESTAMPTZ NOT NULL,
  match_day INT,
  stage TEXT NOT NULL CHECK (stage IN ('Group Stage', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final')),
  stadium TEXT NOT NULL,
  stadium_capacity INT,
  city TEXT NOT NULL,
  team_a_id UUID NOT NULL REFERENCES public.teams(id),
  team_b_id UUID NOT NULL REFERENCES public.teams(id),
  team_a_goals INT,
  team_b_goals INT,
  status TEXT DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Live', 'Completed', 'Postponed')),
  attendance INT,
  referee TEXT,
  assistant_referees TEXT[],
  match_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.standings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id),
  group_name TEXT NOT NULL,
  matches_played INT DEFAULT 0,
  wins INT DEFAULT 0,
  draws INT DEFAULT 0,
  losses INT DEFAULT 0,
  goals_for INT DEFAULT 0,
  goals_against INT DEFAULT 0,
  goal_difference INT DEFAULT 0,
  points INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. TICKETING SYSTEM
-- =====================================================

CREATE TABLE IF NOT EXISTS public.ticket_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  available_quantity INT NOT NULL,
  sold_quantity INT DEFAULT 0,
  vip_level BOOLEAN DEFAULT false,
  seating_section TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.ticket_categories(id),
  seat_number TEXT,
  section TEXT,
  price_paid DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Used', 'Cancelled', 'Refunded')),
  qr_code TEXT UNIQUE,
  purchase_date TIMESTAMPTZ DEFAULT NOW(),
  used_date TIMESTAMPTZ,
  transfer_to_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  transfer_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Failed', 'Cancelled', 'Refunded')),
  payment_method TEXT,
  stripe_payment_intent_id TEXT UNIQUE,
  items_count INT NOT NULL,
  shipping_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. SPONSORS & PARTNERS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  category TEXT NOT NULL CHECK (category IN ('Platinum', 'Gold', 'Silver', 'Bronze')),
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. CONTENT & INFORMATION
-- =====================================================

CREATE TABLE IF NOT EXISTS public.stadiums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  capacity INT NOT NULL,
  image_url TEXT,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id),
  category TEXT NOT NULL CHECK (category IN ('Match', 'Volunteer', 'Ticket', 'General', 'Update')),
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_date TIMESTAMPTZ,
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. MESSAGES & NOTIFICATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('ticket', 'match', 'volunteer', 'news', 'system')),
  related_id UUID,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. AUDIT & LOGGING
-- =====================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_user_type ON public.users(user_type);
CREATE INDEX idx_volunteers_user_id ON public.volunteers(user_id);
CREATE INDEX idx_volunteers_status ON public.volunteers(status);
CREATE INDEX idx_volunteers_approval_date ON public.volunteers(approval_date);
CREATE INDEX idx_matches_match_date ON public.matches(match_date DESC);
CREATE INDEX idx_matches_stage ON public.matches(stage);
CREATE INDEX idx_matches_stadium ON public.matches(stadium);
CREATE INDEX idx_tickets_user_id ON public.tickets(user_id);
CREATE INDEX idx_tickets_match_id ON public.tickets(match_id);
CREATE INDEX idx_tickets_status ON public.tickets(status);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_ticket_categories_match_id ON public.ticket_categories(match_id);
CREATE INDEX idx_standings_group ON public.standings(group_name);
CREATE INDEX idx_standings_points ON public.standings(points DESC);
CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_published ON public.news(is_published);
CREATE INDEX idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- =====================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stadiums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Users Table RLS
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User Profiles RLS
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Volunteers RLS
CREATE POLICY "Volunteers can view their own record" ON public.volunteers
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all volunteers" ON public.volunteers
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert volunteer applications" ON public.volunteers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Volunteers can update their own record" ON public.volunteers
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update volunteer status" ON public.volunteers
  FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Teams RLS (public read)
CREATE POLICY "Anyone can view teams" ON public.teams
  FOR SELECT
  USING (true);

-- Matches RLS (public read)
CREATE POLICY "Anyone can view matches" ON public.matches
  FOR SELECT
  USING (true);

-- Standings RLS (public read)
CREATE POLICY "Anyone can view standings" ON public.standings
  FOR SELECT
  USING (true);

-- Ticket Categories RLS (public read)
CREATE POLICY "Anyone can view ticket categories" ON public.ticket_categories
  FOR SELECT
  USING (true);

-- Tickets RLS
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets" ON public.tickets
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert tickets" ON public.tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Orders RLS
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can insert orders" ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Sponsors RLS (public read)
CREATE POLICY "Anyone can view sponsors" ON public.sponsors
  FOR SELECT
  USING (true);

-- Stadiums RLS (public read)
CREATE POLICY "Anyone can view stadiums" ON public.stadiums
  FOR SELECT
  USING (true);

-- News RLS (public read published)
CREATE POLICY "Anyone can view published news" ON public.news
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all news" ON public.news
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Chat Messages RLS
CREATE POLICY "Users can view their own messages" ON public.chat_messages
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Service role can insert messages" ON public.chat_messages
  FOR INSERT
  WITH CHECK (true);

-- Notifications RLS
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Audit Logs RLS (admins only)
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- =====================================================
-- 11. HELPER FUNCTIONS
-- =====================================================

-- Function to update user updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_user_updated_at();

-- Similar triggers for other tables
CREATE TRIGGER trigger_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_user_updated_at();

CREATE TRIGGER trigger_volunteers_updated_at
BEFORE UPDATE ON public.volunteers
FOR EACH ROW
EXECUTE FUNCTION update_user_updated_at();

CREATE TRIGGER trigger_matches_updated_at
BEFORE UPDATE ON public.matches
FOR EACH ROW
EXECUTE FUNCTION update_user_updated_at();

CREATE TRIGGER trigger_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION update_user_updated_at();

CREATE TRIGGER trigger_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION update_user_updated_at();

CREATE TRIGGER trigger_sponsors_updated_at
BEFORE UPDATE ON public.sponsors
FOR EACH ROW
EXECUTE FUNCTION update_user_updated_at();

-- =====================================================
-- DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.users IS 'Stores user account information';
COMMENT ON TABLE public.volunteers IS 'Stores volunteer application and status information';
COMMENT ON TABLE public.matches IS 'Stores World Cup match information';
COMMENT ON TABLE public.tickets IS 'Stores ticket purchases and ownership';
COMMENT ON TABLE public.orders IS 'Stores ticket order information for payment processing';
COMMENT ON TABLE public.chat_messages IS 'Stores chat conversation history with the mascot';
COMMENT ON TABLE public.audit_logs IS 'Stores system audit logs for security and compliance';
