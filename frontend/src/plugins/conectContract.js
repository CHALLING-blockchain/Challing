import Web3 from "web3";

function conectContract(daliyChallenge) {
  const artifact = require("../contracts/ChallengeContract.json");
  async function load() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/38d65d8f902943d38a2876a0f4f9ad49")
    );
    const networkId = await web3.eth.net.getId();
    const abi = artifact.abi;
    const address = artifact.networks[networkId].address;
    const contract = new web3.eth.Contract(abi, address);
    const privateKey1 = '446f29790263af454613250ef0cbe1809cf81174729478d2a43b3c95f9e3aa96';

    const account1 = web3.eth.accounts.privateKeyToAccount(
      "0x" + privateKey1
    );

    web3.eth.accounts.wallet.add(account1);

    // 챌린지 생성
    const createDailyChallenge = await contract.methods
    .createDailyChallenge(daliyChallenge)
    .send({
      from: account1.address,
      gasLimit: 3_000_000,
      value:1e18
    })
    .catch(console.error);
  console.log("챌린지 생성")

    const getAllChallenge = await contract.methods
      .getAllChallenge()
      .call({
        from: account1.address,
      })
      .catch(console.error);

    // 일상 챌린지
    const challenges = {};
    getAllChallenge[0].forEach((id, index) => {
      const challenge = Object.assign({}, getAllChallenge[2][index]);
      const size = Object.keys(challenge).length;
      for (let i = 0; i < size / 2; i++) {
        delete challenge[i];
      }
      challenges[Number(id)] = challenge;
    });
     // 기부 챌린지
     getAllChallenge[1].forEach((id, index) => {
      const challenge = Object.assign({}, getAllChallenge[3][index]);
      const size = Object.keys(challenge).length;
      for (let i = 0; i < size / 2; i++) {
        delete challenge[i];
      }
      challenges[Number(id)] = challenge;
    });
    console.log(challenges);
  }
  load();
}
export default conectContract;