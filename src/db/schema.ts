import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const writes = sqliteTable("writes", {
  id: text("id").primaryKey(), // string ID (UUID, nanoid, etc.)
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(), // ISO string
  updatedAt: text("updated_at").notNull(), // ISO string
  tagIds: text("tag_ids", { mode: "json" }).notNull().default("[]"),
  syncKey: text("sync_key").notNull(),
});
