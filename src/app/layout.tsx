import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { NavLinks } from "@/components/nav-links";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stabi dashboard",
  description: "Stabi stable yield strategy layer portfolio overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(circle_at_top_left,#1f2937_0,#020617_35%,#020617_65%,#020617_95%)] text-slate-50`}
      >
        <Providers>
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-6 pt-4 md:px-10">
            <header className="relative z-[9998] flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/90 px-5 py-3 shadow-[0_0_40px_rgba(15,23,42,0.95)] backdrop-blur-xl md:px-6">
              <div className="flex items-center gap-6">
                <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105">
                  {/* Professional Logo */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-emerald-400 opacity-30 blur-lg"></div>
                    <svg className="relative h-9 w-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Shield background */}
                      <path
                        d="M20 2L6 8v10c0 8.5 5.5 16.5 14 18.5 8.5-2 14-10 14-18.5V8L20 2z"
                        fill="url(#shield-gradient)"
                        className="drop-shadow-[0_2px_8px_rgba(56,189,248,0.5)]"
                      />
                      {/* Upward trend line */}
                      <path
                        d="M12 24l4-4 3 3 7-9"
                        stroke="#0f172a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-sm"
                      />
                      <circle cx="26" cy="14" r="2" fill="#0f172a" />
                      <defs>
                        <linearGradient id="shield-gradient" x1="6" y1="2" x2="34" y2="38.5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#38bdf8" />
                          <stop offset="0.5" stopColor="#6366f1" />
                          <stop offset="1" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="hidden flex-col leading-tight sm:flex">
                    <span className="text-[17px] font-bold tracking-tight text-slate-50">
                      Stabi
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Stable Yield Protocol
                    </span>
                  </div>
                </Link>
                
                <div className="hidden h-8 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent md:block"></div>
                
                <NavLinks />
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-xl border border-slate-800/60 bg-slate-900/60 px-3 py-1.5 text-[11px] font-medium shadow-inner backdrop-blur md:flex">
                  <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  <span className="text-slate-300">Sepolia</span>
                  <span className="text-[10px] text-slate-500">TESTNET</span>
                </div>
                <Link
                  href="/portfolio"
                  className="hidden items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-[13px] font-medium text-slate-300 shadow-inner backdrop-blur transition-colors hover:border-slate-600 hover:bg-slate-800/60 hover:text-slate-100 md:flex"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>My Portfolio</span>
                </Link>
                <ConnectWalletButton />
              </div>
            </header>

            <main className="mt-5 flex flex-1 flex-col">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
