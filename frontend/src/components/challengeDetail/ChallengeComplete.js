import React, { useEffect, useState } from "react";
import styles from "./ChallengeComplete.module.css";
import styled, { keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';
import ContractAPI from './../../api/ContractAPI';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser, setUserInfo } from './../../app/redux/userSlice';
import { challengeList } from './../../app/redux/allChallengeSlice';
import UserAPI from "../../api/UserAPI";
import { useParams } from 'react-router-dom';


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
        <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 종료</p>
        <div></div>
      </div>
    </div>
  );
}

function Achieve(props) {
    const challengeId = props.challengeId;
    const Contract = new ContractAPI();
    const dispatch = useDispatch();
    const [user, setUser] = useState(useSelector(selectUser));
    const [myCount, setMyCount] = useState("");
    const selector = useSelector(challengeList);
    const totalCount = selector[challengeId].authTotalTimes;

    useEffect(() => {
      UserAPI.mypage(user.email).then((response) => {
        dispatch(setUserInfo(response.data.body));
        setUser(response.data.body);
      });
    }, [user.email, dispatch]);
    useEffect(() => {
      async function load() {
        await Contract.getChallengers(challengeId).then((result) => {
          let challengers = result;
          for (let i = 0; i < challengers.length; i++) {
            if (challengers[i].userId == user.id) {
              setMyCount(challengers[i].totalCount);
            }
          }
        });
      }
      load();
    }, []);


    return (
      <div className={styles.achBox}>
        <span style={{ fontSize: "18px" }}>최종 달성률</span>
        <div className={styles.ach}>
          <div className={styles.passBox}>
            <span
              style={{ color: "#755FFF", fontSize: "14px", fontWeight: "bold" }}
            >
              {(myCount * 100) / (totalCount + myCount)}%
            </span>
            <Container>
              <Progress
                width={(myCount * 100) / (totalCount + myCount) + "%"}
              />
            </Container>
          </div>
        </div>
        <div className={styles.countsBox}>
          <div className={styles.counts}>
            <span style={{ marginRight: "8px" }}>인증 성공</span>
            <span style={{ fontWeight: "bold" }}>{myCount}개</span>
          </div>
          <div className={styles.counts}>
            <span style={{ marginRight: "8px" }}>인증 실패</span>
            <span style={{ fontWeight: "bold" }}>{totalCount - myCount}개</span>
          </div>
        </div>
      </div>
    );
}

function Reward(props){
    const challengeId = props.challengeId;
    const Contract = new ContractAPI();
    const challenge = props.challenge;
    const dispatch = useDispatch();
    const [user, setUser] = useState(useSelector(selectUser));
    const deposit = challenge.deposit;
    const [reward, setReward] = useState("");
    const [donatorDeposit, setDonatorDeposit] = useState("");
    console.log(challenge);

    // 일상이면 deposit 기부면 setDonation
    let type = "";
    if ("deposit" in challenge) {
      type = "daily";
    } else {
      type = "donation";
    }
    useEffect(() => {
      UserAPI.mypage(user.email).then((response) => {
        dispatch(setUserInfo(response.data.body));
        setUser(response.data.body);
      });
    }, [user.email, dispatch]);
    useEffect(() => {
      async function load() {
        await Contract.getChallengers(challengeId).then((result) => {
          let challengers = result;
          for (let i = 0; i < challengers.length; i++) {
            if (challengers[i].userId == user.id) {
              if (type === "daily") {
                setReward(challengers[i].reward);
              } else if (type === "donation") {
                setDonatorDeposit(challengers[i].userDeposit);
              }
            }
          }
        });
      }
      load();
    }, []);

    return (
      <div className={styles.rewardBox}>
        {type === "daily" ? (
            <div>
                <span style={{ fontSize: "18px" }}>챌린지 환급금</span>
                <div className={styles.rewardDetail}>
                    <div className={styles.rewardItem}>
                        <span>예치금</span>
                        <span>{deposit} ETH</span>
                    </div>
                    <div className={styles.rewardItem}>
                        <span style={{ color: "#8397FF" }}>상금</span>
                        <span style={{ color: "#8397FF" }}>{reward} ETH</span>
                    </div>
                    <div className={styles.totalReward}>
                        <span style={{ color: "#755FFF" }}>총 환급금</span>
                        <span style={{ color: "#755FFF" }}>
                        {Number(deposit) + Number(reward)} ETH
                        </span>
                    </div>
                </div>

            </div>
        ) : (
            <div>
                <span style={{ fontSize: "18px" }}>챌린지 환급금</span>
                <div className={styles.rewardDetail}>
                    <div className={styles.rewardItem}>
                        <span>예치금</span>
                        <span>{donatorDeposit} ETH</span>
                    </div>
                    <div className={styles.totalReward}>
                        <span style={{ color: "#755FFF" }}>총 환급금</span>
                        <span style={{ color: "#755FFF" }}>
                        {donatorDeposit} ETH
                        </span>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
}

function Btn(props) {
    const challengeId = props.challengeId;
    const challenge = props.challenge;
    const Contract = new ContractAPI();
    const dispatch = useDispatch();
    const [user, setUser] = useState(useSelector(selectUser));
    const [myCount, setMyCount] = useState("");
    const selector = useSelector(challengeList);
    const totalCount = selector[challengeId].authTotalTimes;


    let type = "";
    if ("deposit" in challenge) {
      type = "daily";
    } else {
      type = "donation";
    }
    useEffect(() => {
      UserAPI.mypage(user.email).then((response) => {
        dispatch(setUserInfo(response.data.body));
        setUser(response.data.body);
      });
    }, [user.email, dispatch]);
    useEffect(() => {
      async function load() {
        await Contract.getChallengers(challengeId).then((result) => {
          let challengers = result;
          for (let i = 0; i < challengers.length; i++) {
            if (challengers[i].userId == user.id) {
              setMyCount(challengers[i].totalCount);
            }
          }
        });
      }
      load();
    }, []);

    return (
      <div>
        {type === "daily" ? (
          myCount / totalCount >= 0.4 ? (
            <div>
              <button className={styles.btn}>환급받기</button>
            </div>
          ) : (
            <div></div>
          )
        ) : challenge.success == false ? (
          <div>
            <button className={styles.btn}>환급받기</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
}

function ChallengeComplete() {
  const { id } = useParams();
  const selector = useSelector(challengeList);
  const element = selector[id];
  return (
    <div>
      <Header></Header>
      <Achieve challengeId={id} challenge={element}></Achieve>
      <hr className={styles.hrTag} />
      <Reward challengeId={id} challenge={element}></Reward>
      <hr className={styles.hrTag} />
      <Btn challengeId={id} challenge={element}></Btn>
    </div>
  );
}


export default ChallengeComplete;

const Container = styled.div`
  margin: 8px auto 16px;
  background-color: #e5e1ff;
  width: 328px;
  height: 8px;
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
