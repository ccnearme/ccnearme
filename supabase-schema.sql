-- Create questionnaire_responses table
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  zip_code TEXT,
  drive_time TEXT,
  timeline TEXT,
  play_frequency TEXT,
  handicap TEXT,
  primary_goal TEXT,
  tournament_interest TEXT,
  practice_facility TEXT,
  favorite_architect TEXT,
  annual_golf_spend TEXT,
  atmosphere TEXT,
  family_situation TEXT,
  kids_ages TEXT,
  amenities JSONB,
  dining_importance TEXT,
  membership_history TEXT,
  initiation_budget TEXT,
  annual_dues_budget TEXT,
  reciprocal_interest TEXT,
  clubs_considering TEXT,
  ip_address TEXT,
  user_agent TEXT
);

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  county TEXT,
  zip_code TEXT,
  phone TEXT,
  website TEXT,
  latitude FLOAT,
  longitude FLOAT,
  course_architect TEXT,
  tier TEXT,
  primary_focus TEXT,
  atmosphere TEXT,
  notes TEXT,
  data_completeness INTEGER,
  is_partner BOOLEAN DEFAULT FALSE
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_clubs_state ON clubs(state);
CREATE INDEX IF NOT EXISTS idx_clubs_tier ON clubs(tier);
CREATE INDEX IF NOT EXISTS idx_clubs_is_partner ON clubs(is_partner);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_created_at ON questionnaire_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_email ON questionnaire_responses(email);

-- Enable Row Level Security (RLS)
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to clubs
CREATE POLICY "Enable read access for all users" ON clubs
  FOR SELECT USING (true);

-- Create policies for insert access to questionnaire_responses
CREATE POLICY "Enable insert for all users" ON questionnaire_responses
  FOR INSERT WITH CHECK (true);
