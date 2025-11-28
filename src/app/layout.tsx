import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
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
            <header className="flex items-center justify-between rounded-full border border-slate-800/70 bg-slate-950/80 px-4 py-2 shadow-[0_0_32px_rgba(15,23,42,0.85)] backdrop-blur-md md:px-5">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 text-sm font-semibold tracking-tight text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.55)] ring-2 ring-sky-500/40">
                    S
                  </div>
                  <div className="hidden flex-col leading-tight sm:flex">
                    <span className="text-sm font-semibold tracking-tight text-slate-50">
                      Stabi
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Stable yield strategy layer
                    </span>
                  </div>
                </Link>
                <nav className="ml-2 hidden items-center gap-4 text-xs font-medium text-slate-400 md:flex">
                  <Link
                    href="/"
                    className="rounded-full bg-slate-900/70 px-3 py-1 text-slate-100 shadow-[0_0_18px_rgba(15,23,42,0.9)] ring-1 ring-indigo-500/60"
                  >
                    Overview
                  </Link>
                  <Link
                    href="/pools"
                    className="rounded-full px-3 py-1 text-slate-400 transition hover:text-slate-50"
                  >
                    Strategy pools
                  </Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-1 rounded-full border border-slate-800/80 bg-slate-950/80 px-2 py-1 text-[11px] text-slate-400 shadow-[0_0_20px_rgba(15,23,42,0.9)] backdrop-blur md:flex">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
                  <span>Sepolia</span>
                  <span className="text-slate-500">testnet</span>
                </div>
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
