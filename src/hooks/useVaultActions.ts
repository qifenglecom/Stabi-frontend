import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import vaultAbi from "@/abis/stabi/vault.json";
import erc20Abi from "@/abis/erc20.json";

export function useVaultActions() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Approve asset to Vault
  const approve = async (
    assetAddress: `0x${string}`,
    vaultAddress: `0x${string}`,
    amount: string,
    decimals: number
  ) => {
    const amountBigInt = parseUnits(amount, decimals);
    
    return writeContract({
      address: assetAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [vaultAddress, amountBigInt],
    });
  };

  // Deposit asset to Vault
  const deposit = async (
    vaultAddress: `0x${string}`,
    amount: string,
    decimals: number,
    receiver: `0x${string}`
  ) => {
    const amountBigInt = parseUnits(amount, decimals);
    
    return writeContract({
      address: vaultAddress,
      abi: vaultAbi,
      functionName: "deposit",
      args: [amountBigInt, receiver],
    });
  };

  // Redeem shares
  const redeem = async (
    vaultAddress: `0x${string}`,
    shares: string,
    vaultDecimals: number,
    receiver: `0x${string}`,
    owner: `0x${string}`
  ) => {
    const sharesBigInt = parseUnits(shares, vaultDecimals);
    
    return writeContract({
      address: vaultAddress,
      abi: vaultAbi,
      functionName: "redeem",
      args: [sharesBigInt, receiver, owner],
    });
  };

  // Withdraw asset
  const withdraw = async (
    vaultAddress: `0x${string}`,
    amount: string,
    decimals: number,
    receiver: `0x${string}`,
    owner: `0x${string}`
  ) => {
    const amountBigInt = parseUnits(amount, decimals);
    
    return writeContract({
      address: vaultAddress,
      abi: vaultAbi,
      functionName: "withdraw",
      args: [amountBigInt, receiver, owner],
    });
  };

  return {
    approve,
    deposit,
    redeem,
    withdraw,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
