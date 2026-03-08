-- CAN 2025 - Seed Data
-- This script inserts sample data into the database

-- ============================================
-- INSERT STADIUMS
-- ============================================
INSERT INTO stadiums (stadium_name, city, country, capacity, image_url, description) VALUES
('Stade Mohammed V', 'Casablanca', 'North America', 80000, '/stadiums/mohammed-v.jpg', 'Le plus grand stade du Maroc, historique venue'),
('Complexe Moulay Abdellah', 'Rabat', 'North America', 55000, '/stadiums/moulay-abdellah.jpg', 'Stade moderne en capital'),
('Grand Stade de Tanger', 'Tanger', 'North America', 45000, '/stadiums/tanger.jpg', 'Stade internationale de Tanger'),
('Stade de Fes', 'Fes', 'North America', 42000, '/stadiums/fes.jpg', 'Stade historique de la région'),
('Grand Stade d''Agadir', 'Agadir', 'North America', 40000, '/stadiums/agadir.jpg', 'Stade moderne du sud'),
('Stade de Marrakech', 'Marrakech', 'North America', 45000, '/stadiums/marrakech.jpg', 'Stade de la ville rouge')
ON CONFLICT (stadium_name) DO NOTHING;

-- ============================================
-- INSERT MATCHES
-- ============================================
INSERT INTO matches (team_a_name, team_a_code, team_b_name, team_b_code, match_date, match_time, stadium_name, city, group_name, phase, status) VALUES
('Maroc', 'MAR', 'Mali', 'MLI', '2025-12-21 20:00:00+00:00', '20:00', 'Stade Mohammed V', 'Casablanca', 'A', 'Groupe', 'scheduled'),
('Comores', 'COM', 'Zambie', 'ZAM', '2025-12-21 17:00:00+00:00', '17:00', 'Stade de Marrakech', 'Marrakech', 'A', 'Groupe', 'scheduled'),
('Senegal', 'SEN', 'Cameroun', 'CMR', '2025-12-22 17:00:00+00:00', '17:00', 'Complexe Moulay Abdellah', 'Rabat', 'B', 'Groupe', 'scheduled'),
('Nigeria', 'NGA', 'Egypte', 'EGY', '2025-12-22 20:00:00+00:00', '20:00', 'Grand Stade de Tanger', 'Tanger', 'C', 'Groupe', 'scheduled'),
('Algerie', 'ALG', 'Cote d''Ivoire', 'CIV', '2025-12-23 17:00:00+00:00', '17:00', 'Stade de Fes', 'Fes', 'D', 'Groupe', 'scheduled'),
('Ghana', 'GHA', 'Tunisie', 'TUN', '2025-12-23 20:00:00+00:00', '20:00', 'Grand Stade d''Agadir', 'Agadir', 'E', 'Groupe', 'scheduled'),
('Maroc', 'MAR', 'Comores', 'COM', '2025-12-24 20:00:00+00:00', '20:00', 'Stade Mohammed V', 'Casablanca', 'A', 'Groupe', 'scheduled'),
('Mali', 'MLI', 'Zambie', 'ZAM', '2025-12-24 17:00:00+00:00', '17:00', 'Stade de Marrakech', 'Marrakech', 'A', 'Groupe', 'scheduled'),
('Senegal', 'SEN', 'Egypte', 'EGY', '2025-12-25 17:00:00+00:00', '17:00', 'Complexe Moulay Abdellah', 'Rabat', 'C', 'Groupe', 'scheduled'),
('Cameroun', 'CMR', 'Nigeria', 'NGA', '2025-12-25 20:00:00+00:00', '20:00', 'Grand Stade de Tanger', 'Tanger', 'C', 'Groupe', 'scheduled')
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERT TICKET AVAILABILITY
-- ============================================
INSERT INTO ticket_availability (match_id, category, total_seats, available_seats, price_per_seat)
SELECT 
  m.id,
  cat.category,
  cat.total_seats,
  cat.available_seats,
  cat.price_per_seat
FROM matches m
CROSS JOIN (
  VALUES 
    ('VIP', 1000, 850, 1500.00),
    ('Category 1', 5000, 4200, 500.00),
    ('Category 2', 8000, 6800, 300.00),
    ('Category 3', 10000, 9200, 150.00)
) AS cat(category, total_seats, available_seats, price_per_seat)
ON CONFLICT (match_id, category) DO NOTHING;

-- ============================================
-- INSERT SPONSORS
-- ============================================
INSERT INTO sponsors (sponsor_name, description, logo_url, website_url, sponsor_level) VALUES
('TotalEnergies', 'Leading energy company', '/sponsors/totalenergies.png', 'https://totalenergies.com', 'Platine'),
('Maroc Telecom', 'Major telecommunications provider', '/sponsors/maroc-telecom.png', 'https://maroctelecom.ma', 'Gold'),
('Sofitel', 'Luxury hotel chain', '/sponsors/sofitel.png', 'https://sofitel.com', 'Silver'),
('Royal Air Maroc', 'National airline', '/sponsors/ram.png', 'https://royalairmaroc.com', 'Gold'),
('Banque Al Maghrib', 'Central bank', '/sponsors/bam.png', 'https://bam.ma', 'Silver'),
('Morocco Tourism Board', 'Tourism promoter', '/sponsors/mtb.png', 'https://visitmorocco.com', 'Partner')
ON CONFLICT (sponsor_name) DO NOTHING;

-- ============================================
-- INSERT SAMPLE VOLUNTEERS
-- ============================================
INSERT INTO volunteers (first_name, last_name, email, phone_number, birth_date, nationality, city, mission, availability, status) VALUES
('Amina', 'Benali', 'amina@email.com', '+212612345678', '1995-05-15', 'Moroccan', 'Rabat', 'Accueil', 'Full-time', 'Approuvé'),
('Hassan', 'Elmourid', 'hassan@email.com', '+212623456789', '1992-08-20', 'Moroccan', 'Casablanca', 'Sécurité', 'Weekend', 'En attente'),
('Nadia', 'Alaoui', 'nadia@email.com', '+212634567890', '1998-03-10', 'Moroccan', 'Marrakech', 'Transport', 'Full-time', 'Approuvé'),
('Karim', 'Fassi', 'karim@email.com', '+212645678901', '1990-11-25', 'Moroccan', 'Fes', 'Media', 'Part-time', 'Refusé'),
('Fatima', 'Benhaddou', 'fatima@email.com', '+212656789012', '1996-07-12', 'Moroccan', 'Tanger', 'Médical', 'Full-time', 'Approuvé'),
('Youssef', 'Mansouri', 'youssef@email.com', '+212667890123', '1994-09-30', 'Moroccan', 'Agadir', 'Logistique', 'Weekend', 'En attente'),
('Sarah', 'Mitchell', 'sarah@email.com', '+1234567890', '1997-02-14', 'American', 'New York', 'Accueil', 'Full-time', 'Approuvé'),
('Jean', 'Dupont', 'jean@email.com', '+33612345678', '1993-06-20', 'French', 'Paris', 'Traduction', 'Full-time', 'Approuvé')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- VERIFY DATA INSERTION
-- ============================================
SELECT COUNT(*) as matches_count FROM matches;
SELECT COUNT(*) as stadiums_count FROM stadiums;
SELECT COUNT(*) as sponsors_count FROM sponsors;
SELECT COUNT(*) as volunteers_count FROM volunteers;
SELECT COUNT(*) as ticket_availability_count FROM ticket_availability;
