import React, { useState, useEffect } from "react";
import styles from "./ChallengeCertify.module.css";
import chart from "../../img/chart.png";
import heart from "../../img/heart.png";
import calender from "../../img/calender.png";
import chat from "../../img/chat.png";
import dollarCoin from "../../img/dollarCoin.png";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import * as getDayGab from "../main/Main.js";
import ContractAPI from "../../api/ContractAPI";
import * as getDayGap from "../main/Main.js";
import { selectUser } from "../../app/redux/userSlice";
import { useSelector } from "react-redux";
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
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 인증</p>
        <div></div>
      </div>
    </div>
  );
}

function BackDrop({ picURL }) {
  return <img className={styles.backdrop} src={picURL} alt="" />;
}

function Description({ info, percentage }) {
  const today = moment(new Date()).format("YYYY-MM-DD");
  const dayGab = getDayGab.getDayGapFromDates(info.startDate, today);
  return (
    <div className={styles.desBox}>
      <p className={styles.title}>{info.name}</p>
      <div className={styles.subBox}>
        <div className={styles.oneline}>
          <img src={heart} alt="" />
          <span>
            챌린지 <span style={{ color: "#755FFF" }}>{dayGab}</span> 일째
          </span>
        </div>
        <div className={styles.oneline}>
          <img src={calender} alt="" />
          <span>
            {info.startDate} ~ {info.endDate}
          </span>
        </div>
        <div className={styles.oneline}>
          <img src={chart} alt="" />
          <span>
            현재 <span style={{ color: "#755FFF" }}>{percentage}</span>% 달성
          </span>
        </div>
      </div>
    </div>
  );
}

function Btn({ challengeId, challenge, percentage, challenger }) {
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
  const [openModal, setOpenModal] = useState(false);
  const userId = useSelector(selectUser).id;
  const today = Math.abs(
    getDayGap.getDayGapFromDates(
      challenge.startDate,
      moment(new Date()).format("YYYY-MM-DD")
    )
  );

  const hour = new Date().getHours();

  const flag =
    Number(challenge.startTime) <= hour && hour <= Number(challenge.endTime)
      ? true
      : false;

  const navigate = useNavigate();
  const showModal = () => {
    setOpenModal(true);
  };
  function Modal({ onClose }) {
    const Contract = new ContractAPI(activeAccount);
    function handleClose() {
      onClose?.();
    }
    function usePasscoin() {
      Contract.usePasscoin(challengeId, userId);
      handleClose();
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
          <p className={styles.ModalTitle}>Pass Coin</p>
          <div style={{ position: "absolute", left: "36px", top: "72px" }}>
            <p className={styles.ModalText}>
              ☝ 패스코인을 쓰면 챌린지 인증 하루 실패가 인증완료로 변경됩니다.
            </p>
            <p className={styles.ModalText}>
              ☝ 패스코인은 사용 후 취소가 불가하며, 챌린지 결과 발표 1시간
              전까지 사용 가능합니다.
            </p>
            <p className={styles.ModalText}>
              ☝ 다른 챌린저의 챌린지 성공여부 투표에 참여하여 결과와 같은
              선택을 하였을 시 얻을 수 있습니다.
            </p>
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.MdNextButton} onClick={usePasscoin}>
              사용하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {true ? (
        <div className={styles.btnBox}>
          {flag ? (
            <button
              className={styles.btnpre}
              onClick={() => {
                navigate(`/web-cam-capture`, {
                  state: {
                    challengeId: challengeId,
                    challengeInfo: challenge,
                    percentage: percentage,
                  },
                });
              }}
            >
              📸 인증하기
            </button>
          ) : (
            <div className={styles.nobtnpre}>
              <p>
                [ 인증 가능 시간 ] {challenge.startTime}:00~{challenge.endTime}
                :00
              </p>
            </div>
          )}

          <img
            src={dollarCoin}
            className={styles.passcoinImg}
            onClick={() => {
              showModal();
            }}
            alt=""
          />
          {openModal && (
            <Modal
              open={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
            />
          )}
        </div>
      ) : (
        <div className={styles.btnBox}>
          <button className={styles.btnafter} disabled={true}>
            👍 인증완료
          </button>
        </div>
      )}
    </div>
  );
}

function OtherShot({ photoList, challengeId, title }) {
  const navigate = useNavigate();

  return (
    <div className={styles.otherShot}>
      <div className={styles.shotTitle}>
        <span>다른 챌린저의 인증샷</span>
        <div
          style={{ color: "#755FFF" }}
          onClick={() => {
            navigate(`/certification-photos`, {
              state: {
                photoList: photoList,
                challengeId: challengeId,
                title: title,
              },
            });
          }}
        >
          더보기
        </div>
      </div>
      <div className={styles.shots}>
        {photoList.map((photo) => {
          return <img key={photo.id} src={photo.picURL} alt="" />;
        })}
      </div>
    </div>
  );
}

function Voting({ id }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.voting}
      onClick={() => {
        navigate(`/votinghome/${id}`);
      }}
    >
      <div className={styles.votingSub}>
        <img style={{ width: "32px", height: "32px" }} src={chat} alt="" />
        <span style={{ margin: "0 4px", fontSize: "16px" }}>투표</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  );
}

function ChallengeCertify() {
  const challenge = useLocation().state.challengeInfo;
  const challenger = useLocation().state.challengerInfo;
  const percentage = useLocation().state.percentage;
  const [challengers, setChallegers] = useState();
  const [photoList, setPhotoList] = useState([]);
  // console.log("photos", photoList);
  const Contract = new ContractAPI();
  useEffect(() => {
    async function load() {
      const challengers = await Contract.getChallengers(challenge.challengeId);
      setChallegers(challengers);
      getPhotos(challengers);
    }
    load();
  }, []);

  function getPhotos(challengers) {
    let photos = [...photoList];
    challengers.forEach(async (challenger) => {
      const photo = await Contract.getChallengerPhoto(challenger.id);
      photos = [...photos, ...photo];
      setPhotoList([...photos]);
    });
  }

  return (
    <div>
      <Header></Header>
      <BackDrop picURL={challenge.mainPicURL}></BackDrop>
      <Description info={challenge} percentage={percentage}></Description>
      <Btn
        challengeId={challenge.challengeId}
        challenge={challenge}
        percentage={percentage}
        challenger={challenger}
      ></Btn>
      <hr className={styles.hrTag} />
      <OtherShot
        photoList={photoList}
        challengeId={challenge.challengeId}
        title={challenge.name}
      ></OtherShot>
      <Voting id={challenge.challengeId}></Voting>
      <div style={{ width: "100vw", height: "90px" }}></div>
    </div>
  );
}

export default ChallengeCertify;
