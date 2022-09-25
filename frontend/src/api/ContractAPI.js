import Web3 from "web3";


class ContractAPI {
  constructor(){
    this.init()
  }
  async init(){
    this.Cartifact = require("../contracts/ChallengeContract.json");
    this.Vartifact = require("../contracts/VoteContract.json");
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/38d65d8f902943d38a2876a0f4f9ad49")
    );
    this.privateKey1 = '446f29790263af454613250ef0cbe1809cf81174729478d2a43b3c95f9e3aa96';

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
    this.account= await this.web3.eth.getAccounts()
  }
  
  // ChallengeContract
  async getAllChallenge(){
    await this.init()
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

  async joinChallenge(challengeId,userId,today,value) {
    await this.init()
    return this.Ccontract.methods.joinChallenge(challengeId,userId,today)
      .send({
        from: this.account1.address,
        gasLimit: 3_000_000,
        value:value*1e18
      })
      .catch(console.error);
  } 
  async getMyChallenge(userId) {
    await this.init()
    return this.Ccontract.methods.getMyChallenge(userId)
      .call({
        from: this.account1.address,
      })
      .catch(console.error);
  } 
  async authenticate(challengeId,userId,today,picURL) {
    await this.init()

    // 챌린저 정보 가져오기
    const info=await this.Ccontract.methods.findingChallenger(challengeId,userId)
    .call({
      from: this.account1.address,
    })
    .catch(console.error);
    
    const challengerId=info[0]
    const userIdIndex=info[1]
    const challengeIdIndex=info[2]

    // 사진 저장
    this.Vcontract.methods.addPhoto(challengerId,userId,picURL,today)
      .send({
        from: this.account1.address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);

    
    // 인증
    return this.Ccontract.methods.authenticate(challengeId,userId,challengerId,userIdIndex,challengeIdIndex,today)
      .send({
        from: this.account1.address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 

  
  async getChallengers(challengeId) {
    await this.init()
    return this.Ccontract.methods.getChallengers(challengeId)
      .call({
        from: this.account1.address,
      })
      .catch(console.error);
  } 
  async getChallengersByUserId(userId) {
    await this.init()
    return this.Ccontract.methods.getChallengersByUserId(userId)
      .call({
        from: this.account1.address,
      })
      .catch(console.error);
  } 
  
  // ChallengerContract
  async refund(address,challengeId,userId) {
    await this.init()
    // 챌린저 정보 가져오기
    const info=await this.Ccontract.methods.findingChallenger(challengeId,userId)
    .call({
      from: this.account1.address,
    })
    .catch(console.error);
    
    const challengerId=info[0]

    return this.Ccontract.methods.refund(challengerId)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 
  async usePasscoin(address,challengeId,userId) {
    await this.init()
    // 챌린저 정보 가져오기
    const info=await this.Ccontract.methods.findingChallenger(challengeId,userId)
    .call({
      from: this.account1.address,
    })
    .catch(console.error);
    
    const challengerId=info[0]
    const userIdIndex=info[1]
    const challengeIdIndex=info[2]

    return this.Ccontract.methods.usePasscoin(challengeId,userId,challengerId,userIdIndex, challengeIdIndex)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 
  async applyVoteResult(address, challengeId,userId) {
    await this.init()
    // 챌린저 정보 가져오기
    const info=await this.Ccontract.methods.findingChallenger(challengeId,userId)
    .call({
      from: this.account1.address,
    })
    .catch(console.error);
    
    const challengerId=info[0]
    const userIdIndex=info[1]
    const challengeIdIndex=info[2]

    return this.Ccontract.methods.applyVoteResult(challengeId,userId,challengerId,userIdIndex, challengeIdIndex)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 
  async receivePasscoin(address, userIdList) {
    await this.init()
    return this.Ccontract.methods.receivePasscoin(userIdList)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 

  // DailyChallengeContract
  async createDailyChallenge(dailyChallenge) {
    await this.init()
    return this.Ccontract.methods.createDailyChallenge(dailyChallenge)
      .send({
        from: this.account1.address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 
  async endDailyChallenge(address, challengeId) {
    await this.init()
    return this.Ccontract.methods.endDailyChallenge(challengeId)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 

  // DonationChallengeContract
  async createDonationChallenge(address,donationChallenge) {
    await this.init()
    return this.Ccontract.methods.createDonationChallenge(donationChallenge)
      .send({
        from: address,
        gasLimit: 3_000_000,
        value:donationChallenge.setDonation*1e18
      })
      .catch(console.error);
  } 

  async endDonationChallenge(address, challengeId) {
    await this.init()

    return this.Ccontract.methods.endDonationChallenge(challengeId)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 

  async getAllDonation(address) {
    await this.init()

    return this.Ccontract.methods.getAllDonation()
      .call({
        from: address,
      })
      .catch(console.error);
  } 
  
  // PhotoContract
  async getChallengerPhoto(address,challengerId) {
    await this.init()

    return this.Vcontract.methods.getChallengerPhoto(challengerId)
      .call({
        from: address,
      })
      .catch(console.error);
  } 

  async report(address, challengeId,photoId, userId) {
    await this.init()

    return this.Vcontract.methods.report( challengeId,photoId, userId)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 
  async voting(address, challengeId,userId,  voteId,  pass) {
    await this.init()

    return this.Vcontract.methods.voting(challengeId,userId,  voteId,  pass)
      .send({
        from: address,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  } 
  async endVote(address,voteId) {
    await this.init()

    return this.Vcontract.methods.endVote(voteId)
      .call({
        from: address,
      })
      .catch(console.error);
  } 
  async getChallengeVote(address,challengeId) {
    await this.init()

    return this.Vcontract.methods.getChallengeVote(challengeId)
      .call({
        from: address,
      })
      .catch(console.error);
  } 

}


export default new ContractAPI();