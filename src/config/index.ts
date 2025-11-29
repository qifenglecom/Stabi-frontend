import { contracts as sepoliaContracts } from "./contracts/sepolia";
import { contracts as arbitrumContracts } from "./contracts/arbitrum";

export const CONTRACTS_BY_CHAIN = {
  [sepoliaContracts.chainId]: sepoliaContracts,
  [arbitrumContracts.chainId]: arbitrumContracts,
} as const;

export type ContractsConfig =
  (typeof CONTRACTS_BY_CHAIN)[keyof typeof CONTRACTS_BY_CHAIN];
