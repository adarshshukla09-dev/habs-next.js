import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Components
import Navbar from "@/components/Navbar";
import Week from "@/components/todo/Week";
import WeeklyPieCharts from "@/components/todo/weekComplete";

export default async function Home() {
  // 1. Server-side session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* 1. Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-[15%] h-125 w-[500px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] -right-[5%] h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      {/* 2. The Floating Navbar (Client Component) */}
      <Navbar />

      {/* 3. Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto pt-24 md:pt-32 px-4 sm:px-8 lg:px-12 pb-24">
        
        {/* Welcome Header */}
        <div className="mb-12 px-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Welcome back, <span className="text-emerald-400">{session.user.name}</span>
          </h1>
          <p className="text-slate-400 mt-2">Here is what's happening with your flow today.</p>
        </div>

        {/* 4. The Week Scroller Card */}
        <section className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-[#020617]/40 rounded-[2.3rem] p-4 sm:p-8">
              <Week />
            </div>
          </div>
        </section>

        {/* 5. Performance Analytics Section */}
        <section className="space-y-8">
          <div className="flex items-end justify-between px-2">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Monthly Insights</h2>
              <p className="text-slate-500 text-sm">Visualizing your productivity trends</p>
            </div>
            <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-[0.15em]">
              Live Data
            </div>
          </div>

          <div className="relative group">
            {/* Interactive Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative bg-[#020617]/60 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl">
              <WeeklyPieCharts /> 
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}