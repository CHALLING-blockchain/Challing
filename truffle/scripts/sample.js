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

  const daliyChallenge = {
    challengeId: 0,
    interestId: 1,
    ownerId: 1,
    name: "myChallene",
    desc: "desc",
    mainPicURL: "naver.com",
    goodPicURL: "naver.com",
    badPicURL: "naver.com",
    authTotalTimes: 10,
    authDayTimes: 1,
    startTime: 10,
    endTime: 11,
    startDate: "20220919",
    endDate: "20220919",
    personnel: 10,
    deposit: 1,

    totalDeposit: 0,

    complet: false,
  };

  // 챌린지 생성
  const createDailyChallenge = await Ccontract.methods
    .createDailyChallenge(daliyChallenge)
    .send({
      from: account1.address,
      gasLimit: 3_000_000,
      value: 1e18,
    })
    .catch(console.error);
  console.log("챌린지 생성");

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
