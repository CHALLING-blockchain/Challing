import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';

import {useWeb3React} from '@web3-react/core';
import {injected} from './lib/connectors';

import './App.css';

function App() {
  const {
    chainId,
    account,
    active,
    activate,
    deactivate
  } = useWeb3React();

  const handleConnect = () => {
    if(active) {
      deactivate();
      return;
    }

  activate(injected,(error)=>{
      if('/No Ethereum provider was found on window.ethereum/'.test(error)){
        window.open('https://metamask.io/download.html');
      }
  });
  }
  return (
    <div>
        <div>
          <p>Account: {account}</p>
          <p>ChainId: {chainId}</p>
        </div>
        <div>
          <button type="button" onClick={handleConnect}>{active?'disconnect':'connect'}</button>
        </div>
    </div>
 )
}

export default App;