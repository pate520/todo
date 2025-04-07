import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable("todos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
});

export type Todo = typeof todoTable.$inferSelect;
export type NewTodo = typeof todoTable.$inferInsert; 