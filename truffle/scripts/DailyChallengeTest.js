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
    interestId: 1,
    ownerId: 1,
    name: "일회용품 줄이기",
    desc: "일회용품 줄이기 챌린지입니다",
    mainPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/15672cf4-1cb9-4194-9c39-58616c2aea89.jpg",
    goodPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/a75b924a-99f5-43df-b4e6-19b067b90d08.jpg",
    badPicURL: "https://special7333.s3.ap-northeast-2.amazonaws.com/6d60a272-236b-4c21-9c24-d623e3e4a43f.jpg",
    authTotalTimes: 7,
    authWeekTimes: 7,
    authDayTimes: 1,
    startTime: 0,
    endTime: 24,
    startDate: "2022-09-29",
    endDate: "2022-10-06",
    personnel: 10,
    deposit: 1e9,

    totalDeposit: 1e9,

    complete: false,
  };
  // accounts.forEach(async (account, index) => {
  //   const blance = await web3.eth.getBalance(account);
  //   console.log(index + ":", blance, "ether");
  // });


  // const createDailyChallenge = await Ccontract.methods
  //   .createDailyChallenge(daliyChallenge)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //     value: 1e18,
  //   })
  //   .on("receipt",(r)=>console.log(r.events.returnChallengeId.returnValues))
  //   .catch(console.error);
  // console.log("챌린지 생성");

  // // 유저 10명 참가
  // accounts.slice(1).forEach(async (account, index) => {
  //   const joinChallenge = await Ccontract.methods
  //     .joinChallenge(1, index + 2, "220919")
  //     .send({
  //       from: account,
  //       gasLimit: 3_000_000,
  //       value: 1e18,
  //     })
  //     .catch(console.error);
  // });
  // console.log("유저 참여 완료");

  // // 유저 1,2는 100% 인증
  // // 유저 3,4는 80% 인증
  // // 유저 5,6는 60% 인증
  // // 유저 7,8는 40% 인증
  // // 유저 9,10는 20% 인증
  // for (let k = 0; k < 5; k++) {
  //   for (let userIdx = 0 + k * 2; userIdx < 2 + k * 2; userIdx++) {
  //     const findingChallenger = await Ccontract.methods
  //       .findingChallenger(1, userIdx + 1)
  //       .call({
  //         from: accounts[0],
  //       })
  //       .catch(console.error);

  //     for (let i = 0; i < 10 - k * 2; i++) {
  //       const authenticate = await Ccontract.methods
  //         .authenticate(
  //           1,
  //           userIdx + 1,
  //           findingChallenger[0],
  //           findingChallenger[1],
  //           findingChallenger[2],
  //           `${i}`
  //         )
  //         .send({
  //           from: accounts[userIdx],
  //           gasLimit: 3_000_000,
  //         })
  //         .catch(console.error);

  //       const addPhotoTest = await Vcontract.methods
  //         .addPhoto(userIdx + 1, userIdx + 1, "picurl", `${i}`)
  //         .send({
  //           from: accounts[userIdx],
  //           gasLimit: 3_000_000,
  //         })
  //         .catch(console.error);
  //     }
  //   }
  // }
  // console.log("유저 인증 완료");

  // const endDailyChallenge = await Ccontract.methods
  //   .endDailyChallenge(19)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log("챌린지 종료");
  const re = await Ccontract.methods
    .receivePasscoin([21,21,21,21,21,21,21,21,21],4)
    .send({
      from: accounts[5],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("챌린지 종료");

  // await accounts.forEach(async (account, index) => {
  //   const findingChallenger = await Ccontract.methods
  //     .findingChallenger(1, index + 1)
  //     .call({
  //       from: accounts[0],
  //     })
  //     .catch(console.error);
  //   const refund = await Ccontract.methods
  //     .refund(findingChallenger[0])
  //     .send({
  //       from: account,
  //       gasLimit: 3_000_000,
  //     })
  //     .catch(console.error);
  // });
  // console.log("정산 완료");

  // await accounts.forEach(async (account, index) => {
  //   const blance = await web3.eth.getBalance(account);
  //   console.log(index + ":", blance, "ether");
  // });

  // const getChallengeDetail = await Ccontract.methods
  //   .getChallenger(1)
  //   .call({
  //     from: accounts[0],
  //   })
  //   .catch(console.error);
  // console.log(getChallengeDetail);
  // const getChallengerPhotoTest = await Vcontract.methods
  //   .getChallengerPhoto(1)
  //   .call({
  //     from: accounts[0],
  //   })
  //   .catch(console.error);
  // console.log(getChallengerPhotoTest);
};

simulation();
