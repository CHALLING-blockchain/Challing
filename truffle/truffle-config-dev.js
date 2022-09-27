module.exports = {
  contracts_directory: "../truffle/contracts",
  contracts_build_directory: "../frontend/src/contracts",
  migrations_directory: "../truffle/migrations",
  networks: {
    loc_dev: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1",
    },
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.14",
    },
  },
};
