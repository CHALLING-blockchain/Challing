import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Nav from "../Nav";
import Banner_1 from "../../img/배너1.png";
import Banner_2 from "../../img/배너2.png";
import { useSelector, useDispatch } from "react-redux";
import ContractAPI from "../../api/ContractAPI";
import {
  setChallengeList,
  challengeList,
} from "../../app/redux/allChallengeSlice";
import { setDonationList } from "../../app/redux/DonationListSlice";
import { selectUser } from "../../app/redux/userSlice";
import { useNavigate } from "react-router-dom";
import MainCategory from "./MainCategory";
import Carousel from "react-material-ui-carousel";

function Main() {
  const selector = useSelector(challengeList);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // 캐러셀에 쓸 챌린지
  // const banner1 = selector[39]
  // const banner2 = selector[46]
  // const banner3 = selector[25]
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

      //메인 들어올때 마다 리덕스에 저장
      dispatch(setChallengeList(allChallengeList));
      dispatch(setDonationList(allDonationList));
    }
    // console.log("Main::user", user);
    if (user === null || Object.keys(user).length === 0) {
      // console.log("1111111 ::: 유저정보 없음");
      navigate("/auth");
    } //wallet 없으면
    else if (wallet === undefined || !wallet) {
      navigate("/my-wallet");
    } else {
      // console.log("2222222222 ::: user가 null이 아님");
      if (user.userInfo === null) {
        // console.log("333333333333 ::: user는 null이 아닌데 userInfo가 null");
        // navigate("/auth");
      } else {
        // console.log("4444444444444 ::: 유저정보가 저장되어있음");
        let topicName = pickATopic(Object.keys(user.interests).length);
        setInterest(topicName);
        navigate("/");
      }
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
          dayGap > 0 &&
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

  return (
    <div>
      <Nav />
      <div className={styles.Main}>
        {/* {console.log(selector)} */}
        {Object.keys(selector).length !== 0 ? (
          <Carousel>
            <img
              onClick={() => {
                toChallengeDetail(39);
              }}
              className={styles.Banner1}
              src={selector[39].mainPicURL}
              alt="Banner1"
            />
            <img
              onClick={() => {
                toChallengeDetail(46);
              }}
              className={styles.Banner1}
              src={selector[46].mainPicURL}
              alt="Banner2"
            />
            <img
              onClick={() => {
                toChallengeDetail(25);
              }}
              className={styles.Banner1}
              src={selector[25].mainPicURL}
              alt="Banner3"
            />
          </Carousel>
        ) : null}
        {/* <img className={styles.Banner1} src={Banner_1} alt="Banner1" /> */}
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
