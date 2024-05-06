import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  googleId: text("google_id").notNull(),
  username: text("email").notNull(),
})

export const cars = pgTable("cars", {
  id: uuid("id").primaryKey(),
  brand: text("brand").notNull(),
  topSpeed: integer("top_speed").notNull(),
  ownerId: uuid("owner_id").references(() => profiles.id),
})