var HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = '*** *** *** ***';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://kovan.infura.io/v3/INFURA_API_KEY")
      },      
      network_id: 42,
      gas: 4000000,
      skipDryRun: true,
    },
    compilers: {
      solc: {
        version: "0.8.3",    // Fetch exact version from solc-bin (default: truffle's version)
        // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
        // settings: {          // See the solidity docs for advice about optimization and evmVersion
        //  optimizer: {
        //    enabled: false,
        //    runs: 200
        //  },
        //  evmVersion: "byzantium"
        // }
      }
    }
  }
};
