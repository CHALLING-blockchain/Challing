const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// const netListening = async () => {
//   web3.eth.net.isListening().then(console.log).catch(console.error);
// };

// netListening();

const artifact = require("../build/contracts/PassCoinContract.json");

const test = async () => {
  const networkId = await web3.eth.net.getId();
  const { abi } = artifact;
  const address = artifact.networks[networkId].address;
  const contract = new web3.eth.Contract(abi, address);

  

  const r5 = await contract.methods
  .transfer("0xF2DBb912FDdFAf780B135c722e9b7A2Aa12fE3a6", 1e15)
  .send({
    from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
  })
  .catch(console.error);
  console.log(r5)
  // const r1 = await contract.methods
  // .totalSupply()
  // .call({
  //   from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
  // })
  // .catch(console.error);
  // console.log(r1)
  // const r2 = await contract.methods
  // .balanceOf("0xa51ba97591058b455a6da31589a9ae827bbc4560")
  // .call({
  //   from: "0x278b6c8a8b938d7c6d1cdb055d95783379b0b842",
  // })
  // .catch(console.error);
  // console.log(r2)

};

test();
