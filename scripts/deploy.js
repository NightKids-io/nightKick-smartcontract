const { ethers } = require("hardhat");
const { etherBalance, logGas } = require("../utils");
const { toWei } = require("../utils/format");
const { deployContract } = require("../utils/contracts");
const { verifyContract } = require("../utils/verify");

async function main() {
  const { chainId, name } = await ethers.provider.getNetwork();
  const [owner] = await ethers.getSigners();

  console.log(`Connected to name: ${name} & chainId: ${chainId}`);
  console.log(`Deploying contracts with the account: ${owner.address}`);
  console.log(
    `Owner balance: ${(await etherBalance(owner.address)).toString()}`
  );

  const args = [
    // "testing new created token",
    // "TCT",
    // toWei("6000000"),
    // owner.address,
    "0x83b7261DB8c795701C6fc86D1fcd073ece940E10",
  ];
  const testingContract = await deployContract(owner, "NightKicks", args);
  const tx = testingContract.deployTransaction;
  await logGas(tx);

  if (chainId != 31337 && chainId != 1337) {
    await verifyContract(testingContract.address, args, tx);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
