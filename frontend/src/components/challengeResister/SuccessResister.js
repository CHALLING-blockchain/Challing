import React, { useState } from "react";
import styles from "./SuccessResister.module.css"
import ResisterCard from "../common/ResisterCard";
import person from "../../img/person.png";
import eth from "../../img/ethCoin.png";
import test from "../../img/test-back.jpg"
import { Link } from "react-router-dom";
import Next from "../common/NextButton";



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

function Inform() {
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
        <hr className={styles.hrTag} />
      </div>
    </div>
  );
}

function Btn() {
  const [deposit, setDeposit] = useState(0);
  return (
    <div className={styles.btnBox}>
        <Link to="/">
            <Next
                type="submit"
                label="홈으로"
                onClick={() => {
                    
                }}
                disabled={false}
                flag={true}
            ></Next>

        </Link>
    </div>
  );
}


function SuccessResister(){
    return (
      <div>
        <Header></Header>
        <div className={styles.title}>
          <p>챌린지에 성공적으로</p>
          <p>참가하였습니다.</p>
        </div>
        <ResisterCard
          type={"학습"}
          title={"영어, 외국어 10문장 쓰기"}
          times={"3"}
          period={"2022.09.15 ~ 2022.09.22"}
          img={test}
        ></ResisterCard>
        <Inform></Inform>
        <Btn></Btn>
      </div>
    );
}

export default SuccessResister;