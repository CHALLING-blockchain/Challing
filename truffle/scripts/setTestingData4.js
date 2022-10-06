const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://j7b106.p.ssafy.io:8545")
);

const Cartifact = require("../../frontend/src/contracts/ChallengeContract.json");
const Vartifact = require("../../frontend/src/contracts/VoteContract.json");

const simulation = async () => {
  const networkId = await web3.eth.net.getId();
  const Cabi = Cartifact.abi;
  const Caddress = Cartifact.networks[networkId].address;
  const Ccontract = new web3.eth.Contract(Cabi, Caddress);

  const Vabi = Vartifact.abi;
  const Vaddress = Vartifact.networks[networkId].address;
  const Vcontract = new web3.eth.Contract(Vabi, Vaddress);

  const accounts = await web3.eth.getAccounts();

  

  // 조항주 참가
  for(let i=0;i<10;i++){
    const joinChallenge1 = await Ccontract.methods
      .joinChallenge(4, 100, 0)
      .send({
        from: accounts[4],
        gasLimit: 3_000_000,
        value: 1e17,
      })
      .catch(console.error);
  }
  

  // 잠송 참가
 
};

simulation();
