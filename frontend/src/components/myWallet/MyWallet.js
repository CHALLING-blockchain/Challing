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
  // ETH -> KRW
  const [exData, setExData] = useState("");

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
    let accounts = "";
    async function getAccount() {
      const account = await web3.eth.getAccounts();
      accounts = account[0];
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
    getAccount();
  }, [isLoading]);

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
          <span key={index}>
            <p> {date} </p>
            <h4>
              {" "}
              {utf8_hex_string_to_string(txData[index].input.substr(2))}{" "}
              {txData[index].etherValue}ETH {txData[index].sendOrReceive}
            </h4>
            <br></br>
          </span>
        );
      }
    }
    return result;
  }

  return (
    <div className="App">
      {/* instantiate web3 only after a user clicks the button */}
      {/* avoid doing it automatically */}
      {!exist ? (
        // 웹브라우저 사용자만 활성화
        <button onClick={connect}>메타마스크 지갑 연동</button>
      ) : (
        <>
          {/* <p>ACCOUNT : {activeAccount}</p> */}
          <span>
            Etherium:{" "}
            <big>
              <strong>{activeBalance}</strong>
            </big>{" "}
            ETH
          </span>
          <p>
            {" "}
            ≒{" "}
            {Math.floor(exData * activeBalance)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            ₩
          </p>
          {/* 웹 브라우저 사용자만 연결해제 버튼 활성화 */}
          <button onClick={disconnect}>Disconnect</button>
          <br></br>
          <br></br>
          <span>
            Transaction History<br></br>
            {txRendering()}
            {""}
            <a href={"https://ropsten.etherscan.io/address/" + activeAccount}>
              Etherscan에서 거래내역 상세보기
            </a>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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
