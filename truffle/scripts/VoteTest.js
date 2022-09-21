const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9e3c86130f904d3984f36541893213d3"));

// const netListening = async () => {
//   web3.eth.net.isListening().then(console.log).catch(console.error);
// };

// netListening();

const artifact = require("../../frontend/src/contracts/ChallengeContract.json");

const test = async () => {
  const networkId = await web3.eth.net.getId();
  const { abi } = artifact;
  const address = artifact.networks[networkId].address;
  const contract = new web3.eth.Contract(abi, address);
  const accounts = await web3.eth.getAccounts();

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
  const donationChallenge = {
    challengeId: 0,
    interestId: 0,
    ownerId: 0,
    donationId: 0,
    name: "myChallene",
    desc: "desc",
    setDonaion: 10,
    mainPicURL: "naver.com",
    goodPicURL: "naver.com",
    badPicURL: "naver.com",
    authWeekTimes: 3,
    authDayTimes: 1,
    startTime: 10,
    endTime: 11,
    startDate: "2022.09.12",
    endDate: "2022.09.12",
    personnel: 10,
    totalDonation: 0,
    userId: [],
    userAddress: [],
    count: [],
    userDeposit: [],
    complete: false,
  };
  //   accounts.forEach(async (account, index) => {
  //     const blance = await web3.eth.getBalance(account);
  //     console.log(index + ":", blance, "ether");
  //   });

  const createDaliyChallenge = await contract.methods
    .createDailyChallenge(daliyChallenge)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
      value: 1e18,
    })
    .catch(console.error);
  console.log(createDaliyChallenge);

  // 유저 10명 참가
  accounts.forEach(async (account, index) => {
    const joinChallenge = await contract.methods
      .joinChallenge(1, index + 1, "220919")
      .send({
        from: account,
        gasLimit: 3_000_000,
        value: 1e18,
      })
      .catch(console.error);
  });
  console.log("유저 참여 완료");

  const joinChallenge2 = await contract.methods
    .joinChallenge(1, 2, "220919")
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
      value: 1e18,
    })
    .catch(console.error);
  console.log(joinChallenge2);

  //   유저 1,2는 100% 인증
  //   유저 3,4는 80% 인증
  //   유저 5,6는 60% 인증
  //   유저 7,8는 40% 인증
  //   유저 9,10는 20% 인증
  for (let userIdx = 0; userIdx < 10; userIdx++) {
    const authenticate = await contract.methods
      .authenticate(1, userIdx + 1, `${userIdx}`, "picURL")
      .send({
        from: accounts[userIdx],
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }
  console.log("유저 인증 완료");

  const reportTest = await contract.methods
    .report(1, 1, 1)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  //console.log(reportTest);

  for (let i = 2; i <= 5; i++) {
    const votingTest1 = await contract.methods
      .voting(i, 1, 1, false)
      .send({
        from: accounts[0],
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  for (let i = 6; i <= 10; i++) {
    const votingTest1 = await contract.methods
      .voting(i, 1, 1, true)
      .send({
        from: accounts[0],
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  }

  const endVoteTest = await contract.methods
    .endVote(1, 1, 1)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("endVoteTest");

  const getChallengeDetail = await contract.methods
    .getChallengeDetail(1)
    .call({
      from: accounts[0],
    })
    .catch(console.error);
  console.log(
    getChallengeDetail[2][0]["userIdList"],
    getChallengeDetail[2][0]["userVoteList"]
  );
};

test();
