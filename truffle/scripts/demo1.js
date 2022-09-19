const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const artifact = require("../../frontend/src/contracts/ChallengeContract.json");

// 메타마스크
const privateKey1 = 'af4dbb9a76fa1fc79b4db351615bf5b3154c4ded9cb1cf4330208b732ff61475';
const privateKey2 = '6c4d8261cc803d4b99028ff8b63f9f1e677709da718a7e5df57a62a7854a48f8';
const account1 = web3.eth.accounts.privateKeyToAccount('0x' + privateKey1);
const account2 = web3.eth.accounts.privateKeyToAccount('0x' + privateKey2);
web3.eth.accounts.wallet.add(account1);
web3.eth.accounts.wallet.add(account2);
web3.eth.defaultAccount = account1.address;

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
    authWeekTimes: 1,
    authDayTimes: 1,
    startTime: 10,
    endTime: 11,
    startDate: "20220919",
    endDate: "20220919",
    personnel: 10,
    deposit:1,

    totalDeposit:0,

    complet:false,
  }

  const createDaliyChallenge = await contract.methods
    .createDaliyChallenge(daliyChallenge)
    .send({
      from: account1.address,
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("일상 챌린지 생성")
  
  const joinChallenge1 = await contract.methods
  .joinChallenge(1,1,"220919")
  .send({
    from: account1.address,
    gasLimit: 3_000_000,
    value: 1e18
  })
  .catch(console.error);
  console.log("유저1 챌린지 참여(1eth 지불)")

  const joinChallenge2 = await contract.methods
  .joinChallenge(1,2,"220919")
  .send({
    from: account2.address,
    gasLimit: 3_000_000,
    value: 1e18
  })
  .catch(console.error);
  console.log("유저2 챌린지 참여(1eth 지불)")

  const authenticate1 = await contract.methods
  .authenticate(1,1,"220919","picURL")
  .send({
    from: account1.address,
    gasLimit: 3_000_000,

  })
  .catch(console.error);
  console.log("유저1 인증 성공")

  const endDailyChallenge = await contract.methods
  .endDailyChallenge(1)
  .send({
    from: account1.address,
    gasLimit: 3_000_000,

  })
  .catch(console.error);
  console.log("챌린지 종료")
};

test();
