const HDWalletProvider = require("@truffle/hdwallet-provider")
const dotenv = require('dotenv');
dotenv.config();
let apiKey = process.env.POLYGON_ETHERSCAN_API_KEY;
let apiKeyEtherScan = process.env.ETHERSCAN_API_KEY;
let apiKeyBSCSCANAPIKEY = process.env.BSC_ETHERSCAN_API_KEY;
module.exports = {
	api_keys: {
    etherscan: apiKeyEtherScan,
    polygonscan: apiKey,
    bscscan: apiKeyBSCSCANAPIKEY
  },
	plugins: [
    'truffle-plugin-verify'
  ],
  networks: {
    mumbai: {
        provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://matic-mumbai.chainstacklabs.com`),
        network_id: 80001,
        confirmations: 2,
        timeoutBlocks: 200,
        skipDryRun: true,
        gas: 6000000,
        gasPrice: 71477486290,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/8da2357d709445f69b2f9df0a7329295"),
      network_id: 4,
      gas: 6000000,
      gasPrice: 71477486290,
    },
    bsctestnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.7.6",
      settings: {
        optimizer: {
          enabled : true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  }
}