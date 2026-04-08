-- ==========================================================================
-- SNS AI Tool - Database Schema
-- ==========================================================================
-- Run this migration against a fresh Supabase project.
-- All tables live in the default "public" schema.
-- ==========================================================================

-- Enable the pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------------
-- users
-- --------------------------------------------------------------------------
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    x_id        TEXT UNIQUE NOT NULL,
    username    TEXT NOT NULL,
    email       TEXT,
    avatar_url  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_x_id ON users (x_id);
CREATE INDEX idx_users_created_at ON users (created_at);

-- --------------------------------------------------------------------------
-- posts_generated
-- --------------------------------------------------------------------------
CREATE TABLE posts_generated (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    input_theme  TEXT NOT NULL,
    input_tone   TEXT NOT NULL,
    output_texts JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_generated_user_id ON posts_generated (user_id);
CREATE INDEX idx_posts_generated_created_at ON posts_generated (created_at);

-- --------------------------------------------------------------------------
-- user_settings
-- --------------------------------------------------------------------------
CREATE TABLE user_settings (
    user_id            UUID PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    tone_preference    TEXT NOT NULL DEFAULT 'casual',
    api_key_encrypted  TEXT,
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------------------
-- Row Level Security (RLS)
-- --------------------------------------------------------------------------
-- Enable RLS on all tables. Policies should be added according to your
-- authentication strategy (e.g. Supabase Auth or NextAuth JWT).
ALTER TABLE users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts_generated ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings   ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- updated_at trigger for user_settings
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
