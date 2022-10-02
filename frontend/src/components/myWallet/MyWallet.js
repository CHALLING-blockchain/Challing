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

function Modal({ onClose }) {
  function handleClose() {
    onClose?.();
  }
  return (
    <div className={styles.Modal} onClick={handleClose}>
      <div className={styles.ModalBody} onClick={(e) => e.stopPropagation()}>
        <div>
          <svg
            className={styles.modalCloseBtn}
            onClick={handleClose}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#E5E5E5" />
            <path
              d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z"
              fill="#4F4F4F"
            />
          </svg>
        </div>
        <p className={styles.ModalTitle}>신고하기</p>
        <div style={{ position: "absolute", left: "32px", top: "88px" }}>
          <p className={styles.ModalText}>
            패스코인을 쓰면 챌린지 인증 하루 실패가 인증완료로 변경됩니다.
            <br />
            패스코인은 사용 후 취소가 불가하며, 챌린지 결과 발표 1시간 전까지
            사용 가능합니다.
            <br />
            다른 챌린저의 챌린지 성공여부 투표에 참여하여 결과와 같은 선택을
            하였을 시 얻을 수 있습니다.
          </p>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.NextButton} onClick={handleClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

function MyWallet() {
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };
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

  // 컨트랙트 주소들
  // const Caddress = window.localStorage.getItem("Caddress");
  // const Vaddress = window.localStorage.getItem("Vaddress");

  // get active account and balance data from useWeb3 hook
  const {
    connect,
    // disconnect,
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
            onClick={showModal}
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
        {openModal && (
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          />
        )}
      </div>
    );
  }

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    if (!window.ethereum) {
      window.open("https://metamask.io/download.html");
    }
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
              ),
              sendOrReceive: "",
              timeStamp: timeConverter(data[index].timeStamp),
              filter: data[index].methodId,
            };

            //undefined 예외처리
            if (
              element.input !== undefined &&
              element.filter !== undefined &&
              !filter(element.filter).includes("무슨함수")
            ) {
              // "챌링" 단어를 data에 포함한 tx만 tmpData에 push
              // if (element.input.includes("ecb18ceba781")) {
              // console.log(element);
              if (element.from.toLowerCase() === accounts.toLowerCase()) {
                element.sendOrReceive = "↓";
              }
              // 트렌젝션을 받았을때
              else {
                element.sendOrReceive = "↑";
              }
              tmpData.push(element);
              // }
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

  function filter(methodId) {
    if (methodId === "0x69e2809e" || methodId === "0xd20b03c5") {
      return "👍 챌링 인증";
    } else if (methodId === "0x1d41860d") {
      return "💪 챌링 생성(일상)";
    } else if (methodId === "0xfb81a8a9") {
      return "👋 챌링 생성(기부)";
    } else if (methodId === "0xa1d9bafc") {
      return "🚨 신고";
    } else if (methodId === "0xc6884595") {
      return "🚀 챌링 참여";
    } else if (methodId === "0xc7a097b7") {
      return "🏳‍🌈 투표 참여";
    } else if (methodId === "??") {
      return "🥈 챌링 환급 🥈";
    } else if (methodId === "??") {
      return "🥇 챌링 상금 🥇";
    } else {
      console.log(methodId);
      return "무슨함수" + methodId;
    }
  }
  // 거래내역 for문
  function txRendering() {
    const result = [];
    for (let index = 0; index < txData.length; index++) {
      // 거래내역 종류
      // let txType = "";
      // 트랜젝션 발생 시간
      let date = txData[index].timeStamp;
      // 날짜별로 모아서 보여주기

      if (
        index >= 1 &&
        index < txData.length &&
        txData[index].timeStamp === txData[index - 1].timeStamp
      ) {
        date = "";
      }

      // if (!filter(txData[index].filter).includes("무슨함수")) {
      // console.log("txData[index].filter", txData[index].filter);
      result.push(
        <div key={index} className={styles.historyContent}>
          <p> {date} </p>
          <div className={styles.content}>
            <div className={styles.titleContent}>
              <p>{filter(txData[index].filter)}</p>
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
      // }
      // }
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
                {Math.floor(exData * activeBalance).toLocaleString("ko-KR")}₩
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
                href={"https://goerli.etherscan.io/address/" + activeAccount}
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
