export default function PoolsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Strategy pools</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Browse Stabi pools across different risk tiers: conservative, balanced, and aggressive.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-medium">Conservative pool</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Primarily blue-chip lending protocols such as Aave, targeting stable yield.</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-medium">Balanced pool</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Combination of lending and stablecoin LP positions with moderate risk and return.</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-medium">Aggressive pool</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Higher APY with more complex strategies and greater volatility.</p>
        </div>
      </section>
    </main>
  );
}
