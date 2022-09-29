const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

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

  // 챌린지 생성
  // const createDaliyChallenge = await contract.methods
  //   .createDailyChallenge(daliyChallenge)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //     value: 1e18,
  //   })
  //   .catch(console.error);
  // console.log(createDaliyChallenge);

  // // 유저 10명 참가
  // accounts.slice(1).forEach(async (account, index) => {
  //   const joinChallenge = await contract.methods
  //     .joinChallenge(1, index + 2, "220919")
  //     .send({
  //       from: account,
  //       gasLimit: 3_000_000,
  //       value: 1e18,
  //     })
  //     .catch(console.error);
  // });
  // console.log("유저 참여 완료");

  // // 유저 인증(1은 3개 인증, 2,3은 1개 인증)
  // const authenticate1 = await contract.methods
  //   .authenticate(1, 1, `220921`, "picURL")
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);

  // const authenticate2 = await contract.methods
  //   .authenticate(1, 1, `220922`, "picURL")
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);

  // const authenticate3 = await contract.methods
  //   .authenticate(1, 1, `220923`, "picURL")
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);

  // const authenticate4 = await contract.methods
  //   .authenticate(1, 2, `220921`, "picURL")
  //   .send({
  //     from: accounts[1],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);

  // const authenticate5 = await contract.methods
  //   .authenticate(1, 3, `220921`, "picURL")
  //   .send({
  //     from: accounts[2],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);

  // 모든 챌린지 조회
  const getAllChallenge = await contract.methods
    .getAllChallenge()
    .call({
      from: accounts[0],
    })
    .catch(console.error);
  console.log("getAllChallenge", getAllChallenge);

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

  // // 내가 생성한 챌린지, 내가 참여한 챌린지 조회
  // const getMyChallenge = await contract.methods
  //   .getMyChallenge(1)
  //   .call({ from: accounts[0] })
  //   .catch(console.error);
  // console.log(getMyChallenge);

  // // 나의 모든 인증 사진들 조회
  // const getMyAllPhoto = await contract.methods
  //   .getMyAllPhoto(1)
  //   .call({ from: accounts[0] })
  //   .catch(console.error);
  // console.log(getMyAllPhoto);
};
test();
