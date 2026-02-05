"use server";

import { db } from "@/db";
import { days, todos } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and, between } from "drizzle-orm";
import { headers } from "next/headers";

/* ----------------------------------
 Types
----------------------------------- */

type TodoInput = {
  date: Date;
  title: string;
};

/* ----------------------------------
 Helpers
----------------------------------- */

const formatDateForDb = (date: Date) => date.toISOString().split("T")[0];
async function getAuthUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");
  return session.user.id;
}

async function getDayRecord(userId: string, date: Date) {
  const dateString = formatDateForDb(date);

  return db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, dateString)),
  });
}

/* ----------------------------------
 Read All Dates
----------------------------------- */

export async function ReadDate() {
  const userId = await getAuthUserId();
  return db.query.days.findMany({
    where: eq(days.userId, userId),
    orderBy: [days.date],
  });
}

/* ----------------------------------
 Create Date (idempotent)
----------------------------------- */

export async function createDate({ date }: Pick<TodoInput, "date">) {
  const jsDate = new Date(date);
  const dateString = formatDateForDb(jsDate);
  const userId = await getAuthUserId();
  const existing = await db.query.days.findFirst({
    where: and(eq(days.userId, userId), eq(days.date, dateString)),
  });

  if (existing) return existing.id;

  const [newDay] = await db
    .insert(days)
    .values({
      userId,
      date: dateString,
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      weekOfMonth: Math.ceil(jsDate.getDate() / 7),
      dayOfWeek: jsDate.getDay() === 0 ? 7 : jsDate.getDay(),
    })
    .returning({ id: days.id });

  return newDay.id;
}

/* ----------------------------------
 Create Todo
----------------------------------- */

export async function createTodoForDate({ date, title }: Pick<TodoInput, "date" | "title">) {
    const userId = await getAuthUserId();
  return db.transaction(async (tx) => {
    let day = await getDayRecord(userId, date);

    if (!day) {
      const dayId = await createDate({  date });
      day = { id: dayId } as typeof days.$inferSelect;
    }

    const [todo] = await tx
      .insert(todos)
      .values({
        dayId: day.id,
        title,
      })
      .returning();

    return todo;
  });
}

/* ----------------------------------
 Read Todos For Date
----------------------------------- */

export async function ReadTodosForDate({
  date,
}: Pick<TodoInput ,"date">) {
      const userId = await getAuthUserId();

  const day = await getDayRecord(userId, date);
  if (!day) return [];

  return db.select().from(todos).where(eq(todos.dayId, day.id));
}

/* ----------------------------------
 Read Todos In Month
----------------------------------- */

export async function getTodosInMonth({
  
  year,
  month,
}: {
  year: number;
  month: number;
}) {
      const userId = await getAuthUserId();

  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-${new Date(
    year,
    month,
    0,
  ).getDate()}`;

  return db.query.days.findMany({
    where: and(eq(days.userId, userId), between(days.date, start, end)),
    with: {
      todos: true,
    },
    orderBy: [days.date],
  });
}

/* ----------------------------------
 Delete Todo
----------------------------------- */

export async function deleteTodo({
  date,
  todoId,
}: {
  date: Date;
  todoId: string;
}) {
  return db.transaction(async (tx) => {
        const userId = await getAuthUserId();

    const day = await getDayRecord(userId, date);
    if (!day) return { success: false };

    await tx
      .delete(todos)
      .where(and(eq(todos.id, todoId), eq(todos.dayId, day.id)));

    const remaining = await tx
      .select({ id: todos.id })
      .from(todos)
      .where(eq(todos.dayId, day.id));

    if (remaining.length === 0) {
      await tx.delete(days).where(eq(days.id, day.id));
    }

    return { success: true };
  });
}

/* ----------------------------------
 Update Todo
----------------------------------- */

export async function updateTodo({
  date,
  todoId,
  title,
  completed,
}: {
  date: Date;
  todoId: string;
  title?: string;
  completed?: boolean;
}) {
      const userId = await getAuthUserId();

  const day = await getDayRecord(userId, date);
  if (!day) return { success: false };

  await db
    .update(todos)
    .set({
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
    })
    .where(and(eq(todos.id, todoId), eq(todos.dayId, day.id)));

  return { success: true };
}
