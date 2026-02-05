"use client";
import React from "react";
import {
  CalendarIcon,
  LayoutDashboard,
  LogOut,
  ListTodo,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
// 1. Import usePathname
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "./ui/spinner";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  // 2. Initialize pathname
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  // 3. Helper function to determine if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between w-full max-w-6xl px-4 py-2.5 bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CalendarIcon size={20} className="text-slate-900 stroke-[2.5px]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
            Flow<span className="text-emerald-500">.</span>
          </span>
        </div>

        {/* Navigation */}
        {session && (
          <div className="flex items-center gap-1 md:gap-4">
            <Link href="/">
              <button 
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all rounded-lg 
                  ${isActive("/") 
                    ? "text-emerald-400 bg-emerald-400/10" 
                    : "text-slate-400 hover:text-emerald-400 hover:bg-white/5"}`}
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </button>
            </Link>

            <Link href="/Todo">
              <button 
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all rounded-lg 
                  ${isActive("/Todo") 
                    ? "text-emerald-400 bg-emerald-400/10" 
                    : "text-slate-400 hover:text-emerald-400 hover:bg-white/5"}`}
              >
                <ListTodo size={18} />
                <span className="hidden md:inline">Todo</span>
              </button>
            </Link>
          </div>
        )}

        {/* Auth / User Section */}
        <div className="flex items-center gap-2">
          {isPending ? (
            <Spinner />
          ) : session ? (
            <>
              <div className="hidden sm:flex flex-col items-end mr-2">
                <p className="text-[12px] font-medium text-white leading-none">
                  {session.user.name}
                </p>
                <p className="text-[10px] text-slate-500">Active</p>
              </div>

              <div className="h-6 w-px bg-white/10 mx-1" />

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;