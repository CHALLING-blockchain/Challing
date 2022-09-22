const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


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

  const accounts=await web3.eth.getAccounts();

  const daliyChallenge = {
    challengeId: 0,
    interestId: 0,
    ownerId: 1,
    name: "myChallene",
    desc: "desc",
    mainPicURL: "naver.com",
    goodPicURL: "naver.com",
    badPicURL: "naver.com",
    authTotalTimes: 1,
    authDayTimes: 1,
    startTime: 10,
    endTime: 11,
    startDate: "20220919",
    endDate: "20220919",
    personnel: 10,
    deposit: 1,

    totalDeposit: 1,

    complete: false,
  };
  
  // 패스코인 지급 확인
  await accounts.forEach(async (account, index) => {
    const balance = await Ccontract.methods
      .balanceOf(account)
      .call({
        from: accounts[index],
      })
      .catch(console.error);
    console.log(index + ":", balance, "PASS");
  });

  // 유저2가 일상 챌린지 생성
  const createDaliyChallenge = await Ccontract.methods
    .createDailyChallenge(daliyChallenge)
    .send({
      from: accounts[1],
      gasLimit: 3_000_000,
      value: 1e18,
    })
    .catch(console.error);
  console.log("일상챌린지 생성");

  // 유저3부터 8명 참가
  accounts.slice(2).forEach(async (account, index) => {
    const joinChallenge = await Ccontract.methods
      .joinChallenge(1, index + 2, "220919")
      .send({
        from: account,
        gasLimit: 3_000_000,
        value: 1e18,
      })
      .catch(console.error);
  });
  console.log("유저 참여 완료");

  //유저 2 인증
  const findingChallenger = await Ccontract.methods
    .findingChallenger( 1,1)
    .call({
      from: accounts[0],
    })
    .catch(console.error);
  const authenticate = await Ccontract.methods
    .authenticate(1, 1,findingChallenger[0],findingChallenger[1],findingChallenger[2], `220921` )
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("유저 인증 완료");

  const addPhotoTest = await Vcontract.methods
  .addPhoto(findingChallenger[0], 1,"picurl", `${i}`)
  .send({
    from: accounts[0],
    gasLimit: 3_000_000,
  })
  .catch(console.error);

  // 인증사진 신고 (유저 3번이 2번의 사진 신고)
  const reportTest = await Vcontract.methods
    .report(1, 1, 2)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("신고완료");

  // 유저 3번부터 6번까지 fail 투표(간헐적으로 한명만 투표가 안돼?)
  for (let i = 3; i <= 7; i++) {
    const votingTest1 = await Vcontract.methods
      .voting(i, 1, 1, false)
      .send({
        from: accounts[i - 1],
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  // 유저 7번부터 10번까지 pass 투표
  for (let i = 8; i <= 9; i++) {
    const votingTest1 = await Vcontract.methods
      .voting(i, 1, 1, true)
      .send({
        from: accounts[i - 1],
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  // 투표 종료(투표 결과에 따라 패스코인 지급 - fail 투표한 사람에게 지급)
  const endVoteTest = await Vcontract.methods
    .endVote(1, 1, 1)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("endVoteTest");

  

  //패스코인사용
  const usePasscoinTest = await Ccontract.methods
    .usePasscoin(2,1)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log(usePasscoinTest);


  // 패스코인 조회
  await accounts.forEach(async (account, index) => {
    const balance = await Ccontract.methods
      .balanceOf(account)
      .call({
        from: accounts[index],
      })
      .catch(console.error);
    console.log(index + ":", balance, "PASS");
  });

  // 상세 정보 조회
  const getChallengeDetail = await Ccontract.methods
    .getChallengeDetail(1)
    .call({
      from: accounts[0],
    })
    .catch(console.error);
  console.log(getChallengeDetail[2]);
};

simulation();
