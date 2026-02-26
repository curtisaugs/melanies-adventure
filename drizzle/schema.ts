import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Saved itineraries from the AI trip-builder concierge
export const savedItineraries = mysqlTable("saved_itineraries", {
  id: int("id").autoincrement().primaryKey(),
  shareId: varchar("shareId", { length: 32 }).notNull().unique(), // short random ID for public sharing
  title: varchar("title", { length: 255 }).notNull(),
  // JSON blob containing the full generated itinerary
  itineraryJson: text("itineraryJson").notNull(),
  // The wizard answers that produced this itinerary (for display)
  preferencesJson: text("preferencesJson").notNull(),
  // Optional: linked to a user if they were logged in
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SavedItinerary = typeof savedItineraries.$inferSelect;
export type InsertSavedItinerary = typeof savedItineraries.$inferInsert;