"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";

import { contracts as sepoliaContracts } from "@/config/contracts/sepolia";
import vaultArtifact from "@/abis/stabi/vault.json";
import { DepositWithdrawModal } from "@/components/deposit-withdraw-modal";

const vaultAbi = (vaultArtifact as any).abi ?? (vaultArtifact as any);

type StrategyKey = "conservative" | "balanced" | "aggressive";

type VaultConfig = {
  vault: `0x${string}`;
  asset: `0x${string}`;
  name: string;
  symbol: string;
  key: string;
  index: number;
};

export default function AppPage() {
  const { address } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [selectedStrategy, setSelectedStrategy] =
    useState<StrategyKey>("conservative");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"deposit" | "withdraw">("deposit");
  const [selectedVault, setSelectedVault] = useState<VaultConfig | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenModal = (vault: VaultConfig, mode: "deposit" | "withdraw") => {
    setSelectedVault(vault);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVault(null);
  };

  const conservativeVaults = sepoliaContracts.conservativeVaults;
  const balancedVaults = sepoliaContracts.balancedVaults;
  const aggressiveVaults = sepoliaContracts.aggressiveVaults;

  const { data: totalAssetsDataConservative } = useReadContracts({
    contracts: conservativeVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "totalAssets" as const,
    })),
  });

  const { data: decimalsDataConservative } = useReadContracts({
    contracts: conservativeVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "decimals" as const,
    })),
  });

  const { data: userSharesDataConservative } = useReadContracts({
    contracts: conservativeVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "balanceOf" as const,
      args: address ? [address as `0x${string}`] : undefined,
    })),
    query: {
      enabled: Boolean(address),
    },
  });

  const { data: totalAssetsDataBalanced } = useReadContracts({
    contracts: balancedVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "totalAssets" as const,
    })),
  });

  const { data: decimalsDataBalanced } = useReadContracts({
    contracts: balancedVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "decimals" as const,
    })),
  });

  const { data: userSharesDataBalanced } = useReadContracts({
    contracts: balancedVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "balanceOf" as const,
      args: address ? [address as `0x${string}`] : undefined,
    })),
    query: {
      enabled: Boolean(address),
    },
  });

  const { data: totalAssetsDataAggressive } = useReadContracts({
    contracts: aggressiveVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "totalAssets" as const,
    })),
  });

  const { data: decimalsDataAggressive } = useReadContracts({
    contracts: aggressiveVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "decimals" as const,
    })),
  });

  const { data: userSharesDataAggressive } = useReadContracts({
    contracts: aggressiveVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "balanceOf" as const,
      args: address ? [address as `0x${string}`] : undefined,
    })),
    query: {
      enabled: Boolean(address),
    },
  });

  const activePoolsCount =
    sepoliaContracts.conservativeVaults.length +
    sepoliaContracts.balancedVaults.length +
    sepoliaContracts.aggressiveVaults.length;

  return (
    <main className="flex flex-1 flex-col gap-6 text-slate-100">
      <section className="pt-1">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-[2.5rem] font-bold tracking-tight text-slate-50 md:text-[2.8rem]">
                Choose your strategy
              </h1>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-300">
                <span className="font-semibold text-slate-200">Step 1:</span> Pick a risk level that fits your goals →{" "}
                <span className="font-semibold text-slate-200">Step 2:</span> Select a vault to deposit
              </p>
            </div>
            {mounted && !address && (
              <div className="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-[13px] font-medium text-sky-200">
                <svg className="h-4 w-4 text-sky-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>New here? Start with <strong>Conservative</strong> — it's the safest option for beginners</span>
              </div>
            )}
          </div>
          <div className="hidden shrink-0 space-y-3 md:block">
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Total active vaults</div>
              <div className="mt-1 text-2xl font-bold text-slate-100">{activePoolsCount}</div>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                <div className="text-[12px] font-medium text-emerald-300">Sepolia testnet LINK vault</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-2 flex flex-1 flex-col gap-6 md:flex-row">
        <aside className="hidden w-72 shrink-0 flex-col gap-3 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-5 text-[13px] text-slate-300 shadow-[0_18px_50px_rgba(15,23,42,0.95)] backdrop-blur md:flex">
          <div className="mb-2 space-y-1">
            <div className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Risk Levels
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Choose based on your comfort with market changes
            </p>
          </div>
          {([
            {
              key: "conservative" as StrategyKey,
              label: "Conservative",
              subtitle: "Most stable · Best for beginners",
              apy: "3-5%",
              risk: "Low risk",
              dotClass: "bg-emerald-400",
              recommended: true,
            },
            {
              key: "balanced" as StrategyKey,
              label: "Balanced",
              subtitle: "Mix of safety & higher returns",
              apy: "5-8%",
              risk: "Medium risk",
              dotClass: "bg-sky-400",
              recommended: false,
            },
            {
              key: "aggressive" as StrategyKey,
              label: "Aggressive",
              subtitle: "Highest returns · More volatility",
              apy: "8%+",
              risk: "High risk",
              dotClass: "bg-fuchsia-400",
              recommended: false,
            },
          ] as const).map((item) => {
            const isActive = selectedStrategy === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSelectedStrategy(item.key)}
                className={[
                  "relative flex w-full flex-col rounded-2xl border px-5 py-5 text-left transition-all duration-200",
                  isActive
                    ? "border-slate-100/60 bg-slate-900/90 text-slate-50 shadow-[0_14px_40px_rgba(15,23,42,0.95)] scale-[1.02]"
                    : "border-slate-800/80 bg-slate-950/60 text-slate-300 hover:border-slate-500/70 hover:bg-slate-900/70 hover:scale-[1.01]",
                ].join(" ")}
              >
                {mounted && item.recommended && !address && (
                  <div className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-slate-950">
                    Recommended
                  </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex h-2.5 w-2.5 rounded-full ${item.dotClass}`}
                      />
                      <span className="text-[17px] font-bold">
                        {item.label}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[13px] leading-relaxed text-slate-400">
                        {item.subtitle}
                      </div>
                      <div className="flex items-center gap-3 text-[12px]">
                        <div className="font-semibold text-emerald-300">{item.apy} APY</div>
                        <div className="text-slate-500">·</div>
                        <div className="text-slate-400">{item.risk}</div>
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800/60">
                      <svg className="h-3.5 w-3.5 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </aside>

        <div className="flex-1 space-y-5">
          {selectedStrategy === "conservative" && (
            <section className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-[0_26px_70px_rgba(15,23,42,0.95)] backdrop-blur-md md:p-7">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div className="flex-1 space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                    <span>Conservative · Low Risk</span>
                  </div>
                  <h2 className="text-[1.2rem] font-bold tracking-tight text-slate-50">
                    Safest option for beginners
                  </h2>
                  <p className="max-w-xl text-[15px] leading-relaxed text-slate-300">
                    Perfect if you want steady, reliable returns without worrying about big price swings. 
                    Your money earns interest while staying safe.
                  </p>
                </div>

                <div className="shrink-0 space-y-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 text-[12px]">
                  <div className="font-semibold text-emerald-300">💡 Best for:</div>
                  <div className="text-[11px] leading-relaxed text-slate-400">
                    First-time users, savings you can't afford to lose, or money you might need soon
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {conservativeVaults.map((v, index) => {
                  const isLink = v.key === "link";

                  const totalAssetResult = (totalAssetsDataConservative?.[index] as any)
                    ?.result as
                    | bigint
                    | undefined;
                  const decimalsResult = (decimalsDataConservative?.[index] as any)
                    ?.result as
                    | number
                    | bigint
                    | undefined;
                  const userSharesResult = (userSharesDataConservative?.[index] as any)
                    ?.result as
                    | bigint
                    | undefined;

                  let tvlDisplay = "$0.00";
                  if (totalAssetResult != null && decimalsResult != null) {
                    try {
                      const formatted = Number(
                        formatUnits(totalAssetResult, Number(decimalsResult)),
                      );
                      if (Number.isFinite(formatted)) {
                        tvlDisplay = `$${formatted.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}`;
                      }
                    } catch {
                      tvlDisplay = "$0.00";
                    }
                  }

                  let userPositionDisplay: string;
                  if (!mounted || !address) {
                    userPositionDisplay = "Connect wallet first";
                  } else if (userSharesResult == null || decimalsResult == null) {
                    userPositionDisplay = "No deposits yet";
                  } else {
                    try {
                      const formatted = Number(
                        formatUnits(userSharesResult, Number(decimalsResult)),
                      );
                      if (formatted === 0) {
                        userPositionDisplay = "No deposits yet";
                      } else {
                        userPositionDisplay = Number.isFinite(formatted)
                          ? `${formatted.toLocaleString("en-US", {
                              maximumFractionDigits: 4,
                            })} ${v.symbol}`
                          : "No deposits yet";
                      }
                    } catch {
                      userPositionDisplay = "No deposits yet";
                    }
                  }

                  return (
                    <div
                      key={v.key}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 text-[0.86rem] text-slate-200 ring-0 shadow-[0_20px_50px_rgba(15,23,42,0.95)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.95)] hover:ring-2 hover:ring-emerald-400/60"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-[17px] font-bold text-slate-50">{v.name}</h3>
                            <span className="mt-2 inline-block rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-slate-500">
                              {isLink ? "Sepolia · testnet" : "Pending deployment"}
                            </span>
                          </div>
                          {/* APY Badge */}
                          <div className="flex flex-col items-end gap-1">
                            <div className="text-[11px] text-slate-500">Est. APY</div>
                            <div className="text-[20px] font-bold text-emerald-300">
                              ~4.2%
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-[13px] leading-relaxed text-slate-400">
                          {isLink
                            ? "Earn yield by lending LINK on Aave. Perfect for testing before mainnet."
                            : "Conservative stablecoin vault. Coming soon with on-chain deployment."}
                        </p>

                        {/* Core Metrics - Simplified */}
                        <div className="mt-5 space-y-2.5">
                          <div className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-950/60 px-4 py-3">
                            <span className="text-[12px] font-medium text-slate-400">Pool Size</span>
                            <span className="text-[16px] font-bold text-slate-50">
                              {tvlDisplay}
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                            <span className="text-[12px] font-medium text-emerald-300/80">Your Position</span>
                            <span className="text-[14px] font-semibold text-emerald-300">
                              {userPositionDisplay}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3 border-t border-slate-800/50 pt-5">
                        {mounted && address ? (
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => handleOpenModal(v as VaultConfig, "deposit")}
                              className="cursor-pointer rounded-xl bg-sky-500 px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-sky-600"
                            >
                              Deposit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenModal(v as VaultConfig, "withdraw")}
                              className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-[13px] font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-50"
                            >
                              Withdraw
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="w-full cursor-not-allowed rounded-xl bg-slate-800/60 px-4 py-3.5 text-[13px] font-semibold text-slate-400 ring-1 ring-slate-700/60 transition"
                            disabled
                          >
                            Connect wallet to deposit
                          </button>
                        )}
                        <button
                          type="button"
                          className="group/details flex w-full items-center justify-center gap-2 text-[12px] font-medium text-slate-500 transition-colors hover:text-slate-300"
                        >
                          <span>View full details</span>
                          <svg className="h-3.5 w-3.5 transition-transform group-hover/details:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {selectedStrategy === "balanced" && (
            <section className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.9)] backdrop-blur-md md:p-7">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div className="flex-1 space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-[12px] font-semibold text-sky-300 ring-1 ring-sky-500/30">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>Balanced · Medium Risk</span>
                  </div>
                  <h2 className="text-[1.2rem] font-bold tracking-tight text-slate-50">
                    Higher returns with manageable risk
                  </h2>
                  <p className="max-w-xl text-[15px] leading-relaxed text-slate-300">
                    Great middle ground between safety and growth. Earns more than Conservative 
                    but with slightly more ups and downs. Good if you're willing to wait through 
                    small dips for better rewards.
                  </p>
                </div>
                <div className="shrink-0 space-y-2 rounded-xl border border-sky-500/20 bg-sky-500/5 px-3 py-2.5 text-[12px]">
                  <div className="font-semibold text-sky-300">📈 Best for:</div>
                  <div className="text-[11px] leading-relaxed text-slate-400">
                    Users comfortable with moderate risk, money you won't need for 3-6 months
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {balancedVaults.length < 1 ? (
                  <div className="flex flex-col justify-between rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 p-5 text-[0.86rem] text-slate-300">
                    <div>
                      <div className="text-[0.8rem] font-medium text-slate-200">
                        Balanced vault slot
                      </div>
                      <p className="mt-2 text-[13px] leading-snug text-slate-400">
                        Future balanced strategy vaults (e.g. USDC + stable LP) will
                        be listed here.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] text-slate-500">
                      Driven by contracts config per chain.
                    </span>
                  </div>
                ) : (
                  balancedVaults.map((v, index) => {
                    const totalAssetResult = (totalAssetsDataBalanced?.[index] as any)
                      ?.result as
                        | bigint
                      | undefined;
                    const decimalsResult = (decimalsDataBalanced?.[index] as any)
                      ?.result as
                      | number
                      | bigint
                      | undefined;
                    const userSharesResult = (userSharesDataBalanced?.[index] as any)
                      ?.result as
                      | bigint
                      | undefined;

                    let tvlDisplay = "$0.00";
                    if (totalAssetResult != null && decimalsResult != null) {
                      try {
                        const formatted = Number(
                          formatUnits(totalAssetResult, Number(decimalsResult)),
                        );
                        if (Number.isFinite(formatted)) {
                          tvlDisplay = `$${formatted.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}`;
                        }
                      } catch {
                        tvlDisplay = "$0.00";
                      }
                    }

                    let userPositionDisplay: string;
                    if (!mounted || !address) {
                      userPositionDisplay = "Connect wallet first";
                    } else if (userSharesResult == null || decimalsResult == null) {
                      userPositionDisplay = "No deposits yet";
                    } else {
                      try {
                        const formatted = Number(
                          formatUnits(userSharesResult, Number(decimalsResult)),
                        );
                        if (formatted === 0) {
                          userPositionDisplay = "No deposits yet";
                        } else {
                          userPositionDisplay = Number.isFinite(formatted)
                            ? `${formatted.toLocaleString("en-US", {
                                maximumFractionDigits: 4,
                              })} ${v.symbol}`
                            : "No deposits yet";
                        }
                      } catch {
                        userPositionDisplay = "No deposits yet";
                      }
                    }

                    return (
                      <div
                        key={v.key}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 text-[0.86rem] text-slate-200 ring-0 shadow-[0_20px_50px_rgba(15,23,42,0.95)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.95)] hover:ring-2 hover:ring-sky-400/60"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="text-[17px] font-bold text-slate-50">{v.name}</h3>
                              <span className="mt-2 inline-block rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-slate-500">
                                Balanced vault
                              </span>
                            </div>
                          </div>
                          <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
                            Configured via contracts mapping. Once deployed on-chain,
                            this card will show live TVL and your position.
                          </p>

                          <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-950/60 px-4 py-3">
                              <span className="text-[12px] font-medium uppercase tracking-wide text-slate-400">Vault TVL</span>
                              <span className="text-[17px] font-bold text-slate-50">
                                {tvlDisplay}
                              </span>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-950/60 px-4 py-3">
                              <span className="text-[12px] font-medium uppercase tracking-wide text-slate-400">Your position</span>
                              <span className="text-[14px] font-semibold text-sky-300">
                                {userPositionDisplay}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-slate-800/50 pt-5">
                          {mounted && address ? (
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenModal(v as VaultConfig, "deposit")}
                                className="cursor-pointer rounded-xl bg-sky-500 px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-sky-600"
                              >
                                Deposit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenModal(v as VaultConfig, "withdraw")}
                                className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-[13px] font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-50"
                              >
                                Withdraw
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="w-full cursor-not-allowed rounded-xl bg-slate-800/60 px-4 py-3.5 text-[13px] font-semibold text-slate-400 ring-1 ring-slate-700/60 transition"
                              disabled
                            >
                              Connect wallet to deposit
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}

          {selectedStrategy === "aggressive" && (
            <section className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.9)] backdrop-blur-md md:p-7">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div className="flex-1 space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-500/10 px-3 py-1 text-[12px] font-semibold text-fuchsia-300 ring-1 ring-fuchsia-500/30">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                    <span>Aggressive · High Risk</span>
                  </div>
                  <h2 className="text-[1.2rem] font-bold tracking-tight text-slate-50">
                    Maximum returns for experienced users
                  </h2>
                  <p className="max-w-xl text-[15px] leading-relaxed text-slate-300">
                    Highest potential earnings but with bigger price swings. Only use money 
                    you're okay with fluctuating significantly. Best for users who understand 
                    DeFi and can handle volatility.
                  </p>
                </div>
                <div className="shrink-0 space-y-2 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 px-3 py-2.5 text-[12px]">
                  <div className="font-semibold text-fuchsia-300">⚠️ Best for:</div>
                  <div className="text-[11px] leading-relaxed text-slate-400">
                    Experienced DeFi users, long-term investors comfortable with volatility
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {aggressiveVaults.length < 1 ? (
                  <div className="flex flex-col justify-between rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 p-5 text-[0.86rem] text-slate-300">
                    <div>
                      <div className="text-[0.8rem] font-medium text-slate-200">
                        Aggressive vault slot
                      </div>
                      <p className="mt-2 text-[13px] leading-snug text-slate-400">
                        Future higher-risk vaults will be listed here once strategies
                        are audited and configured.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] text-slate-500">
                      Placeholder for upcoming strategies.
                    </span>
                  </div>
                ) : (
                  aggressiveVaults.map((v, index) => {
                    const totalAssetResult = (totalAssetsDataAggressive?.[index] as any)
                      ?.result as
                      | bigint
                      | undefined;
                    const decimalsResult = (decimalsDataAggressive?.[index] as any)
                      ?.result as
                      | number
                      | bigint
                      | undefined;
                    const userSharesResult = (userSharesDataAggressive?.[index] as any)
                      ?.result as
                      | bigint
                      | undefined;

                    let tvlDisplay = "$0.00";
                    if (totalAssetResult != null && decimalsResult != null) {
                      try {
                        const formatted = Number(
                          formatUnits(totalAssetResult, Number(decimalsResult)),
                        );
                        if (Number.isFinite(formatted)) {
                          tvlDisplay = `$${formatted.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}`;
                        }
                      } catch {
                        tvlDisplay = "$0.00";
                      }
                    }

                    let userPositionDisplay: string;
                    if (!mounted || !address) {
                      userPositionDisplay = "Connect wallet first";
                    } else if (userSharesResult == null || decimalsResult == null) {
                      userPositionDisplay = "No deposits yet";
                    } else {
                      try {
                        const formatted = Number(
                          formatUnits(userSharesResult, Number(decimalsResult)),
                        );
                        if (formatted === 0) {
                          userPositionDisplay = "No deposits yet";
                        } else {
                          userPositionDisplay = Number.isFinite(formatted)
                            ? `${formatted.toLocaleString("en-US", {
                                maximumFractionDigits: 4,
                              })} ${v.symbol}`
                            : "No deposits yet";
                        }
                      } catch {
                        userPositionDisplay = "No deposits yet";
                      }
                    }

                    return (
                      <div
                        key={v.key}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 text-[0.86rem] text-slate-200 ring-0 shadow-[0_20px_50px_rgba(15,23,42,0.95)] transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/70 hover:shadow-[0_24px_60px_rgba(15,23,42,0.95)] hover:ring-2 hover:ring-fuchsia-400/60"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="text-[17px] font-bold text-slate-50">{v.name}</h3>
                              <span className="mt-2 inline-block rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-slate-500">
                                Aggressive vault
                              </span>
                            </div>
                          </div>
                          <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
                            Configured via contracts mapping. Once deployed and
                            enabled, this card will show live vault metrics.
                          </p>

                          <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-950/60 px-4 py-3">
                              <span className="text-[12px] font-medium uppercase tracking-wide text-slate-400">Vault TVL</span>
                              <span className="text-[17px] font-bold text-slate-50">
                                {tvlDisplay}
                              </span>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-950/60 px-4 py-3">
                              <span className="text-[12px] font-medium uppercase tracking-wide text-slate-400">Your position</span>
                              <span className="text-[14px] font-semibold text-fuchsia-300">
                                {userPositionDisplay}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-slate-800/50 pt-5">
                          {mounted && address ? (
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenModal(v as VaultConfig, "deposit")}
                                className="cursor-pointer rounded-xl bg-sky-500 px-4 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-sky-600"
                              >
                                Deposit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenModal(v as VaultConfig, "withdraw")}
                                className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-[13px] font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-50"
                              >
                                Withdraw
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="w-full cursor-not-allowed rounded-xl bg-slate-800/60 px-4 py-3.5 text-[13px] font-semibold text-slate-400 ring-1 ring-slate-700/60 transition"
                              disabled
                            >
                              Connect wallet to deposit
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Deposit/Withdraw Modal */}
      {modalOpen && selectedVault && (
        <DepositWithdrawModal
          vaultConfig={selectedVault}
          mode={modalMode}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
