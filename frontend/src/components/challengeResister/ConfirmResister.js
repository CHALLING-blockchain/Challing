import React from "react";
import styles from "./ConfirmResister.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ResisterCard from "../common/ResisterCard";
import test from "../../img/test-back.jpg"
import person from "../../img/person.png"
import eth from "../../img/ethCoin.png"
import RefundPolicy from "../common/RefundPolicy";
import Next from "../common/NextButton";


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

function Inform(){
    const [people, setPeople] = useState(0);
    const [deposit, setDeposit] = useState(0);
    return (
      <div className={styles.informBox}>
        <p>챌린지 정보</p>
        <div>
            <div className={styles.desBox}>
                <div className={styles.flexBox}>
                    <img src={person} alt="" />
                    <span>참가인원</span>
                </div>
                <span>{people} 명</span>
            </div>
            <div className={styles.desBox}>
                <div className={styles.flexBox}>
                    <img src={eth} alt="" />
                    <span>예치금</span>
                </div>
                <span>{deposit} eth</span>
            </div>
            <hr className={styles.hrTag}/>
        </div>

      </div>
    );
}

function Btn(){
    const [deposit, setDeposit] = useState(0);
    return (
      <div className={styles.btnBox}>
        <Next
          type="submit"
          label={deposit + " ETH 지불하기"}
          onClick={() => {}}
          disabled={false}
        ></Next>
      </div>
    );
}

function MyBalance(){
    const [balance, setBalance] = useState(0);
    return(
        <div className={styles.balanceBox}>
            <span style={{fontWeight:'bold'}}>나의 잔액</span>
            <span>{balance} ETH</span>
        </div>
    )
}

function ConfirmResister(){
    
    return (
      <div>
        <Header></Header>
        <ResisterCard
          type={"학습"}
          title={"영어, 외국어 10문장 쓰기"}
          times={"3"}
          period={"2022.09.15 ~ 2022.09.22"}
          img={test}
        ></ResisterCard>
        <Inform></Inform>
        <MyBalance></MyBalance>
        <RefundPolicy></RefundPolicy>
        <Btn></Btn>

      </div>
    );
}

export default ConfirmResister;