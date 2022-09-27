import Web3 from "web3";

class ContractAPI {
  constructor(address) {
    this.init(address);
  }
  async init(address) {
    this.Cartifact = require("../contracts/ChallengeContract.json");
    this.Vartifact = require("../contracts/VoteContract.json");
    const infuraUrl =
      "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_API_KEY;
    const local = "http://localhost:7545";
    this.web3 = new Web3(new Web3.providers.HttpProvider(local));
    if (address !== undefined) {
      this.account = address;
    }
    // console.log("init: ", this.account);
    this.networkId = await this.web3.eth.net.getId();
    this.Cabi = this.Cartifact.abi;
    this.Caddress = this.Cartifact.networks[this.networkId].address;
    this.Ccontract = new this.web3.eth.Contract(this.Cabi, this.Caddress);
    // this.accounts = await this.web3.eth.getAccounts();
    this.Vabi = this.Vartifact.abi;
    this.Vaddress = this.Vartifact.networks[this.networkId].address;
    this.Vcontract = new this.web3.eth.Contract(this.Vabi, this.aVddress);
  }

  // ChallengeContract
  async getAllChallenge() {
    await this.init();

    const challengeList = await this.Ccontract.methods
      .getAllChallenge()
      .call({
        from: this.account,
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

  async joinChallenge(challengeId, userId, today, value) {
    await this.init();
    return this.Ccontract.methods
      .joinChallenge(challengeId, userId, today)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
        value: value * 1e18,
      })
      .catch(console.error);
  }
  async getMyChallenge(userId) {
    await this.init();
    return this.Ccontract.methods
      .getMyChallenge(userId)
      .call({
        from: this.account,
      })
      .catch(console.error);
  }
  async authenticate(challengeId, userId, today, picURL) {
    await this.init();

    // 챌린저 정보 가져오기
    const info = await this.Ccontract.methods
      .findingChallenger(challengeId, userId)
      .call({
        from: this.account,
      })
      .catch(console.error);

    const challengerId = info[0];
    const userIdIndex = info[1];
    const challengeIdIndex = info[2];

    // 사진 저장
    this.Vcontract.methods
      .addPhoto(challengerId, userId, picURL, today)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);

    // 인증
    return this.Ccontract.methods
      .authenticate(
        challengeId,
        userId,
        challengerId,
        userIdIndex,
        challengeIdIndex,
        today
      )
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  async getChallengers(challengeId) {
    await this.init();
    return this.Ccontract.methods
      .getChallengers(challengeId)
      .call({
        from: this.account,
      })
      .catch(console.error);
  }
  async getChallengersByUserId(userId) {
    await this.init();

    const challengers = await this.Ccontract.methods
      .getChallengersByUserId(userId)
      .call({
        from: this.account,
      })
      .catch(console.error);
    const result = challengers.map((el) => {
      const challenge = Object.assign({}, el);
      const size = Object.keys(challenge).length;
      for (let i = 0; i < size / 2; i++) {
        delete challenge[i];
      }
      return challenge;
    });

    return result;
  }

  // ChallengerContract
  async refund(challengeId, userId) {
    await this.init();
    // 챌린저 정보 가져오기
    const info = await this.Ccontract.methods
      .findingChallenger(challengeId, userId)
      .call({
        from: this.account,
      })
      .catch(console.error);

    const challengerId = info[0];

    return this.Ccontract.methods
      .refund(challengerId)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }
  async usePasscoin(challengeId, userId) {
    await this.init();
    // 챌린저 정보 가져오기
    const info = await this.Ccontract.methods
      .findingChallenger(challengeId, userId)
      .call({
        from: this.account,
      })
      .catch(console.error);

    const challengerId = info[0];
    const userIdIndex = info[1];
    const challengeIdIndex = info[2];

    return this.Ccontract.methods
      .usePasscoin(
        challengeId,
        userId,
        challengerId,
        userIdIndex,
        challengeIdIndex
      )
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }
  async applyVoteResult(challengeId, userId) {
    await this.init();
    // 챌린저 정보 가져오기
    const info = await this.Ccontract.methods
      .findingChallenger(challengeId, userId)
      .call({
        from: this.account,
      })
      .catch(console.error);

    const challengerId = info[0];
    const userIdIndex = info[1];
    const challengeIdIndex = info[2];

    return this.Ccontract.methods
      .applyVoteResult(
        challengeId,
        userId,
        challengerId,
        userIdIndex,
        challengeIdIndex
      )
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }
  async receivePasscoin(userIdList) {
    await this.init();
    return this.Ccontract.methods
      .receivePasscoin(userIdList)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  // DailyChallengeContract
  async createDailyChallenge(dailyChallenge) {
    await this.init();
    console.log("생성할때 계정", this.account);
    if (this.account !== undefined && this.account !== "") {
      return this.Ccontract.methods
        .createDailyChallenge(dailyChallenge)
        .send({
          from: this.account,
          gasLimit: 3_000_000,
        })
        .catch(console.error);
    }
  }

  async endDailyChallenge(challengeId) {
    await this.init();
    return this.Ccontract.methods
      .endDailyChallenge(challengeId)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  // DonationChallengeContract
  async createDonationChallenge(donationChallenge) {
    await this.init();
    if (this.account !== undefined && this.account !== "") {
      console.log("donationChallenge", donationChallenge);

      return this.Ccontract.methods
        .createDonationChallenge(donationChallenge)
        .send({
          from: this.account,
          gasLimit: 3_000_000,
          value: donationChallenge.setDonation, // * 1e18 이자식 문자열이었어....
        })
        .catch(console.error);
    }
  }

  async endDonationChallenge(challengeId) {
    await this.init();

    return this.Ccontract.methods
      .endDonationChallenge(challengeId)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  async getAllDonation() {
    await this.init();

    return this.Ccontract.methods
      .getAllDonation()
      .call({
        from: this.account,
      })
      .catch(console.error);
  }

  // PhotoContract
  async getChallengerPhoto(challengerId) {
    await this.init();

    return this.Vcontract.methods
      .getChallengerPhoto(challengerId)
      .call({
        from: this.account,
      })
      .catch(console.error);
  }

  async report(challengeId, photoId, userId) {
    await this.init();

    return this.Vcontract.methods
      .report(challengeId, photoId, userId)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }
  async voting(challengeId, userId, voteId, pass) {
    await this.init();

    return this.Vcontract.methods
      .voting(challengeId, userId, voteId, pass)
      .send({
        from: this.account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }
  async endVote(voteId) {
    await this.init();

    return this.Vcontract.methods
      .endVote(voteId)
      .call({
        from: this.account,
      })
      .catch(console.error);
  }
  async getChallengeVote(challengeId) {
    await this.init();

    return this.Vcontract.methods
      .getChallengeVote(challengeId)
      .call({
        from: this.account,
      })
      .catch(console.error);
  }

  async getPasscoin() {
    await this.init();
    if (this.account !== undefined) {
      return this.Ccontract.methods
        .balanceOf(this.account)
        .call({
          from: this.account,
        })
        .catch(console.error);
    }
  }
}

export default ContractAPI;
