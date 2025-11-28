import { ConnectWalletButton } from "@/components/connect-wallet-button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-8 py-9 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800/70 pb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/80 ring-2 ring-indigo-400/40">
            <span className="text-sm font-semibold tracking-tight">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              Stabi
            </span>
            <span className="text-xs text-slate-400">
              Stable yield strategy layer
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-slate-400 sm:inline">
            Network: Sepolia (testnet)
          </span>
          <ConnectWalletButton />
        </div>
      </header>

      <section className="grid gap-6 pt-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-50 md:text-[2.75rem]">
              Portfolio overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Monitor stablecoin positions, track risk-adjusted yield, and route liquidity
              across Stabi strategy pools.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.9)] backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total value</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                  test data
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight">$0.00</p>
              <p className="mt-1 text-xs text-slate-500">Aggregated across all connected pools.</p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Net APY</span>
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight">0.00%</p>
              <p className="mt-1 text-xs text-slate-500">Net of fees and rebalancing.</p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active pools</span>
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight">3</p>
              <p className="mt-1 text-xs text-slate-500">Conservative, balanced, and aggressive.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Allocation preview</span>
            <span className="text-[10px] uppercase tracking-wide text-slate-500">
              mock data
            </span>
          </div>
          <div className="mt-4 flex h-32 items-end gap-2">
            <div className="flex-1 rounded-t-lg bg-indigo-500/70" style={{ height: "55%" }} />
            <div className="flex-1 rounded-t-lg bg-sky-500/70" style={{ height: "35%" }} />
            <div className="flex-1 rounded-t-lg bg-fuchsia-500/70" style={{ height: "20%" }} />
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-slate-400">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>
      </section>

      <section className="mt-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-tight text-slate-200">
            Strategy pools
          </h2>
          <a
            href="/pools"
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
          >
            View all pools
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <a
            href="/pools/conservative"
            className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 p-5 ring-0 ring-indigo-500/0 shadow-[0_16px_40px_rgba(15,23,42,0.9)] transition hover:-translate-y-0.5 hover:border-indigo-500/70 hover:ring-2"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                  Conservative
                </span>
                <span className="text-[11px] text-slate-500">Target: stable yield</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-50">
                Aave-first lending
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Blue-chip lending exposure for capital preservation with predictable returns.
              </p>
            </div>
            <div className="mt-4 flex items-baseline justify-between text-xs text-slate-400">
              <span>Model APY</span>
              <span className="text-sm font-semibold text-emerald-400">0.0% · low risk</span>
            </div>
          </a>

          <a
            href="/pools/balanced"
            className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 p-5 ring-0 ring-indigo-500/0 shadow-[0_16px_40px_rgba(15,23,42,0.9)] transition hover:-translate-y-0.5 hover:border-indigo-500/70 hover:ring-2"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] text-sky-400">
                  Balanced
                </span>
                <span className="text-[11px] text-slate-500">Target: yield & stability</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-50">Lending + stable LP</h3>
              <p className="mt-2 text-xs text-slate-400">
                Mix of lending and stablecoin LP exposure for moderate risk-adjusted returns.
              </p>
            </div>
            <div className="mt-4 flex items-baseline justify-between text-xs text-slate-400">
              <span>Model APY</span>
              <span className="text-sm font-semibold text-sky-400">0.0% · medium risk</span>
            </div>
          </a>

          <a
            href="/pools/aggressive"
            className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 p-5 ring-0 ring-indigo-500/0 shadow-[0_16px_40px_rgba(15,23,42,0.9)] transition hover:-translate-y-0.5 hover:border-indigo-500/70 hover:ring-2"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[10px] text-fuchsia-400">
                  Aggressive
                </span>
                <span className="text-[11px] text-slate-500">Target: higher APY</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-50">
                Yield farming blend
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Higher-volatility strategies for users comfortable with drawdowns and rotation.
              </p>
            </div>
            <div className="mt-4 flex items-baseline justify-between text-xs text-slate-400">
              <span>Model APY</span>
              <span className="text-sm font-semibold text-fuchsia-400">0.0% · higher risk</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
