-- NEW QUESTIONNAIRE RESPONSES TABLE
-- Run this in Supabase SQL Editor

CREATE TABLE questionnaire_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp DEFAULT now(),

  -- Contact (Driving Range)
  first_name text,
  last_name text,
  email text NOT NULL,
  phone text,
  zip_code text,

  -- Front 9
  drive_time text,
  timeline text,
  play_frequency text,
  handicap text,
  current_golf_home text,
  current_club_name text,
  annual_golf_spend text,
  primary_goal text,
  tournament_interest text,
  practice_facility text,

  -- Back 9
  atmosphere text,
  family_situation text,
  kids_ages text,
  amenities jsonb,
  dining_importance text,
  membership_history text,
  reason_for_switch text,
  architect_preference text,
  initiation_budget text,
  annual_dues_budget text,
  reciprocal_interest text,

  -- Eligo bonus
  club_network_interest text,

  -- 19th Hole
  dream_course text,
  favorite_course_played text,

  -- Golf reference
  reference_name text,
  reference_relationship text,
  reference_contact text,

  -- Meta
  ip_address text,
  user_agent text
);

-- Enable Row Level Security
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Enable insert for all users" ON questionnaire_responses
  FOR INSERT WITH CHECK (true);

-- Allow public to read their own responses (optional)
CREATE POLICY "Enable read for all users" ON questionnaire_responses
  FOR SELECT USING (true);
