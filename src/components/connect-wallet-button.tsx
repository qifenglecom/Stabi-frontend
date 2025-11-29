"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { formatUnits } from "viem";

function ConnectWalletButtonInner() {
  const { address, isConnecting, isReconnecting, isConnected } = useAccount();
  const { connect, connectors, status: connectStatus, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  
  const [showMenu, setShowMenu] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 自动隐藏toast - 1秒后消失
  useEffect(() => {
    if (showCopyToast) {
      const timer = setTimeout(() => setShowCopyToast(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showCopyToast]);

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

  const handleConnect = () => {
    const connector = connectors[0];
    if (!connector) return;
    connect({ connector });
  };

  const handleDisconnect = () => {
    disconnect();
    setShowMenu(false);
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setShowCopyToast(true);
    }
  };

  // 未连接状态
  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={handleConnect}
        className="inline-flex items-center gap-2 rounded-full border border-indigo-400/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 px-4 py-1.5 text-sm font-semibold text-slate-50 shadow-[0_0_26px_rgba(79,70,229,0.9)] ring-1 ring-indigo-500/60 backdrop-blur-md transition hover:border-indigo-300 hover:shadow-[0_0_32px_rgba(129,140,248,1)] disabled:opacity-70"
        disabled={isConnecting || isReconnecting || connectStatus === "pending"}
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-500/80 shadow-[0_0_12px_rgba(148,163,184,0.9)]" />
        <span>{label}</span>
        {error ? (
          <span className="ml-1 text-[10px] text-red-400">Error</span>
        ) : null}
      </button>
    );
  }

  // 已连接状态 - 显示下拉菜单
  return (
    <div ref={menuRef} className="relative z-[9999]">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="inline-flex items-center gap-2 rounded-full border border-indigo-400/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 px-4 py-1.5 text-sm font-semibold text-slate-50 shadow-[0_0_26px_rgba(79,70,229,0.9)] ring-1 ring-indigo-500/60 backdrop-blur-md transition hover:border-indigo-300 hover:shadow-[0_0_32px_rgba(129,140,248,1)]"
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
        <span>{label}</span>
        <svg className={`h-3.5 w-3.5 transition-transform ${showMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 - 超紧凑版 */}
      {showMenu && (
        <div className="absolute right-0 top-full z-[9999] mt-2 w-60 rounded-lg border border-slate-700/70 bg-slate-900/98 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <div className="p-2.5 space-y-2">
            {/* 简短地址 - 可复制 */}
            <div className="space-y-1">
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-0.5">Address</div>
              <button
                onClick={copyAddress}
                title="Click to copy"
                className="group flex w-full items-center justify-between rounded-md bg-slate-950/60 px-2.5 py-1.5 transition-colors hover:bg-slate-800/60 active:scale-95"
              >
                <span className="text-[12px] font-mono text-slate-200">{label}</span>
                <svg className="h-3 w-3 text-slate-500 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* 余额 */}
            {balance && (
              <div className="space-y-1">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-0.5">Balance</div>
                <div className="flex items-center justify-between rounded-md bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1.5">
                  <span className="text-[11px] font-medium text-slate-400">{balance.symbol}</span>
                  <span className="text-[14px] font-bold text-emerald-300">
                    {parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)}
                  </span>
                </div>
              </div>
            )}

            {/* 断开连接 */}
            <div className="border-t border-slate-700/50 pt-2">
              <button
                onClick={handleDisconnect}
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1.5 text-[11px] font-bold text-red-400 ring-1 ring-red-500/30 transition-all hover:bg-red-500/20 hover:text-red-300 active:scale-95"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Success Toast */}
      {showCopyToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 shadow-[0_10px_40px_rgba(52,211,153,0.3)] backdrop-blur-xl">
            <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[13px] font-semibold text-emerald-200">Address copied!</span>
          </div>
        </div>
      )}
    </div>
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
