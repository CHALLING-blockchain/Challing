import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { challengeList } from "../../app/redux/allChallengeSlice";
import styles from "./SuccessRegister.module.css";
import RegisterCard from "../common/RegisterCard";
import person from "../../img/person.png";
import eth from "../../img/ethCoin.png";
import { Link } from "react-router-dom";
import Next from "../common/NextButton";
import * as getInterestStr from "../main/Main.js";
import * as getDayGap from "../main/Main.js";
import Web3 from "web3";
import ContractAPI from "../../api/ContractAPI";

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
      const Contract = new ContractAPI();
      await Contract.getChallengers(id).then((result) => {
        let challengeCnt = result.length;
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
              web3.utils.fromWei(
                props.challenge.deposit || props.challenge.setDonation,
                "ether"
              )
            ).toFixed(4)}{" "}
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
  const navigate = useNavigate();
  return (
    <div className={styles.btnBox}>
      <Link to="/">
        <Next
          type="submit"
          label="홈으로"
          onClick={() => {
            navigate("/");
          }}
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
  let period = Number(
    getDayGap.getDayGapFromDates(element.startDate, element.endDate)
  );
  let perWeek =
    Number(element.authTotalTimes) /
    (Number(element.authDayTimes) * (period / 7));
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
