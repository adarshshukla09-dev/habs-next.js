"use client"
import React, { useState } from 'react'
import TodoCard from './TodoCard';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Define the shape of a SINGLE day record
export interface DayRecord {
  date: string;
  id: string;
  createdAt: Date;
  year: number;
  month: number;
  weekOfMonth: number;
  dayOfWeek: number; // Assumes 1-7 from your DB logic
}

// Props should represent a single day being rendered
export interface DayListProps {
  day: DayRecord;
}

const dayofweek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DayList = ({ day }: DayListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Since your DB stores 1-7, and arrays are 0-indexed, we subtract 1
  const displayDayName = dayofweek[day.dayOfWeek - 1] || "Unknown Day";
  return (
    <div className="min-w-[85vw] md:min-w-100 shrink-0 snap-start">
      <TodoCard 
        dayName={displayDayName}
        dat={day.date}
        initialTodos={todos}
      />
      
    </div>
  )
}

export default DayList;