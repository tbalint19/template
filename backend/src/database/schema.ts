import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  googleId: varchar("google_id", { length: 255 }).notNull(),
  username: varchar("email", { length: 255 }).notNull(),
})

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  brand: varchar("brand", { length: 255 }).notNull(),
  topSpeed: integer("top_speed").notNull(),
  ownerId: integer("owner_id").references(() => profiles.id),
})