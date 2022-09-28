import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { challengeList } from "../../app/redux/allChallengeSlice";
import styles from "./SuccessRegister.module.css";
import RegisterCard from "../common/RegisterCard";
import person from "../../img/person.png";
import eth from "../../img/ethCoin.png";
import test from "../../img/test-back.jpg";
import { Link } from "react-router-dom";
import Next from "../common/NextButton";
import * as getInterestStr from "../main/Main.js";
import * as getDayGap from "../main/Main.js";
import Web3 from "web3";
import Contract from "../../api/ContractAPI";

function Header() {
  return (
    <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
      <div className={styles.header}>
        <div></div>
        <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 신청</p>
        <div></div>
      </div>
    </div>
  );
}

function Inform(props) {
  // const [people, setPeople] = useState(0);
  // const [deposit, setDeposit] = useState(0);
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
            {" "}
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

function Btn() {
  // const [deposit, setDeposit] = useState(0);
  return (
    <div className={styles.btnBox}>
      <Link to="/">
        <Next
          type="submit"
          label="홈으로"
          onClick={() => {}}
          disabled={false}
          flag={true}
        ></Next>
      </Link>
    </div>
  );
}

function SuccessRegister() {
  //챌린지 아이디
  const { id } = useParams();
  const selector = useSelector(challengeList);
  const element = selector[id];
  let week = Math.floor(
    getDayGap.getDayGapFromDates(element.startDate, element.endDate) / 7
  );
  let perWeek = Math.floor(element.authTotalTimes / week);
  return (
    <div>
      <Header></Header>
      <div className={styles.title}>
        <p>챌린지에 성공적으로</p>
        <p>참가하였습니다.</p>
      </div>
      <RegisterCard
        type={getInterestStr.interestIdToName(element.interestId)}
        title={element.name}
        times={perWeek}
        period={element.startDate + "~" + element.endDate}
        img={element.mainPicURL}
      ></RegisterCard>
      <Inform challenge={element} challengeId={id}></Inform>
      <Btn></Btn>
    </div>
  );
}

export default SuccessRegister;
