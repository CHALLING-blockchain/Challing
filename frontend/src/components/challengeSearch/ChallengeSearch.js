import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { challengeList } from "../../app/redux/allChallengeSlice";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../api/UserAPI";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import "./ChallengeSearch.css";
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
          // if (dayGap >= 0) {
          if (dayGap === 0) {
            startDay = "오늘부터";
          }
          result.push(
            <span
              key={index}
              onClick={() => {
                toChallengeDetail(element.challengeId);
              }}
            >
              <br></br>
              <p>{element.mainPicURL}</p>
              <p>{element.name}</p>
              <p>{startDay} 시작</p>
              <p>{period}주 동안</p>
            </span>
          );
          // }
        }
      }
    } else {
      for (let index = 1; index <= Object.keys(selector).length; index++) {
        const element = selector[index];
        let dayGap = getDayGap.getDayGapFromToday(element.startDate);
        let startDay = dayGap + "일 뒤";
        // 시작 전 챌린지만
        if (dayGap >= 0) {
          if (dayGap === 0) {
            startDay = "오늘부터";
          }
          result.push(
            <span
              key={index}
              onClick={() => {
                toChallengeDetail(element.challengeId);
              }}
            >
              <br></br>
              <p>{element.mainPicURL}</p>
              <p>{element.name}</p>
              <p>{startDay} 시작</p>
            </span>
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
      <h2 className="SearchHeader">챌린지 검색</h2>
      <form className="InputSearch">
        <svg
          className="SearchIcon"
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
          value={search}
          type="text"
          onChange={onChange}
          placeholder="Search"
        />
      </form>
      <svg
        width="360"
        height="10"
        viewBox="0 0 360 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_214_2049)">
          <rect y="3" width="360" height="1" rx="0.5" fill="#E5E1FF" />
        </g>
        <defs>
          <filter
            id="filter0_d_214_2049"
            x="-4"
            y="0.5"
            width="368"
            height="9"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.5" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_214_2049"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_214_2049"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      {challengeSearchRendering()}
    </div>
  );
}

export default ChallengeSearch;
