const TreasureMonie = artifacts.require("TreasureMonie");

const tokens = (n) => web3.utils.toWei(n, `ether`);

contract("TreasureMonie", function (accounts) {
  describe("First Tests", () => {
    let tm;
    before(async () => {
      tm = await TreasureMonie.deployed();
    });

    // Test 1: it should have a  name, symbol, decimal and cap

    it("Should have a name, symbol, decimal and cap", async () => {
      const name = await tm.name();
      assert.strictEqual(
        name,
        "Treasure Monie Test",
        "Name not corresnponding"
      );
      const symbol = await tm.symbol();
      assert.strictEqual(symbol, "TMT", "Wrong Symbol");
      const dec = await tm.decimals();
      assert.strictEqual(dec.toString(), "18", "Wrong decimal");
      const cap = await tm.cap();
      assert.strictEqual(
        cap.toString(),
        tokens("1000"),
        "Wrong cap, or Cap not given"
      );
    });
    // Test 2: Should mint successfully
    it("Should Mint as programmed", async () => {
      await tm.mint.sendTransaction(accounts[1], { from: accounts[0] });

      const mintTime = await tm.mintingAllowedAfter();
      console.log(mintTime.toString());
      assert.strictEqual(
        mintTime.toString(),
        "1631283000",
        "Error Mint time diff"
      );
      const mintRemain = await tm.remainingMints();
      console.log(mintRemain.toString());
      assert.strictEqual(mintRemain.toString(), "2", "Erro, not correct");

      const nextMint = await tm.nextAllowedMint();
      console.log(nextMint.toString());
      assert.strictEqual(nextMint.toString(), tokens(`200`), "[message]");

      const mintAmt = await tm.mintAmountleft();
      console.log(mintAmt.toString());
      assert.strictEqual(mintAmt.toString(), tokens("400"), "[message]");
    });

    // Test 3 Verifying owner access
    // it("should have correct owner access", async () => {

    //   // checking it owner is acct that deployed
    //   let owner;
    //   owner = await tm.owner();
    //   console.log(owner);
    //   assert.equal(
    //     owner,
    //     0xb447164c9c4ee73a4b9a06c98756f0bcf7d377bd,
    //     "Not correct Owner"
    //   );

    //   try {
    //     await tm.mint.sendTransaction(tokens("200"), {
    //       from: accounts[1],
    //     });
    //     assert.fail(true, false, "[message]");
    //   } catch (err) {
    //     // console.log(err);
    //     assert.include(
    //       String(err),
    //       "revert",
    //       `Expected 'revert' but got ${err}`
    //     );
    //   }
    //   await tm.transferOwnership.sendTransaction(accounts[1], {
    //     from: accounts[0],
    //   });
    //   owner = await tm.owner();
    //   console.log(owner);
    //   await tm.renounceOwnership.sendTransaction({ from: accounts[1] });
    //   owner = await tm.owner();
    //   console.log(owner);
    // });
  });
});
