
/*
activate 함수에 connector를 전달
정상적으로 실행될 경우 useWeb3React에 제공하는 context값들이 갱신
*/

import { InjectedConnector } from '@web3-react/injected-connector';
export const injected = new InjectedConnector();