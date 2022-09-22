// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
import "./Main.css";
import Nav from "../Nav";
import Banner_1 from "../../img/배너1.png";
import Banner_2 from "../../img/배너2.png";
// import { CONTACT_ABI, CONTACT_ADDRESS } from "./config";

function Main() {
  // const [account, setAccount] = useState();
  // const [contracts, setContacts] = useState([]);

  // useEffect(() => {
  //   async function load() {
  //     //계정 설정해주기 -> 이거 로컬에 있으면 가져오는걸로 바꿔야되남
  //     const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  //     const accounts = await web3.eth.requestAccounts();
  //     setAccount(accounts[0]);

  //     // abi랑 address로 스마트 컨트렉트 인스턴스화 하기
  //     const contractList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
  //     // 컨트랙트의 총 개수 가져오기
  //     const cnt = await contractList.methods.count().call();
  //     // 스마트 컨트렉트로부터 모든 컨트랙트를 가져오고 상태변수에 저장시키기
  //     // 이제 이부분을 redux-persist로 저장시키면 될거같은데 ..!
  //     for (var i = 1; i <= cnt; i++) {
  //       const contract = await contractList.methods.contracts(i).call();
  //       setContacts((contracts) => [...contracts, contract]);
  //     }
  //   }
  //   load();
  // }, []);

  return (
    <div className="Main">
      <Nav />
      <img className="Banner1" src={Banner_1} alt="Banner1" />
      <img className="Banner2" src={Banner_2} alt="Banner2" />
      {/* <p>챌린지 목록</p> */}
      {/* <ul> */}
      {/* {Object.keys(contracts).map((contract, index) => ( */}
      {/* <li key={`${contracts[index].name}-${index}`}> */}
      {/* 챌린지 이름 가져오기 */}
      {/* <h4>{contracts[index].name}</h4> */}
      {/* </li> */}
      {/* ))} */}
      {/* </ul> */}
    </div>
  );
}

export default Main;
