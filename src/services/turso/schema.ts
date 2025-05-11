import { sqliteTable, text } from "drizzle-orm/sqlite-core";

// Mảng tagIds sẽ được lưu dạng JSON string
export const writes = sqliteTable("writes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(), // ISO string
  updatedAt: text("updated_at").notNull(), // ISO string
  tagIds: text("tag_ids"), // JSON stringified array
  syncKey: text("sync_key").notNull(),
});
