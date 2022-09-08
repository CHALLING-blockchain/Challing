module.exports = {
  contracts_build_directory: "../frontend/src/contracts",
  networks: {
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.14"
    }
  }
};
