const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// const netListening = async () => {
//   web3.eth.net.isListening().then(console.log).catch(console.error);
// };

// netListening();

const artifact = require("../../frontend/src/contracts/ChallengeContract.json");
const accounts="0x34498bb1949f97ae2285fbf77c83b3438d3838b6"
const test = async () => {
  const networkId = await web3.eth.net.getId();
  const { abi } = artifact;
  const address = artifact.networks[networkId].address;
  const contract = new web3.eth.Contract(abi, address);
  
  const daliyChallenge = {
    challengeId:0,
    interestId: 0,
    ownerId: 0,
    name: "myChallene",
    desc: "desc",
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
    minDeposit:0,
    maxDeposit:10,
    totalDeposit:0,
    userId:[],
    userAddress:[],
    count:[],
    userDeposit:[],
    complet:false,
  }
  const donationChallenge = {
    challengeId:0,
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
    totalDonation:0,
    userId:[],
    userAddress:[],
    count:[],
    userDeposit:[],
    complet:false,
  }
  
  // const createDaliyChallenge = await contract.methods
  //   .createDaliyChallenge(daliyChallenge)
  //   .send({
  //     from: accounts,
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(createDaliyChallenge)

  // const createDonationChallenge = await contract.methods
  //   .createDonationChallenge(donationChallenge)
  //   .send({
  //     from: accounts,
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(createDonationChallenge)
  
  // const joinChallenge = await contract.methods
  // .joinChallenge(1,1,"220914")
  // .send({
  //   from: accounts,
  //   gasLimit: 10_000_000,
  //   value: 1e18
  // })
  // .catch(console.error);
  // console.log(joinChallenge)
  // const getMyChallenge = await contract.methods
  // .getMyChallenge(1)
  // .call({
  //   from: accounts,
  // })
  // .catch(console.error);
  // console.log(getMyChallenge)

  const authenticate = await contract.methods
  .authenticate(1,1,"220914","naver.com")
  .call({
    from: accounts,
  })
  .catch(console.error);
  console.log(authenticate)

  // const getAllChallenge = await contract.methods
  //   .getAllChallenge()
  //   .call({
  //     from: accounts,
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
