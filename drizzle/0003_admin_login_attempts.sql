CREATE TABLE IF NOT EXISTS "admin_login_attempts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL,
  "ip_address" text NOT NULL,
  "user_agent" text NOT NULL,
  "status" text DEFAULT 'pending' NOT NULL,
  "decision_token_hash" text NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "decided_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "admin_login_attempts_decision_token_hash_unique" UNIQUE("decision_token_hash")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "admin_login_attempts_status_expires_idx"
  ON "admin_login_attempts" USING btree ("status", "expires_at");
