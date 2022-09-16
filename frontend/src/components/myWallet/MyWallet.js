import { useState } from "react";
import useWeb3 from "../../hooks/useWeb3";
import useBalance from "../../hooks/useBalance";

function MyWallet() {
  // localstorage에 wallet 연결 확인
  const [exist, setExist] = useState(localStorage.getItem("myAccount"));
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState("");
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
  // connectWalletOnPageLoad();
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
        </>
      )}
      {/* show loading and error statuses */}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default MyWallet;
