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
  // accounts.forEach(async (account, index) => {
  //   const blance = await web3.eth.getBalance(account);
  //   console.log(index + ":", blance, "ether");
  // });

  // const createDaliyChallenge = await contract.methods
  //   .createDailyChallenge(daliyChallenge)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //     value: 1e18,
  //   })
  //   .catch(console.error);
  // console.log(createDaliyChallenge);

  // const joinChallenge2 = await contract.methods
  //   .joinChallenge(1, 2, "220919")
  //   .send({
  //     from: accounts[1],
  //     gasLimit: 3_000_000,
  //     value: 1e18,
  //   })
  //   .catch(console.error);
  // console.log(joinChallenge2);

  // const authenticate1 = await contract.methods
  //   .authenticate(1, 2, "220919", "picURL")
  //   .send({
  //     from: accounts[1],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(authenticate1);

  // const endDailyChallenge = await contract.methods
  //   .endDailyChallenge(1)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(endDailyChallenge);

  // const refund1 = await contract.methods
  //   .refund(1, 1)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(refund1);

  // const refund2 = await contract.methods
  //   .refund(1, 2)
  //   .send({
  //     from: accounts[1],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(refund2);

  // await accounts.forEach(async (account, index) => {
  //   const blance = await web3.eth.getBalance(account);
  //   console.log(index + ":", blance, "ether");
  // });

  // const reportTest = await contract.methods
  //   .report(1, 1, 1)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(reportTest);

  // const votingTest = await contract.methods
  //   .voting(1, 1, 1, false)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(votingTest);

  // const getMyChallenge = await contract.methods
  // .getMyChallenge(1)
  // .call({
  //   from: account1,
  // })
  // .catch(console.error);
  // console.log(getMyChallenge)

  const getChallengeDetail = await contract.methods
    .getChallengeDetail(1)
    .call({
      from: accounts[1],
    })
    .catch(console.error);
  console.log(getChallengeDetail[2][0]["userVoteList"]);

  // const getAllChallenge = await contract.methods
  //   .getAllChallenge()
  //   .call({
  //     from: accounts1,
  //   })
  //   .catch(console.error);

  // const challenges={}
  // getAllChallenge[0].forEach((id,index) => {
  //   const challenge=Object.assign({},getAllChallenge[2][index])
  //   const size=Object.keys(challenge).length
  //   for(let i=0;i<size/2;i++){
  //     delete challenge[i]
  //   }
  //   challenges[Number(id)]=challenge
  // });

  // getAllChallenge[1].forEach((id,index) => {
  //   const challenge=Object.assign({},getAllChallenge[3][index])
  //   const size=Object.keys(challenge).length
  //   for(let i=0;i<size/2;i++){
  //     delete challenge[i]
  //   }
  //   challenges[Number(id)]=challenge
  // });
  // console.log(challenges)
};

test();
