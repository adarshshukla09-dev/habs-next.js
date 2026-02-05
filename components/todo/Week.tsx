"use client";
import React, { useEffect, useState } from "react";
import DayList from "./DayList";
import { Loader, Loader2, Plus } from "lucide-react";
import { createDate, ReadDate } from "@/actions/daysAction";
import TodoHead from "./header";
import WeeklyPieCharts from "./weekComplete";

// Define the type clearly to avoid 'any'
interface DayRecord {
  id: string;
  date: string;
  createdAt: Date;
  year: number;
  month: number;
  weekOfMonth: number;
  dayOfWeek: number;
}

const Week = () => {
  // Use ONE state for everything
  const [days, setDays] = useState<DayRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
const [isInitialLoading, setIsInitialLoading] = useState(true); // For first fetch  const USER_ID = "kva25DEn8zjFKAYFJWZgBuKc35jJWXsp";
    const USER_ID = "kva25DEn8zjFKAYFJWZgBuKc35jJWXsp";

  // 1. Load data on mount
 useEffect(() => {

    const initFetch = async () => {
      try {
        const read = await ReadDate();
        if (read) {
          const todayStr = new Date().toISOString().split("T")[0];
          const filtered = read.filter((da) => da.date >= todayStr);
          setDays(filtered);
        }
      } finally {
        setIsInitialLoading(false); // Stop loading regardless of success/fail
      }
    };
    initFetch();
  }, []);

  // 2. Add new session
  const handleAddSession = async () => {
    if (days.length >= 7 || isLoading) return;

    setIsLoading(true);
    const futureDate = new Date();
    // Offset based on how many days we already have
    futureDate.setDate(new Date().getDate() + days.length);

    try {
      const dayId = await createDate({
        
        date: futureDate,
      });

      if (dayId) {
        // Construct an object that matches the DayRecord interface
        // so the UI doesn't break when rendering the new card
        const newDay: DayRecord = {
          id: dayId,
          date: futureDate.toISOString().split("T")[0],
          createdAt: new Date(),
          
          year: futureDate.getFullYear(),
          month: futureDate.getMonth() + 1,
          weekOfMonth: Math.ceil(futureDate.getDate() / 7),
          dayOfWeek: futureDate.getDay() === 0 ? 7 : futureDate.getDay(),
        };

        setDays((prev) => [...prev, newDay]);
      }
    } catch (error) {
      console.error("Failed to create session:", error);
    } finally {
      setIsLoading(false);
    }
  };

return (
  <>
  <section className="w-full min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 py-20">
    {/* 1. Header always stays at the top */}
    <TodoHead month={days[0]?.month}/>
   
    <div className="px-6 md:px-16 mb-12 flex justify-between items-end">
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/80">
          Productivity Timeline
        </span>
        <h2 className="text-5xl font-serif italic text-white">
          week {days[0]?.weekOfMonth || "--"}
        </h2>
      </div>
    </div>



    {/* 2. Conditional Rendering for Content */}
    {isInitialLoading ? (
      <div className="flex flex-col items-center justify-center w-full h-[50vh]">
        <Loader2 size={40} className="animate-spin text-emerald-500" />
        <p className="text-xs font-bold tracking-[0.2em] text-emerald-500/50 uppercase mt-4">
          Loading Timeline...
        </p>
      </div>
    ) : (
      <div className="flex overflow-x-auto gap-8 px-6 md:px-16 pb-12 no-scrollbar snap-x">
        {days.map((day) => (
          <DayList key={day.id} day={day} />

        ))}

        {days.length < 7 && (
          <button
            disabled={isLoading}
            onClick={handleAddSession}
            className={`min-w-[320px] group relative overflow-hidden rounded-[32px] border-2 border-dashed border-white/10 hover:border-emerald-500/50 transition-all duration-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:text-emerald-400 transition-all">
                <Plus size={32} className={isLoading ? "animate-spin" : ""} />
              </div>
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
                {isLoading ? "Creating..." : "Add Session"}
              </p>
            </div>
          </button>
        )}
      </div>
    )}
  </section>
  
      
  </>
);

};

export default Week;
