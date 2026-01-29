-- Telegram Bot Integration Migration
-- Run this in your Neon database console

CREATE TABLE IF NOT EXISTS telegram_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  chat_id BIGINT NOT NULL UNIQUE,
  username TEXT,
  notification_types TEXT[] DEFAULT ARRAY['events', 'donations'],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_telegram_subs_tenant ON telegram_subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_telegram_subs_chat ON telegram_subscriptions(chat_id);

-- Enable RLS
ALTER TABLE telegram_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: tenant isolation
CREATE POLICY telegram_tenant_isolation ON telegram_subscriptions
  FOR ALL USING (tenant_id = current_setting('app.tenant_id', true)::uuid);
