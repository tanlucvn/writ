import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const writes = sqliteTable("writes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  pinned: integer("pinned").notNull().default(0),
  archived: integer("archived").notNull().default(0),
  color: text("color").default("default"),
  tagIds: text("tag_ids"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  removedAt: text("removed_at"),
  syncKey: text("sync_key").notNull(),
});
