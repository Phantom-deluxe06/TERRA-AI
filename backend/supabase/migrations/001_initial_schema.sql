-- TERRA AI Database Schema
-- Run this in Supabase SQL Editor or via migrations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "Users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  display_name TEXT,
  total_tokens DECIMAL DEFAULT 0,
  total_co2_offset DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for wallet lookups
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON "Users" (wallet_address);

-- ============================================
-- ECO_ACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "EcoActions" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES "Users"(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('tree', 'solar_panel', 'ev_charger', 'recycling_bin', 'bicycle', 'reusable_bag')),
  image_url TEXT NOT NULL,
  location JSONB, -- { lat: number, lng: number, address?: string }
  ai_verification_score DECIMAL,
  ai_detected_objects JSONB, -- [{ label: string, confidence: number }]
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  blockchain_tx_hash TEXT,
  tokens_earned DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_ecoactions_user_id ON "EcoActions" (user_id);
CREATE INDEX IF NOT EXISTS idx_ecoactions_status ON "EcoActions" (verification_status);
CREATE INDEX IF NOT EXISTS idx_ecoactions_created_at ON "EcoActions" (created_at DESC);

-- ============================================
-- TOKEN_REWARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS "TokenRewards" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES "Users"(id) ON DELETE CASCADE,
  action_id UUID REFERENCES "EcoActions"(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  tx_hash TEXT NOT NULL,
  minted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user reward history
CREATE INDEX IF NOT EXISTS idx_tokenrewards_user_id ON "TokenRewards" (user_id);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to Users table
DROP TRIGGER IF EXISTS update_users_updated_at ON "Users";
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON "Users"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
