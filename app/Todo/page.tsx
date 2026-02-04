import TodoHead from '@/components/todo/header'
import Week from '@/components/todo/Week'
import WeeklyPieCharts from '@/components/todo/weekComplete'
import { Calendar as CalendarIcon, LayoutDashboard, Settings, Bell } from 'lucide-react'

export default function Page() {
  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* 1. Enhanced Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-[15%] h-125 w-125 rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] -right-[5%] h-100 w-100 rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      {/* 2. Refined Navigation Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CalendarIcon size={20} className="text-black stroke-[2.5px]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">Flow<span className="text-emerald-500">.</span></span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-8">
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-400">
            <button className="hover:text-emerald-400 transition-all flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5">
              <LayoutDashboard size={18} /> <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button className="hover:text-emerald-400 transition-all flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5">
              <Settings size={18} /> <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
             <Bell size={20} />
             <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full border-2 border-[#020617]" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto pt-8 md:pt-16 px-4 sm:px-8 lg:px-12 pb-24">
        
        {/* 3. Header Section (Pass props if needed) */}
        <div className="mb-12">
        </div>

        {/* 4. The Week Scroller Card */}
        <section className="mb-16">
          <div className="bg-white/2 border border-white/5 rounded-[2rem] p-1 shadow-2xl overflow-hidden">
             <div className="bg-[#020617]/40 backdrop-blur-md rounded-[1.8rem] p-4 sm:p-8">
                <Week />
             </div>
          </div>
        </section>

        {/* 5. Performance Analytics Section */}
        <section className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Monthly Insights</h2>
              <p className="text-slate-500 text-sm">Visualizing your productivity trends</p>
            </div>
            <div className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Live Data
            </div>
          </div>

          <div className="relative group">
            {/* Decorative Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/20 to-blue-500/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative bg-[#020617]/80 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-2xl">
              {/* This will now render your Grid of Pie Charts */}
              <WeeklyPieCharts /> 
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}