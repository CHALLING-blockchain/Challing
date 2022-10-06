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
    interestId: 2,
    ownerId: 1,
    name: "하루 한장 독서하기",
    desc: "매일 하루 한장 독서를 통해 마음의 양식을 쌓아보아요\n책을 펼쳐서 인증사진을 찍어주세요.\n책 표지만 찍은 사진은 인정이 되지 않습니다.",
    mainPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/8453dff1-dba5-491d-9dc4-0c3224f9038b.jpg",
    goodPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/61bfd2ec-400b-451a-b86c-4ee05e6b84d1.jpg",
    badPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/78e47f33-6d05-4909-8446-4ef2ec8fb7a4.jpg",
    authTotalTimes:15,
    authWeekTimes: 5,
    authDayTimes: 1,
    startTime: 0,
    endTime: 24,
    startDate: "2022-10-07",
    endDate: "2022-10-28",
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


    //잠송 인증
    const findingChallenger2 = await Ccontract.methods
    .findingChallenger(challengeId, 118)
    .call({
        from: accounts[5],
    })
    .catch(console.error);

    
    const authenticate2 = await Ccontract.methods
        .authenticate(
            challengeId,
            118,
        findingChallenger2[0],
        findingChallenger2[1],
        findingChallenger2[2],
        0
        )
        .send({
        from: accounts[5],
        gasLimit: 3_000_000,
        })
    .catch(console.error);
    
    const addPhotoTest = await Vcontract.methods
      .addPhoto(findingChallenger2[0], 118, "https://special7333.s3.ap-northeast-2.amazonaws.com/1bfc8f15-7ff8-4b2d-b444-83f38782bef8.jpg", 0)
      .send({
        from: accounts[5],
        gasLimit: 3_000_000,
      })
      .catch(console.error);


    //만두 인증
    const findingChallenger3 = await Ccontract.methods
    .findingChallenger(challengeId, 1)
    .call({
        from: accounts[7],
    })
    .catch(console.error);

    const authenticate3 = await Ccontract.methods
        .authenticate(
            challengeId,
            1,
        findingChallenger3[0],
        findingChallenger3[1],
        findingChallenger3[2],
        0
        )
        .send({
        from: accounts[7],
        gasLimit: 3_000_000,
        })
    .catch(console.error);
  const addPhoto2 = await Vcontract.methods
    .addPhoto(findingChallenger3[0], 118, "https://special7333.s3.ap-northeast-2.amazonaws.com/a5e023b9-4e45-4497-9828-32fd18337a8a.jpg", 0)
    .send({
      from: accounts[7],
      gasLimit: 3_000_000,
    })
    .catch(console.error);

    //만두가 잠송 사진 신고
  // const report = await Vcontract.methods
  // .report(challengeId,photoId,1, uint challengerId)
  // .send({
  //   from: accounts[7],
  //   gasLimit: 3_000_000,
  // })
  // .catch(console.error);
};

simulation();
