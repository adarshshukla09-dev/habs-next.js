"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  createTodoForDate,
  ReadTodosForDate,
  updateTodo,
  deleteTodo, // Assuming this exists in your actions
} from "@/actions/daysAction";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoCardProps {
  dayName: string;
  dat: string; 
  initialTodos: Todo[];
}

const TodoCard = ({ dayName, dat, initialTodos }: TodoCardProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  
  // Tip: In production, consider passing the USER_ID as a prop or using an Auth hook
  const USER_ID = "kva25DEn8zjFKAYFJWZgBuKc35jJWXsp";

  // --- Handlers ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newTodo = await createTodoForDate({
        userId: USER_ID,
        title: trimmedValue,
        date: new Date(dat),
      });
      
      if (newTodo) {
        setTodos((prev) => [...prev, newTodo as Todo]);
        setInputValue("");
      }
    } catch (err) {
      console.error("Failed to add todo:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (todoId: string, currentStatus: boolean) => {
    // Optimistic UI Update
    setTodos((prev) =>
      prev.map((t) => t.id === todoId ? { ...t, completed: !currentStatus } : t)
    );

    try {
      await updateTodo({
        userId: USER_ID,
        date: new Date(dat),
        todoId: todoId,
        completed: !currentStatus,
      });
    } catch (err) {
      // Revert if API fails
      setTodos((prev) =>
        prev.map((t) => t.id === todoId ? { ...t, completed: currentStatus } : t)
      );
    }
  };

  const handleDelete = async (todoId: string) => {
    // Optimistic UI Update
    const previousTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== todoId));

    try {
      await deleteTodo({ userId: USER_ID, date: new Date(dat), todoId });
    } catch (err) {
      console.error("Failed to delete:", err);
      setTodos(previousTodos); // Revert on failure
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      setIsFetching(true);
      try {
        const allTodos = await ReadTodosForDate({
          userId: USER_ID,
          date: new Date(dat),
        });
        if (allTodos) setTodos(allTodos as Todo[]);
      } finally {
        setIsFetching(false);
      }
    };
    loadTodos();
  }, [dat]);

  return (
    <Card className="h-full min-w-[320px] bg-slate-900/40 backdrop-blur-md border-white/5 rounded-3xl p-1 shadow-2xl">
      <CardHeader className="flex flex-row items-start justify-between pb-6">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-2xl font-bold text-white">{dayName}</CardTitle>
          <p className="text-xs font-medium text-slate-500 tracking-wider uppercase">{dat}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
          {todos.length} Tasks
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* --- Input Form --- */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            disabled={isSubmitting}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a task..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50 placeholder:text-slate-600"
          />
          <button
            type="submit"
            disabled={isSubmitting || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 transition-all disabled:bg-slate-700 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} strokeWidth={3} />}
          </button>
        </form>

        {/* --- List Section --- */}
        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 size={24} className="animate-spin text-emerald-500/50" />
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggle(todo.id, todo.completed)}
                    className="border-slate-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <span className={`text-sm transition-all ${todo.completed ? "text-slate-500 line-through" : "text-slate-200"}`}>
                    {todo.title}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleDelete(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            {todos.length === 0 && (
              <div className="text-center py-10">
                <p className="text-xs text-slate-600 italic">No tasks for today</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoCard;