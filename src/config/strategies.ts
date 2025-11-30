import type { VaultKey } from "@/hooks/useVault";

export type StrategyKey = "conservative" | "balanced" | "aggressive";

export const STRATEGY_VAULT_KEYS: Record<StrategyKey, VaultKey[]> = {
  // 稳健型：目前测试环境下有 LINK、USDC、USDT 三个占位 vault key
  conservative: ["link"],
  // 均衡型和进取型后续可以按需往里追加 vault key
  balanced: ["link"],
  aggressive: ["link"],
};
