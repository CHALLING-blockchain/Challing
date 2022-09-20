const ChallengeContract = artifacts.require("ChallengeContract");
// const PassCoinContract = artifacts.require("PassCoinContract");
module.exports = function (deployer) {
  deployer.deploy(ChallengeContract);
  // deployer.deploy(PassCoinContract);
};
