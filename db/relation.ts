import { relations } from "drizzle-orm";
import { days, todos } from "./schema";

export const daysRelations = relations(days, ({ many }) => ({
  todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  day: one(days, {
    fields: [todos.dayId],
    references: [days.id],
  }),
}));
