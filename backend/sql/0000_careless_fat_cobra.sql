CREATE TABLE IF NOT EXISTS "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand" varchar(255) NOT NULL,
	"top_speed" varchar(255) NOT NULL,
	"owner_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"google_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cars" ADD CONSTRAINT "cars_owner_id_profiles_id_fk" FOREIGN KEY ("owner_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
