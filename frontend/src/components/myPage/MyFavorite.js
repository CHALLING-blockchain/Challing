import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MyFavorite.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, selectUser } from "../../app/redux/userSlice";
import { challengeList } from "../../app/redux/allChallengeSlice";
import favbook from "../../img/bookmark.png";
import book from "../../img/bookmark-common.png";
import * as getDayGap from "../main/Main.js";
import UserAPI from "../../api/UserAPI";


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
        <p style={{ fontSize: "20px", margin: "auto" }}>즐겨찾기</p>
        <div></div>
      </div>
    </div>
  );
}

function MyFavorite() {
  const [user, setUser] = useState(useSelector(selectUser));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const challenges = useSelector(challengeList);

  useEffect(() => {
    UserAPI.mypage(user.email).then((response) => {
      dispatch(setUserInfo(response.data.body));
      setUser(response.data.body);
    });
  }, [user.email, dispatch]);

  const favoriteChallenges = () => {
    const favoriteChallenges = [];

    for (let index = 0; index < user.challengeIds.length; index++) {
      const element = challenges[user.challengeIds[index]];

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
            key={index}
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
    navigate(`/challenge-detail/${id}`);
  }

  function NoBookmark() {
    return(
      <div className={styles.noBookmark}>
        <div className={styles.bookImgs}>
          <img className={styles.fav} src={favbook} alt="" />
          <img className={styles.com} src={book} alt="" />
        </div>
        
        <div className={styles.bookText}>
          <p>현재 저장된 챌린지가 없습니다.</p>
          <span>탐색 메뉴에서 필요한 챌린지를 저장해보세요.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="MyFavorite">
      <Header></Header>
      {user.challengeIds.length === 0 ? (
        <NoBookmark></NoBookmark>
      ) : (
        <div className={styles.outsideBox}>{favoriteChallenges()}</div>
      )}
    </div>
  );
}

export default MyFavorite;
