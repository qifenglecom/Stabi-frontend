import { useReadContract } from "wagmi";
import { contracts as sepoliaContracts } from "@/config/contracts/sepolia";
import poolAbi from "@/abis/aave/pool.json";

/**
 * Read asset supply APY from Aave Pool
 * @param assetAddress - ERC20 asset address
 * @returns APY percentage string (e.g., "3.42")
 */
export function useAaveAPY(assetAddress: `0x${string}` | undefined) {
  const { data, isLoading } = useReadContract({
    address: sepoliaContracts.aavePool,
    abi: poolAbi,
    functionName: "getReserveData",
    args: assetAddress ? [assetAddress] : undefined,
    query: {
      enabled: !!assetAddress,
      // Refresh every 30 seconds
      refetchInterval: 30000,
    },
  });

  // Calculate APY
  const calculateAPY = (liquidityRate: bigint): string => {
    // Aave's currentLiquidityRate is the annualized rate (APR) in Ray format
    // Need to convert to compound APY
    // Formula: APY = ((1 + APR/secondsPerYear)^secondsPerYear - 1) * 100
    
    if (!liquidityRate || liquidityRate === BigInt(0)) {
      return "0.00";
    }

    const RAY = 1e27; // Use scientific notation for clarity
    const SECONDS_PER_YEAR = 31536000; // 365 * 24 * 60 * 60
    
    // Step 1: Convert Ray format to decimal (this is APR)
    const depositAPR = Number(liquidityRate) / RAY;
    
    // Step 2: Calculate compound APY
    // APY = (1 + APR/secondsPerYear)^secondsPerYear - 1
    // Use logarithm to avoid overflow: exp(log(1 + r) * n) - 1
    const ratePerSecond = depositAPR / SECONDS_PER_YEAR;
    const depositAPY = Math.exp(Math.log(1 + ratePerSecond) * SECONDS_PER_YEAR) - 1;
    const apy = depositAPY * 100;
    
    console.log("Liquidity Rate (APR):", depositAPR);
    console.log("Rate per second:", ratePerSecond);
    console.log("Deposit APY:", depositAPY);
    console.log("APY (%):", apy);
    
    // Prevent abnormal values
    if (!Number.isFinite(apy)) {
      console.error("APY calculation resulted in Infinity");
      return "N/A";
    }
    
    // Reasonable range check: 0-10000% (DeFi may have extremely high yields)
    if (apy < 0 || apy > 10000) {
      console.warn("APY out of reasonable range:", apy);
      return "N/A";
    }
    
    return apy.toFixed(2);
  };

  if (!data || isLoading) {
    return { apy: null, isLoading };
  }

  // Debug: print complete data
  console.log("Aave Reserve Data:", data);

  // Pool.getReserveData returns a tuple, currentLiquidityRate is at index 2
  const reserveData = data as any;
  const currentLiquidityRate = reserveData.currentLiquidityRate as bigint;
  
  console.log("Current Liquidity Rate:", currentLiquidityRate?.toString());
  
  const apy = calculateAPY(currentLiquidityRate);

  return { apy, isLoading: false };
}
