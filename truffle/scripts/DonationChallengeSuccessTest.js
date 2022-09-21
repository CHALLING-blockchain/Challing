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
    challengeId: 1,
    interestId: 1,
    ownerId: 1,
    donationId: 1,
    name: "myChallene",
    desc: "desc",
    setDonaion: 10,
    mainPicURL: "naver.com",
    goodPicURL: "naver.com",
    badPicURL: "naver.com",
    authTotalTimes: 10,
    authDayTimes: 5,
    startTime: 10,
    endTime: 11,
    startDate: "2022.09.12",
    endDate: "2022.09.12",
    personnel: 10,
    totalDonation: 0,
 
    complet: false,
    success: false
  };
  const donation={
    id:0,
    name:"기부처1",
    donationAddress:accounts[9],
    donationURL:"naver.com"
  }

  accounts.forEach(async (account,index)=>{
    const blance= await web3.eth.getBalance(account)
    console.log(index+":",blance,'ether')
  })

  // 기부처 생성
  // const addDonation = await contract.methods
  //   .addDonation(donation)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
      
  //   })
  //   .catch(console.error);
  // console.log("기부처 추가")

  // // 챌린지 생성
  // const createDonationChallenge = await contract.methods
  //   .createDonationChallenge(donationChallenge)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //     value:1e19
  //   })
  //   .catch(console.error);
  // console.log("챌린지 생성")

  // // 유저 9명 참가
  // accounts.slice(1,9).forEach(async (account,index)=>{
  //   const joinChallenge = await contract.methods
  //     .joinChallenge(1, index+2, "220919")
  //     .send({
  //       from: account,
  //       gasLimit: 3_000_000,
  //       value: 1e19,
  //     })
  //     .catch(console.error);
  // })
  // console.log("유저 참여 완료");

  
  // // // 유저 1~8는 100% 인증, 유저9는 노인증
  
  // for(let userIdx=0;userIdx<5;userIdx++){
  //   for(let i=0;i<10;i++){
  //     const authenticate = await contract.methods
  //       .authenticate(1, userIdx+1, `${i}`, "picURL")
  //       .send({
  //         from: accounts[userIdx],
  //         gasLimit: 3_000_000,
  //       })
  //       .catch(console.error);
  //   }
  // }
  // console.log("유저 인증 완료");

  // const endDonationChallenge = await contract.methods
  //   .endDonationChallenge(1)
  //   .send({
  //     from: accounts[0],
  //     gasLimit: 3_000_000,
  //   })
  //   .catch(console.error);
  // console.log("챌린지 종료");

  // accounts.slice(0,9).forEach(async (account,index)=>{
  //   const refund = await contract.methods
  //     .refund(1, index+1)
  //     .send({
  //       from: account,
  //       gasLimit: 3_000_000,
  //     })
  //     .catch(console.error);
  // })
  // console.log("정산 완료");

  // await accounts.forEach(async (account,index)=>{
  //   const blance= await web3.eth.getBalance(account)
  //   console.log(index+":",blance,'ether')
  // })
  
  const getChallengeDetail = await contract.methods
  .getChallengeDetail(1)
  .call({
    from: accounts[0],
  })
  .catch(console.error);
  console.log(getChallengeDetail[0])

};

test();
