"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function ConnectWalletButtonInner() {
  const { address, isConnecting, isReconnecting, isConnected } = useAccount();
  const { connect, connectors, status: connectStatus, error } = useConnect();
  const { disconnect } = useDisconnect();

  const label = useMemo(() => {
    if (isConnecting || isReconnecting || connectStatus === "pending") {
      return "Connecting...";
    }
    if (isConnected && address) {
      const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
      return short;
    }
    return "Connect wallet";
  }, [address, connectStatus, isConnected, isConnecting, isReconnecting]);

  const handleClick = () => {
    if (isConnected) {
      disconnect();
      return;
    }
    const connector = connectors[0];
    if (!connector) return;
    connect({ connector });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-indigo-400/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 px-4 py-1.5 text-sm font-semibold text-slate-50 shadow-[0_0_26px_rgba(79,70,229,0.9)] ring-1 ring-indigo-500/60 backdrop-blur-md transition hover:border-indigo-300 hover:shadow-[0_0_32px_rgba(129,140,248,1)] disabled:opacity-70"
      disabled={isConnecting || isReconnecting || connectStatus === "pending"}
    >
      <span
        className={`inline-flex h-1.5 w-1.5 rounded-full shadow-[0_0_12px_rgba(148,163,184,0.9)] ${
          isConnected
            ? "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]"
            : "bg-slate-500/80"
        }`}
      />
      <span>{label}</span>
      {error ? (
        <span className="ml-1 text-[10px] text-red-400">Error</span>
      ) : null}
    </button>
  );
}

export function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 初始 Hydration 阶段先渲染一个静态占位按钮，避免 wagmi 在 Hydrate 中触发状态更新
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-slate-950/70 px-4 py-1.5 text-sm font-semibold text-slate-300 shadow-[0_0_18px_rgba(15,23,42,0.9)] ring-1 ring-indigo-500/30 backdrop-blur-md"
        disabled
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-500/70 shadow-[0_0_10px_rgba(148,163,184,0.8)]" />
        <span>Connect wallet</span>
      </button>
    );
  }

  return <ConnectWalletButtonInner />;
}
