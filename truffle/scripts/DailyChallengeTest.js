const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


const artifact = require("../../frontend/src/contracts/ChallengeContract.json");

const test = async () => {
  const networkId = await web3.eth.net.getId();
  const { abi } = artifact;
  const address = artifact.networks[networkId].address;
  const contract = new web3.eth.Contract(abi, address);

  const accounts=await web3.eth.getAccounts();
  
  const daliyChallenge = {
    challengeId: 0,
    interestId: 1,
    ownerId: 1,
    name: "myChallene",
    desc: "desc",
    mainPicURL: "naver.com",
    goodPicURL: "naver.com",
    badPicURL: "naver.com",
    authTotalTimes: 10,
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
  accounts.forEach(async (account,index)=>{
    const blance= await web3.eth.getBalance(account)
    console.log(index+":",blance,'ether')
  })

  // 챌린지 생성
  const createDailyChallenge = await contract.methods
    .createDailyChallenge(daliyChallenge)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
      value:1e18
    })
    .catch(console.error);
  console.log("챌린지 생성")

  // // 유저 10명 참가
  accounts.slice(1).forEach(async (account,index)=>{
    const joinChallenge = await contract.methods
      .joinChallenge(1, index+2, "220919")
      .send({
        from: account,
        gasLimit: 3_000_000,
        value: 1e18,
      })
      .catch(console.error);
  })
  console.log("유저 참여 완료");

  
  // 유저 1,2는 100% 인증
  // 유저 3,4는 80% 인증
  // 유저 5,6는 60% 인증
  // 유저 7,8는 40% 인증
  // 유저 9,10는 20% 인증
  for(let k=0;k<5;k++){
    for(let userIdx=0+(k*2);userIdx<2+(k*2);userIdx++){
      for(let i=0;i<10-(k*2);i++){
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
  console.log("유저 인증 완료");

  const endDailyChallenge = await contract.methods
    .endDailyChallenge(1)
    .send({
      from: accounts[0],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("챌린지 종료");


  accounts.forEach(async (account,index)=>{
    const refund = await contract.methods
      .refund(1, index+1)
      .send({
        from: account,
        gasLimit: 3_000_000,
      })
      .catch(console.error);
  })
  console.log("정산 완료");

  await accounts.forEach(async (account,index)=>{
    const blance= await web3.eth.getBalance(account)
    console.log(index+":",blance,'ether')
  })
  
  // const getChallengeDetail = await contract.methods
  // .getChallengeDetail(1)
  // .call({
  //   from: accounts[0],
  // })
  // .catch(console.error);
  // console.log(getChallengeDetail[0])

};

test();
