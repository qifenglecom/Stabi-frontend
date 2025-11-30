
export const contracts = {
  chainId: 11155111,
  chainName: "sepolia",
  conservativeVaults: [
    {
        index: 0,
        key:"link",
        name: "Stabi LINK Vault",
        symbol: "stLINK",
        asset: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
        vault: "0x3d06c25Be426F2145D73352A621Fd4127abCBb3A",
        strategy: "0x2C188e26a8376F067A83eFBF9bfC2e763b20089c",
    }
  ],
  balancedVaults: [
    {
        index: 0,
        key:"link",
        name: "Stabi LINK Vault",
        symbol: "stLINK",
        asset: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
        vault: "0x3d06c25Be426F2145D73352A621Fd4127abCBb3A",
        strategy: "0x2C188e26a8376F067A83eFBF9bfC2e763b20089c",
    }

  ],   
  aggressiveVaults: [
    {
        index: 0,
        key:"link",
        name: "Stabi LINK Vault",
        symbol: "stLINK",
        asset: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
        vault: "0x3d06c25Be426F2145D73352A621Fd4127abCBb3A",
        strategy: "0x2C188e26a8376F067A83eFBF9bfC2e763b20089c",
    }
  ]
} as const;
