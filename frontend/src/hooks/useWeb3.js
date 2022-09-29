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
      if (!window.ethereum) {
        window.open("https://metamask.io/download.html");
      }
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
