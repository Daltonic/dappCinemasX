require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/7ea3f80880ee4e1ea1f7a30a4d7daeab',
      accounts: ['0e422f297b0b81bc7489e24c6d81251d667b1199e7bbce26a5040f982c73787f']
    }
  },
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
}
