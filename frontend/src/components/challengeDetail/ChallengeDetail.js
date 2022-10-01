import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { challengeList } from "../../app/redux/allChallengeSlice";
import UserAPI from "../../api/UserAPI";
import ContractAPI from "../../api/ContractAPI";
import styles from "./ChallengeDetail.module.css";
import person from "../../img/person.png";
import dollar from "../../img/dollarCoin.png";
import eth from "../../img/ethCoin.png";
import calender from "../../img/calender.png";
import bulb from "../../img/bulb.png";
import camera from "../../img/camera.png";
import symbol from "../../img/symbol-dynamic.png";
import favbook from "../../img/bookmark.png";
import Next from "../common/NextButton";
import * as getDayGap from "../main/Main.js";
import { selectUser } from "../../app/redux/userSlice";
import RefundPolicy from "../common/RefundPolicy";

function Header(props) {
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    for (let index = 0; index < props.user.challengeIds.length; index++) {
      if (
        props.user.challengeIds[index] === Number(props.challenge.challengeId)
      ) {
        setBookmark(true);
        break;
      }
    }
  }, [props.user.challengeIds, props.challenge.challengeId, props.user]);

  const checkmark = async () => {
    const body = {
      userId: props.user.id,
      challengeId: props.challenge.challengeId,
    };
    if (bookmark === true) {
      await UserAPI.deleteFavorite(body).then((response) => {
        console.log("delete", response);
      });
      setBookmark(false);
    } else {
      await UserAPI.addFavorite(body).then((response) => {
        console.log("add", response);
      });
      setBookmark(true);
    }
  };

  return (
    <div style={{ position: "sticky", top: "0px" }}>
      <div className={styles.header}>
        <svg
          style={{
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "50px",
            padding: "4px",
          }}
          onClick={() => {
            navigate(-1, {
              state: {
                state: true,
              },
            });
          }}
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
        <Link to="/" style={{ margin: "auto" }}>
          <img
            src={symbol}
            style={{ width: "24px", height: "24px", margin: "auto" }}
            alt=""
          />
        </Link>
        <div style={{ margin: "auto", display: "flex", alignItems: "center" }}>
          {bookmark === true ? (
            <img
              onClick={checkmark}
              src={favbook}
              alt=""
              style={{ margin: "auto", width: "28px" }}
            />
          ) : (
            <img
              onClick={checkmark}
              src={favbook}
              alt=""
              style={{ margin: "auto", opacity: "0.5", width: "28px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function TopBox(props) {
  const [user, setUser] = useState({});

  const period = Number(
    getDayGap.getDayGapFromDates(
      props.challenge.startDate,
      props.challenge.endDate
    )
  );

  const weekTimes =
    Number(props.challenge.authTotalTimes) /
    (Number(props.challenge.authDayTimes) * period);

  useEffect(() => {
    const getUserInfo = async () => {
      await UserAPI.getUserById(props.challenge.ownerId).then((response) => {
        setUser(response.data.body);
      });
    };
    getUserInfo();
  }, [props.challenge.ownerId]);

  return (
    <div>
      {/* 유저닉네임, 타이틀, 해시태그 */}
      <div className={styles.paddingBox}>
        <div className={styles.paddingBox2}>
          <div className={styles.imgText}>
            <img src={user.picURL} alt="" />
            <span>{user.nickname}</span>
          </div>
          <span style={{ fontSize: "18px", fontWeight: "bold", margin: "4px" }}>
            {props.challenge.name}
          </span>
          <div className={styles.Tags}>
            <span className={styles.Tag}>{period / 7}주 동안</span>
            <span className={styles.Tag}>주 {weekTimes}회</span>
            <span className={styles.Tag}>
              하루 {props.challenge.authDayTimes}번
            </span>
          </div>

        </div>
        {/* 참가인원수, 예치금 */}
        <div className={styles.subtext}>
          <div className={styles.imgText}>
            <img src={person} alt="personChar" />
            <span>현재 {props.challengers}명</span>
          </div>
          <div className={styles.imgText}>
            <img src={dollar} alt="" />
            <span>
              {(props.challenge.deposit || props.challenge.setDonation) /
                Math.pow(10, 18)}{" "}
              eth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PeriodBox(props) {
  const start = props.challenge.startDate;
  let startMonth = Number(start.substr(5, 2));
  let startDay = Number(start.substr(8));
  const end = props.challenge.endDate;
  let endMonth = Number(end.substr(5, 2));
  let endDay = Number(end.substr(8));

  return (
    <div className={styles.paddingBox}>
      <div className={styles.imgText}>
        <img src={calender} alt="" />
        <span style={{ fontSize: "16px" }}>챌린지 기간</span>
      </div>
      <div>
        <p style={{ margin: "4px" }}>
          {startMonth}월 {startDay}일 ~ {endMonth}월 {endDay}일
        </p>
      </div>
    </div>
  );
}


function addDescription(props) {
  const desc = props.split("\n");
  const descList = [];
  for (let index = 0; index < desc.length; index++) {
    if (desc[index].length > 0) {
      descList.push(
        <p className={styles.Text} key={index}>
          👉{desc[index]}
        </p>
      );
    }
  }
  return descList;
}

function Description(props) {
  const period = Number(
    getDayGap.getDayGapFromDates(
      props.challenge.startDate,
      props.challenge.endDate
    )
  );

  return (
    <div className={styles.paddingBox}>
      <div className={styles.imgText}>
        <img style={{width:"14px"}} src={bulb} alt="" />
        <span style={{ fontSize: "16px" }}>챌린지 설명</span>
      </div>
      <div className={styles.description}>
        <div style={{ margin: "8px 4px" }}>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0 0 4px 0",
            }}
          >
            챌린지 진행 시 꼭 알아주세요!
          </p>
          <div style={{ margin: "0 4px" }}>
            <p>
              ☝ {period / 7}주 동안, 하루에 {props.challenge.authDayTimes}번
              인증샷을 촬영하셔야 합니다.
            </p>
            <p>☝ 인증샷 피드에 인증샷이 공개됩니다.</p>
          </div>
        </div>
        <div style={{ margin: "8px 4px" }}>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0 0 4px 0",
            }}
          >
            인증 방법 및 주의사항
          </p>
          <p style={{ margin: "8px 4px" }}>
            {addDescription(props.challenge.desc)}
          </p>
        </div>
      </div>
    </div>
  );
}

function ShotDescription(props) {
  return (
    <div className={styles.paddingBox}>
      <div className={styles.imgText}>
        <img src={camera} alt="" />
        <span style={{ fontSize: "16px"}}>인증샷 이렇게 찍어주세요!</span>
      </div>
      <div className={styles.shots}>
        <div className={styles.shot}>
          <img
            style={{ width: "150px", height: "150px", margin: "auto" }}
            src={props.challenge.goodPicURL}
            alt=""
          />
          <p>👍 좋은 예시</p>
        </div>
        <div className={styles.shot}>
          <img
            style={{ width: "150px", height: "150px", margin: "auto" }}
            src={props.challenge.badPicURL}
            alt=""
          />
          <p>👎 나쁜 예시</p>
        </div>
      </div>
    </div>
  );
}

function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = useSelector(challengeList)[id];
  const user = useSelector(selectUser);
  const day = getDayGap.getDayGapFromToday(challenge.startDate);
  const [joinFlag, setJoinFlag] = useState(false);
  const [challengers, setChallengers] = useState();
  let type = ""
  if ("deposit" in challenge) {
    type = "daily";
  } else {
    type = "donation";
  }

  useEffect(() => {
    const Contract = new ContractAPI();
    const getChallengers = async () => {
      await Contract.getChallengers(challenge.challengeId).then((response) => {
        setChallengers(response.length);
      });
    };

    getChallengers();

    Contract.checkChallenger(challenge.challengeId, user.id).then(
      (response) => {
        if (response) {
          setJoinFlag(true);
        }
      }
    );
  }, [challenge.challengeId, user]);

  return (
    <div>
      <Header challenge={challenge} user={user}></Header>
      <div className={styles.Content}>
        <img
          className={styles.backImg}
          src={challenge.mainPicURL}
          alt="challegePhoto"
        />

        <TopBox challenge={challenge} challengers={challengers}></TopBox>
        <div>
          {!joinFlag ? (
            <Next
              type="submit"
              label="챌린지 신청하기"
              onClick={() => {
                navigate(`/confirm-register/${id}`);
              }}
              flag={true}
              disabled={false}
            ></Next>
          ) : (
            <Next
              type="submit"
              label={"챌린지 시작  " + day + "일 전"}
              onClick={() => {}}
              disabled={true}
            ></Next>
          )}
        </div>
        <hr className={styles.hrTag} />
        <PeriodBox challenge={challenge}></PeriodBox>
        <hr className={styles.hrTag} />
        <RefundPolicy type={type}></RefundPolicy>
        <hr className={styles.hrTag} />
        <Description challenge={challenge}></Description>
        <hr className={styles.hrTag} />
        <ShotDescription challenge={challenge}></ShotDescription>

      </div>
    </div>
  );
}

export default ChallengeDetail;
