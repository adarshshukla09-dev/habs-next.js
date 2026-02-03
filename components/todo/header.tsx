import React from 'react'

interface TodoHeadProps {
  month: number; // Expecting 1-12
}

const TodoHead = ({ month }: TodoHeadProps) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Logic: month - 1 because getMonth() is 0-indexed (Jan = 0)
  // We use fallback 'monthNames[0]' just in case month is undefined
  const currentMonthName = monthNames[month - 1] || monthNames[new Date().getMonth()];

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
      <div className="space-y-2">
        <h2 className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase">
          Calendar View
        </h2>
        <div className="flex items-center gap-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            {currentMonthName}
          </h1>
        </div>
      </div>
    </header>
  )
}

export default TodoHead;