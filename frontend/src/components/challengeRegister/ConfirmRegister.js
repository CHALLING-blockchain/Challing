import React from "react";
import styles from "./ConfirmRegister.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as getInterestStr from "../main/Main.js";
import { challengeList } from "../../app/redux/allChallengeSlice";
import Contract from "../../api/ContractAPI";
import { useEffect, useState } from "react";
import RegisterCard from "../common/RegisterCard";
import test from "../../img/test-back.jpg";
import person from "../../img/person.png";
import eth from "../../img/ethCoin.png";
import RefundPolicy from "../common/RefundPolicy";
import Next from "../common/NextButton";
import useWeb3 from "../../hooks/useWeb3";
import useBalance from "../../hooks/useBalance";
import Web3 from "web3";
import * as getDayGap from "../main/Main.js";

function Header() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
      <div className={styles.header}>
        <svg
          style={{ margin: "auto" }}
          onClick={() => navigate(-1)}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 신청하기</p>
        <div></div>
      </div>
    </div>
  );
}

function Inform(props) {
  const web3 = new Web3(window.ethereum);
  const [challengeCntData, setChallengeCntData] = useState("");
  const id = props.challengeId;
  useEffect(() => {
    async function load() {
      await Contract.getChallengers(id).then((result) => {
        let challengeCnt = 0;
        challengeCnt = result.length;
        setChallengeCntData(challengeCnt);
      });
    }
    load();
  }, [id]);

  return (
    <div className={styles.informBox}>
      <p>챌린지 정보</p>
      <div>
        <div className={styles.desBox}>
          <div className={styles.flexBox}>
            <img src={person} alt="" />
            <span>참가인원</span>
          </div>
          <span>{challengeCntData} 명</span>
        </div>
        <div className={styles.desBox}>
          <div className={styles.flexBox}>
            <img src={eth} alt="" />
            <span>예치금</span>
          </div>
          <span>
            {Number(
              web3.utils.fromWei(props.challenge.deposit, "ether")
            ).toFixed(3)}{" "}
            eth
          </span>
        </div>
        <hr className={styles.hrTag} />
      </div>
    </div>
  );
}

function Btn(props) {
  const web3 = new Web3(window.ethereum);
  return (
    <div className={styles.btnBox}>
      <Next
        type="submit"
        label={
          Number(web3.utils.fromWei(props.challenge.deposit, "ether")).toFixed(
            3
          ) + " ETH 지불하기"
        }
        onClick={() => {}}
        disabled={false}
        flag={true}
      ></Next>
    </div>
  );
}

function MyBalance() {
  // localstorage에 wallet 연결 확인
  const [exist, setExist] = useState(localStorage.getItem("myAccount"));
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState("");
  // get active account and balance data from useWeb3 hook
  const { provider, account: activeAccount } = useWeb3(
    setIsLoading,
    setErrorMessage,
    exist,
    setExist
  );
  // get active account balance from useBalance hook
  const activeBalance = useBalance(
    provider,
    activeAccount,
    setIsLoading,
    setErrorMessage
  );
  return (
    <div className={styles.balanceBox}>
      <span style={{ fontWeight: "bold" }}>나의 잔액</span>
      <span>{activeBalance} ETH</span>
    </div>
  );
}

function ConfirmRegister() {
  //챌린지 아이디
  const { id } = useParams();
  const selector = useSelector(challengeList);
  const element = selector[id];

  let week = Math.floor(
    getDayGap.getDayGapFromDates(element.startDate, element.endDate) / 7
  );
  console.log("week: ", week);
  console.log(element.authTotalTimes);
  let perWeek = Math.floor(element.authTotalTimes / week);
  return (
    <div>
      <Header></Header>
      <RegisterCard
        type={getInterestStr.interestIdToName(element.interestId)}
        title={element.name}
        times={perWeek}
        period={element.startDate + "~" + element.endDate}
        img={element.mainPicURL}
      ></RegisterCard>
      <Inform challenge={element} challengeId={id}></Inform>
      <MyBalance></MyBalance>
      <RefundPolicy></RefundPolicy>
      <Btn challenge={element}></Btn>
    </div>
  );
}

export default ConfirmRegister;
