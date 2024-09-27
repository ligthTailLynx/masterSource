/**@type import('hardhat/config').HardhatUserConfig*/

require("dotenv");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const API_URL = process.env.ETH_API_URL;
const PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
