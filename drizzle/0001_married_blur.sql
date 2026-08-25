CREATE TYPE "public"."access_account_status" AS ENUM('pending', 'active', 'suspended', 'expired');--> statement-breakpoint
CREATE TABLE "iptv_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_name" text NOT NULL,
	"mac_address" text NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"status" "access_account_status" DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp with time zone,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "iptv_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revoked_at" timestamp with time zone,
	CONSTRAINT "iptv_sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
ALTER TABLE "iptv_accounts" ADD CONSTRAINT "iptv_accounts_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "iptv_sessions" ADD CONSTRAINT "iptv_sessions_account_id_iptv_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."iptv_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "iptv_accounts_mac_address_idx" ON "iptv_accounts" USING btree ("mac_address");--> statement-breakpoint
CREATE UNIQUE INDEX "iptv_accounts_username_idx" ON "iptv_accounts" USING btree ("username");