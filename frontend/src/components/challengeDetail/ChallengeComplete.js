import React, { useEffect, useState } from "react";
import styles from "./ChallengeComplete.module.css";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import ContractAPI from "./../../api/ContractAPI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser, setUserInfo } from "./../../app/redux/userSlice";
import { challengeList } from "./../../app/redux/allChallengeSlice";
import { donationList } from "../../app/redux/DonationListSlice";
import UserAPI from "../../api/UserAPI";
import { useParams } from "react-router-dom";
import donationHand from "../../img/donation-challenge-hand.png";
import useWeb3 from "../../hooks/useWeb3";

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
          if (Number(challengers[i].userId) === user.id) {
            console.log(challengers[i]);
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
            {((myCount * 100) / totalCount).toFixed(2)}%
          </span>
          <Container>
            <Progress width={(myCount * 100) / totalCount + "%"} />
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

function Reward(props) {
  const challengeId = props.challengeId;
  const Contract = new ContractAPI();
  const challenge = props.challenge;
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(selectUser));
  const deposit = challenge.deposit / 1e18;
  const [reward, setReward] = useState(0);
  const [fine, setFine] = useState(0);
  const [donatorDeposit, setDonatorDeposit] = useState(0);
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
      const challengers = await Contract.getChallengers(challengeId);
      for (let i = 0; i < challengers.length; i++) {
        if (Number(challengers[i].userId) === user.id) {
          if (type === "daily") {
            console.log(challengers[i].reward);
            setReward(challengers[i].reward / 1e18);
            setFine(deposit - challengers[i].userDeposit / 1e18);
          } else if (type === "donation") {
            setDonatorDeposit(challengers[i].userDeposit / 1e18);
          }
        }
      }
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
              <span style={{ color: "#8397FF" }}>+ {reward} ETH</span>
            </div>
            <div className={styles.rewardItem}>
              <span style={{ color: "#8397FF" }}>벌금</span>
              <span style={{ color: "#8397FF" }}>- {fine} ETH</span>
            </div>
            <div className={styles.totalReward}>
              <span style={{ color: "#755FFF" }}>총 환급금</span>
              <span style={{ color: "#755FFF" }}>
                {Number(deposit) + Number(reward) - Number(fine)} ETH
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
              <span style={{ color: "#755FFF" }}>{donatorDeposit} ETH</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Btn(props) {
  const [exist, setExist] = useState(localStorage.getItem("myAccount"));
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState("");

  // get active account and balance data from useWeb3 hook
  const { account: activeAccount } = useWeb3(
    setIsLoading,
    setErrorMessage,
    exist,
    setExist
  );
  const navigate = useNavigate();
  const challengeId = props.challengeId;
  const challenge = props.challenge;
  const Contract = new ContractAPI(activeAccount);
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(selectUser));
  const [challenger, setChallenger] = useState("");
  const selector = useSelector(challengeList);
  const totalCount = selector[challengeId].authTotalTimes;

  function refund() {
    Contract.refund(challengeId, user.id);
    navigate(`/completed-detail/${challengeId}`);
  }
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
      const challengers = await Contract.getChallengers(challengeId);

      for (let i = 0; i < challengers.length; i++) {
        if (Number(challengers[i].userId) === user.id) {
          setChallenger(challengers[i]);
        }
      }
    }
    load();
  }, []);

  if (challenger.receiveRefund) {
    return <div>정산완료</div>; //여기 css 수정해주라
  } else {
    return (
      <div>
        {type === "daily" ? (
          challenger.totalCount / totalCount >= 0.4 ? (
            <div>
              <button className={styles.btn} onClick={refund}>
                환급받기
              </button>
            </div>
          ) : (
            <div></div>
          )
        ) : challenge.success === false ? (
          <div>
            <button className={styles.btn} onClick={refund}>
              환급받기
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function DonationSuccess(props) {
  const challenge = props.challenge;
  const donationPlaces = useSelector(donationList);
  const place = donationPlaces[challenge.donationId];

  return (
    <div className={styles.donationSuccess}>
      <div className={styles.dsImgs}>
        <img className={styles.fav} src={donationHand} alt="" />
      </div>

      <div className={styles.dsText}>
        <p>💝기부챌린지 성공💝</p>
        <span>{place}로 기부금이 전달되었습니다.</span>
      </div>
    </div>
  );
}

function ChallengeComplete() {
  const { id } = useParams();
  const selector = useSelector(challengeList);
  const element = selector[id];

  let type = "";
  if ("deposit" in element) {
    type = "daily";
  } else {
    type = "donation";
  }
  return (
    <div>
      <Header></Header>
      {type === "donation" ? (
        element.success === true ? (
          <div className={styles.DonationChallengeSuccessBox}>
            <DonationSuccess
              challengeId={id}
              challenge={element}
            ></DonationSuccess>
          </div>
        ) : (
          <div className={styles.DonationChallengeFailBox}>
            <div>
              <Achieve challengeId={id} challenge={element}></Achieve>
              <hr className={styles.hrTag} />
              <Reward challengeId={id} challenge={element}></Reward>
              <hr className={styles.hrTag} />
              <Btn challengeId={id} challenge={element}></Btn>
            </div>
          </div>
        )
      ) : (
        <div className={styles.DailyChallengeCompleteBox}>
          <Achieve challengeId={id} challenge={element}></Achieve>
          <hr className={styles.hrTag} />
          <Reward challengeId={id} challenge={element}></Reward>
          <hr className={styles.hrTag} />
          <Btn challengeId={id} challenge={element}></Btn>
        </div>
      )}
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
