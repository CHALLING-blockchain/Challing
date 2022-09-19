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
      const url =
        process.env.REACT_APP_ETHERSCAN_API_URL +
        `&action=txlist&address=` +
        accounts +
        `&startblock=0` +
        `&endblock=99999999` +
        `&offset=5` +
        `&sort=desc` +
        `&apikey=` +
        process.env.REACT_APP_ETHERSCAN_API_KEY;

      // url 요청
      axios.get(url).then(function (result) {
        console.log("etherscan api url: " + url);
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
            console.log("계정=",accounts);
            console.log("보냄=",element.from)
            console.log("소문=",element.from.toLowerCase());
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
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
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
      if(hexToAscii(txData[index].input).substring(1).includes("challenge"))
      result.push(
        <span key={index}>
          <p> {txData[index].timeStamp}</p>
          <h3> {hexToAscii(txData[index].input).substring(1)} {txData[index].etherValue}ETH {txData[index].sendOrReceive}</h3>
          <br></br>
        </span>
      );
    }
    return result;
  }

  return (
    <div className="App">
      {/* instantiate web3 only after a user clicks the button */}
      {/* avoid doing it automatically */}
      {!exist ? (
        <button onClick={connect}>메타마스크 지갑 연동</button>
      ) : (
        <>
          {/* <p>ACCOUNT : {activeAccount}</p> */}
          <p>Etherium: {activeBalance} ETH</p>
          <p>== $</p>
          <button onClick={disconnect}>Disconnect</button>
          <br></br>
          <br></br>
          <span>
            Transaction History<br></br>
           {txRendering()}{" "}
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
