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
  // etherscan data 가져오기
  const [data, setData] = useState(""); 
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
  const tmpData = [];
  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    var accounts="";
    async function getAccount(){
      const account = await web3.eth.getAccounts();
      // console.log(account[0]);
      accounts = account[0]
      // console.log("accounts",accounts);

      const url = 
      process.env.REACT_APP_ETHERSCAN_API_URL
      +`&action=txlist&address=`
      + accounts
      +`&startblock=0`
      +`&endblock=99999999`
      +`&offset=5`
      +`&sort=desc`
      +`&apikey=`+process.env.REACT_APP_ETHERSCAN_API_KEY;
      
      axios.get(url).then(function(result){
          // console.log("inside axios....");
          console.log("etherscan api url: "+url);
          const data = result.data.result;
          console.log("data: ",data);
          setData(data);
          for (let index = 0; index < data.length; index++) {
            const element = {
              from: data[index].from,
              to : data[index].to,
              input : data[index].input,
              etherValue : Number(web3.utils.fromWei(data[index].value, "ether")).toFixed(3)
            }
            tmpData.push(element);
          }
          setTxData(tmpData);
          // console.log("txData", txData);
          console.log("blockn: ",web3.eth.getBlockNumber())
      })
    }
    getAccount();

  },[]);

  function txRendering(){
    const result = [];
    for (let index = 0; index < data.length; index++) {
      //console.log("inside txRendering for");
      result.push(<span key={index}>input : {txData[index].input}<br></br></span>)
      result.push(<span key={index}>from : {txData[index].from}<br></br></span>)
      result.push(<span key={index}>to : {txData[index].to}<br></br></span>)
      result.push(<span key={index}>value : {txData[index].etherValue}<br></br><br></br></span>)
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
          <p>[Transaction History]<br></br>{txRendering()} </p>
        </>
      )}
      {/* show loading and error statuses */}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default MyWallet;
