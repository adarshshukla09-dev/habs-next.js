"use server";

import { db } from "@/db";
import { days, todos } from "@/db/schema";
import { eq, and } from "drizzle-orm";

type TodoInput = {
  userId: string;
  date: Date;
  title: string;
};

const formatDateForDb = (date: Date) => date.toISOString().split('T')[0];

export async function ReadDate({ userId }: Pick<TodoInput, "userId">) {
  try {
    
  const dayRecord = await db.query.days.findMany({
    where: (eq(days.userId, userId)),
  });
return dayRecord;
  } catch (error) {
    console.log(error)
  }
}
// 1️⃣ Helper to ensure a day exists
export async function createDate({ userId, date }: Pick<TodoInput, "userId" | "date">) {
  try {
    
  const jsDate = new Date(date);
  const dateString = formatDateForDb(jsDate); // Normalizing to string
  const existing = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, dateString)),
    
  })

  if(existing) return existing?.id;

  const [newDay] = await db
    .insert(days)
    .values({
      userId,
      date: dateString, // Correctly passing string
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      weekOfMonth: Math.ceil(jsDate.getDate() / 7),
      dayOfWeek: jsDate.getDay() === 0 ? 7 : jsDate.getDay(),
    })
    .returning({ id: days.id });

  return newDay.id;
  } catch (error) {
    console.log(error)
  }
}

// 2️⃣ Create Todo
export async function createTodoForDate({ userId, date, title }: TodoInput) {
  const dateString = formatDateForDb(date); // Normalize here

  let dayRecord = await db.query.days.findFirst({
    // Use dateString, NOT date object
    where: and(eq(days.userId, userId), eq(days.date, dateString)),
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
  const dateString = formatDateForDb(date); // Normalize here

  const dayRecord = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, dateString)),
  });

  if (!dayRecord) return [];

  return await db.select().from(todos).where(eq(todos.dayId, dayRecord.id));
}

// 4️⃣ Delete Todo
export async function deleteTodo({
  userId,
  date,
  todoId,
}: Omit<TodoInput, "title"> & { todoId: string }) {
  const dateString = formatDateForDb(date); // Normalize here

  const dayRecord = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, dateString)),
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
// I changed 'date: string' to 'date: Date' for consistency with your other actions
export async function updateTodo({
  userId,
  date,
  todoId,
  title,
  completed,
}: { userId: string; date: Date; todoId: string; title?: string; completed?: boolean }) {
  const dateString = formatDateForDb(date); // Normalize here

  const dayRecord = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, dateString)),
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
