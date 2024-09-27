import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  generateSigner,
  keypairIdentity,
  percentAmount,
  sol,
  PublicKey,
} from "@metaplex-foundation/umi";
import { mockStorage } from "@metaplex-foundation/umi-storage-mock";
import base58 from "bs58";
import dotenv from "dotenv";
import * as fs from "fs";
// import { KeypairSigner } from "@metaplex-foundation/js";

dotenv.config();
// const ENDPOINT = "https://solana-devnet.g.alchemy.com/v2/ZUNPZEII_6QBHRPageVIpQDR7MyqzQfu";
const ENDPOINT = process.env.SOL_API_URL||"";
const umi = createUmi(ENDPOINT);


async function mintNft(metadataUri: string, pubKey:PublicKey) {
    try {
        const mint = generateSigner(umi);
        await createNft(umi, {
            mint,
            name: "nft_Name",
            symbol: "TST",
            uri: metadataUri,
            sellerFeeBasisPoints: percentAmount(1),
            creators: [{ address: pubKey, verified: true, share: 100 }],
        }).sendAndConfirm(umi)
        console.log(`Created NFT: ${mint.publicKey.toString()}`)
    } catch (e) {
        throw e;
    }
}

async function mintSOLNFT(metaURI:string) {
    // const imageUri = await uploadImage();
    console.log(process.env.SOL_API_URL)
    let fromPrivateKey = process.env.SOL_PRIVATE_KEY;
    console.log(fromPrivateKey)
    if (fromPrivateKey){
        let fromSecret=base58.decode(fromPrivateKey);
        const fromWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(fromSecret));
        const creator = createSignerFromKeypair(umi, fromWallet);

        umi.use(keypairIdentity(creator));
        umi.use(mplTokenMetadata());
        umi.use(mockStorage());

        // const metadataUri = "https://ipfs.filebase.io/ipfs/QmZgQSnbhveep8q3aXMM3NRsztCR8ytoRHQxJHnHcKmUeu"
        const metadataUri = metaURI;
        try{
          await mintNft(metadataUri, creator.publicKey);
        }catch(e){
          console.log(e)
        }

    }
}


module.exports = mintSOLNFT;
