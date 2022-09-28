import React, { useState } from "react";
import styles from "./CompletedDetail.module.css";
import { useNavigate } from 'react-router-dom';
import backdrop from "../../img/test-back.jpg";
import heart from "../../img/heart.png";
import calender from "../../img/calender.png";
import person from "../../img/person.png";
import coin from "../../img/ethCoin.png";
import chart from "../../img/chart.png";
import styled, { keyframes } from "styled-components";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { challengeList } from './../../app/redux/allChallengeSlice';


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
        <p style={{ fontSize: "20px", margin: "auto" }}>완료된 챌린지</p>
        <div></div>
      </div>
    </div>
  );
}

function BackDrop(props) {
  return <img className={styles.backdrop} src={props.url} alt="" />;
}

function Description(props) {
  return (
    <div className={styles.desBox}>
      <p className={styles.title}>{props.title}</p>
      <div className={styles.subBox}>
        <div className={styles.oneline}>
          <img src={heart} alt="" />
          <span>
            챌린지 <span style={{ color: "#755FFF" }}>종료</span>
          </span>
        </div>
        <div className={styles.oneline}>
          <img src={calender} alt="" />
          <span>{props.period}</span>
        </div>
      </div>
      <hr className={styles.hrTag} />
    </div>
  );
}

function MyAchRate(props){
  const challengeId = props.challengeId;
    const [ach, setAch] = useState(50);
    const [deposit, setDeposit] = useState(0.98);
    const [prize, setPrize] = useState(0.04);
    return (
      <div className={styles.MyAchRate}>
        <div className={styles.rateText}>
          <span>나의 달성률</span>
          <span style={{ color: "#755FFF" }}>{ach}%</span>
        </div>
        <Container>
          <Progress width={ach + "%"} />
        </Container>
        <div className={styles.rewardBox}>
          <div>
            <p style={{ fontSize: "14px" }}>{deposit + prize} ETH 환급</p>
            <p style={{ fontSize: "10px", color: "#6A6A6A" }}>
              예치금 {deposit} ETH
            </p>
          </div>
          <div className={styles.reward}>
            <span>상금 {prize}ETH</span>
          </div>
        </div>
        <hr className={styles.hrTag} />
      </div>
    );
}

function Inform(props){
    const [people, setPeople] = useState(0);
    const [deposit, setDeposit] = useState(0.1);
    const [rate, setRate] = useState(100);

    return (
      <div className={styles.informBox}>
        <div className={styles.informOne}>
          <img src={person} alt="" />
          <span>
            총 <span style={{ color: "#755FFF" }}>{people}</span>명 참가
          </span>
        </div>
        <div className={styles.informOne}>
          <img src={coin} alt="" />
          <span>
            총 예치금 <span style={{ color: "#755FFF" }}>{deposit}</span>ETH
          </span>
        </div>
        <div className={styles.informOne}>
          <img src={chart} alt="" />
          <span>
            참가자 평균 달성률 <span style={{ color: "#755FFF" }}>{rate}%</span>
          </span>
        </div>
      </div>
    );
}

function CompletedDetail(){
  const { id } = useParams();
  const selector = useSelector(challengeList);
  const element = selector[id];
    return (
      <div>
        <Header></Header>
        <BackDrop url={element.mainPicURL}></BackDrop>
        <Description
          title = {element.name}
          period={element.startDate + "~" + element.endDate}
        ></Description>
        <MyAchRate challengeId={id}></MyAchRate>
        <Inform challenge={element} challengeId={id}></Inform>
      </div>
    );
}

export default CompletedDetail;

const Container = styled.div`
  margin: 8px auto;
  background-color: #e5e1ff;
  width: 328px;
  height: 6px;
  display: flex;
  align-items: center;
  border-radius: 7px;
`;
const ani = keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: width;
    }
`;
const Progress = styled.div`
  background-color: #755fff;
  width: ${(props) => props.width};
  height: 100%;
  transition: width 1s;
  border-radius: 7px;
  animation: ${ani} 1s;
`;