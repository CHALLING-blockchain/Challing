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
import ScheduleAPI from "../../../api/ScheduleAPI";
import moment from "moment";
import { selectUser } from "../../../app/redux/userSlice";
import { challengeList } from "../../../app/redux/allChallengeSlice";
import { useSelector } from "react-redux";
import useWeb3 from "../../../hooks/useWeb3";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ onClose, src, desc }) {
  function handleClose() {
    onClose?.();
  }
  return (
    <div className={styles.Modal} onClick={handleClose}>
      <div className={styles.ModalBody} onClick={(e) => e.stopPropagation()}>
        <div>
          <svg
            className={styles.modalCloseBtn}
            onClick={handleClose}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#E5E5E5" />
            <path
              d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z"
              fill="#4F4F4F"
            />
          </svg>
        </div>
        <p className={styles.ModalTitle}>챌린지 설명</p>
        <div style={{ position: "absolute", left: "28px", top: "76px" }}>
          <p className={styles.ModalText}>{desc}</p>
        </div>
        <div className={styles.ModalImg}>
          <img style={{ width: "72px", height: "72px" }} src={src} alt="" />
        </div>
      </div>
    </div>
  );
}
function ShotEXModal({ onClose, good, bad }) {
  function handleClose() {
    onClose?.();
  }
  return (
    <div className={styles.Modal} onClick={handleClose}>
      <div className={styles.EXModalBody} onClick={(e) => e.stopPropagation()}>
        <div>
          <svg
            className={styles.modalCloseBtn}
            onClick={handleClose}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#E5E5E5" />
            <path
              d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z"
              fill="#4F4F4F"
            />
          </svg>
        </div>
        <p className={styles.ModalTitle}>챌린지 설명</p>
        <div className={styles.ImgBox}>
          <div className={styles.EXModalImg}>
            <p style={{ paddingBottom: "8px" }}>👍 좋은 인증샷 예시</p>
            <img
              style={{ width: "144px", height: "144px", borderRadius: "5px" }}
              src={good}
              alt=""
            />
          </div>
          <div className={styles.EXModalImg}>
            <p style={{ paddingBottom: "8px" }}>👎 나쁜 인증샷 예시</p>
            <img
              style={{ width: "144px", height: "144px", borderRadius: "5px" }}
              src={bad}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateFinal({ selects, formCnt, setFormCnt }) {
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };
  const [exModal, setExModal] = useState(false);
  const exShowModal = () => {
    setExModal(true);
  };
  const navigate = useNavigate();
  // localstorage에 wallet 연결 확인
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

  let userId = useSelector(selectUser).id;
  const topic2id = {
    운동: 0,
    생활: 1,
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
      selects.nTimesAWeek * selects.authentications * (selects.period / 7),
    authWeekTimes: selects.nTimesAWeek,
    authDayTimes: selects.authentications,
    startTime: selects.startTime,
    endTime: selects.endTime,
    startDate: selects.challengeStart,
    endDate: selects.challengeEnd,
    personnel: selects.limitNum,
    deposit: selects.dailyMoney,

    totalDeposit: selects.dailyMoney,

    complete: false,
  };
  const donationChallenge = {
    challengeId: 1,
    interestId: topic2id[selects.topic],
    ownerId: userId,
    donationId: 1,
    name: selects.title,
    desc: selects.explanation,
    setDonation: selects.donationMoney,
    mainPicURL: selects.exPhotoUrl,
    goodPicURL: selects.goodShotUrl,
    badPicURL: selects.badShotUrl,
    authTotalTimes:
      selects.nTimesAWeek * selects.authentications * (selects.period / 7),
    authWeekTimes: selects.nTimesAWeek,
    authDayTimes: selects.authentications,
    startTime: selects.startTime,
    endTime: selects.endTime,
    startDate: selects.challengeStart,
    endDate: selects.challengeEnd,
    personnel: selects.limitNum,
    totalDonation: selects.donationMoney,

    complete: false,
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
              const date = new Date(donationChallenge.endDate);
              const challengeId = await Contract.createDailyChallenge(
                daliyChallenge
              );
              const body = {
                challengeId: challengeId,
                challengeType: "DAILY",
                triggerAt: date.getTime(),
              };
              ScheduleAPI.challenge(body);
              navigate(`/create-loading/${challengeId}`, {
                state: { state: false },
              });
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
              const date = new Date(donationChallenge.endDate);

              const challengeId = await Contract.createDonationChallenge(
                donationChallenge
              );
              const body = {
                challengeId: challengeId,
                challengeType: "DONATION",
                triggerAt: date.getTime(),
              };
              ScheduleAPI.challenge(body);
              navigate(`/create-loading/${challengeId}`, {
                state: { state: false },
              });
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
          <svg
            width="80"
            height="2"
            viewBox="0 0 80 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H80V2H0V0Z" fill="white" />
          </svg>
          <p>{selects.challenge}</p>
        </div>
        <div>
          {selects.topic === "운동" ? (
            <div className={styles.Card1}>
              <img
                src={gym}
                alt="gym"
                style={{ width: "48px", height: "40px" }}
              />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "생활" ? (
            <div className={styles.Card1}>
              <img
                src={calender}
                alt="calender"
                style={{ width: "48px", height: "40px" }}
              />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "취미" ? (
            <div className={styles.Card1}>
              <img
                src={paint}
                alt="paint"
                style={{ width: "48px", height: "40px" }}
              />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "식생활" ? (
            <div className={styles.Card1}>
              <img
                src={tea}
                alt="tea"
                style={{ width: "48px", height: "40px" }}
              />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "학습" ? (
            <div className={styles.Card1}>
              <img
                src={pencil}
                alt="pencil"
                style={{ width: "48px", height: "40px" }}
              />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "그 외" ? (
            <div className={styles.Card1}>
              <img
                src={plus}
                alt="plus"
                style={{ width: "48px", height: "40px" }}
              />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.Card1}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg
            width="80"
            height="2"
            viewBox="0 0 80 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H80V2H0V0Z" fill="white" />
          </svg>
          <p className={styles.Card1text}>
            {selects.donationMoney} ETH / {selects.donation}
          </p>
        </div>
        <div className={styles.Card2} onClick={showModal}>
          <img src={text} alt="ethCoin" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          <p className={styles.OpenModal}>챌린지 설명 보기</p>
        </div>
        <div className={styles.Card2} onClick={exShowModal}>
          <img src={camera} alt="camera" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          <p className={styles.OpenModal}>인증샷 예시 보기</p>
        </div>
        <div className={styles.Card2}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
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
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          <div className={styles.CardText}>
            <p>{selects.period / 7}주동안</p>
            <p>{moment(selects.challengeStart).format("YYYY-MM-DD")}부터</p>
          </div>
        </div>
        <div className={styles.Card2}>
          <img src={profile} alt="profile" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          {selects.limitNum === 999 ? (
            <div className={styles.CardText}>
              인원 제한 없음 <br></br>
            </div>
          ) : (
            <div className={styles.CardText}>
              인원 제한 있음 <br></br>
              {selects.limitNum}명
            </div>
          )}
        </div>
        {openModal && (
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
            src={donationChallenge.mainPicURL}
            desc={donationChallenge.desc}
          />
        )}
        {exModal && (
          <ShotEXModal
            open={exModal}
            onClose={() => {
              setExModal(false);
            }}
            good={donationChallenge.goodPicURL}
            bad={donationChallenge.badPicURL}
          />
        )}
      </div>
    );
  }
  function DailyChallenge() {
    return (
      <div className={styles.CreateReview}>
        <div className={styles.Card1}>
          <img src={dailyIcon} alt="dailyIcon" style={{ height: "50px" }} />
          <svg
            width="80"
            height="2"
            viewBox="0 0 80 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H80V2H0V0Z" fill="white" />
          </svg>
          <p>{selects.challenge}</p>
        </div>
        <div>
          {selects.topic === "운동" ? (
            <div className={styles.Card1}>
              <img src={gym} alt="gym" style={{ width: "48px" }} />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "생활" ? (
            <div className={styles.Card1}>
              <img src={calender} alt="calender" style={{ width: "48px" }} />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "취미" ? (
            <div className={styles.Card1}>
              <img src={paint} alt="paint" style={{ width: "48px" }} />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "식생활" ? (
            <div className={styles.Card1}>
              <img src={tea} alt="tea" style={{ width: "48px" }} />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "학습" ? (
            <div className={styles.Card1}>
              <img src={pencil} alt="pencil" style={{ width: "48px" }} />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
          {selects.topic === "그 외" ? (
            <div className={styles.Card1}>
              <img src={plus} alt="plus" style={{ width: "48px" }} />
              <svg
                width="80"
                height="2"
                viewBox="0 0 80 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H80V2H0V0Z" fill="white" />
              </svg>
              <p>{selects.topic}</p>
            </div>
          ) : null}
        </div>
        <div className={styles.Card1}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg
            width="80"
            height="2"
            viewBox="0 0 80 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H80V2H0V0Z" fill="white" />
          </svg>
          <p>{selects.dailyMoney} ETH</p>
        </div>
        <div className={styles.Card2} onClick={showModal}>
          <img src={text} alt="ethCoin" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          <p className={styles.OpenModal}>챌린지 설명 보기</p>
        </div>
        <div className={styles.Card2} onClick={exShowModal}>
          <img src={camera} alt="camera" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          <p className={styles.OpenModal}>인증샷 예시 보기</p>
        </div>
        <div className={styles.Card2}>
          <img src={ethCoin} alt="ethCoin" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
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
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          <div className={styles.CardText}>
            <p>{selects.period / 7}주동안</p>
            <p>{moment(selects.challengeStart).format("YYYY-MM-DD")}부터</p>
          </div>
        </div>
        <div className={styles.Card2}>
          <img src={profile} alt="profile" style={{ width: "40px" }} />
          <svg
            width="2"
            height="80"
            viewBox="0 0 2 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H2V80H0V0Z" fill="white" />
          </svg>
          <p>
          {selects.limitNum === 999 ? (
            <div className={styles.CardText}>
              인원 제한 없음 <br></br>
            </div>
          ) : (
              <div className={styles.CardText}>
                인원 제한 있음 <br></br>
                {selects.limitNum}명
              </div>
            )}
          </p>
        </div>
        {openModal && (
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
            src={daliyChallenge.mainPicURL}
            desc={daliyChallenge.desc}
          />
        )}
        {exModal && (
          <ShotEXModal
            open={exModal}
            onClose={() => {
              setExModal(false);
            }}
            good={daliyChallenge.goodPicURL}
            bad={daliyChallenge.badPicURL}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div style={{ padding: "16px" }}>
        <p className={styles.FormHeader}>챌린지 설정을 확인해주세요.</p>
        <p className={styles.FormEx}>
          챌린지 설정을 확인하고 챌린지를 시작해보세요!
        </p>
      </div>
      <p className={styles.ChallengTitle}>{selects.title}</p>
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
