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
          };
          // challenge 데이터를 포함한 tx만 tmpData에 push
          if (hexToAscii(element.input).includes("challenge")) {
            // 트렌젝션을 보냈을때
            if(element.from.includes(accounts)){
              element.sendOrReceive = "↑"
            }
            // 트렌젝션을 받았을때
            else{
              element.sendOrReceive = "↓"
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

  function txRendering() {
    // console.log("txRendering");
    const result = [];
    for (let index = 0; index < txData.length; index++) {
      //console.log("inside txRendering for");
      result.push(
        <span key={index}>
          input : {hexToAscii(txData[index].input).substring(1)}
          <br></br>
          from : {txData[index].from}
          <br></br>
          to : {txData[index].to}
          <br></br>
          value : {txData[index].etherValue} {txData[index].sendOrReceive}
          <br></br>
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
        <button onClick={connect}>Connect to MetaMask</button>
      ) : (
        <>
          <p>ACCOUNT : {activeAccount}</p>
          <p>MY BALANCE: {activeBalance} ETH</p>
          <button onClick={disconnect}>Disconnect</button>
          <p>
            [Transaction History]<br></br>
           {txRendering()}{" "}
          </p>
       </>
      )}
      {/* show loading and error statuses */}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default MyWallet;
