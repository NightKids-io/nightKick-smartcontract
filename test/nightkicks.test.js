const { expect } = require("chai");
// const { toWei } = require("../utils/index.js");
const { deployContract } = require("../utils/contracts");

describe("NightKicks", async () => {
  let nightKicks;
  beforeEach(async () => {
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
  });
});
