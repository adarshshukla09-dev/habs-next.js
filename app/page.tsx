import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* 1. Ambient Background Effects (Matching your Home page) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] -right-[5%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      

      {/* 3. Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto pt-20 md:pt-32 px-6 pb-24 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
          <Sparkles size={14} />
          <span>Now in Early Access</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Master your time. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            Find your flow.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          The minimal, data-driven productivity suite designed to visualize your 
          progress and keep you in the zone. 
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link href="/Todo" className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#020617] font-bold rounded-2xl transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            Start Your Journey
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        
        </div>

        {/* 4. Dashboard Preview (Similar to your section styling) */}
        <section id="preview" className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
          
          <div className="relative bg-[#020617]/60 border border-white/10 rounded-[2.5rem] p-2 backdrop-blur-3xl shadow-2xl">
            <div className="bg-[#020617] rounded-[2.3rem] overflow-hidden border border-white/5 aspect-video flex items-center justify-center group">
               {/* Replace with an actual screenshot or interactive mock */}
               <div className="text-center">
                 <div className="flex justify-center gap-4 mb-6">
                    <div className="h-32 w-32 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin-slow" />
                 </div>
<img 
  src="/Dashboard.png" 
  width={1200} // Increased for better quality on larger screens
  height={800} 
  alt="Dashboard Preview"
  className="rounded-[2rem] border border-white/10 shadow-2xl" 
/>               </div>
            </div>
          </div>
        </section>

        {/* 5. Quick Features */}
        <section id="features" className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { title: 'Weekly Scroller', desc: 'A horizontal, frictionless way to manage your upcoming tasks.' },
            { title: 'Live Insights', desc: 'Real-time data visualization of your productivity trends.' },
            { title: 'Zen Interface', desc: 'A dark, focused environment built to reduce cognitive load.' }
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/[0.07] transition-all">
              <CheckCircle2 className="text-emerald-500 mb-4" size={24} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
           <p className="text-slate-500 text-sm">© 2024 Flow Productivity. All rights reserved.</p>
           <div className="flex gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Github</a>
           </div>
        </div>
      </footer>
    </div>
  );
}