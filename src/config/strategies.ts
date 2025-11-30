import type { VaultKey } from "@/hooks/useVault";

export type StrategyKey = "conservative" | "balanced" | "aggressive";

export const STRATEGY_VAULT_KEYS: Record<StrategyKey, VaultKey[]> = {
  // Conservative: Currently has LINK, USDC, USDT as placeholder vault keys in test environment
  conservative: ["link"],
  // Balanced and Aggressive can add more vault keys as needed
  balanced: ["link"],
  aggressive: ["link"],
};
