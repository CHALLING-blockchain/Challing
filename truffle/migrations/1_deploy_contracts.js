const ChallengeContract = artifacts.require("ChallengeContract");
// const PassCoinContract = artifacts.require("PassCoinContract");
const VoteContract = artifacts.require("VoteContract");


module.exports = function (deployer) {
  deployer.deploy(ChallengeContract);
  // deployer.deploy(PassCoinContract);
  deployer.deploy(VoteContract);

};
