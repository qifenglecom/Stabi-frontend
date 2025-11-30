import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import vaultAbi from "@/abis/stabi/vault.json";
import erc20Abi from "@/abis/erc20.json";

interface VaultConfig {
  vault: `0x${string}`;
  asset: `0x${string}`;
  name: string;
  symbol: string;
}

export function useVaultData(vaultConfig: VaultConfig | undefined) {
  const { address } = useAccount();

  const contracts = vaultConfig
    ? [
        // Vault data
        {
          address: vaultConfig.vault,
          abi: vaultAbi,
          functionName: "totalAssets",
        },
        {
          address: vaultConfig.vault,
          abi: vaultAbi,
          functionName: "totalSupply",
        },
        {
          address: vaultConfig.vault,
          abi: vaultAbi,
          functionName: "balanceOf",
          args: [address || "0x0000000000000000000000000000000000000000"],
        },
        {
          address: vaultConfig.vault,
          abi: vaultAbi,
          functionName: "decimals",
        },
        // Asset data
        {
          address: vaultConfig.asset,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address || "0x0000000000000000000000000000000000000000"],
        },
        {
          address: vaultConfig.asset,
          abi: erc20Abi,
          functionName: "allowance",
          args: [
            address || "0x0000000000000000000000000000000000000000",
            vaultConfig.vault,
          ],
        },
        {
          address: vaultConfig.asset,
          abi: erc20Abi,
          functionName: "decimals",
        },
        {
          address: vaultConfig.asset,
          abi: erc20Abi,
          functionName: "symbol",
        },
      ]
    : [];

  const { data, isLoading, refetch } = useReadContracts({
    contracts: contracts as any,
    query: {
      enabled: !!vaultConfig && !!address,
    },
  });

  if (!data || !vaultConfig) {
    return {
      totalAssets: BigInt(0),
      totalSupply: BigInt(0),
      userShares: BigInt(0),
      userAssets: BigInt(0),
      assetBalance: BigInt(0),
      allowance: BigInt(0),
      assetDecimals: 6,
      vaultDecimals: 18,
      assetSymbol: "USDC",
      isLoading,
      refetch,
    };
  }

  const totalAssets = (data[0]?.result as bigint) || BigInt(0);
  const totalSupply = (data[1]?.result as bigint) || BigInt(0);
  const userShares = (data[2]?.result as bigint) || BigInt(0);
  const vaultDecimals = (data[3]?.result as number) || 18;
  const assetBalance = (data[4]?.result as bigint) || BigInt(0);
  const allowance = (data[5]?.result as bigint) || BigInt(0);
  const assetDecimals = (data[6]?.result as number) || 6;
  const assetSymbol = (data[7]?.result as string) || "USDC";

  // Calculate user assets: (userShares * totalAssets) / totalSupply
  const userAssets =
    totalSupply > BigInt(0) ? (userShares * totalAssets) / totalSupply : BigInt(0);

  return {
    totalAssets,
    totalSupply,
    userShares,
    userAssets,
    assetBalance,
    allowance,
    assetDecimals,
    vaultDecimals,
    assetSymbol,
    formatted: {
      totalAssets: formatUnits(totalAssets, assetDecimals),
      userShares: formatUnits(userShares, vaultDecimals),
      userAssets: formatUnits(userAssets, assetDecimals),
      assetBalance: formatUnits(assetBalance, assetDecimals),
      allowance: formatUnits(allowance, assetDecimals),
    },
    isLoading,
    refetch,
  };
}
