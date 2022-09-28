import calender from "../../../img/calender.png";
import gym from "../../../img/gym.png";
import paint from "../../../img/paint-kit.png";
import pencil from "../../../img/pencil.png";
import plus from "../../../img/plus.png";
import tea from "../../../img/tea-cup.png";
import donationIcon from "../../../img/donation-challenge-hand.png";
import dailyIcon from "../../../img/daily-challenge-hand.png";
import ethCoin from "../../../img/ethCoin.png";
import camera from "../../../img/camera.png";
import profile from "../../../img/person.png";
import text from "../../../img/text-front-color.png";
import clock from "../../../img/clock-front-color.png";
import styles from "./challengeForm.module.css";
import ContractAPI from "../../../api/ContractAPI";
import moment from "moment";
import { selectUser } from "../../../app/redux/userSlice";
import {
  setChallengeList,
  challengeList,
} from "../../../app/redux/allChallengeSlice";
import { useSelector, useDispatch } from "react-redux";
import useWeb3 from "../../../hooks/useWeb3";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateFinal({ selects, formCnt, setFormCnt }) {
  const challengeId = Object.keys(useSelector(challengeList)).length + 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // localstorage에 wallet 연결 확인
  const [exist, setExist] = useState(localStorage.getItem("myAccount"));
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState("");

  // get active account and balance data from useWeb3 hook
  const {
    connect,
    disconnect,
    provider,
    account: activeAccount,
  } = useWeb3(setIsLoading, setErrorMessage, exist, setExist);

  let userId = useSelector(selectUser).id;
  console.log("userId: ", useSelector(selectUser).id);
  const topic2id = {
    운동: 0,
    생황: 1,
    취미: 2,
    식생활: 3,
    학습: 4,
    "그 외": 5,
  };
  const daliyChallenge = {
    challengeId: 0,
    interestId: topic2id[selects.topic],
    ownerId: userId,
    name: selects.title,
    desc: selects.explanation,
    mainPicURL: selects.exPhotoUrl,
    goodPicURL: selects.goodShotUrl,
    badPicURL: selects.badShotUrl,
    authTotalTimes:
      selects.nTimesAWeek * selects.authentications * selects.period,
    authDayTimes: selects.authentications,
    startTime: selects.startTime,
    endTime: selects.endTime,
    startDate: selects.challengeStart,
    endDate: selects.challengeEnd,
    personnel: selects.limitNum,
    deposit: selects.dailyMoney,

    totalDeposit: selects.dailyMoney,

    complet: false,
  };
  const donationChallenge = {
    challengeId: 1,
    interestId: topic2id[selects.topic],
    ownerId: userId,
    donationId: 1,
    name: selects.title,
    desc: selects.explanation,
    setDonaion: selects.donationMoney,
    mainPicURL: selects.exPhotoUrl,
    goodPicURL: selects.goodShotUrl,
    badPicURL: selects.badShotUrl,
    authTotalTimes:
      selects.nTimesAWeek * selects.authentications * selects.period,
    authDayTimes: selects.authentications,
    startTime: selects.startTime,
    endTime: selects.endTime,
    startDate: selects.challengeStart,
    endDate: selects.challengeEnd,
    personnel: selects.limitNum,
    totalDonation: selects.donationMoney,

    complet: false,
    success: false,
  };
  function DailyCreateButton() {
    if (activeAccount !== undefined && activeAccount !== "") {
      const Contract = new ContractAPI(activeAccount);

      return (
        <div className={styles.buttonBox}>
          <button
            className={styles.NextButton}
            onClick={async () => {
              await Contract.createDailyChallenge(daliyChallenge).then(
                console.log
              );
              await Contract.getAllChallenge().then((result) => {
                dispatch(setChallengeList(result));
              });
              navigate(`/challenge-detail/${challengeId}`);
            }}
          >
            챌린지 발행하기
          </button>
        </div>
      );
    }
  }
  function DonationCreateButton() {
    if (activeAccount !== undefined && activeAccount !== "") {
      const Contract = new ContractAPI(activeAccount);
      return (
        <div className={styles.buttonBox}>
        <button
          className={styles.NextButton}
          onClick={async () => {
            await ContractAPI.createDonationChallenge(donationChallenge).then(
              console.log
            );
            await Contract.getAllChallenge().then((result) => {
              dispatch(setChallengeList(result));
            });
            navigate(`/challenge-detail/${challengeId}`);
          }}
        >
          챌린지 발행하기
        </button>
      </div>
    );
  }
}
  function Header() {
    return (
      <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
        <div className={styles.header}>
          <svg
            onClick={() => {
              setFormCnt(formCnt - 1);
            }}
            style={{ margin: "16px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 개설하기</p>
          <div></div>
        </div>
      </div>
    );

    }

  function DonationChallenge() {
    return (
      <div className={styles.CreateReview}>
        <div className={styles.Card1}>
          <img
            src={donationIcon}
            alt="donationIcon"
            style={{ width: "52px" }}
          />
          <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H80V2H0V0Z" fill="white"/>
          </svg>
          <p>{selects.challenge}</p>
        </div>
        <div >
          {selects.topic === "운동" ? (
            <div className={styles.Card1}>
              <img src={gym} alt="gym" style={{ width: "48px",height:"40px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "생활" ? (
            <div className={styles.Card1}>
              <img src={calender} alt="calender" style={{ width: "48px",height:"40px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "취미" ? (
            <div className={styles.Card1}> 
              <img src={paint} alt="paint" style={{ width: "48px",height:"40px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "식생활" ? (
            <div className={styles.Card1}>
              <img src={tea} alt="tea" style={{ width: "48px",height:"40px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "학습" ? (
            <div className={styles.Card1}>
              <img src={pencil} alt="pencil" style={{ width: "48px",height:"40px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "그 외" ? (
            <div className={styles.Card1}>
              <img src={plus} alt="plus" style={{ width: "48px",height:"40px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.Card1}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H80V2H0V0Z" fill="white"/>
          </svg>
          <p className={styles.Card1text}>{selects.donationMoney} ETH / {selects.donation}</p>
        </div>
        <div className={styles.Card2}>
          <img src={text} alt="ethCoin" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <p>챌린지 설명 보기</p>
        </div>
        <div className={styles.Card2}>
          <img src={camera} alt="camera" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <p>인증샷 예시 보기</p>
        </div>
        <div className={styles.Card2}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <div className={styles.CardText}>
            <p>
              주 {selects.nTimesAWeek}일 / 하루 {selects.authentications}회
            </p>
            <p>
              {selects.startTime}:00 ~ {selects.endTime}:00
            </p>
          </div>
        </div>
        <div className={styles.Card2}>
          <img src={clock} alt="calender" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <div className={styles.CardText}>
            <p>{selects.period / 7}주동안</p>
            <p>{moment(selects.challengeStart).format("YYYY-MM-DD")}부터</p>
          </div>
        </div>
        <div className={styles.Card2}>
          <img src={profile} alt="profile" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <p>
            {selects.peopleLimit === false ? (
              <div className={styles.CardText}>
                <p>인원 제한 없음</p>
                <p>{selects.limitNum}명</p>
              </div>
            ) : (
              <div className={styles.CardText}>
                <p>인원 제한 있음</p>
                <p>{selects.limitNum}명</p>
              </div>
            )}
          </p>
        </div>
      </div>
    );
  }
  function DailyChallenge() {
    return (
      <div className={styles.CreateReview}>
        <div className={styles.Card1}>
          <img src={dailyIcon} alt="dailyIcon" style={{ height: "50px" }} />
          <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H80V2H0V0Z" fill="white"/>
          </svg>
          <p>{selects.challenge}</p>
        </div>
        <div >
          {selects.topic === "운동" ? (
            <div className={styles.Card1}>
              <img src={gym} alt="gym" style={{ width: "48px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "생활" ? (
            <div className={styles.Card1}>
              <img src={calender} alt="calender" style={{ width: "48px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "취미" ? (
            <div className={styles.Card1}>
              <img src={paint} alt="paint" style={{ width: "48px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "식생활" ? (
            <div className={styles.Card1}>
              <img src={tea} alt="tea" style={{ width: "48px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "학습" ? (
            <div className={styles.Card1}>
              <img src={pencil} alt="pencil" style={{ width: "48px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "그 외" ? (
            <div className={styles.Card1}>
              <img src={plus} alt="plus" style={{ width: "48px" }} />
              <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H80V2H0V0Z" fill="white"/>
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.Card1}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H80V2H0V0Z" fill="white"/>
          </svg>
          <p>{selects.dailyMoney} ETH</p>
        </div>
        <div className={styles.Card2}>
          <img src={text} alt="ethCoin" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <p>챌린지 설명 보기</p>
        </div>
        <div className={styles.Card2}>
          <img src={camera} alt="camera" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <p>인증샷 예시 보기</p>
        </div>
        <div className={styles.Card2}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <div className={styles.CardText}>
            <p>
              주 {selects.nTimesAWeek}일 / 하루 {selects.authentications}회
            </p>
            <p>
              {selects.startTime}:00 ~ {selects.endTime}:00
            </p>
          </div>
        </div>
        <div className={styles.Card2}>
          <img src={clock} alt="calender" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <div className={styles.CardText}>
            <p>{selects.period / 7}주동안</p>
            <p>{moment(selects.challengeStart).format("YYYY-MM-DD")}부터</p>
          </div>
        </div>
        <div className={styles.Card2}>
          <img src={profile} alt="profile" style={{ width: "40px" }} />
          <svg width="2" height="80" viewBox="0 0 2 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V80H0V0Z" fill="white"/>
          </svg>
          <p>
            {selects.peopleLimit === false ? (
              <div className={styles.CardText}>
                <p>인원 제한 없음</p>
                <p>{selects.limitNum}명</p>
              </div>
            ) : (
              <div className={styles.CardText}>
                <p>인원 제한 있음</p>
                <p>{selects.limitNum}명</p>
              </div>
            )}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header/>
      {selects.challenge === "기부챌린지" ? (
        <DonationChallenge />
      ) : (
        <DailyChallenge />
      )}
      {selects.challenge === "기부챌린지" ? (
        <DonationCreateButton />
      ) : (
        <DailyCreateButton />
      )}
    </div>
  );
}
export default CreateFinal;
