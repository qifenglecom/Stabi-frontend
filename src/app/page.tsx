"use client";

import Link from "next/link";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

function RevealSection({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="transition-opacity duration-1000 ease-out"
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setHeroVisible(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-14 text-slate-50">
      {/* Hero */}
      <section
        className="grid gap-12 pt-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-center transition-opacity duration-800 ease-out"
        style={{ opacity: heroVisible ? 1 : 0 }}
      >
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 text-[12px] font-semibold text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.45)]">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <span>Stable yield strategies for everyday users</span>
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-[3rem] font-bold leading-[1.1] tracking-tight text-slate-50 md:text-[3.8rem]">
              Put your stablecoins to work, without DeFi headaches
            </h1>
            <p className="max-w-xl text-[17px] leading-relaxed text-slate-300">
              Stabi routes your stablecoins into curated, risk-managed strategies
              so you can earn steady yield without learning every DeFi primitive
              or chasing farms all day.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href="/app"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 px-7 py-3.5 text-[15px] font-bold text-slate-950 shadow-[0_22px_55px_rgba(56,189,248,0.55)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(56,189,248,0.75)] hover:brightness-110"
            >
              Launch app
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-slate-300 transition-colors hover:text-slate-50"
            >
              Learn how it works
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-5 border-l-2 border-slate-700 pl-5 text-[12px] text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Battle-tested DeFi protocols</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>
              <span>Non-custodial · You stay in control</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -translate-y-4 scale-110 rounded-[32px] bg-gradient-to-br from-sky-500/35 via-indigo-500/25 to-emerald-400/20 opacity-80 blur-3xl animate-pulse" />
          <div className="relative rounded-[28px] border border-slate-500/40 bg-slate-900/80 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.95)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(15,23,42,0.98)]">
            <div className="flex items-center justify-between text-xs text-slate-200">
              <span className="font-medium">Stabi strategy snapshot</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                Demo data
              </span>
            </div>

            <div className="mt-5 grid gap-4 text-[0.78rem] md:grid-cols-3">
              <div className="group rounded-2xl bg-slate-900/90 p-5 ring-1 ring-slate-600/70 transition-all duration-300 hover:-translate-y-1 hover:ring-emerald-400/70 hover:shadow-[0_12px_40px_rgba(52,211,153,0.25)]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <div className="text-[13px] font-semibold text-slate-200">Conservative</div>
                </div>
                <p className="mt-3 text-[22px] font-bold text-emerald-300">
                  3–5% APY
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
                  Aave-first lending exposure for capital preservation.
                </p>
              </div>

              <div className="group rounded-2xl bg-slate-900/90 p-5 ring-1 ring-slate-600/70 transition-all duration-300 hover:-translate-y-1 hover:ring-sky-400/70 hover:shadow-[0_12px_40px_rgba(56,189,248,0.25)]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <div className="text-[13px] font-semibold text-slate-200">Balanced</div>
                </div>
                <p className="mt-3 text-[22px] font-bold text-sky-300">
                  5–8% APY
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
                  Mix of lending and stable LP for moderate yield and risk.
                </p>
              </div>

              <div className="group rounded-2xl bg-slate-900/90 p-5 ring-1 ring-slate-600/70 transition-all duration-300 hover:-translate-y-1 hover:ring-fuchsia-400/70 hover:shadow-[0_12px_40px_rgba(217,70,239,0.25)]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                  <div className="text-[13px] font-semibold text-slate-200">Aggressive</div>
                </div>
                <p className="mt-3 text-[22px] font-bold text-fuchsia-300">
                  8%+ APY
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
                  Higher-volatility strategies for yield-maximizing users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Stabi */}
      <RevealSection>
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <h2 className="text-[1.6rem] font-bold tracking-tight text-slate-50">
            Why Stabi?
          </h2>
          <p className="max-w-xl text-[16px] leading-relaxed text-slate-300">
            Most people don&apos;t have time to learn every lending protocol,
            yield farm, or risk parameter. Stabi abstracts away on-chain
            complexity into a simple set of curated strategies.
          </p>
        </div>

        <div className="grid gap-5 text-[13px] md:grid-cols-3">
          <div className="space-y-2 rounded-2xl bg-slate-900/70 p-5 ring-1 ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:ring-sky-400/70 hover:shadow-[0_12px_40px_rgba(56,189,248,0.2)]">
            <div className="text-[12px] font-bold uppercase tracking-wide text-sky-300">
              Designed for newcomers
            </div>
            <p className="text-[14px] leading-relaxed text-slate-300">
              Clear strategy choices, no jargon. Start with one pool and scale
              up as you get comfortable.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-slate-900/70 p-5 ring-1 ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:ring-emerald-400/70 hover:shadow-[0_12px_40px_rgba(52,211,153,0.2)]">
            <div className="text-[12px] font-bold uppercase tracking-wide text-emerald-300">
              Risk-managed
            </div>
            <p className="text-[14px] leading-relaxed text-slate-300">
              Focus on blue-chip protocols and diversified stablecoin
              exposures, with transparent risk tiers.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-slate-900/70 p-5 ring-1 ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:ring-fuchsia-400/70 hover:shadow-[0_12px_40px_rgba(217,70,239,0.2)]">
            <div className="text-[12px] font-bold uppercase tracking-wide text-fuchsia-300">
              Non-custodial
            </div>
            <p className="text-[14px] leading-relaxed text-slate-300">
              Funds stay in your wallet and smart contracts. Connect,
              allocate, and withdraw whenever you want.
            </p>
          </div>
        </div>
        </section>
      </RevealSection>

      {/* Strategy overview */}
      <RevealSection>
        <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.6rem] font-bold tracking-tight text-slate-50">
            Strategy pools
          </h2>
          <Link
            href="/pools"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-sky-300 transition-colors hover:text-sky-200"
          >
            Explore all pools
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl bg-slate-900/80 p-6 ring-1 ring-slate-700/70 transition-transform duration-300 hover:-translate-y-1 hover:ring-emerald-400/70">
            <div>
              <div className="flex items-center justify-between text-[0.8rem] text-slate-200">
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-400">
                  Conservative
                </span>
                <span className="text-[11px] text-slate-400">Target: safety</span>
              </div>
              <h3 className="mt-3 text-[1.02rem] font-semibold text-slate-50">
                Aave-first lending
              </h3>
              <p className="mt-3 text-[14px] leading-snug text-slate-200/90">
                For cash reserves and short-term funds that can&apos;t afford
                big drawdowns.
              </p>
            </div>
            <Link
              href="/pools/conservative"
              className="mt-5 text-[0.8rem] font-medium text-emerald-300 transition-colors hover:text-emerald-200"
            >
              View in app →
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-slate-900/80 p-6 ring-1 ring-slate-700/70 transition-transform duration-300 hover:-translate-y-1 hover:ring-sky-400/70">
            <div>
              <div className="flex items-center justify-between text-[0.8rem] text-slate-200">
                <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[10px] text-sky-400">
                  Balanced
                </span>
                <span className="text-[11px] text-slate-400">
                  Target: yield & stability
                </span>
              </div>
              <h3 className="mt-3 text-[1.02rem] font-semibold text-slate-50">
                Lending + stable LP
              </h3>
              <p className="mt-3 text-[14px] leading-snug text-slate-200/90">
                For medium-term capital seeking higher yield with moderate
                volatility.
              </p>
            </div>
            <Link
              href="/pools/balanced"
              className="mt-5 text-[0.8rem] font-medium text-sky-300 transition-colors hover:text-sky-200"
            >
              View in app →
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-slate-900/80 p-6 ring-1 ring-slate-700/70 transition-transform duration-300 hover:-translate-y-1 hover:ring-fuchsia-400/70">
            <div>
              <div className="flex items-center justify-between text-[0.8rem] text-slate-200">
                <span className="rounded-full bg-fuchsia-500/10 px-2.5 py-0.5 text-[10px] text-fuchsia-400">
                  Aggressive
                </span>
                <span className="text-[11px] text-slate-400">
                  Target: higher APY
                </span>
              </div>
              <h3 className="mt-3 text-[1.02rem] font-semibold text-slate-50">
                Yield farming blend
              </h3>
              <p className="mt-3 text-[14px] leading-snug text-slate-200/90">
                For users comfortable with drawdowns in exchange for
                higher upside.
              </p>
            </div>
            <Link
              href="/pools/aggressive"
              className="mt-5 text-[0.8rem] font-medium text-fuchsia-300 transition-colors hover:text-fuchsia-200"
            >
              View in app →
            </Link>
          </div>
        </div>
        </section>
      </RevealSection>

      {/* How it works */}
      <RevealSection>
        <section
          id="how-it-works"
          className="mt-2 grid gap-10 rounded-3xl bg-slate-900/70 p-7 ring-1 ring-slate-700/70 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)] md:p-8"
        >
        <div className="space-y-4">
          <h2 className="text-[1.6rem] font-bold tracking-tight text-slate-50">
            How Stabi works
          </h2>
          <p className="max-w-xl text-[16px] leading-relaxed text-slate-300">
            Under the hood, Stabi uses vaults and strategies that plug into
            blue-chip DeFi protocols. You choose a pool, we handle routing,
            rebalancing, and monitoring.
          </p>
        </div>

        <div className="grid gap-5 text-[13px] md:grid-cols-3">
          <div className="space-y-2 rounded-2xl bg-slate-950/80 p-5 ring-1 ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:ring-sky-400/70">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-[11px] font-bold text-sky-300">
                1
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-sky-300">
                Step 1
              </div>
            </div>
            <p className="font-semibold text-slate-100">
              Connect wallet & choose a pool
            </p>
            <p className="text-[14px] leading-relaxed text-slate-400">
              Start with a conservative strategy using assets you already
              hold.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-slate-950/80 p-5 ring-1 ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:ring-emerald-400/70">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-bold text-emerald-300">
                2
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-300">
                Step 2
              </div>
            </div>
            <p className="font-semibold text-slate-100">
              Smart contracts allocate capital
            </p>
            <p className="text-[14px] leading-relaxed text-slate-400">
              Funds are deposited into on-chain vaults and underlying
              protocols.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-slate-950/80 p-5 ring-1 ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:ring-fuchsia-400/70">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-500/20 text-[11px] font-bold text-fuchsia-300">
                3
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-fuchsia-300">
                Step 3
              </div>
            </div>
            <p className="font-semibold text-slate-100">
              Monitor, rebalance, withdraw
            </p>
            <p className="text-[14px] leading-relaxed text-slate-400">
              Track performance in the app and exit whenever you&apos;re
              ready.
            </p>
          </div>
        </div>
        </section>
      </RevealSection>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/50 pt-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand Column */}
          <div className="space-y-4">
            <Logo showText={true} />
            <p className="max-w-xs text-[13px] leading-relaxed text-slate-400">
              Simplified yield strategies for stablecoins. Earn steady returns without DeFi complexity.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://twitter.com/stabi" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com/stabi-protocol" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="https://discord.gg/stabi" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400">Product</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/app" className="text-slate-400 transition-colors hover:text-slate-200">
                  Strategy Pools
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-slate-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-slate-200">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-slate-200">
                  Audit Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Developers Column */}
          <div className="space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400">Developers</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="https://github.com/stabi-protocol" target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-slate-200">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-slate-200">
                  Smart Contracts
                </a>
              </li>
              <li>
                <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-slate-200">
                  Etherscan
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-slate-200">
                  Bug Bounty
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400">Community</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="https://discord.gg/stabi" target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-slate-200">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://twitter.com/stabi" target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-slate-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 transition-colors hover:text-slate-200">
                  Forum
                </a>
              </li>
              <li>
                <a href="mailto:hello@stabi.finance" className="text-slate-400 transition-colors hover:text-slate-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/50 pt-8 text-[12px] text-slate-500 md:flex-row">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Stabi Protocol. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-slate-300">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-slate-300">Risk Disclosure</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
