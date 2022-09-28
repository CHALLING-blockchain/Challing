import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MyFavorite.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, selectUser } from "../../app/redux/userSlice";
import { challengeList } from "../../app/redux/allChallengeSlice";
import favbook from "../../img/bookmark.png";
import * as getDayGap from "../main/Main.js";
import UserAPI from "../../api/UserAPI";

function MyFavorite() {
  const [user, setUser] = useState(useSelector(selectUser));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const challenges = useSelector(challengeList);

  console.log("challenges", challenges);

  useEffect(() => {
    UserAPI.mypage(user.email).then((response) => {
      console.log("response", response);
      dispatch(setUserInfo(response.data.body));
      setUser(response.data.body);
    });
  }, [user.email, dispatch]);

  const favoriteChallenges = () => {
    const favoriteChallenges = [];
    console.log("function");

    for (let index = 0; index < user.challengeIds.length; index++) {
      const element = challenges[user.challengeIds[index]];
      console.log(index, element);

      let dayGap = getDayGap.getDayGapFromToday(element.startDate);
      if (dayGap > 0) {
        let week = element.authTotalTimes / (element.authDayTimes * 7);
        let period = Number(
          getDayGap.getDayGapFromDates(element.startDate, element.endDate)
        );
        let weekTimes =
          Number(element.authTotalTimes) /
          (Number(element.authDayTimes) * period);

        favoriteChallenges.push(
          <div
            className={styles.challengeBox}
            onClick={() => {
              toChallengeDetail(element.challengeId);
            }}
          >
            <img
              className={styles.infoItemImg}
              style={{ width: "150px", height: "120px", borderRadius: "10px" }}
              src={element.mainPicURL}
              alt=""
            ></img>
            <p>{element.name}</p>
            <div>
              <span className={styles.infoItem}>{dayGap}일 뒤 시작</span>
            </div>
            <span className={styles.infoItem}>주 {weekTimes}회</span>
            <span className={styles.infoItem}>{week}주 동안</span>
          </div>
        );
      }
    }
    return favoriteChallenges;
  };

  function toChallengeDetail(id) {
    console.log("toChallengeDetail", id);
    navigate(`/challenge-detail/${id}`);
  }

  return (
    <div className="MyFavorite">
      <div className="BackMyPage">
        <Link to="/my-page">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z"
              fill="#444444"
            />
          </svg>
        </Link>
        <p>챌린지 즐겨찾기</p>
        <p></p>
      </div>
      {user.challengeIds.length === 0 ? (
        <div className="content">
          <img
            src={favbook}
            alt=""
            style={{ margin: "auto", width: "100px", marginBottom: "20px" }}
          />
          <h3>현재 즐겨찾기된 챌린지가 없습니다.</h3>
          <p style={{ marginTop: "15px" }}>
            탐색 메뉴에서 필요한 챌린지를 저장해 보세요.
          </p>
        </div>
      ) : (
        <div className={styles.outsideBox}>{favoriteChallenges()}</div>
      )}
    </div>
  );
}

export default MyFavorite;
