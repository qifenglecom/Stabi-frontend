"use client";

import { useAccount, useReadContracts } from "wagmi";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import Link from "next/link";
import { contracts as sepoliaContracts } from "@/config/contracts/sepolia";
import vaultArtifact from "@/abis/stabi/vault.json";

const vaultAbi = (vaultArtifact as any).abi ?? (vaultArtifact as any);

export default function PortfolioPage() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get all vaults
  const allVaults = [
    ...sepoliaContracts.conservativeVaults,
    ...sepoliaContracts.balancedVaults,
    ...sepoliaContracts.aggressiveVaults,
  ];

  // Read user shares
  const { data: userSharesData } = useReadContracts({
    contracts: allVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "balanceOf" as const,
      args: address ? [address as `0x${string}`] : undefined,
    })),
    query: {
      enabled: Boolean(address),
    },
  });

  // Read totalAssets
  const { data: totalAssetsData } = useReadContracts({
    contracts: allVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "totalAssets" as const,
    })),
    query: {
      enabled: Boolean(address),
    },
  });

  // Read totalSupply
  const { data: totalSupplyData } = useReadContracts({
    contracts: allVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "totalSupply" as const,
    })),
    query: {
      enabled: Boolean(address),
    },
  });

  // Read asset decimals
  const { data: decimalsData } = useReadContracts({
    contracts: allVaults.map((v) => ({
      address: v.vault as `0x${string}`,
      abi: vaultAbi,
      functionName: "decimals" as const,
    })),
    query: {
      enabled: Boolean(address),
    },
  });

  // Calculate positions
  const positions = allVaults.map((vault, i) => {
    const userShares = userSharesData?.[i]?.result as bigint | undefined;
    const totalAssets = totalAssetsData?.[i]?.result as bigint | undefined;
    const totalSupply = totalSupplyData?.[i]?.result as bigint | undefined;
    const decimals = decimalsData?.[i]?.result as number | undefined;

    if (!userShares || userShares === BigInt(0)) return null;

    // Calculate user asset value: (userShares * totalAssets) / totalSupply
    let userAssets = BigInt(0);
    if (totalSupply && totalSupply > BigInt(0) && totalAssets) {
      userAssets = (userShares * totalAssets) / totalSupply;
    }

    const formattedShares = decimals ? formatUnits(userShares, decimals) : "0";
    const formattedAssets = decimals ? formatUnits(userAssets, decimals) : "0";

    // Determine strategy type (based on index in array)
    const conservativeCount = sepoliaContracts.conservativeVaults.length;
    const balancedCount = sepoliaContracts.balancedVaults.length;
    
    let strategyType = "conservative";
    let strategyColor = "emerald";
    
    if (i >= conservativeCount + balancedCount) {
      strategyType = "aggressive";
      strategyColor = "fuchsia";
    } else if (i >= conservativeCount) {
      strategyType = "balanced";
      strategyColor = "sky";
    }

    return {
      vault,
      userShares,
      userAssets,
      formattedShares,
      formattedAssets,
      strategyType,
      strategyColor,
      decimals,
    };
  }).filter(Boolean);

  // Calculate total value
  const totalValue = positions.reduce((sum, pos) => {
    if (pos) {
      return sum + parseFloat(pos.formattedAssets);
    }
    return sum;
  }, 0);

  if (!mounted) {
    return null;
  }

  if (!address) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 text-slate-100">
        <div className="text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50 mx-auto">
            <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-[2rem] font-bold text-slate-50">Connect Your Wallet</h1>
          <p className="text-[15px] text-slate-400 max-w-md">
            Please connect your wallet to view your portfolio and manage your positions.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-sky-600"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-8 text-slate-100">
      <section className="space-y-3">
        <h1 className="text-[2.5rem] font-bold tracking-tight text-slate-50">My Portfolio</h1>
        <p className="text-[15px] text-slate-400">
          Overview of your positions and earnings across all Stabi vaults
        </p>
      </section>

      {/* Total Value Card */}
      <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.9)]">
        <div className="space-y-4">
          <div className="text-[13px] font-semibold uppercase tracking-wider text-slate-500">
            Total Portfolio Value
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-[3rem] font-bold text-slate-50">
              {totalValue.toFixed(4)} {positions[0]?.vault.key?.toUpperCase() || 'LINK'}
            </div>
            {positions.length > 0 && (() => {
              const avgRate = positions.reduce((sum, pos) => {
                const rate = parseFloat(pos?.formattedAssets || "0") / parseFloat(pos?.formattedShares || "1");
                return sum + rate;
              }, 0) / positions.length;
              const yield_ = ((avgRate - 1) * 100);
              return yield_ > 0 ? (
                <div className="text-lg font-semibold text-emerald-400">
                  +{yield_.toFixed(2)}%
                </div>
              ) : null;
            })()}
          </div>
          <div className="text-xs text-slate-400 -mt-2">
            Underlying asset value (can be withdrawn)
            {positions.length > 0 && (() => {
              const avgRate = positions.reduce((sum, pos) => {
                const rate = parseFloat(pos?.formattedAssets || "0") / parseFloat(pos?.formattedShares || "1");
                return sum + rate;
              }, 0) / positions.length;
              return avgRate > 1 ? <span className="ml-2 text-emerald-400">• Earning yield</span> : null;
            })()}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[14px] pt-2 border-t border-slate-800/50">
            <div className="space-y-1">
              <span className="text-slate-400">Active Positions</span>
              <div className="font-semibold text-slate-200">{positions.length} vaults</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Underlying Assets</span>
              <div className="font-semibold text-emerald-300">{totalValue.toFixed(4)} {positions[0]?.vault.key?.toUpperCase() || 'LINK'}</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Vault Shares (stTokens)</span>
              <div className="font-semibold text-sky-300">
                {positions.reduce((sum, pos) => sum + parseFloat(pos?.formattedShares || "0"), 0).toFixed(4)} {positions[0]?.vault.symbol || 'stLINK'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Positions */}
      <section className="space-y-4">
        <h2 className="text-[1.3rem] font-bold text-slate-50">Your Positions</h2>
        {positions.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((position, index) => {
              if (!position) return null;
              
              const colorClassesMap: Record<string, { dot: string; badge: string; label: string }> = {
                emerald: {
                  dot: "bg-emerald-400",
                  badge: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
                  label: "Conservative",
                },
                sky: {
                  dot: "bg-sky-400",
                  badge: "bg-sky-500/10 text-sky-300 ring-sky-500/30",
                  label: "Balanced",
                },
                fuchsia: {
                  dot: "bg-fuchsia-400",
                  badge: "bg-fuchsia-500/10 text-fuchsia-300 ring-fuchsia-500/30",
                  label: "Aggressive",
                },
              };
              const colorClasses = colorClassesMap[position.strategyColor];

              return (
                <div
                  key={`${position.strategyType}-${position.vault.vault}-${position.vault.index}`}
                  className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.8)] transition-all hover:border-slate-700 hover:shadow-[0_16px_50px_rgba(15,23,42,0.9)]"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex h-2 w-2 rounded-full ${colorClasses?.dot}`}></span>
                          <span className="text-sm font-semibold text-slate-200">{position.vault.name}</span>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${colorClasses?.badge}`}>
                          {colorClasses?.label}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 border-t border-slate-800/50 pt-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-500">Underlying Asset Value</span>
                          {(() => {
                            const rate = parseFloat(position.formattedAssets) / parseFloat(position.formattedShares);
                            const yield_ = ((rate - 1) * 100);
                            return yield_ > 0 ? (
                              <span className="text-xs font-semibold text-emerald-400">
                                +{yield_.toFixed(2)}% yield
                              </span>
                            ) : null;
                          })()}
                        </div>
                        <div className="text-xl font-bold text-emerald-300">
                          {parseFloat(position.formattedAssets).toFixed(4)} {position.vault.key?.toUpperCase()}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">Can be withdrawn</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Vault Shares</div>
                          <div className="text-sm font-semibold text-sky-300">
                            {parseFloat(position.formattedShares).toFixed(4)}
                          </div>
                          <div className="text-xs text-slate-400">{position.vault.symbol}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Share Rate</div>
                          <div className="text-sm font-semibold text-slate-200">
                            1:{(parseFloat(position.formattedAssets) / parseFloat(position.formattedShares)).toFixed(4)}
                          </div>
                          <div className="text-xs text-slate-400">{position.vault.symbol}/{position.vault.key?.toUpperCase()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <Link
                      href="/app"
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-50"
                    >
                      Manage Position
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700/60 bg-slate-950/40 p-12 text-center">
            <div className="mx-auto max-w-md space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50 mx-auto">
                <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-[17px] font-semibold text-slate-200">No Positions Yet</h3>
              <p className="text-[14px] text-slate-400">
                Start earning yield by depositing into a vault on the Strategy Pools page
              </p>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-sky-600"
              >
                Browse Vaults
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
