import React, { useState } from "react";
import styles from "./OngoingChallenge.module.css"
import { useNavigate } from 'react-router-dom';
import MyChallengeCard from "../common/MyChallengeCard";
import test from "../../img/test-back.jpg"

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
        <p style={{ fontSize: "20px", margin: "auto" }}>진행중 챌린지</p>
        <div></div>
      </div>
    </div>
  );
}

function AchieveRateBox(){
    const [count, setCount] = useState(0);
    const [achRate, setAchRate] = useState(100);
    return(
        <div className={styles.achRateBox}>
            <div className={styles.boxLeft}>
                <p>챌린지</p>
                <p><span>{count}</span>개</p>
            </div>
            <div className={styles.boxRight}>
                <p>평균 달성률</p>
                <span>{achRate}%</span>
            </div>
        </div>
    )
}

function ChallengeList(){
    // for문 돌리자
    return (
      <div className={styles.listBox}>
        <MyChallengeCard
          type="학습"
          title="영어, 외국어 10문장 쓰기"
          times={3}
          period="2022.09.05~2022.09.11"
          img={test}
          count='5'
        ></MyChallengeCard>
      </div>
    );
}

function OngoingChallenge(){
    return(
        <div>
            <Header></Header>
            <AchieveRateBox></AchieveRateBox>
            <ChallengeList></ChallengeList>
        </div>
    )
}

export default OngoingChallenge;