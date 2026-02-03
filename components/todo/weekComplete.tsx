"use client" // Required for Recharts animations

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface WeekStatsProps {
  completed: number
  total: number
}

const WeekComplete = ({ completed , total  }: WeekStatsProps) => {
  const remaining = total - completed
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Remaining', value: remaining },
  ]

  // Professional Dark Theme Palette
  const COLORS = ['#22c55e', 'rgba(255, 255, 255, 0.05)'] 

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
      <div className="flex flex-col items-center">
        
        {/* 1. Typography Heading */}
        <div className="text-center mb-2">
          <h3 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">
            Weekly Progress
          </h3>
          <p className="text-xs text-slate-400">Week 1 Overview</p>
        </div>

        {/* 2. Pie Chart Container */}
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered Percentage Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white">
              {Math.round((completed / total) * 100)}%
            </span>
          </div>
        </div>

        {/* 3. Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          <div className="flex flex-col p-4 rounded-2xl bg-white/3 border border-white/5">
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Done</span>
            <span className="text-2xl font-bold text-white">{completed}</span>
          </div>
          
          <div className="flex flex-col p-4 rounded-2xl bg-white/3 border border-white/5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</span>
            <span className="text-2xl font-bold text-white">{total}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WeekComplete