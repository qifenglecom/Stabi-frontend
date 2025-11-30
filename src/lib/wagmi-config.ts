import { createConfig, http } from "wagmi";
import { arbitrum, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { ENV } from "@/config";

// Select default chain based on environment
const chains = ENV.isProd 
  ? [arbitrum, sepolia] as const  // Production: Arbitrum first
  : [sepolia, arbitrum] as const; // Development: Sepolia first

export const wagmiConfig = createConfig({
  chains,
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
  },
});
