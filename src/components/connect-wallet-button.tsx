"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectWalletButton() {
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
      className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
      disabled={isConnecting || isReconnecting || connectStatus === "pending"}
    >
      {label}
      {error ? (
        <span className="ml-2 text-xs text-red-500">Error</span>
      ) : null}
    </button>
  );
}
