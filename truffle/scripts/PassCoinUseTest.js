const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const artifact = require("../../frontend/src/contracts/ChallengeContract.json");

const test = async () => {
  const networkId = await web3.eth.net.getId();
  const { abi } = artifact;
  const address = artifact.networks[networkId].address;
  const contract = new web3.eth.Contract(abi, address);
  const accounts = await web3.eth.getAccounts();

  /* VoteTest 먼저 실행 
    유저 2,3,4,5,6 패스코인 가지고 있음*/

  // 패스코인 지급 확인
  await accounts.forEach(async (account, index) => {
    const balance = await contract.methods
      .balanceOf(account)
      .call({
        from: accounts[index],
      })
      .catch(console.error);
    console.log(index + ":", balance, "PASS");
  });

  // 챌린지 상세 확인해서 카운트 확인
  const getChallengeDetailBefore = await contract.methods
    .getChallengeDetail(1)
    .call({ from: accounts[1] })
    .catch(console.error);
  console.log(getChallengeDetail);

  // 유저 2가 패스코인으로 인증
  const authenticatePass = await contract.methods
    .usePassCoin(2, 1)
    .send({
      from: accounts[1],
      gasLimit: 3_000_000,
    })
    .catch(console.error);
  console.log("유저 인증 완료");

  // 챌린지 상세 확인해서 카운트 확인
  const getChallengeDetailAfter = await contract.methods
    .getChallengeDetail(1)
    .call({ from: accounts[1] })
    .catch(console.error);
  console.log(getChallengeDetail);

  // 패스코인 지급 확인
  await accounts.forEach(async (account, index) => {
    const balance = await contract.methods
      .balanceOf(account)
      .call({
        from: accounts[index],
      })
      .catch(console.error);
    console.log(index + ":", balance, "PASS");
  });
};
test();
