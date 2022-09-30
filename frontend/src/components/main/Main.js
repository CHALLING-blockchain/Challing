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

function Main() {
  const selector = useSelector(challengeList);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //주제 이름 저장
  const [interest, setInterest] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      let allChallengeList = {};
      let allDonationList = [];
      const Contract = new ContractAPI();
      await Contract.getAllChallenge().then((result) => {
        console.log("challenge result: ", result);
        allChallengeList = result;
      });
      await Contract.getAllDonation().then((result) => {
        console.log("donation result: ", result);
        allDonationList = result;
      });

      // 로컬에 챌린지 목록이 없을때 -> redux에 저장
      // if (Object.keys(selector).length === 0) {
      dispatch(setChallengeList(allChallengeList));
      dispatch(setDonationList(allDonationList));
      // }
    }

    if (user.interests !== undefined || user.userInfo === null) {
      //로그인한 유저의 관심사 가져와서  저장
      let topicName = pickATopic(Object.keys(user.interests).length);
      setInterest(topicName);
    } else {
      navigate("/auth");
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
    const result = [];
    for (let index = 1; index <= Object.keys(selector).length; index++) {
      if (selector[index] !== undefined) {
        const element = selector[index];
        // console.log(element);
        let dayGap = getDayGapFromToday(element.startDate);
        let startDay = dayGap + "일 뒤";
        // (시작 전&&관심사 일치&&일상) 챌린지만
        if (
          dayGap > 0 &&
          interestIdToName(element.interestId) === interest &&
          "donationId" in element === false
        ) {
          result.push(
            <span
              key={index}
              onClick={() => {
                toChallengeDetail(element.challengeId);
              }}
            >
              <br></br>
              <img src={element.mainPicURL} height="50" width="50" alt=""></img>
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
            <span
              key={index}
              onClick={() => {
                toChallengeDetail(element.challengeId);
              }}
            >
              <br></br>
              <img src={element.mainPicURL} height="50" width="50" alt=""></img>
              <p>{element.name}</p>
              <p>{dayGap}일 뒤 시작</p>
            </span>
          );
        }
      }
    }

    return result;
  }

  return (
    <div className="Main">
      <Nav />
      <img className={styles.Banner1} src={Banner_1} alt="Banner1" />
      <img className={styles.Banner2} src={Banner_2} alt="Banner2" />
      <p>
        {user.nickname}님에게 딱 맞는 {interest} 챌린지 목록 (일상)
      </p>
      {dailyChallengeRendering()}
      <p>
        <br></br>
        {user.nickname}님에게 딱 맞는 {interest} 챌린지 목록 (기부)
      </p>
      {donateChallengeRendering()}
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
