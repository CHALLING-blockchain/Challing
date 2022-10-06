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

  const daliyChallenge1 = {
    challengeId: 0,
    interestId: 2,
    ownerId: 1,
    name: "일회용품 줄이기",
    desc: "일회용품 줄이기 챌린지 입니다.\n하루에 일회용품을 줄이기 위해 한 일을 찍어 인증해주세요!\n그 외의 사진들은 인정이 되지 않습니다.",
    mainPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/4ab46c50-4410-4a6b-95cf-9f2da07ffcb4.jpg",
    goodPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/ce5a14df-a180-4741-a9ca-d4f73dae7336.jpg",
    badPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/e8a8e124-f482-448e-8f3c-508cb8cb5101.jpg",
    authTotalTimes: 7,
    authWeekTimes: 7,
    authDayTimes: 1,
    startTime: 0,
    endTime: 24,
    startDate: "2022-09-29",
    endDate: "2022-10-06",
    personnel: 10,
    deposit: 1e8,

    totalDeposit: 1e8,

    complete: false,
  };
//   console.log(accounts)
    let challengeId;
  const createDailyChallenge = await Ccontract.methods
    .createDailyChallenge(daliyChallenge1)
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
      .joinChallenge(challengeId, 21, 0)
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


    //조항주 인증
    const findingChallenger1 = await Ccontract.methods
    .findingChallenger(challengeId, 21)
    .call({
        from: accounts[0],
    })
    .catch(console.error);

    for (let i = 0; i < 7; i++) {
    const authenticate1 = await Ccontract.methods
        .authenticate(
            challengeId,
            21,
        findingChallenger1[0],
        findingChallenger1[1],
        findingChallenger1[2],
        `${i}`
        )
        .send({
        from: accounts[4],
        gasLimit: 3_000_000,
        })
    .catch(console.error);
    }

    //잠송 인증
    const findingChallenger2 = await Ccontract.methods
    .findingChallenger(challengeId, 118)
    .call({
        from: accounts[5],
    })
    .catch(console.error);

    for (let i = 0; i < 4; i++) {
    const authenticate2 = await Ccontract.methods
        .authenticate(
            challengeId,
            118,
        findingChallenger2[0],
        findingChallenger2[1],
        findingChallenger2[2],
        `${i}`
        )
        .send({
        from: accounts[5],
        gasLimit: 3_000_000,
        })
    .catch(console.error);
    }

    //만두 인증
    const findingChallenger3 = await Ccontract.methods
    .findingChallenger(challengeId, 1)
    .call({
        from: accounts[7],
    })
    .catch(console.error);

    for (let i = 0; i < 3; i++) {
    const authenticate3 = await Ccontract.methods
        .authenticate(
            challengeId,
            1,
        findingChallenger3[0],
        findingChallenger3[1],
        findingChallenger3[2],
        `${i}`
        )
        .send({
        from: accounts[7],
        gasLimit: 3_000_000,
        })
    .catch(console.error);
    }
    const endDailyChallenge = await Ccontract.methods
        .endDailyChallenge(challengeId)
        .send({
          from: accounts[0],
          gasLimit: 3_000_000,
        })
        .catch(console.error);
      console.log("챌린지 ")

};

simulation();
