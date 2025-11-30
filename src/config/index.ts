import { contracts as sepoliaContracts } from "./contracts/sepolia";
import { contracts as arbitrumContracts } from "./contracts/arbitrum";

// 环境配置
export const ENV = {
  isDev: process.env.NEXT_PUBLIC_ENV === 'development',
  isProd: process.env.NEXT_PUBLIC_ENV === 'production',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Stabi',
  // 默认链ID：开发环境用 Sepolia，生产环境用 Arbitrum
  defaultChainId: parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || '11155111'),
};

export const CONTRACTS_BY_CHAIN = {
  [sepoliaContracts.chainId]: sepoliaContracts,
  [arbitrumContracts.chainId]: arbitrumContracts,
} as const;

export type ContractsConfig =
  (typeof CONTRACTS_BY_CHAIN)[keyof typeof CONTRACTS_BY_CHAIN];

// 获取当前环境的默认合约配置
export const getDefaultContracts = () => {
  return CONTRACTS_BY_CHAIN[ENV.defaultChainId as keyof typeof CONTRACTS_BY_CHAIN] || sepoliaContracts;
};
