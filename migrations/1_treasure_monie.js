const TreasureMonie = artifacts.require("TreasureMonie");

module.exports = async function (_deployer, network, accounts) {
  // Use deployer to state migration tasks.
  await _deployer.deploy(
    TreasureMonie,
    "Tress Test",
    "TT",
    "1000000000000000000000",
    "400000000000000000000",
    1631293221
  );
};
