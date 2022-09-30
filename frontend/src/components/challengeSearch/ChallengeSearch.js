import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { challengeList } from "../../app/redux/allChallengeSlice";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../api/UserAPI";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import styles from "./ChallengeSearch.module.css";
import * as getDayGap from "../main/Main.js";

function ChallengeSearch() {
  const [search, setSearch] = useState("");
  const onChange = (event) => setSearch(event.target.value);
  const selector = useSelector(challengeList);
  const [user, setUser] = useState(useSelector(selectUser));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    UserAPI.mypage(user.email).then((response) => {
      console.log("response", response);
      dispatch(setUserInfo(response.data.body));
      setUser(response.data.body);
    });
  }, [user.email, dispatch]);

  //챌린지 검색
  function challengeSearchRendering() {
    const result = [];
    if (search !== "") {
      for (let index = 1; index <= Object.keys(selector).length; index++) {
        if (
          selector[index] !== undefined &&
          selector[index].name.includes(search)
        ) {
          const element = selector[index];
          console.log(element);
          let dayGap = getDayGap.getDayGapFromToday(element.startDate);
          let period = Math.floor(
            getDayGap.getDayGapFromDates(element.startDate, element.endDate) / 7
          );
          let startDay = dayGap + "일 뒤";
          // 시작 전 챌린지만
          if (dayGap > 0) {
            result.push(
              <div
                className={styles.SearchAfterBox}
                key={index}
                onClick={() => {
                  toChallengeDetail(element.challengeId);
                }}
              >
                <img className={styles.SearchAfterImg} src={element.mainPicURL} alt=""/>
                <div style={{paddingLeft:'8px'}}>
                  <p className={styles.SearchAfterTitle}>{element.name}</p>
                  <span className={styles.SearchAfterTag}>{startDay} 시작</span><br/>
                  <span className={styles.SearchAfterTag}>{period}주 동안</span>
                </div>
              </div>
            );
          }
        }
      }
    } else {
      for (let index = 1; index <= Object.keys(selector).length; index++) {
        const element = selector[index];
        let dayGap = getDayGap.getDayGapFromToday(element.startDate);
        let startDay = dayGap + "일 뒤";
        // 시작 전 챌린지만
        if (dayGap > 0) {
          result.push(
            <div style={{padding:'8px 4px'}}>
              <div
                className={styles.SearchBeforeBox}
                key={index}
                onClick={() => {
                  toChallengeDetail(element.challengeId);
                }}
              >
                <img className={styles.SearchBeforeImg} src={element.mainPicURL} alt=""/>
                <p className={styles.SearchBeforeTitle}>{element.name}</p>
                <span className={styles.SearchBeforeTag}>{startDay} 시작</span>
              </div>
            </div>
          );
        }
      }
    }
    return result;
  }

  //챌린지 디테일로 넘기기
  function toChallengeDetail(index) {
    console.log("toChallengeDetail", index);
    navigate(`/challenge-detail/${index}`);
  }

  return (
    <div>
      <div className={styles.Header}>
        <p className={styles.SearchHeader}>챌린지 검색</p>
        <div style={{padding:'16px',paddingTop:'0px'}}>
          <form className={styles.InputSearch}>
            <svg
              className={styles.SearchIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z"
                fill="#999999"
              />
            </svg>
            <input
              className={styles.Input}
              value={search}
              type="text"
              onChange={onChange}
              placeholder="Search"
            />
          </form>
        </div>
      </div>
      {search !== "" ?
      <div className={styles.SearchContents}>
        {/* <ChallengeSearch/> */}
        {challengeSearchRendering()}
      </div> :
      <div className={styles.SearchBefore}>
      {/* <ChallengeSearch/> */}
      {challengeSearchRendering()}
    </div>}
      
    </div>
  );
}

export default ChallengeSearch;
