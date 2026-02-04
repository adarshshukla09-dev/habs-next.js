import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  date,
  timestamp
} from "drizzle-orm/pg-core";
import { user } from "@/lib/auth-schema";



export const days = pgTable("days", {
  id: uuid("id").defaultRandom().primaryKey(),
  
  // Referenced to the 'user' table above
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  date: date("date").notNull(), // YYYY-MM-DD
  year: integer("year").notNull(),
  month: integer("month").notNull(), // 1–12
  weekOfMonth: integer("week_of_month").notNull(), // 1–4 (or 5)
  dayOfWeek: integer("day_of_week").notNull(), // 1–7 (Mon–Sun)

  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),

  dayId: uuid("day_id")
    .notNull()
    .references(() => days.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),

  createdAt: timestamp("created_at").defaultNow().notNull()
});
import { relations } from "drizzle-orm";

export const daysRelations = relations(days, ({ many }) => ({
  todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  day: one(days, {
    fields: [todos.dayId],
    references: [days.id],
  }),
}));

export * from "@/lib/auth-schema";

