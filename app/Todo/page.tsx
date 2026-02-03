import TodoHead from '@/components/todo/header'
import Week from '@/components/todo/Week'
import WeekComplete from '@/components/todo/weekComplete'
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, LayoutDashboard, Settings } from 'lucide-react'
import Head from 'next/head'

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* 1. Ambient Background Tints */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-125 w-125 rounded-full bg-emerald-500/3 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 rounded-full bg-emerald-600/2 blur-[100px]" />

      {/* 2. Top Navigation Bar (Professional Utility) */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <CalendarIcon size={18} className="text-black" />
          </div>
          <span className="font-bold tracking-tight text-white">Flow.</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <button className="hover:text-emerald-400 transition-colors flex items-center gap-2">
            <LayoutDashboard size={16} /> Dashboard
          </button>
          <button className="hover:text-emerald-400 transition-colors flex items-center gap-2">
            <Settings size={16} /> Settings
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-400 mx-auto pt-12 px-6 md:px-12 pb-24">
        
        {/* 3. Hero Header Section */}

   

        {/* 4. The Week Scroller */}
        <div className="mb-24">
          <Week />
        </div>

        {/* 5. The Performance Analytics (Footer Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 p-10 rounded-[2.5rem] bg-linear-to-br from-white/3 to-transparent border border-white/5 backdrop-blur-3xl flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Focus Score</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                Your completion rate is up by <span className="text-emerald-400 font-bold">14%</span> this week. 
                You are most productive on <span className="text-white underline decoration-emerald-500">Tuesdays</span>.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="flex-1 group flex flex-col items-center gap-2">
                  <div className={`w-full rounded-md transition-all duration-500 bg-emerald-500/20 group-hover:bg-emerald-500`} 
                       style={{ height: `${[40, 70, 45, 90, 65, 30, 20][i]}px` }} />
                  <span className="text-[10px] text-slate-500 font-bold">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2 rounded-[2.5rem] bg-emerald-500/2 border border-emerald-500/10">
             <WeekComplete completed={28} total={34} />
          </div>
        </div>

      </main>
    </div>
  )
}