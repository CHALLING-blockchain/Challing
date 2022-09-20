import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import useWeb3 from "../../hooks/useWeb3";
import useBalance from "../../hooks/useBalance";
import Web3 from "web3";

function MyWallet() {
  // localstorage에 wallet 연결 확인
  const [exist, setExist] = useState(localStorage.getItem("myAccount"));
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState("");
  // challenge transaction Data
  const [txData, setTxData] = useState("");
  // ETH -> KRW
  const [exData, setExData] = useState("");

  // get active account and balance data from useWeb3 hook
  const {
    connect,
    disconnect,
    provider,
    account: activeAccount,
  } = useWeb3(setIsLoading, setErrorMessage, exist, setExist);

  // get active account balance from useBalance hook
  const activeBalance = useBalance(
    provider,
    activeAccount,
    setIsLoading,
    setErrorMessage
  );

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    var accounts = "";
    async function getAccount() {
      const account = await web3.eth.getAccounts();
      accounts = account[0];

      //Etherscan API 
      const etherscan_url =
        process.env.REACT_APP_ETHERSCAN_API_URL +
        `&action=txlist&address=` +
        accounts +
        `&startblock=0` +
        `&endblock=99999999` +
        `&offset=5` +
        `&sort=desc` +
        `&apikey=` +
        process.env.REACT_APP_ETHERSCAN_API_KEY;

      //Crypto API
      const crypto_url = process.env.REACT_APP_CRYPTO_API_URL +
        `&api_key=` + 
        process.env.REACT_APP_CRYPTO_API_KEY;

      // Etherscan API 요청
      axios.get(etherscan_url).then(function (result) {
        console.log("etherscan api url: " + etherscan_url);
        const data = result.data.result;
        const tmpData = [];
        for (let index = 0; index < data.length; index++) {
          const element = {
            from: data[index].from,
            to: data[index].to,
            input: data[index].input,
            etherValue: Number(
              web3.utils.fromWei(data[index].value, "ether")
            ).toFixed(3),
            sendOrReceive: "",
            timeStamp: timeConverter(data[index].timeStamp),
          };
          // challenge 데이터를 포함한 tx만 tmpData에 push
          if (hexToAscii(element.input).includes("challenge")) {
            // 트렌젝션을 보냈을때
            if(element.from.toLowerCase()===accounts.toLowerCase()){
              element.sendOrReceive = "↓"
            }
            // 트렌젝션을 받았을때
            else{
              element.sendOrReceive = "↑"
            }
            tmpData.push(element);
          }
        }
        setTxData(tmpData);
      });

      // Crypto API 요청
      await axios.get(crypto_url).then(function(result){
        console.log("crypto api url: ",crypto_url);
        const KRW = result.data.KRW;
        console.log("KRW"+KRW);
        setExData(KRW);
      });
    }
    getAccount();
  }, []);

  // 16진수 -> Ascii / String반환
  function hexToAscii(str1) {
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

  // Unix timestamp to date
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    var time = year + '/' + month + '/' +date;
    return time;
  }

  function txRendering() {
    const result = [];
    for (let index = 0; index < txData.length; index++) {
      if(hexToAscii(txData[index].input).substring(1).includes("challenge")){
        var date = txData[index].timeStamp;
        // 날짜별로 모아서 보여주기
        if(index>=1&&index<txData.length&&txData[index].timeStamp===txData[index-1].timeStamp){
          date = "";
        }
        result.push(
          <span key={index}>
            <p> {date} </p>
            <h4> {hexToAscii(txData[index].input).substring(1)} {txData[index].etherValue}ETH {txData[index].sendOrReceive}</h4>
            <br></br>
          </span>
        );
      }
    }
    return result;
  }

  return (
    <div className="App">
      {/* instantiate web3 only after a user clicks the button */}
      {/* avoid doing it automatically */}
      {!exist ? (
        // 웹브라우저 사용자만 활성화
        <button onClick={connect}>메타마스크 지갑 연동</button>
      ) : (
        <>
          {/* <p>ACCOUNT : {activeAccount}</p> */}
          <span>Etherium: <big><strong>{activeBalance}</strong></big> ETH</span>
          <p> ≒ {exData * activeBalance}₩</p>
          {/* 웹 브라우저 사용자만 연결해제 버튼 활성화 */}
          {/* <button onClick={disconnect}>Disconnect</button> */}
          <br></br>
          <br></br>
          <span>
            Transaction History<br></br>
           {txRendering()}{""}
           <a href={'https://ropsten.etherscan.io/address/'+activeAccount}>Etherscan에서 거래내역 상세보기</a>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
          </span>
       </>
      )}
      {/* show loading and error statuses */}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default MyWallet;
