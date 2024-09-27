require("dotenv").config();

const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x3a1952952b04aba42b9b7943e3b617e456dc9db4";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const PRIVATE_KEY = process.env.PRIVATE_KEY;
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    maxPriorityFeePerGas: 1999999987,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

mintNFT(
  "https://ipfs.filebase.io/ipfs/Qmb5fsvofbjMuNB2Zm4vqSh3GWuRuaysXCho9CJqEkmYx9"
);
