const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


const artifact = require("../../frontend/src/contracts/ChallengeContract.json");

const test = async () => {
  const networkId = await web3.eth.net.getId();
  const { abi } = artifact;
  const address = artifact.networks[networkId].address;
  const contract = new web3.eth.Contract(abi, address);

  const accounts=await web3.eth.getAccounts();
  
  const donationChallenge = {
    challengeId: 0,
    interestId: 1,
    ownerId: 1,
    donationId: 1,
    name: "myChallene",
    desc: "desc",
    setDonaion: 1,
    mainPicURL: "naver.com",
    goodPicURL: "naver.com",
    badPicURL: "naver.com",
    authTotalTimes: 100,
    authDayTimes: 5,
    startTime: 10,
    endTime: 11,
    startDate: "2022.09.12",
    endDate: "2022.09.12",
    personnel: 10,
    totalDonation: 0,
    complet: false,
    success: false,
  };

  // 챌린지 생성
  const createDonationChallenge = await contract.methods
    .createDonationChallenge(donationChallenge)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log(createDonationChallenge)

  // 유저 10명 참가
  accounts.forEach(async (account,index)=>{
    const joinChallenge = await contract.methods
      .joinChallenge(1, index+1, "220919")
      .send({
        from: account[index],
        gasLimit: 3_000_000,
        value: 1e18,
      })
      .catch(console.error);
    console.log(joinChallenge);
  })
  
  // 유저 1,2는 100% 인증
  // 유저 3,4는 80% 인증
  // 유저 5,6는 60% 인증
  // 유저 7,8는 40% 인증
  // 유저 9,10는 20% 인증
  for(let k=0;k<5;k++){
    for(let userIdx=0+(k*2);i<2+(k*2);i++){
      for(let i=0;i<100-(k*20);i++){
        const authenticate = await contract.methods
          .authenticate(1, userIdx+1, `${i}`, "picURL")
          .send({
            from: accounts[userIdx],
            gasLimit: 3_000_000,
          })
          .catch(console.error);
      }
    }
  }
  
  
 
  // const endDailyChallenge = await contract.methods
  //   .endDailyChallenge(1)
  //   .send({
  //     from: account1,
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(endDailyChallenge);

  // const refund1 = await contract.methods
  //   .refund(1, 1)
  //   .send({
  //     from: account1,
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(refund1);

  // const refund2 = await contract.methods
  //   .refund(1, 2)
  //   .send({
  //     from: account2,
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log(refund2);

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
