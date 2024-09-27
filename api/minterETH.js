const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

require("dotenv").config();
const API_URL = process.env.ETH_API_URL || "";
const PUBLIC_KEY = process.env.ETH_PUBLIC_KEY || "";
const PRIVATE_KEY = process.env.ETH_PRIVATE_KEY || "";
const CONTACT_ADDRESS = process.env.ETH_CONTRACT_ADDRESS || "";

const web3 = createAlchemyWeb3(API_URL);
const contract = require("./artifacts/contracts/MyNFT.sol/MyNFT.json");

async function mintETHNFT(tokenURI) {
  try {
    const nftContract = new web3.eth.Contract(contract.abi, CONTACT_ADDRESS);
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: CONTACT_ADDRESS,
      nonce: nonce,
      gas: 500000,
      maxPriorityFeePerGas: 2999999987,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
    return JSON.stringify(transactionReceipt);
  } catch (e) {
    console.log(e);
    return "error";
  }
}

// mintNFT(
//   "https://ipfs.filebase.io/ipfs/QmSGkLgbMqasH3NS7C1RN5wfbJRrxiQVbDyUjGZAiGee2M"
// );
// async function mintETHNFT(metaURL) {
//   console.log(metaURL);
// }

module.exports = mintETHNFT;
