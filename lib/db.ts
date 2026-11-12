import { neon } from "@neondatabase/serverless";
export const sql = neon(process.env.DATABASE_URL ?? "postgresql://invalid:invalid@localhost/invalid");
export async function ensureSchema() {
  await sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT NOT NULL, full_name TEXT, avatar_url TEXT, github_username TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP`;
  await sql`CREATE TABLE IF NOT EXISTS projects (id SERIAL PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, name TEXT NOT NULL, description TEXT, github_repo_url TEXT, share_token TEXT UNIQUE, risk_score INT, progress_pct INT, health_status TEXT, bottlenecks JSONB DEFAULT '[]', mitigation_steps JSONB DEFAULT '[]', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  await sql`CREATE TABLE IF NOT EXISTS daily_logs (id SERIAL PRIMARY KEY, project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, raw_input TEXT NOT NULL, ai_summary TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  await sql`CREATE TABLE IF NOT EXISTS community_messages (id SERIAL PRIMARY KEY, channel_name TEXT NOT NULL DEFAULT 'general-lounge', user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, user_name TEXT NOT NULL, user_avatar TEXT, message_text TEXT NOT NULL, github_repo_url TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  await sql`CREATE TABLE IF NOT EXISTS message_comments (id SERIAL PRIMARY KEY, message_id INT NOT NULL REFERENCES community_messages(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, comment_text TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
}

