import type { Metadata } from "next";

type PoolDetailPageProps = {
  params: Promise<{ poolId: string }>;
};

export async function generateMetadata({ params }: PoolDetailPageProps): Promise<Metadata> {
  const { poolId } = await params;

  return {
    title: `Stabi pool · ${poolId}`,
  };
}

export default async function PoolDetailPage({ params }: PoolDetailPageProps) {
  const { poolId } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-4 py-12">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Strategy pool: {poolId}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          This page will show a summary of pool assets, historical performance, underlying protocol allocation, and deposit/withdraw actions.
        </p>
      </section>
    </main>
  );
}
