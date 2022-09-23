import React, { useState } from "react";
import styles from "./ChallengeCertify.module.css"
import backdrop from "../../img/test-back.jpg"
import chart from "../../img/chart.png"
import heart from "../../img/heart.png"
import calender from "../../img/calender.png"
import chat from "../../img/chat.png"
import { Link, useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    return (
      <div style={{ display: "fixed", top: "0" }}>
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
          <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 인증</p>
          <div></div>
        </div>
      </div>
    );
}

function BackDrop(){
    const [back, setBack] = useState(backdrop)
    return(
        <img className={styles.backdrop} src={back} alt="" />
    )
}

function Description(){
    const [title, setTitle] = useState('영어, 외국어 10문장 쓰기')
    return (
      <div className={styles.desBox}>
        <p className={styles.title}>{title}</p>
        <div className={styles.subBox}>
          <div className={styles.oneline}>
            <img src={heart} alt="" />
            <span>
              챌린지 <span style={{color:'#755FFF'}}>3일</span> 째
            </span>
          </div>
          <div className={styles.oneline}>
            <img src={calender} alt="" />
            <span>
              2022/09/05 ~ 2022/09/11
            </span>
          </div>
          <div className={styles.oneline}>
            <img src={chart} alt="" />
            <span>
                현재 <span style={{color:'#755FFF'}}>85%</span> 달성
            </span>
          </div>
        </div>
      </div>
    );
}

function Btn(){
    const [state, setState] = useState(false);
    return (
      <div className={styles.btnBox}>
        <button className={styles.btn} onClick={()=>{}} disabled={state}>📸 인증하기</button>
      </div>
    );
}

function OtherShot(){
    const [shots, setShots] = useState();
    return (
      <div className={styles.otherShot}>
        <div className={styles.shotTitle}>
          <span>다른 챌린저의 인증샷</span>
          <Link style={{ color: "#755FFF" }} to="/certification-photos">
            더보기
          </Link>
        </div>
        <div className={styles.shots}>
            <img src={backdrop} alt="" />
            <img src={backdrop} alt="" />
            <img src={backdrop} alt="" />
            <img src={backdrop} alt="" />
            <img src={backdrop} alt="" />
            <img src={backdrop} alt="" />
        </div>
      </div>
    );
}

function Voting(){
    return (
      <div>
        <Link to="/votinghome" className={styles.voting}>
          <div className={styles.votingSub}>
            <img style={{ width: "32px", height: "32px" }} src={chat} alt="" />
            <span style={{margin:'0 4px', fontSize:'16px'}}>투표</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Link>
      </div>
    );
}

function ChallengeCertify(){
    return (
      <div>
        <Header></Header>
        <BackDrop></BackDrop>
        <Description></Description>
        <Btn></Btn>
        <hr className={styles.hrTag} />
        <OtherShot></OtherShot>
        <Voting></Voting>
        <div style={{ width: "100vw", height: "90px" }}></div>
      </div>
    );
}

export default ChallengeCertify;