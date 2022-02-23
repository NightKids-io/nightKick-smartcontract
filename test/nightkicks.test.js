const { expect } = require("chai");
const { toWei } = require("../utils/index.js");
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
    });

    it("membership token should be false", async () => {
      let value = await token.usedMembershipToken(0);
      expect(value).to.equal(false);
    });
  });

  describe("Testing Membership Mint", async () => {
    it("Should mint token", async () => {
      await token.connect(owner).unLockSale();
      let price = 2 * toWei("0.06");
      await token
        .connect(owner)
        .buyWithMembershipToken(2, [0, 1], { value: String(price) });
    });

    it("check token of owner", async () => {
      expect(await token.balanceOf(owner.address)).to.equal("2");
    });

    it("Should fail minting with same id", async () => {
      let price = toWei("0.06");
      await expect(
        token
          .connect(owner)
          .buyWithMembershipToken(1, [0], { value: String(price) })
      ).to.be.revertedWith("ERROR: this Membership Token is already used");
    });
  });

  describe("Testing public mint", async () => {
    it("should fail when minting on closed sale", async () => {
      let price = 3 * toWei("0.08");
      await expect(
        token.connect(owner).publicMint(3, { value: String(price) })
      ).to.be.revertedWith("ERROR: not on sale'");
    });
  });
});
