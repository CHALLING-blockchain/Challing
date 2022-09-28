import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import useWeb3 from "../../hooks/useWeb3";
import useBalance from "../../hooks/useBalance";
import Web3 from "web3";
import styles from "./MyWallet.module.css";
import logo from "../../img/logo-color.png";
import walletImg from "../../img/auth-wallet-img.png";
import metamaskImg from "../../img/metamask.png";
import plus from "../../img/plus.png";
import Coin from "../../img/dollarCoin.png";
import ContractAPI from "../../api/ContractAPI";

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
  // passCoin
  const [passData, setPassData] = useState("");

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

  function PassCoin() {
    // console.log("mywallet: ", activeAccount);
    const Contract = new ContractAPI(activeAccount);
    useEffect(() => {
      if (activeAccount !== undefined && activeAccount !== "") {
        console.log("activeAccount", activeAccount);
        async function load() {
          await Contract.getPasscoin().then((result) => {
            setPassData(result);
          });
        }
        load();
        console.log("passCoin", passData);
      }
    }, [activeAccount]);

    return (
      <div className={styles.passCoinBox}>
        <div className={styles.passCoinDes}>
          <p>Pass Coin</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-question-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
          </svg>
        </div>
        <div className={styles.passCoinBottom}>
          <img src={Coin} alt="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
          <span>{passData}</span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    let accounts = "";
    async function getAccount() {
      const account = await web3.eth.getAccounts();
      accounts = account[0];
      if (accounts === undefined) {
        connect();
      } else {
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
        const crypto_url =
          process.env.REACT_APP_CRYPTO_API_URL +
          `&api_key=` +
          process.env.REACT_APP_CRYPTO_API_KEY;

        // Etherscan API 요청
        axios.get(etherscan_url).then(function (result) {
          console.log("etherscan api url: " + etherscan_url);
          const data = result.data.result;
          const tmpData = [];
          for (let index = 0; index < data.length; index++) {
            if (isNaN(data[index].value)) {
              connect();
            }
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

            //undefined 예외처리
            if (element.input !== undefined) {
              // "챌링" 단어를 data에 포함한 tx만 tmpData에 push
              if (element.input.includes("ecb18ceba781")) {
                // 트렌젝션을 보냈을때
                // console.log(
                //   "input=",
                //   utf8_hex_string_to_string(element.input.substr(2))
                // );
                if (element.from.toLowerCase() === accounts.toLowerCase()) {
                  element.sendOrReceive = "↓";
                }
                // 트렌젝션을 받았을때
                else {
                  element.sendOrReceive = "↑";
                }
                tmpData.push(element);
              }
            }
          }
          setTxData(tmpData);
        });

        // Crypto API 요청
        await axios.get(crypto_url).then(function (result) {
          console.log("crypto api url: ", crypto_url);
          const KRW = result.data.KRW;
          console.log("KRW" + KRW);
          setExData(KRW);
        });
      }
    }
    getAccount();
  }, [activeAccount]);

  // 16진수(UTF8) -> 한글 변환-------------------------------------------------
  // UTF8 16 진수 문자열을 문자열로 변환
  function utf8_hex_string_to_string(hex_str1) {
    let bytes2 = hex_string_to_bytes(hex_str1);
    let str2 = utf8_bytes_to_string(bytes2);
    return str2;
  }

  // 바이트 배열을 16 진수 문자열로 변환

  function hex_string_to_bytes(hex_str) {
    let result = [];
    for (let i = 0; i < hex_str.length; i += 2) {
      result.push(hex_to_byte(hex_str.substr(i, 2)));
    }
    return result;
  }

  // 16 진수 문자열을 바이트 값으로 변환
  function hex_to_byte(hex_str) {
    return parseInt(hex_str, 16);
  }

  // UTF8 바이트 배열을 문자열로 변환
  function utf8_bytes_to_string(arr) {
    if (arr == null) return null;
    let result = "";
    let i;
    while ((i = arr.shift())) {
      if (i <= 0x7f) {
        result += String.fromCharCode(i);
      } else if (i <= 0xdf) {
        let c1 = (i & 0x1f) << 6;
        c1 += arr.shift() & 0x3f;
        result += String.fromCharCode(c1);
      } else if (i <= 0xe0) {
        let c2 = ((arr.shift() & 0x1f) << 6) | 0x0800;
        c2 += arr.shift() & 0x3f;
        result += String.fromCharCode(c2);
      } else {
        let c3 = (i & 0x0f) << 12;
        c3 += (arr.shift() & 0x3f) << 6;
        c3 += arr.shift() & 0x3f;
        result += String.fromCharCode(c3);
      }
    }
    return result;
  }
  // 16진수(UTF8) -> 한글 변환 끝 ----------------------------------------------

  // Unix timestamp to date
  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    // let hour = a.getHours();
    // let min = a.getMinutes();
    // let sec = a.getSeconds();
    let time = year + "/" + month + "/" + date;
    return time;
  }

  // 거래내역 for문
  function txRendering() {
    const result = [];
    for (let index = 0; index < txData.length; index++) {
      if (txData[index].input.includes("ecb18ceba781")) {
        let date = txData[index].timeStamp;
        // 날짜별로 모아서 보여주기
        if (
          index >= 1 &&
          index < txData.length &&
          txData[index].timeStamp === txData[index - 1].timeStamp
        ) {
          date = "";
        }
        result.push(
          <div key={index} className={styles.historyContent}>
            <p> {date} </p>
            <div className={styles.content}>
              <div className={styles.titleContent}>
                <p>
                  {utf8_hex_string_to_string(txData[index].input.substr(2))}
                </p>
              </div>
              <div></div>
              <div className={styles.ethcontent}>
                <p>
                  {txData[index].etherValue}ETH {txData[index].sendOrReceive}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
    return result;
  }

  return (
    <div>
      {/* instantiate web3 only after a user clicks the button */}
      {/* avoid doing it automatically */}
      {!exist ? (
        // 웹브라우저 사용자만 활성화
        <div className={styles.preInterlockBox}>
          <img className={styles.logo} src={logo} alt="" />
          <img className={styles.walletImg} src={walletImg} alt="" />
          <div className={styles.walletText}>
            <p>지갑을 연동하여</p>
            <p>
              <span style={{ color: "#926EFF" }}>챌링</span>의 다양한 챌린지를
              경험해보세요🙂
            </p>
          </div>
          <button className={styles.interlockBtn} onClick={connect}>
            <img src={metamaskImg} alt="" />
            <span>MetaMask 연동</span>
            <div></div>
          </button>
        </div>
      ) : (
        <>
          {/* <p>ACCOUNT : {activeAccount}</p> */}
          <div>
            <div className={styles.header}>
              <p>나의 지갑</p>
            </div>
            <div className={styles.balanceBox}>
              <p style={{ fontSize: "12px" }}>Etherium</p>
              <p style={{ fontSize: "16px", margin: "0 0 4px 0" }}>
                <span style={{ fontWeight: "bold", fontSize: "32px" }}>
                  {activeBalance}
                </span>{" "}
                ETH
              </p>
              <p style={{ fontSize: "12px" }}>
                <span>≒ </span>
                {Math.floor(exData * activeBalance)
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                ₩
              </p>
            </div>
            <PassCoin></PassCoin>
            {/* 웹 브라우저 사용자만 연결해제 버튼 활성화 */}
            {/* <button onClick={disconnect}>Disconnect</button> */}
            <div className={styles.historyBox}>
              <p>Transaction History</p>
              <div className={styles.scroll}>{txRendering()}</div>
              <a
                className={styles.ethscan}
                href={"https://ropsten.etherscan.io/address/" + activeAccount}
              >
                <img src={plus} alt="" />
                <p>
                  <span style={{ color: "#755FFF" }}> Etherscan</span>에서
                  거래내역 상세보기
                </p>
              </a>
            </div>
            <div style={{ height: "80px" }}></div>
          </div>
        </>
      )}
      {/* show loading and error statuses */}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default MyWallet;
