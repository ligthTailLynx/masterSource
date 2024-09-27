import { createThirdwebClient } from "thirdweb";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { getWalletBalance, privateKeyToAccount } from "thirdweb/wallets";

import { getOwnedNFTs } from "thirdweb/extensions/erc1155";

const WebDrei = function () {
  const client = createThirdwebClient({
    secretKey:
      "r3OLIGAMlUHezH-1T1ROmWForvJfhKLdl7m-BfU-ncEbsBiwMfB4B51n06mEZY9ZufqfnQ0z61_l5hkXVUvGsQ",
  });

  //   2. get the contract
  const contract = getContract({
    client,
    chain: sepolia,
    address: "7o2NCRPnUA86USogHLDhr9n7VraZceXykeZdk6E7qCoz",
  });

  //   const account = privateKeyToAccount({
  //     client,
  //     privateKey:
  //       "0x80b440fb42a0709cd1d8dea0603554888dcd4fd028f2f0432c495a9b8ee625c2",
  //   });
  //   console.log(account);

  //   const balancePromise = getWalletBalance({
  //     client,
  //     chain: sepolia,
  //     address: "0x6791572B26137FBc9fD9C6F821219BC939d93A",
  //   });
  //   balancePromise.then((balance) => {
  //     console.log("Balance:", balance.displayValue, balance.symbol);
  //   });

  // 3. call the extension function
  // const ownedNFTs = await getOwnedNFTs({
  //   contract,
  //   address: "0x1234...",
  // });

  // console.log(ownedNFTs);
};

export default WebDrei;
