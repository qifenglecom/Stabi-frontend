import { createConfig, http } from "wagmi";
import { arbitrum, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { ENV } from "@/config";

// 根据环境选择默认链
const chains = ENV.isProd 
  ? [arbitrum, sepolia] as const  // 生产环境：Arbitrum 优先
  : [sepolia, arbitrum] as const; // 开发环境：Sepolia 优先

export const wagmiConfig = createConfig({
  chains,
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
  },
});
