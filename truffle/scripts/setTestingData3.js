const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://j7b106.p.ssafy.io:8545")
);

const Cartifact = require("../../frontend/src/contracts/ChallengeContract.json");
const Vartifact = require("../../frontend/src/contracts/VoteContract.json");

const simulation = async () => {
  const networkId = await web3.eth.net.getId();
  const Cabi = Cartifact.abi;
  const Caddress = Cartifact.networks[networkId].address;
  const Ccontract = new web3.eth.Contract(Cabi, Caddress);

  const Vabi = Vartifact.abi;
  const Vaddress = Vartifact.networks[networkId].address;
  const Vcontract = new web3.eth.Contract(Vabi, Vaddress);

  const accounts = await web3.eth.getAccounts();

  const daliyChallenge = {
    challengeId: 0,
    interestId: 0,
    ownerId: 1,
    name: "새벽 운동하기",
    desc: "매일 하루 한장 독서를 통해 마음의 양식을 쌓아보아요\n책을 펼쳐서 인증사진을 찍어주세요.\n책 표지만 찍은 사진은 인정이 되지 않습니다.",
    mainPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/a8b1af2c-73d0-41d0-bf45-a024c84c122b.jpg",
    goodPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/fd7bdded-0650-4d5d-9d43-da51bb7bb200.jpg",
    badPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/acd846c5-4c6f-4585-9087-91004245a1e9.jpg",
    authTotalTimes:7,
    authWeekTimes: 7,
    authDayTimes: 1,
    startTime: 6,
    endTime: 8,
    startDate: "2022-10-07",
    endDate: "2022-10-14",
    personnel: 10,
    deposit: 1e8,

    totalDeposit: 1e8,

    complete: false,
  };
//   console.log(accounts)
    let challengeId;
  const createDailyChallenge = await Ccontract.methods
    .createDailyChallenge(daliyChallenge)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
      value: 1e17,
    })
    .on("receipt",(r)=>{
        challengeId=r.events.returnChallengeId.returnValues['challengeId']})
    .catch(console.error);
  console.log("챌린지 생성");

  // 조항주 참가
  const joinChallenge1 = await Ccontract.methods
      .joinChallenge(challengeId, 358, 0)
      .send({
        from: accounts[4],
        gasLimit: 3_000_000,
        value: 1e17,
      })
      .catch(console.error);

  // 잠송 참가
  const joinChallenge3 = await Ccontract.methods
      .joinChallenge(challengeId, 118, 0)
      .send({
        from: accounts[5],
        gasLimit: 3_000_000,
        value: 1e17,
      })
      .catch(console.error);


    
};

simulation();
