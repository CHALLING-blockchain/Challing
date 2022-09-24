const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "af4dbb9a76fa1fc79b4db351615bf5b3154c4ded9cb1cf4330208b732ff61475";


module.exports = {
  contracts_build_directory: "../frontend/src/contracts",
  networks: {
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1",
      gasPrice: 20000000000,
    },
    // ropsten: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/38d65d8f902943d38a2876a0f4f9ad49`),
    //   network_id: 3,       // Ropsten's id
    //   gas: 5500000,        // Ropsten has a lower block limit than mainnet
    //   confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    //  },
    //  testnet: {
    //   networkCheckTimeout: 10000,
    //   timeoutBlocks: 200
    // }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.14",
    },
  },
  solc: {
    version: "^0.8.0",

    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
