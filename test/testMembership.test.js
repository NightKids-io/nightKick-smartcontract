// const { expect } = require("chai");
// const { toWei } = require("../utils/index.js");
// const { deployContract } = require("../utils/contracts");

// describe("Membership", () => {
//   let token;

//   beforeEach(async () => {
//     [owner, user, ...accounts] = await ethers.getSigners();
//     const arg = [];
//     token = await deployContract(owner, "Membership", arg);
//     console.log(token.address);
//   });

//   describe("Testing contract deployment", async () => {
//     it("total supply", async () => {
//       await token.connect(owner).preMint();
//       const totalSupply = await token.totalSupply();
//       expect(totalSupply).to.equal("20");
//     });
//   });

//   describe("Testing preminting", async () => {
//     it("Should mint 10 nft", async () => {
//       await token.connect(owner).preMint();
//       expect(await token.balanceOf(owner.address)).to.equal("20");
//     });
//   });
// });
