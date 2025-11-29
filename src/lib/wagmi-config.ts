import { createConfig, http } from "wagmi";
import { arbitrum, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [sepolia, arbitrum],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
  },
});
