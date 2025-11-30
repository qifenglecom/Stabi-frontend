import { useMemo } from "react";
import { useChainId } from "wagmi";

import { CONTRACTS_BY_CHAIN } from "@/config";
import { contracts as sepoliaContracts } from "@/config/contracts/sepolia";

// Vault key based on the key field of sepolia conservativeVaults
export type VaultKey =
  (typeof sepoliaContracts.conservativeVaults)[number]["key"];

type ChainContracts = typeof sepoliaContracts;

export function useVault(key: VaultKey) {
  const chainId = useChainId();

  const contracts: ChainContracts = useMemo(() => {
    const raw =
      CONTRACTS_BY_CHAIN[chainId as keyof typeof CONTRACTS_BY_CHAIN] ??
      sepoliaContracts;

    return raw as ChainContracts;
  }, [chainId]);

  const vault = contracts.conservativeVaults.find((v) => v.key === key);

  return {
    chainId: contracts.chainId,
    vault,
  };
}
