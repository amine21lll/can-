-- CAN 2025 Database Schema Migration
-- This migration creates all necessary tables for the World Cup 2026 North America Hub

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. MATCHES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_number SERIAL UNIQUE,
  team_a_name VARCHAR(100) NOT NULL,
  team_a_code VARCHAR(3) NOT NULL,
  team_b_name VARCHAR(100) NOT NULL,
  team_b_code VARCHAR(3) NOT NULL,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  match_time VARCHAR(5) NOT NULL,
  stadium_name VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  group_name VARCHAR(2),
  phase VARCHAR(50) NOT NULL,
  team_a_score INTEGER,
  team_b_score INTEGER,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_match_date (match_date),
  INDEX idx_city (city),
  INDEX idx_stadium (stadium_name),
  INDEX idx_group (group_name),
  INDEX idx_status (status)
);

-- ============================================
-- 2. STADIUMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS stadiums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stadium_name VARCHAR(150) NOT NULL UNIQUE,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'North America',
  capacity INTEGER NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_city (city),
  INDEX idx_stadium_name (stadium_name)
);

-- ============================================
-- 3. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone_number VARCHAR(20),
  date_of_birth DATE,
  nationality VARCHAR(100),
  city VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

-- ============================================
-- 4. TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  match_id UUID NOT NULL,
  category VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_per_ticket DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  booking_reference VARCHAR(20) UNIQUE,
  status VARCHAR(50) DEFAULT 'confirmed',
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  
  INDEX idx_user_id (user_id),
  INDEX idx_match_id (match_id),
  INDEX idx_booking_reference (booking_reference),
  INDEX idx_purchase_date (purchase_date),
  INDEX idx_status (status)
);

-- ============================================
-- 5. VOLUNTEERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  birth_date DATE NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  mission VARCHAR(100) NOT NULL,
  availability VARCHAR(50) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'En attente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_city (city),
  INDEX idx_mission (mission),
  INDEX idx_created_at (created_at)
);

-- ============================================
-- 6. SPONSORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_name VARCHAR(150) NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  website_url VARCHAR(255),
  sponsor_level VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_sponsor_level (sponsor_level)
);

-- ============================================
-- 7. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  notification_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_entity_type VARCHAR(50),
  related_entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at),
  INDEX idx_notification_type (notification_type)
);

-- ============================================
-- 8. TICKET AVAILABILITY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ticket_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL,
  category VARCHAR(50) NOT NULL,
  total_seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  price_per_seat DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  UNIQUE(match_id, category),
  
  INDEX idx_match_id (match_id),
  INDEX idx_category (category)
);

-- ============================================
-- Create indexes for performance
-- ============================================
CREATE INDEX idx_matches_date_city ON matches(match_date, city);
CREATE INDEX idx_matches_phase_status ON matches(phase, status);
CREATE INDEX idx_tickets_user_purchase ON tickets(user_id, purchase_date);
CREATE INDEX idx_volunteers_status_city ON volunteers(status, city);

-- ============================================
-- Add updated_at trigger function
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Apply triggers to tables with updated_at
-- ============================================
CREATE TRIGGER update_matches_updated_at
    BEFORE UPDATE ON matches
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
    BEFORE UPDATE ON tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at
    BEFORE UPDATE ON volunteers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsors_updated_at
    BEFORE UPDATE ON sponsors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticket_availability_updated_at
    BEFORE UPDATE ON ticket_availability
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stadiums_updated_at
    BEFORE UPDATE ON stadiums
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
