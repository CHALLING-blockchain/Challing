import { useState } from 'react';
import useWeb3 from './hooks/useWeb3';
import useBalance from './hooks/useBalance';
import './App.css';

function App() {
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState('');
  // get active account and balance data from useWeb3 hook
  const {
    connect,
    disconnect,
    provider,
    account: activeAccount,
  } = useWeb3(setIsLoading, setErrorMessage);
  // get active account balance from useBalance hook
  const activeBalance = useBalance(
    provider,
    activeAccount,
    setIsLoading,
    setErrorMessage,
  );

  return (
    <div className="App">
      {/* instantiate web3 only after a user clicks the button */}
      {/* avoid doing it automatically */}
      {!provider ? (
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

export default App;