"use server";

import { db } from "@/db";
import { habits } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Habit {
  dayId: string;
  userId: string;
  habitName: string;
  completed?: boolean;
}

export const createHabits = async (habit: Habit) => {
  try {
    const [newHabit] = await db
      .insert(habits)
      .values({
        dayId: habit.dayId,
        userId: habit.userId,
        habitName: habit.habitName,
        completed: habit.completed ?? false,
      })
      .returning();

    return newHabit;
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

export const updateHabits = async (
  habitId: string,
  updateHabit: Partial<{
    habitName: string;
    completed: boolean;
  }>,
) => {
  try {
    const [updatedHabit] = await db
      .update(habits)
      .set({
        ...(updateHabit.habitName !== undefined && {
          habitName: updateHabit.habitName,
        }),
        ...(updateHabit.completed !== undefined && {
          completed: updateHabit.completed,
        }),
      })
      .where(eq(habits.id, habitId))
      .returning();

    return { success: true, data: updatedHabit };
  } catch (error) {
    console.error("Update habit failed:", error);
    return { success: false };
  }
};
export const readHabit = async (userId: string) => {
  try {
    return await db.query.habits.findMany({
      where: eq(habits.userId, userId),
    });
  } catch (error) {
    console.error("Error reading habits:", error);
    throw error;
  }
};

export const deleteHabit = async (habitId: string) => {
  try {
    await db.delete(habits).where(eq(habits.id, habitId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting habit:", error);
    return { success: false };
  }
};
