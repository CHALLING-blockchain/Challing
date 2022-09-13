const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// const netListening = async () => {
//   web3.eth.net.isListening().then(console.log).catch(console.error);
// };

// netListening();

const artifact = require("../build/contracts/ChallengeContract.json");

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
  }
  
  // const r1 = await contract.methods
  //   .createDaliyChallenge(daliyChallenge)
  //   .send({
  //     from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(r1)

  // const r2 = await contract.methods
  //   .createDonationChallenge(donationChallenge)
  //   .send({
  //     from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(r2)
  
  

  // const r4 = await contract.methods
  // .joinChallenge(0,10)
  // .send({
  //   from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
  //   gasLimit: 3_000_000,
  //   value: 1e18
  // })
  // .catch(console.error);

  // const r5 = await contract.methods
  // .getUserChallenge()
  // .call({
  //   from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
  // })
  // .catch(console.error);
  // console.log(r5)
  const r3 = await contract.methods
    .getAllChallenge()
    .call({
      from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
    })
    .catch(console.error);
  console.log(r3)
  const challenges={}
  r3[0].forEach((id,index) => {
    const challenge=Object.assign({},r3[2][index])
    const size=Object.keys(challenge).length
    for(let i=0;i<size/2;i++){
      delete challenge[i]
    }
    challenges[Number(id)]=challenge
  });
  console.log(challenges)

};

test();
