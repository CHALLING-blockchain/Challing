import Web3 from "web3";


class Contract {
  constructor(){
    this.init()
  }
  async init(){
    this.Cartifact = require("../contracts/ChallengeContract.json");
    this.Vartifact = require("../contracts/VoteContract.json");
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/38d65d8f902943d38a2876a0f4f9ad49")
    );
    this.privateKey1 = 'af4dbb9a76fa1fc79b4db351615bf5b3154c4ded9cb1cf4330208b732ff61475';

    this.account1 = this.web3.eth.accounts.privateKeyToAccount(
      "0x" + this.privateKey1
    );

    this.web3.eth.accounts.wallet.add(this.account1);
    
    this.networkId = await this.web3.eth.net.getId();
    this.Cabi = this.Cartifact.abi;
    this.Caddress = this.Cartifact.networks[this.networkId].address;
    this.Ccontract = new this.web3.eth.Contract(this.Cabi, this.Caddress);

    this.Vabi = this.Vartifact.abi;
    this.Vaddress = this.Vartifact.networks[this.networkId].address;
    this.Vcontract = new this.web3.eth.Contract(this.Vabi, this.aVddress);
    
  }
  
  // ChallengeContract
  createDailyChallenge(daliyChallenge) {
    return this.Ccontract.methods.createDailyChallenge(daliyChallenge)
      .send({
        from: this.account1.address,
        gasLimit: 3_000_000,
        value:daliyChallenge.deposit*1e18
      })
      .catch(console.error);
  } 
  createDonationChallenge(donationChallenge) {
    return this.Ccontract.methods.createDonationChallenge(donationChallenge)
      .send({
        from: this.account1.address,
        gasLimit: 3_000_000,
        value:donationChallenge.setDonation*1e18
      })
      .catch(console.error);
  } 

  async getAllChallenge(){
    const challengeList= await this.Ccontract.methods
      .getAllChallenge()
      .call({
        from: this.account1.address,
      })
      .catch(console.error);

    // 일상 챌린지
    const challenges = {};
    challengeList[0].forEach((id, index) => {
      const challenge = Object.assign({}, challengeList[2][index]);
      const size = Object.keys(challenge).length;
      for (let i = 0; i < size / 2; i++) {
        delete challenge[i];
      }
      challenges[Number(id)] = challenge;
    });
    // 기부 챌린지
    challengeList[1].forEach((id, index) => {
      const challenge = Object.assign({}, challengeList[3][index]);
      const size = Object.keys(challenge).length;
      for (let i = 0; i < size / 2; i++) {
        delete challenge[i];
      }
      challenges[Number(id)] = challenge;
    });
    return challenges;
  } 

  joinChallenge(challengeId,userId,today,value) {
    return this.Ccontract.methods.joinChallenge(challengeId,userId,today)
      .send({
        from: this.account1.address,
        gasLimit: 3_000_000,
        value:value*1e18
      })
      .catch(console.error);
  } 
  getMyChallenge(userId) {
    return this.Ccontract.methods.getMyChallenge(userId)
      .call({
        from: this.account1.address,
      })
      .catch(console.error);
  } 
}

export default new Contract();