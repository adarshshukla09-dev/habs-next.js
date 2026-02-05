"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, CheckCircle2, ListChecks, Sparkles, Clock } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const handleGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#020617] text-slate-200 overflow-hidden flex items-center justify-center px-4">
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] -right-[5%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 max-w-6xl w-full items-center">
        
        {/* Left Side: Todo App Teaser */}
        <div className="hidden lg:flex flex-col space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <Sparkles size={14} />
              <span>Organize your life in seconds</span>
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master your day, <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">one task at a time.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-md leading-relaxed">
              The minimalist todo app designed to help you focus on what actually matters. No clutter, just productivity.
            </p>
          </div>

          {/* Interactive-looking Task Preview */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 opacity-50 line-through">
                  <div className="h-5 w-5 rounded border border-white/20 flex items-center justify-center bg-emerald-500 border-none">
                    <CheckCircle2 size={14} className="text-[#020617]" />
                  </div>
                  <span className="text-sm">Design the new landing page</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded border border-white/30" />
                  <span className="text-sm">Refactor authentication flow</span>
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Priority</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded border border-white/30" />
                  <span className="text-sm">Meet with the product team</span>
                  <Clock size={14} className="ml-auto text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] text-slate-200 border-t-white/20">
            <CardHeader className="text-center space-y-4 pt-10">
              <div className="mx-auto h-16 w-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3">
                <ListChecks className="text-[#020617]" size={32} />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-3xl font-bold text-white tracking-tight">Welcome back</CardTitle>
                <CardDescription className="text-slate-400 text-base">
                  Ready to check some boxes?
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 pb-12 px-10">
              <Button 
                variant="outline" 
                onClick={handleGoogle} 
                className="w-full h-14 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white rounded-2xl transition-all text-base font-medium group"
              >
                <svg className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">or</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <Button 
                variant="outline" 
                onClick={handleGithub} 
                className="w-full h-14 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white rounded-2xl transition-all text-base font-medium group"
              >
                <Github className="mr-3 h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                Continue with GitHub
              </Button>

              <p className="text-center text-[11px] text-slate-500 mt-6 leading-relaxed">
                By logging in, you agree to our 
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors mx-1 underline underline-offset-4">Terms of Service</a> 
                and 
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors ml-1 underline underline-offset-4">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  );
}