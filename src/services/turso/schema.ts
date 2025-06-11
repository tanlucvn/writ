import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notesTable = sqliteTable("notes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isPinned: integer("isPinned").notNull().default(0),
  inTrash: integer("inTrash").notNull().default(0),
  parentId: text("parent_id"),
  tagIds: text("tag_ids"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  syncKey: text("sync_key").notNull(),
});
