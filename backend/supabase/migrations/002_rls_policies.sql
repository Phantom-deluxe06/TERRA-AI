-- TERRA AI Row Level Security Policies
-- Run this after the schema migration

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EcoActions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TokenRewards" ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS POLICIES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON "Users"
  FOR SELECT
  USING (auth.uid()::text = wallet_address OR auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON "Users"
  FOR UPDATE
  USING (auth.uid()::text = wallet_address OR auth.uid() = id)
  WITH CHECK (auth.uid()::text = wallet_address OR auth.uid() = id);

-- Service role can insert new users (for wallet-based auth)
CREATE POLICY "Service role can create users"
  ON "Users"
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- ECO_ACTIONS POLICIES
-- ============================================

-- Users can view their own actions
CREATE POLICY "Users can view own actions"
  ON "EcoActions"
  FOR SELECT
  USING (user_id IN (SELECT id FROM "Users" WHERE wallet_address = auth.uid()::text OR id = auth.uid()));

-- Users can create their own actions
CREATE POLICY "Users can create own actions"
  ON "EcoActions"
  FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM "Users" WHERE wallet_address = auth.uid()::text OR id = auth.uid()));

-- Users can update their own pending actions
CREATE POLICY "Users can update own pending actions"
  ON "EcoActions"
  FOR UPDATE
  USING (
    user_id IN (SELECT id FROM "Users" WHERE wallet_address = auth.uid()::text OR id = auth.uid())
    AND verification_status = 'pending'
  );

-- Public can view verified actions (for marketplace/leaderboard)
CREATE POLICY "Public can view verified actions"
  ON "EcoActions"
  FOR SELECT
  USING (verification_status = 'verified');

-- ============================================
-- TOKEN_REWARDS POLICIES
-- ============================================

-- Users can view their own rewards
CREATE POLICY "Users can view own rewards"
  ON "TokenRewards"
  FOR SELECT
  USING (user_id IN (SELECT id FROM "Users" WHERE wallet_address = auth.uid()::text OR id = auth.uid()));

-- Service role can create rewards (AI verification backend)
CREATE POLICY "Service role can create rewards"
  ON "TokenRewards"
  FOR INSERT
  WITH CHECK (true);
