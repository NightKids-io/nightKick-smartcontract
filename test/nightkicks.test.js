const { expect } = require("chai");
// const { toWei } = require("../utils/index.js");
const { deployContract } = require("../utils/contracts");

describe("NightKicks", async () => {
  let token;
  before(async () => {
    [owner, user, ...accounts] = await ethers.getSigners();
    let memberShipToken = await deployContract(owner, "Membership", []);
    token = await deployContract(owner, "NightKicks", [
      memberShipToken.address,
    ]);
  });

  describe("Testing contract deployment", async () => {
    it("has a name", async () => {
      let name = await token.name();
      expect(name).to.equal("NightKicks");
    });

    it("Membership Sale should be locked", async () => {
      let sale = await token.sale();
      expect(sale).to.equal(false);
    });

    it("Public Sale should be locked", async () => {
      let sale = await token.publicSale();
      expect(sale).to.equal(false);
      console.log(token.address);
    });

    it("membership token should be false", async () => {
      let value = await token.usedMembershipToken(0);
      expect(value).to.equal(false);
      console.log(token.address);
    });
  });

  describe("Testing Membership Mint", async () => {
    it("Should mint token", async () => {
      await token.connect(owner).unLockSale();
      await token.connect(owner).buyWithMembershipToken(2, [0, 1]);
      console.log(token.address);
    });

    // it("Should fail minting with same id", async () => {
    //   expect(
    //     await token.connect(owner).buyWithMembershipToken(1, [0])
    //   ).to.be.revertedWith("ERROR: this Membership Token is already used");
    // });

    // it("check if owner has token", async () => {
    //   expect(await token.totalSupply()).to.equal("1");
    // });
  });
});
