import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  date,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "@/lib/auth-schema";
import { relations } from "drizzle-orm";

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

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const todos = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  dayId: uuid("day_id")
    .notNull()
    .references(() => days.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const habits = pgTable("habits", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: text("name").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const habitDays = pgTable(
  "habit_days",
  {
    habitId: uuid("habit_id")
      .notNull()
      .references(() => habits.id, { onDelete: "cascade" }),

    dayId: uuid("day_id")
      .notNull()
      .references(() => days.id, { onDelete: "cascade" }),

    completed: boolean("completed").notNull().default(false),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.habitId, table.dayId] }),
  }),
);

export * from "@/lib/auth-schema";
export const daysRelations = relations(days, ({ many }) => ({
  todos: many(todos),
  habitDays: many(habitDays),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  day: one(days, {
    fields: [todos.dayId],
    references: [days.id],
  }),
}));

export const habitsRelations = relations(habits, ({ many }) => ({
  habitDays: many(habitDays),
}));

export const habitDaysRelations = relations(habitDays, ({ one }) => ({
  habit: one(habits, {
    fields: [habitDays.habitId],
    references: [habits.id],
  }),
  day: one(days, {
    fields: [habitDays.dayId],
    references: [days.id],
  }),
}));