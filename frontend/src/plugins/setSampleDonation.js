import Web3 from "web3";
const init= async() =>{
    
    const Vartifact = require("../contracts/VoteContract.json");
    const infuraUrl =
      "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_API_KEY;
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    this.privateKey1 = process.env.REACT_APP_METAMASK_PRIVATE_KEY;

    this.account1 = this.web3.eth.accounts.privateKeyToAccount(
      "0x" + this.privateKey1
    );

    const web3.eth.accounts.wallet.add(this.account1);

    const networkId = await this.web3.eth.net.getId();
    const Cabi = this.Cartifact.abi;
    const Caddress = this.Cartifact.networks[this.networkId].address;
    const Ccontract = new this.web3.eth.Contract(this.Cabi, this.Caddress);

    const Vabi = this.Vartifact.abi;
    const Vaddress = this.Vartifact.networks[this.networkId].address;
    const Vcontract = new this.web3.eth.Contract(this.Vabi, this.aVddress);
    const accounts = await this.web3.eth.getAccounts();
    const account=this.accounts[0]

    const donation0 = {
        id: 0,
        name:"국경없는 의사회",
        donationAddress:"",
        donationURL:"https://msf.or.kr/"
    };
    const donation1 = {
        id: 1,
        name:"세이브더 칠드런",
        donationAddress:"",
        donationURL:"https://www.sc.or.kr/"
    };
    const donation2 = {
        id: 2,
        name:"초록우산",
        donationAddress:"",
        donationURL:"https://www.childfund.or.kr/"
    };
    const donation3 = {
        id: 3,
        name:"월드비전",
        donationAddress:"",
        donationURL:"https://worldshare.or.kr/"
    };
    const donation4 = {
        id: 4,
        name:"유니세프",
        donationAddress:"",
        donationURL:"https://www.unicef.or.kr/"
    };


    const createDailyChallenge = await Ccontract.methods
        .addDonation(daliyChallenge)
        .send({
            from: account1.address,
            gasLimit: 3_000_000,
            value: 1e18,
        })
        .catch(console.error);
    console.log("챌린지 생성");
}

const Web3 = require("web3");
const infuraUrl =
  "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_API_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://localhost:7545")
);

const Cartifact = require("../../frontend/src/contracts/ChallengeContract.json");
const Vartifact = require("../../frontend/src/contracts/VoteContract.json");

const simulation = async () => {
  const networkId = await web3.eth.net.getId();
  // 챌린지 컨트랙트 생성
  const Cabi = Cartifact.abi;
  const Caddress = Cartifact.networks[networkId].address;
  const Ccontract = new web3.eth.Contract(Cabi, Caddress);

  // 보트 컨트랙트 생성
  const Vabi = Vartifact.abi;
  const Vaddress = Vartifact.networks[networkId].address;
  const Vcontract = new web3.eth.Contract(Vabi, Vaddress);

  // 본인 메타마스크 프라이빗키 넣기
  const privateKey1 = process.env.REACT_APP_METAMASK_PRIVATE_KEY;

  // 프라이빗키로 계정 만들어줌
  const account1 = web3.eth.accounts.privateKeyToAccount("0x" + privateKey1);

  // web3에 메타마스크 계정 추가
  web3.eth.accounts.wallet.add(account1);

  

  // 챌린지 생성
  

  // 모든 챌린지 조회
  const getAllChallenge = await Ccontract.methods
    .getAllChallenge()
    .call({
      from: account1.address,
    })
    .catch(console.error);

  // 일상 챌린지
  const challenges = {};
  getAllChallenge[0].forEach((id, index) => {
    const challenge = Object.assign({}, getAllChallenge[2][index]);
    const size = Object.keys(challenge).length;
    for (let i = 0; i < size / 2; i++) {
      delete challenge[i];
    }
    challenges[Number(id)] = challenge;
  });

  // 기부 챌린지
  getAllChallenge[1].forEach((id, index) => {
    const challenge = Object.assign({}, getAllChallenge[3][index]);
    const size = Object.keys(challenge).length;
    for (let i = 0; i < size / 2; i++) {
      delete challenge[i];
    }
    challenges[Number(id)] = challenge;
  });
  console.log(challenges);
};

simulation();



