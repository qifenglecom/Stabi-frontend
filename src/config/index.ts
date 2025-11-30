import { contracts as sepoliaContracts } from "./contracts/sepolia";
import { contracts as arbitrumContracts } from "./contracts/arbitrum";

// Environment configuration
export const ENV = {
  isDev: process.env.NEXT_PUBLIC_ENV === 'development',
  isProd: process.env.NEXT_PUBLIC_ENV === 'production',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Stabi',
  // Default chain ID: use Sepolia for development, Arbitrum for production
  defaultChainId: parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || '11155111'),
};

export const CONTRACTS_BY_CHAIN = {
  [sepoliaContracts.chainId]: sepoliaContracts,
  [arbitrumContracts.chainId]: arbitrumContracts,
} as const;

export type ContractsConfig =
  (typeof CONTRACTS_BY_CHAIN)[keyof typeof CONTRACTS_BY_CHAIN];

// Get default contract configuration for current environment
export const getDefaultContracts = () => {
  return CONTRACTS_BY_CHAIN[ENV.defaultChainId as keyof typeof CONTRACTS_BY_CHAIN] || sepoliaContracts;
};
