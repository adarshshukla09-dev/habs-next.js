"use client"

import { getTodosInMonth } from '@/actions/daysAction'
import React, { useEffect, useState, useMemo } from 'react'
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts'

interface Todo { id: string; completed: boolean; title: string; }
interface DayWithTodos { id: string; date: string; todos: Todo[]; weekOfMonth: number; }

const MonthlyAnalytics = () => {
  const [daysData, setDaysData] = useState<DayWithTodos[]>([]);
  const USER_ID = "kva25DEn8zjFKAYFJWZgBuKc35jJWXsp";
  const COLORS = ['#10b981', 'rgba(255, 255, 255, 0.05)'];

  useEffect(() => {
    const fetchMonthTodos = async () => {
      try {
        const now = new Date();
        const data = await getTodosInMonth({
          userId: USER_ID,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        });
        setDaysData(data as DayWithTodos[]);
      } catch (error) {
        console.error("Failed to fetch monthly todos:", error);
      }
    };
    fetchMonthTodos();
  }, []);

  // 1. Data for the Monthly Area Graph (Day by Day)
  const monthlyTimeline = useMemo(() => {
    return daysData.map(day => ({
      name: new Date(day.date).getDate(),
      completed: day.todos.filter(t => t.completed).length,
      total: day.todos.length
    }));
  }, [daysData]);

  // 2. Data for the Weekly Pie Charts
  const weeklyBreakdown = useMemo(() => {
    const groups: Record<number, { completed: number; total: number }> = {};
    daysData.forEach((day) => {
      const week = day.weekOfMonth;
      if (!groups[week]) groups[week] = { completed: 0, total: 0 };
      day.todos.forEach((todo) => {
        groups[week].total++;
        if (todo.completed) groups[week].completed++;
      });
    });





    
    return Object.entries(groups).map(([weekNum, stats]) => {
      const remaining = stats.total - stats.completed;
      return {
        weekLabel: `Week ${weekNum}`,
        percentage: stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100),
        data: [
          { name: 'Done', value: stats.completed },
          { name: 'Pending', value: stats.total === 0 ? 1 : remaining }
        ]
      };
    }).sort((a, b) => a.weekLabel.localeCompare(b.weekLabel));
  }, [daysData]);

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* --- MONTHLY AREA GRAPH --- */}
      <div className="w-full h-64 p-6 rounded-[2rem] bg-slate-900/20 border border-white/5 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Activity Flow</h4>
          <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Tasks Done / Day</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyTimeline}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} dy={10} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* --- WEEKLY PIE GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4">
        {weeklyBreakdown.map((week) => (
          <div key={week.weekLabel} className="flex flex-col items-center p-5 rounded-3xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-colors backdrop-blur-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">{week.weekLabel}</span>
            <div className="h-24 w-24 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={week.data} innerRadius={28} outerRadius={38} paddingAngle={4} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                    {week.data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{week.percentage}%</span>
              </div>
            </div>
            <div className="mt-4 text-[10px] text-slate-500 font-semibold">
              {week.data[0].value} <span className="text-slate-700">/</span> {week.data[0].value + (week.percentage === 0 && week.data[1].value === 1 ? 0 : week.data[1].value)} DONE
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyAnalytics;