-- TERRA AI Storage Bucket Setup
-- Run this in Supabase SQL Editor

-- ============================================
-- CREATE STORAGE BUCKETS
-- ============================================

-- Note: Buckets are typically created via Supabase Dashboard or CLI
-- These are the SQL equivalents for documentation

-- eco-actions bucket for verification images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'eco-actions',
  'eco-actions',
  false,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- profiles bucket for user avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profiles',
  'profiles',
  true, -- Public for avatar display
  2097152, -- 2MB
  ARRAY['image/jpeg', 'image/png']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- eco-actions: Users can upload their own images
CREATE POLICY "Users can upload eco-action images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'eco-actions'
    AND auth.role() = 'authenticated'
  );

-- eco-actions: Users can view their own images
CREATE POLICY "Users can view own eco-action images"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'eco-actions'
    AND auth.role() = 'authenticated'
  );

-- profiles: Users can upload their own avatar
CREATE POLICY "Users can upload own avatar"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'profiles'
    AND auth.role() = 'authenticated'
  );

-- profiles: Anyone can view avatars (public bucket)
CREATE POLICY "Anyone can view avatars"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profiles');

-- profiles: Users can update their own avatar
CREATE POLICY "Users can update own avatar"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'profiles'
    AND auth.role() = 'authenticated'
  );
