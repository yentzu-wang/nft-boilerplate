require("dotenv").config()
const HDWalletProvider = require("truffle-hdwallet-provider")
const MNEMONIC = process.env.MNEMONIC
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY
const isInfura = !!process.env.INFURA_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const needsNodeAPI =
  process.env.npm_config_argv &&
  (process.env.npm_config_argv.includes("rinkeby") ||
    process.env.npm_config_argv.includes("live"))

if (
  (!MNEMONIC || MNEMONIC === "" || !NODE_API_KEY || NODE_API_KEY === "") &&
  needsNodeAPI
) {
  console.log("MNEMONIC", MNEMONIC)
  console.log("NODE_API_KEY", NODE_API_KEY)

  console.error("Please set a mnemonic and ALCHEMY_KEY or INFURA_KEY.")
  process.exit(0)
}

const rinkebyNodeUrl = isInfura
  ? "https://rinkeby.infura.io/v3/" + NODE_API_KEY
  : "https://eth-rinkeby.alchemyapi.io/v2/" + NODE_API_KEY

const mainnetNodeUrl = isInfura
  ? "https://mainnet.infura.io/v3/" + NODE_API_KEY
  : "https://eth-mainnet.alchemyapi.io/v2/" + NODE_API_KEY

module.exports = {
  networks: {
    development: {
      host: "localhost", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, rinkebyNodeUrl)
      },
      gas: 5000000,
      gasPrice: 50000000000,
      network_id: 4,
      networkCheckTimeout: 1000 * 120,
    },
    live: {
      network_id: 1,
      provider: function () {
        return new HDWalletProvider(MNEMONIC, mainnetNodeUrl)
      },
      gas: 5000000,
      gasPrice: 5000000000,
      networkCheckTimeout: 1000 * 120,
    },
  },
  contracts_directory: "./contracts/",
  contracts_build_directory: "./abis",
  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
  },
}
