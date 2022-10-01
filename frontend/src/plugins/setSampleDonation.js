// import Web3 from "web3";
const Web3 =require("web3")
const init= async(address) =>{
    const account=address;
    const Cartifact = require("../contracts/ChallengeContract.json");
    const infuraUrl =
      "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_API_KEY;
    const web3 = new Web3(new Web3.providers.HttpProvider("https://j7b106.p.ssafy.io:8545"));

    const networkId = await web3.eth.net.getId();
    const Cabi = Cartifact.abi;
    const Caddress = Cartifact.networks[networkId].address;
    const Ccontract = new web3.eth.Contract(Cabi, Caddress);
    
    const accounts = await web3.eth.getAccounts();
    const donationAddress="0xF2DBb912FDdFAf780B135c722e9b7A2Aa12fE3a6"
    const donation0 = {
        id: 0,
        name:"국경없는 의사회",
        donationAddress:donationAddress,
        donationURL:"https://msf.or.kr/"
    };
    const donation1 = {
        id: 1,
        name:"세이브더 칠드런",
        donationAddress:donationAddress,
        donationURL:"https://www.sc.or.kr/"
    };
    const donation2 = {
        id: 2,
        name:"초록우산",
        donationAddress:donationAddress,
        donationURL:"https://www.childfund.or.kr/"
    };
    const donation3 = {
        id: 3,
        name:"월드비전",
        donationAddress:donationAddress,
        donationURL:"https://worldshare.or.kr/"
    };
    const donation4 = {
        id: 4,
        name:"유니세프",
        donationAddress:donationAddress,
        donationURL:"https://www.unicef.or.kr/"
    };

    const donationList=[donation0,donation1,donation2,donation3,donation4]
    donationList.forEach(donation=>{
        Ccontract.methods
        .addDonation(donation)
        .send({
            from: accounts[0] ,
            gasLimit: 3_000_000,
        })
        .catch(console.error);
    })
}
init();