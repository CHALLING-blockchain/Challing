import { useState, useEffect } from "react";
import Web3 from "web3";

// it's convenient to move metamask/web3 connection code to a separate custom hook
function useWeb3(setIsLoading, setErrorMessage, exist, setExist) {
  // web3 instance
  const [provider, setProvider] = useState(null);
  // active account
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (exist && provider == null) {
      connect();
    }
  });

  const web3 = new Web3(window.ethereum);
  // connect this function to a button click event
  const connect = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      // ensure Metamask is installed
      if (!window.ethereum) throw new Error("You should enable Metamask");
      // show Metamask prompt
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // connect Metamask to web3.js and get a web3 provider instance

      setProvider(web3);
      // refresh account on change
      window.ethereum.on("accountsChanged", (accounts) =>
        setAccount(accounts[0])
      );
      // retrieve Metamask accounts from web3
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      // localstorage에 지갑 연결 저장
      localStorage.setItem("myAccount", true);
      setExist(true);

      // send transaction  ---------------------------------
      var nonce = 0;
      await web3.eth.getTransactionCount(accounts[0]).then(function (result) {
        nonce = result;
      });
      console.log("nonce:", nonce);

      var gasPrice = 0;
      await web3.eth.getGasPrice().then(function (result) {
        gasPrice = result;
      });
      console.log("gasPrice:", gasPrice);

      var value = await web3.utils.toWei("0.1", "ether");
      console.log("value:", value);

      var gasLimit = 0;
      await web3.eth
        .estimateGas({
          to: "0x301E1528bAD61177eF8Ff89bD4ad6760581e5409",
          from: accounts[0],
          value: value,
        })
        .then(function (result) {
          gasLimit = result;
        });
      console.log("gasLimit", gasLimit);

      var txObject = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: "0x301E1528bAD61177eF8Ff89bD4ad6760581e5409",
        from: accounts[0],
        value: value,
      };
      console.log("txObject: ", txObject);

      var hashObject = 0;
      await web3.eth.sendTransaction(txObject).then(function (receipt) {
        hashObject = receipt;
      });
      console.log("hashObject", hashObject);
      console.log("my txHash: ", hashObject.transactionHash);
      var hashToString = hashObject.transactionHash.toString();
      console.log(hashToString);
      web3.eth.getTransaction(hashToString, function (error, result) {
        console.log("transaction detail: ", result);
      });
      // send transaction end -------------------------------

      // transaction 갯수
      //console.log("transaction cnt: ",web3.eth.getTransactionCount(accounts[0]));

      //직접 send_Transaction한 다음에 hash저장해놨다가 내역으로 불러오기

      //txhash로 Transaction detail조회하기
      // web3.eth.getTransaction('0x3200f0c385ecda01744a3ff43c548b2ecf8465df2fa8fc2c74a11ca8f251c099', function (error, result){
      //   console.log("내 해쉬: ",result);
      // });
      // transaction history end -----------------------------
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // connect this function to a disconnect button
  const disconnect = () => {
    // localstorage에 wallet 연결 끊기
    localStorage.removeItem("myAccount");
    setExist(false);

    setProvider(null);
    setAccount("");
  };
  return { connect, disconnect, provider, account };
}

export default useWeb3;
