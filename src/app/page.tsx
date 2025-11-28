export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-9 text-slate-100">
      <section className="grid gap-7 pt-1 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.3fr)]">
        <div className="space-y-4">
          <div>
            <h1 className="text-[2.8rem] font-semibold tracking-tight text-slate-50 md:text-[3.1rem]">
              Portfolio overview
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] text-slate-200/90">
              Monitor stablecoin positions, track risk-adjusted yield, and route liquidity
              across Stabi strategy pools.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-600/70 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[0_18px_44px_rgba(15,23,42,0.9)] p-5 backdrop-blur-md">
              <div className="flex items-center justify-between text-[0.72rem] text-slate-300">
                <span>Total value</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                  test data
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">$0.00</p>
              <p className="mt-1 text-[0.72rem] text-slate-200/90">Aggregated across all connected pools.</p>
            </div>

            <div className="rounded-2xl border border-slate-600/70 bg-slate-850 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-[0.72rem] text-slate-300">
                <span>Net APY</span>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">0.00%</p>
              <p className="mt-1 text-[0.72rem] text-slate-200/90">Net of fees and rebalancing.</p>
            </div>

            <div className="rounded-2xl border border-slate-600/70 bg-slate-850 p-4">
              <div className="flex items-center justify-between text-[0.72rem] text-slate-300">
                <span>Active pools</span>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">3</p>
              <p className="mt-1 text-[0.72rem] text-slate-200/90">Conservative, balanced, and aggressive.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-600/70 bg-slate-900/90 p-4 backdrop-blur">
          <div className="flex items-center justify-between text-xs text-slate-200">
            <span>Allocation preview</span>
            <span className="text-[10px] uppercase tracking-wide text-slate-400">
              mock data
            </span>
          </div>
          <div className="mt-4 flex h-32 items-end gap-2">
            <div
              className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-500/80 via-indigo-400/80 to-sky-400/80 shadow-[0_16px_35px_rgba(79,70,229,0.9)]"
              style={{ height: "55%" }}
            />
            <div
              className="flex-1 rounded-t-lg bg-gradient-to-t from-sky-500/80 via-sky-400/80 to-cyan-300/80 shadow-[0_16px_35px_rgba(56,189,248,0.9)]"
              style={{ height: "35%" }}
            />
            <div
              className="flex-1 rounded-t-lg bg-gradient-to-t from-fuchsia-500/80 via-fuchsia-400/80 to-rose-300/80 shadow-[0_16px_35px_rgba(217,70,239,0.8)]"
              style={{ height: "20%" }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-slate-200">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="rounded-3xl bg-slate-900/50 ring-1 ring-slate-700/70 shadow-[0_34px_90px_rgba(15,23,42,0.97)] px-5 py-6 md:px-7 md:py-7 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.05rem] font-semibold tracking-tight text-slate-50">
              Strategy pools
            </h2>
            <a
              href="/pools"
              className="text-[0.8rem] font-medium text-indigo-300 hover:text-indigo-200"
            >
              View all pools
            </a>
          </div>

          <div className="mt-6 grid gap-7 md:grid-cols-3">
          <a
            href="/pools/conservative"
            className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 ring-0 ring-indigo-500/0 shadow-[0_28px_64px_rgba(15,23,42,0.97)] transition hover:-translate-y-1.5 hover:border-indigo-500/70 hover:ring-2"
          >
            <div>
              <div className="flex items-center justify-between text-[0.8rem] text-slate-200">
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-400">
                  Conservative
                </span>
                <span className="text-[11px] text-slate-300">Target: stable yield</span>
              </div>
              <h3 className="mt-3 text-[1.05rem] font-semibold text-slate-50">
                Aave-first lending
              </h3>
              <p className="mt-3 text-[16px] leading-snug text-slate-100/90">
                Blue-chip lending exposure for capital preservation with predictable returns.
              </p>
            </div>
            <div className="mt-6 flex items-baseline justify-between text-[0.9rem] text-slate-200">
              <span>Model APY</span>
              <span className="text-sm font-semibold text-emerald-400">0.0% · low risk</span>
            </div>
          </a>

          <a
            href="/pools/balanced"
            className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 ring-0 ring-indigo-500/0 shadow-[0_28px_64px_rgba(15,23,42,0.97)] transition hover:-translate-y-1.5 hover:border-indigo-500/70 hover:ring-2"
          >
            <div>
              <div className="flex items-center justify-between text-[0.8rem] text-slate-200">
                <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[10px] text-sky-400">
                  Balanced
                </span>
                <span className="text-[11px] text-slate-300">Target: yield & stability</span>
              </div>
              <h3 className="mt-3 text-[1.05rem] font-semibold text-slate-50">Lending + stable LP</h3>
              <p className="mt-3 text-[16px] leading-snug text-slate-100/90">
                Mix of lending and stablecoin LP exposure for moderate risk-adjusted returns.
              </p>
            </div>
            <div className="mt-6 flex items-baseline justify-between text-[0.9rem] text-slate-200">
              <span>Model APY</span>
              <span className="text-sm font-semibold text-sky-400">0.0% · medium risk</span>
            </div>
          </a>

          <a
            href="/pools/aggressive"
            className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 ring-0 ring-indigo-500/0 shadow-[0_28px_64px_rgba(15,23,42,0.97)] transition hover:-translate-y-1.5 hover:border-indigo-500/70 hover:ring-2"
          >
            <div>
              <div className="flex items-center justify-between text-[0.8rem] text-slate-200">
                <span className="rounded-full bg-fuchsia-500/10 px-2.5 py-0.5 text-[10px] text-fuchsia-400">
                  Aggressive
                </span>
                <span className="text-[11px] text-slate-300">Target: higher APY</span>
              </div>
              <h3 className="mt-3 text-[1.05rem] font-semibold text-slate-50">
                Yield farming blend
              </h3>
              <p className="mt-3 text-[16px] leading-snug text-slate-100/90">
                Higher-volatility strategies for users comfortable with drawdowns and rotation.
              </p>
            </div>
            <div className="mt-6 flex items-baseline justify-between text-[0.9rem] text-slate-200">
              <span>Model APY</span>
              <span className="text-sm font-semibold text-fuchsia-400">0.0% · higher risk</span>
            </div>
          </a>
          </div>
        </div>
      </section>

      <section className="mt-7 grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-[0_20px_46px_rgba(15,23,42,0.9)] backdrop-blur-sm">
          <div className="flex items-center justify-between text-[0.8rem] text-slate-200">
            <h3 className="text-[0.95rem] font-semibold text-slate-100">Recent activity</h3>
            <span className="text-[11px] text-slate-400">Mock data</span>
          </div>
          <div className="space-y-3 text-[0.8rem] text-slate-100/90">
            <div className="flex items-start justify-between rounded-xl bg-slate-900/80 px-3 py-2.5">
              <div>
                <p className="font-medium text-slate-100">Rebalanced conservative pool</p>
                <p className="text-[11px] text-slate-400">Shifted 5% from Aave to Compound for yield optimization.</p>
              </div>
              <span className="ml-3 whitespace-nowrap text-[11px] text-slate-400">2h ago</span>
            </div>
            <div className="flex items-start justify-between rounded-xl bg-slate-900/80 px-3 py-2.5">
              <div>
                <p className="font-medium text-slate-100">Yield update · balanced pool</p>
                <p className="text-[11px] text-slate-400">APY model refreshed with latest on-chain rates.</p>
              </div>
              <span className="ml-3 whitespace-nowrap text-[11px] text-slate-400">6h ago</span>
            </div>
            <div className="flex items-start justify-between rounded-xl bg-slate-900/80 px-3 py-2.5">
              <div>
                <p className="font-medium text-slate-100">New opportunity scanned</p>
                <p className="text-[11px] text-slate-400">Identified higher APY stable LP for aggressive strategies.</p>
              </div>
              <span className="ml-3 whitespace-nowrap text-[11px] text-slate-400">1d ago</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-[0_20px_46px_rgba(15,23,42,0.9)] backdrop-blur-sm">
          <div className="flex items-center justify-between text-[0.8rem] text-slate-300">
            <h3 className="text-[0.95rem] font-semibold text-slate-100">Risk breakdown</h3>
            <span className="text-[11px] text-slate-400">By allocation tier</span>
          </div>
          <div className="space-y-3 text-[0.8rem] text-slate-300/90">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-slate-300">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Conservative
                </span>
                <span className="text-[11px] text-slate-400">55%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[55%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-slate-300">
                  <span className="inline-flex h-2 w-2 rounded-full bg-sky-400" />
                  Balanced
                </span>
                <span className="text-[11px] text-slate-400">30%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-slate-300">
                  <span className="inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
                  Aggressive
                </span>
                <span className="text-[11px] text-slate-400">15%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[15%] rounded-full bg-gradient-to-r from-fuchsia-400 to-rose-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 border-t border-slate-800/70 pt-6 text-sm text-slate-400">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-slate-900/80 text-xs font-semibold text-slate-100">
                S
              </span>
              <span className="text-sm font-medium text-slate-100">Stabi Labs</span>
            </div>
            <p className="text-xs text-slate-500">Stability-focused yield strategies for stablecoin treasuries.</p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs md:text-[0.8rem]">
            <div className="space-y-1">
              <div className="text-slate-300">Product</div>
              <a href="#" className="block text-slate-400 hover:text-slate-100">
                Overview
              </a>
              <a href="#" className="block text-slate-400 hover:text-slate-100">
                Strategy pools
              </a>
            </div>
            <div className="space-y-1">
              <div className="text-slate-300">Resources</div>
              <a href="#" className="block text-slate-400 hover:text-slate-100">
                Docs
              </a>
              <a href="#" className="block text-slate-400 hover:text-slate-100">
                API reference
              </a>
            </div>
            <div className="space-y-1">
              <div className="text-slate-300">Community</div>
              <a href="#" className="block text-slate-400 hover:text-slate-100">
                Twitter
              </a>
              <a href="#" className="block text-slate-400 hover:text-slate-100">
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-2 border-t border-slate-900/80 pt-3 text-[11px] text-slate-500 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Stabi Labs. All rights reserved.</span>
          <div className="flex gap-3">
            <a href="#" className="hover:text-slate-300">
              Terms
            </a>
            <a href="#" className="hover:text-slate-300">
              Privacy
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
