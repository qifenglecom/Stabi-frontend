"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useVaultData } from "@/hooks/useVaultData";
import { useVaultActions } from "@/hooks/useVaultActions";
import { parseUnits, formatUnits } from "viem";

interface DepositWithdrawModalProps {
  vaultConfig: {
    vault: `0x${string}`;
    asset: `0x${string}`;
    name: string;
    symbol: string;
  };
  mode: "deposit" | "withdraw";
  onClose: () => void;
}

export function DepositWithdrawModal({
  vaultConfig,
  mode,
  onClose,
}: DepositWithdrawModalProps) {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"input" | "approving" | "transacting" | "success">("input");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const vaultData = useVaultData(vaultConfig);
  const actions = useVaultActions();

  // User-friendly error message handler
  const getErrorMessage = (error: any): string => {
    if (!error) return "";
    
    const errorStr = error.message || error.toString();
    
    // User cancelled transaction
    if (errorStr.includes("User rejected") || 
        errorStr.includes("User denied") ||
        errorStr.includes("user rejected") ||
        errorStr.includes("rejected the request")) {
      return "Transaction cancelled";
    }
    
    // Insufficient balance
    if (errorStr.includes("insufficient funds") || 
        errorStr.includes("insufficient balance")) {
      return "Insufficient balance";
    }
    
    // Insufficient gas
    if (errorStr.includes("gas") || errorStr.includes("Gas")) {
      return "Insufficient gas fee";
    }
    
    // Network error
    if (errorStr.includes("network") || errorStr.includes("Network")) {
      return "Network error. Please try again.";
    }
    
    // Show brief message for other errors
    return "Transaction failed. Please try again.";
  };

  // After approve succeeds, refresh data and reset to input state
  useEffect(() => {
    if (actions.isSuccess && step === "approving") {
      // Refresh allowance
      vaultData.refetch();
      setErrorMessage(""); // Clear error message
      // Reset to input state, button will automatically become Deposit
      setTimeout(() => {
        setStep("input");
      }, 1500);
    }
  }, [actions.isSuccess, step, vaultData]);

  // Show success state when deposit/withdraw succeeds
  useEffect(() => {
    if (actions.isSuccess && step === "transacting") {
      setStep("success");
      setErrorMessage(""); // Clear error message
      // Refresh data
      setTimeout(() => {
        vaultData.refetch();
      }, 1000);
    }
  }, [actions.isSuccess, step, vaultData]);

  // Listen for errors and set user-friendly error messages
  useEffect(() => {
    if (actions.error) {
      setErrorMessage(getErrorMessage(actions.error));
    }
  }, [actions.error]);

  const maxAmount =
    mode === "deposit"
      ? (vaultData.formatted?.assetBalance || "0")
      : (vaultData.formatted?.userAssets || "0");

  const needsApproval =
    mode === "deposit" &&
    amount &&
    parseUnits(amount, vaultData.assetDecimals) > vaultData.allowance;

  const handleMaxClick = () => {
    setAmount(maxAmount);
    setErrorMessage(""); // Clear error message
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setErrorMessage(""); // Clear error message
  };

  const handleApprove = async () => {
    if (!address) return;
    setStep("approving");
    setErrorMessage(""); // Clear previous error
    try {
      await actions.approve(
        vaultConfig.asset,
        vaultConfig.vault,
        amount,
        vaultData.assetDecimals
      );
    } catch (error) {
      console.error("Approve error:", error);
      setErrorMessage(getErrorMessage(error));
      setStep("input");
    }
  };

  const handleDeposit = async () => {
    if (!address) return;
    setStep("transacting");
    setErrorMessage(""); // Clear previous error
    try {
      await actions.deposit(
        vaultConfig.vault,
        amount,
        vaultData.assetDecimals,
        address
      );
    } catch (error) {
      console.error("Deposit error:", error);
      setErrorMessage(getErrorMessage(error));
      setStep("input");
    }
  };

  const handleWithdraw = async () => {
    if (!address) return;
    setStep("transacting");
    setErrorMessage(""); // Clear previous error
    try {
      await actions.withdraw(
        vaultConfig.vault,
        amount,
        vaultData.assetDecimals,
        address,
        address
      );
    } catch (error) {
      console.error("Withdraw error:", error);
      setErrorMessage(getErrorMessage(error));
      setStep("input");
    }
  };

  const handleSubmit = async () => {
    if (mode === "deposit") {
      if (needsApproval) {
        await handleApprove();
      } else {
        await handleDeposit();
      }
    } else {
      await handleWithdraw();
    }
  };

  const handleClose = () => {
    if (step === "success") {
      vaultData.refetch();
    }
    setErrorMessage(""); // Clear error message
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)] animate-[slideUp_0.2s_ease-out]">
        {/* Waiting for Wallet Banner */}
        {actions.isPending && !actions.isConfirming && (
          <div className="mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div className="flex-1">
                <div className="text-sm font-semibold text-amber-300">Waiting for wallet...</div>
                <div className="text-xs text-amber-200/70">Please confirm the transaction in your wallet</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Confirming Transaction Banner */}
        {actions.isConfirming && (
          <div className="mb-4 rounded-xl bg-sky-500/10 border border-sky-500/20 p-3">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div className="flex-1">
                <div className="text-sm font-semibold text-sky-300">Transaction submitted</div>
                <div className="text-xs text-sky-200/70">Waiting for blockchain confirmation...</div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-50">
            {mode === "deposit" ? "Deposit" : "Withdraw"}
          </h3>
          <button
            onClick={handleClose}
            className="cursor-pointer text-slate-400 transition-colors hover:text-slate-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === "success" ? (
          // Success State
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <svg className="h-8 w-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-50">Transaction Successful!</h4>
              <p className="mt-2 text-sm text-slate-400">
                Your {mode === "deposit" ? "deposit" : "withdrawal"} has been processed.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full cursor-pointer rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Done
            </button>
          </div>
        ) : (
          // Input State
          <div className="space-y-4">
            {/* Vault Info */}
            <div className="rounded-xl bg-slate-800/50 p-4">
              <div className="text-xs font-medium text-slate-400">Vault</div>
              <div className="mt-1 text-sm font-semibold text-slate-200">{vaultConfig.name}</div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                <span>Amount</span>
                <button
                  onClick={handleMaxClick}
                  className="cursor-pointer text-sky-400 transition-colors hover:text-sky-300"
                >
                  Balance: {maxAmount} {vaultData.assetSymbol}
                </button>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-4 pr-20 py-3 text-lg font-semibold text-slate-50 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                <button
                  onClick={handleMaxClick}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 transition-colors hover:bg-sky-500/20"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Info Box */}
            {mode === "deposit" && !needsApproval && step === "input" && vaultData.allowance > BigInt(0) && (
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3 text-xs text-emerald-200">
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>✅ Approval successful! You can now deposit {vaultData.assetSymbol}.</span>
                </div>
              </div>
            )}
            {mode === "deposit" && (
              <div className="rounded-lg bg-sky-500/5 border border-sky-500/20 p-3 text-xs text-sky-200">
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 shrink-0 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>You will receive vault shares representing your deposit. Your shares will earn yield automatically.</span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleSubmit}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(maxAmount) || actions.isPending || actions.isConfirming}
              className="w-full cursor-pointer rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {(actions.isPending || actions.isConfirming) && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>
                {step === "approving"
                  ? actions.isPending
                    ? "Approving..."
                    : actions.isConfirming
                    ? "Confirming approval..."
                    : "Approve " + vaultData.assetSymbol
                  : step === "transacting"
                  ? actions.isPending
                    ? mode === "deposit" ? "Depositing..." : "Withdrawing..."
                    : actions.isConfirming
                    ? "Confirming transaction..."
                    : mode === "deposit"
                    ? "Deposit"
                    : "Withdraw"
                  : needsApproval
                  ? "Approve " + vaultData.assetSymbol
                  : mode === "deposit"
                  ? "Deposit"
                  : "Withdraw"}
              </span>
            </button>

            {/* Error Display */}
            {errorMessage && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 shrink-0 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-red-300">{errorMessage}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
