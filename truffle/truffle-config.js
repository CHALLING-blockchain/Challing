module.exports = {
  contracts_build_directory: "../frontend/src/contracts",
  networks: {
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1",
      gasPrice: 2500000000,
    },
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
