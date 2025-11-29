"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();

  const isOverview = pathname === "/";
  const isApp = pathname === "/app";

  return (
    <nav className="hidden items-center gap-2 text-[13px] font-medium md:flex">
      <Link
        href="/"
        className={
          isOverview
            ? "group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 px-4 py-2 text-slate-50 ring-1 ring-sky-400/50 transition-all hover:ring-sky-400/70 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            : "group relative overflow-hidden rounded-xl px-4 py-2 text-slate-400 transition-all hover:bg-slate-800/50 hover:text-slate-200 hover:shadow-[0_0_15px_rgba(15,23,42,0.5)]"
        }
      >
        <span className="relative z-10">Overview</span>
        {isOverview && (
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
        )}
      </Link>
      <Link
        href="/app"
        className={
          isApp
            ? "group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 px-4 py-2 text-slate-50 ring-1 ring-sky-400/50 transition-all hover:ring-sky-400/70 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            : "group relative overflow-hidden rounded-xl px-4 py-2 text-slate-400 transition-all hover:bg-slate-800/50 hover:text-slate-200 hover:shadow-[0_0_15px_rgba(15,23,42,0.5)]"
        }
      >
        <span className="relative z-10">Strategy Pools</span>
        {isApp && (
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
        )}
      </Link>
    </nav>
  );
}
