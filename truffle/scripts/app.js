const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9e3c86130f904d3984f36541893213d3"));

// const netListening = async () => {
//   web3.eth.net.isListening().then(console.log).catch(console.error);
// };

// netListening();

const artifact = require("../../frontend/src/contracts/ChallengeContract.json");
// 로컬
const account1 = "0x965F71De04c10b082F2bF9DaEa6e094A3365D75F";
const account2 = "0xf6647A31F5668352769c976E3baEaF2fdb16fB62";

// 메타마스크
// const privateKey1 = 'af4dbb9a76fa1fc79b4db351615bf5b3154c4ded9cb1cf4330208b732ff61475';
// const privateKey2 = '6c4d8261cc803d4b99028ff8b63f9f1e677709da718a7e5df57a62a7854a48f8';
// const account1 = web3.eth.accounts.privateKeyToAccount('0x' + privateKey1);
// const account2 = web3.eth.accounts.privateKeyToAccount('0x' + privateKey2);
// web3.eth.accounts.wallet.add(account1);
// web3.eth.accounts.wallet.add(account2);
// web3.eth.defaultAccount = account1.address;

const test = async () => {
  const networkId = await web3.eth.net.getId();
  const { abi } = artifact;
  const address = artifact.networks[networkId].address;
  const contract = new web3.eth.Contract(abi, address);
  console.log(address);
  const daliyChallenge = {
    challengeId: 0,
    interestId: 0,
    ownerId: 0,
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

    totalDeposit: 0,

    complet: false,
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
    complet: false,
  };
  // const createDonationChallenge = await contract.methods
  //     .createDonationChallenge(donationChallenge)
  //     .send({
  //       from: accounts1,
  //       gasLimit: 3_000_000,
  //     })
  //     .catch(console.error);
  //   console.log(createDonationChallenge)

  const createDaliyChallenge = await contract.methods
    .createDaliyChallenge(daliyChallenge)
    .send({
      from: account1,
      gasLimit: 3_000_000,
      
    })
    .catch(console.error);
  console.log(createDaliyChallenge);

  // const joinChallenge1 = await contract.methods
  //   .joinChallenge(1, 1, "220919")
  //   .send({
  //     from: account1,
  //     gasLimit: 3_000_000,
  //     value: 1e18,
  //   })
  //   .catch(console.error);
  // console.log(joinChallenge1);

  // const joinChallenge2 = await contract.methods
  //   .joinChallenge(1, 2, "220919")
  //   .send({
  //     from: account2,
  //     gasLimit: 3_000_000,
  //     value: 1e18,
  //   })
  //   .catch(console.error);
  // console.log(joinChallenge2);

  // const authenticate1 = await contract.methods
  //   .authenticate(1, 2, "220919", "picURL")
  //   .send({
  //     from: account2,
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(authenticate1);

  // const endDailyChallenge = await contract.methods
  //   .endDailyChallenge(1)
  //   .send({
  //     from: account1,
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(endDailyChallenge);

  const refund1 = await contract.methods
    .refund(1, 1)
    .send({
      from: account1,
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log(refund1);

  const refund2 = await contract.methods
    .refund(1, 2)
    .send({
      from: account2,
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log(refund2);

  // const getMyChallenge = await contract.methods
  // .getMyChallenge(1)
  // .call({
  //   from: account1,
  // })
  // .catch(console.error);
  // console.log(getMyChallenge)

  // const getChallengeDetail = await contract.methods
  // .getChallengeDetail(1)
  // .call({
  //   from: accounts1,
  // })
  // .catch(console.error);
  // console.log(getChallengeDetail)

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
