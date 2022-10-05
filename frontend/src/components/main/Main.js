import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Nav from "../Nav";
import Banner_1 from "../../img/배너1.png";
import Banner_2 from "../../img/배너2.png";
import { useSelector, useDispatch } from "react-redux";
import ContractAPI from "../../api/ContractAPI";
import useWeb3 from "../../hooks/useWeb3";
import {
  setChallengeList,
  challengeList,
} from "../../app/redux/allChallengeSlice";
import { setDonationList } from "../../app/redux/DonationListSlice";
import { selectUser } from "../../app/redux/userSlice";
import { useNavigate } from "react-router-dom";
import MainCategory from "./MainCategory";

function Main() {
  const selector = useSelector(challengeList);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //주제 이름 저장
  const [category, setCategory] = useState("");
  const [interest, setInterest] = useState("");
  const navigate = useNavigate();
  const wallet = localStorage.getItem("myAccount");
  useEffect(() => {
    async function load() {
      let allChallengeList = {};
      let allDonationList = [];
      const Contract = new ContractAPI();
      await Contract.getAllChallenge().then((result) => {
        // console.log("challenge result: ", result);
        allChallengeList = result;
      });
      await Contract.getAllDonation().then((result) => {
        // console.log("donation result: ", result);
        allDonationList = result;
      });

      // 로컬에 챌린지 목록이 없을때 -> redux에 저장
      // if (Object.keys(selector).length === 0) {
      dispatch(setChallengeList(allChallengeList));
      dispatch(setDonationList(allDonationList));
      // }
    }
    //로그인 했으면
    if (user === null || Object.keys(user).length === 0) {
      navigate("/auth");
    } else {
      let topicName = pickATopic(Object.keys(user.interests).length);
      setInterest(topicName);
    }
    //wallet 없으면
    if (wallet === undefined || !wallet) {
      navigate("/my-wallet");
    }
    load();
  }, []);

  //관심사가 여러개일 경우 랜덤으로 하나 뽑기
  function pickATopic(length) {
    let min = 0;
    let max = length - 1;
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return user.interests[randNum];
  }

  //추천 챌린지(일상)
  function dailyChallengeRendering() {
    // console.log(selector);
    const result = [];
    for (let index = 1; index <= Object.keys(selector).length; index++) {
      // console.log(selector[index]);
      if (selector[index] !== undefined) {
        const element = selector[index];
        // console.log(element.name);
        let dayGap = getDayGapFromToday(element.startDate);
        // console.log("dayGap", dayGap);
        let startDay = dayGap + "일 뒤";
        // (시작 전&&관심사 일치&&일상) 챌린지만
        if (
          dayGap > 0 &&
          interestIdToName(element.interestId) === interest &&
          "donationId" in element === false
        ) {
          // console.log("element.name", element.name);
          result.push(
            <div key={index} style={{ padding: "8px 4px" }}>
              <div
                className={styles.Box}
                onClick={() => {
                  toChallengeDetail(element.challengeId);
                }}
              >
                <img
                  className={styles.Img}
                  src={element.mainPicURL}
                  alt=""
                ></img>
                <p className={styles.Title}>{element.name}</p>
                <span className={styles.Tag}>{startDay} 시작</span>
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
    // console.log("toChallengeDetail", index);
    navigate(`/challenge-detail/${index}`);
  }

  //추천 챌린지(기부)
  function donateChallengeRendering() {
    const result = [];
    for (let index = 1; index <= Object.keys(selector).length; index++) {
      if (selector[index] !== undefined) {
        const element = selector[index];
        // console.log(element);
        let dayGap = getDayGapFromToday(element.startDate);
        // (시작 전&&관심사 일치&&기부) 챌린지만
        if (
          dayGap >= 0 &&
          interestIdToName(element.interestId) === interest &&
          "donationId" in element === true
        ) {
          result.push(
            <div key={index} style={{ padding: "8px 4px" }}>
              <div
                className={styles.Box}
                onClick={() => {
                  toChallengeDetail(element.challengeId);
                }}
              >
                <img
                  className={styles.Img}
                  src={element.mainPicURL}
                  alt=""
                ></img>
                <p className={styles.Title}>{element.name}</p>
                <span className={styles.Tag}>{dayGap}일 뒤 시작</span>
              </div>
            </div>
          );
        }
      }
    }

    return result;
  }
  //카테고리별 챌린지
  function categoryChallengeRendering() {
    const result = [];
    for (let index = 1; index <= Object.keys(selector).length; index++) {
      if (selector[index] !== undefined) {
        const element = selector[index];
        // console.log(element);
        let dayGap = getDayGapFromToday(element.startDate);
        let startDay = dayGap + "일 뒤";
        // (시작 전&&카테고리 일치) 챌린지만
        if (dayGap > 0 && element.interestId === category) {
          result.push(
            <div key={index} style={{ padding: "8px 4px" }}>
              <div
                className={styles.Box}
                onClick={() => {
                  toChallengeDetail(element.challengeId);
                }}
              >
                <img
                  className={styles.Img}
                  src={element.mainPicURL}
                  alt=""
                ></img>
                <p className={styles.Title}>{element.name}</p>
                <span className={styles.Tag}>{startDay} 시작</span>
              </div>
            </div>
          );
        }
      }
    }

    return result;
  }
  useEffect(() => {
    // login check------------------------------------------------------------------
    // 로그인 되어있을때
    if (
      user !== undefined ||
      user !== null ||
      user.userInfo !== undefined ||
      user.userInfo !== null ||
      user.interests !== null ||
      user.interests !== undefined
    ) {
      // navigate("/auth");
    } else {
      //로그인한 유저의 관심사 가져와서  저장
      let topicName = pickATopic(Object.keys(user.interests).length);
      setInterest(topicName);
    }
    // login check end -------------------------------------------------------------
  });
  return (
    <div>
      <Nav />
      <div className={styles.Main}>
        <img className={styles.Banner1} src={Banner_1} alt="Banner1" />
        <img className={styles.Banner2} src={Banner_2} alt="Banner2" />
        <MainCategory setCategory={(category) => setCategory(category)} />
        {category === "" ? null : <div className={styles.Hr} />}
        {category === "" ? null : (
          <div style={{ padding: "16px" }}>
            <p className={styles.Category}>
              {interestIdToName(category)} 챌린지 목록
            </p>
            <div className={styles.Rendering}>
              {categoryChallengeRendering()}
            </div>
            {/* {console.log(category)} */}
          </div>
        )}
        <div className={styles.Hr} />
        <div style={{ padding: "16px" }}>
          <p className={styles.Category}>
            {user.nickname}님에게 딱 맞는 {interest} 챌린지 목록 (일상)
          </p>

          <div className={styles.Rendering}>{dailyChallengeRendering()}</div>
        </div>
        <div className={styles.Hr} />
        <div style={{ padding: "16px" }}>
          <p className={styles.Category}>
            {user.nickname}님에게 딱 맞는 {interest} 챌린지 목록 (기부)
          </p>
          <div className={styles.Rendering}>{donateChallengeRendering()}</div>
        </div>
      </div>
    </div>
  );
}

//현재날짜와 startDate의 날짜 차이를 반환
export function getDayGapFromToday(startDate) {
  let currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨

  // 시작일 str -> Date 형식으로 바꾸기
  let startDateArr = startDate.split("-");
  startDate = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);

  // 오늘 날짜 Date -> Str로 바꾸면서 달+1해줌
  let today = new Date();
  let todayStr =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // 다시 Date 형식으로 맞춰줌
  let todayDateArr = todayStr.split("-");
  let todayDate = new Date(todayDateArr[0], todayDateArr[1], todayDateArr[2]);

  // 차이 구하기
  let gap = todayDate - startDate;
  let dateGap = -parseInt(gap / currDay);

  return dateGap;
}

//startDate와 endDate의 날짜 차이를 반환
export function getDayGapFromDates(startDate, endDate) {
  let currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨

  //시작일 str -> Date 형식으로 바꾸기
  let startDateArr = startDate.split("-");
  startDate = new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2]);

  //끝일 str -> Date 형식으로 바꾸기
  let endDateArr = endDate.split("-");
  endDate = new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2]);

  // 차이 구하기
  let gap = endDate - startDate;
  let dateGap = parseInt(gap / currDay);

  return dateGap;
}

export function interestIdToName(interestId) {
  let interestName = "운동";
  switch (interestId) {
    case "0":
      interestName = "운동";
      break;
    case "1":
      interestName = "생활";
      break;
    case "2":
      interestName = "취미";
      break;
    case "3":
      interestName = "식생활";
      break;
    case "4":
      interestName = "학습";
      break;
    case "5":
      interestName = "그 외";
      break;
    default:
      interestName = "운동";
      break;
  }
  return interestName;
}
export default Main;
