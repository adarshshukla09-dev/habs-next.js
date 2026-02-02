"use server";

import { db } from "@/db";
import { days, todos } from "@/db/schema";
import { eq, and } from "drizzle-orm";

type TodoInput = {
  userId: string;
  date: string; // YYYY-MM-DD
  title: string;
};

// 1️⃣ Helper to ensure a day exists
export async function createDate({ userId, date }: Pick<TodoInput, "userId" | "date">) {
  const jsDate = new Date(date);
  const [newDay] = await db
    .insert(days)
    .values({
      userId,
      date,
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      weekOfMonth: Math.ceil(jsDate.getDate() / 7),
      dayOfWeek: jsDate.getDay() === 0 ? 7 : jsDate.getDay(),
    })
    .returning({ id: days.id });

  return newDay.id;
}

// 2️⃣ Create Todo (Uses helper logic)
export async function createTodoForDate({ userId, date, title }: TodoInput) {
  let dayRecord = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, date)),
  });

  let dayId = dayRecord?.id;

  if (!dayId) {
    dayId = await createDate({ userId, date });
  }

  const [todo] = await db
    .insert(todos)
    .values({ dayId: dayId!, title })
    .returning();

  return todo;
}

// 3️⃣ Read Todos
export async function ReadTodosForDate({ userId, date }: Pick<TodoInput, "userId" | "date">) {
  const dayRecord = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, date)),
  });

  if (!dayRecord) return [];

  return await db.select().from(todos).where(eq(todos.dayId, dayRecord.id));
}

// 4️⃣ Delete Todo (with Auto-Cleanup of empty days)
export async function deleteTodo({
  userId,
  date,
  todoId,
}: Omit<TodoInput, "title"> & { todoId: string }) {
  const dayRecord = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, date)),
  });

  if (!dayRecord) return { success: false, error: "Day not found" };

  await db
    .delete(todos)
    .where(and(eq(todos.id, todoId), eq(todos.dayId, dayRecord.id)));

  const remainingTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.dayId, dayRecord.id));

  if (remainingTodos.length === 0) {
    await db.delete(days).where(eq(days.id, dayRecord.id));
  }
  
  return { success: true };
}

// 5️⃣ Update Todo
export async function updateTodo({
  userId,
  date,
  todoId,
  title,
  completed,
}: Partial<TodoInput> & { userId: string; date: string; todoId: string; completed?: boolean }) {
  const dayRecord = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, date)),
  });

  if (!dayRecord) return { success: false, error: "Day not found" };

  await db
    .update(todos)
    .set({
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
    })
    .where(and(eq(todos.id, todoId), eq(todos.dayId, dayRecord.id)));

  return { success: true };
}