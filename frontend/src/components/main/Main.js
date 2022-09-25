import React, { useEffect, useState } from "react";
import "./Main.css";
import Nav from "../Nav";
import Banner_1 from "../../img/배너1.png";
import Banner_2 from "../../img/배너2.png";
import { useSelector, useDispatch } from "react-redux";
import Contract from "../../api/ContractAPI";
import {
  setChallengeList,
  challengeList,
} from "../../app/redux/allChallengeSlice";
import { selectUser } from "../../app/redux/userSlice";

function Main() {
  const selector = useSelector(challengeList);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //주제 이름 저장
  const [interest, setInterest] = useState("");

  //로컬 테스트넷 배포시 provider 주소
  //https://ropsten.infura.io/v3/38d65d8f902943d38a2876a0f4f9ad49
  useEffect(() => {
    async function load() {
      let allChallengeList = {};
      await Contract.getAllChallenge().then((result) => {
        // console.log("result: ", result);
        allChallengeList = result;
      });

      // console.log("allChallengeList: ", allChallengeList);

      // 추가) 생성이나 삭제될때 변하는값을 감지해서 변할때마다 실행시켜줘야됭!!!
      // 로컬에 챌린지 목록이 없을때 -> redux에 저장
      // if (Object.keys(selector).length === 0) {
      dispatch(setChallengeList(allChallengeList));
      // }
    }

    //로그인한 유저의 관심사 가져와서  저장
    let topicName = pickATopic(Object.keys(user.interests).length);
    setInterest(topicName);

    load();
  }, []);

  //관심사가 여러개일 경우 랜덤으로 하나 뽑기
  function pickATopic(length) {
    let min = 0;
    let max = length - 1;
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return user.interests[randNum];
  }

  function interestIdToName(interestId) {
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
  //추천 챌린지(일상)
  function dailyChallengeRendering() {
    const result = [];
    for (let index = 1; index <= Object.keys(selector).length; index++) {
      if (selector[index] !== undefined) {
        const element = selector[index];
        // console.log(element);
        let dayGap = getDayGab(element.startDate);
        let startDay = dayGap + "일 뒤";
        // (시작 전&&관심사 일치&&일상) 챌린지만
        if (
          dayGap >= 0 &&
          interestIdToName(element.interestId) === interest &&
          "donationId" in element === false
        ) {
          if (dayGap === 0) {
            startDay = "오늘부터";
          }
          result.push(
            <span key={index}>
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

  //추천 챌린지(기부)
  function donateChallengeRendering() {
    const result = [];
    for (let index = 1; index <= Object.keys(selector).length; index++) {
      if (selector[index] !== undefined) {
        const element = selector[index];
        // console.log(element);
        let dayGap = getDayGab(element.startDate);
        // (시작 전&&관심사 일치&&기부) 챌린지만
        if (
          dayGap >= 0 &&
          interestIdToName(element.interestId) === interest &&
          "donationId" in element === true
        ) {
          result.push(
            <span key={index}>
              <br></br>
              <p>{element.mainPicURL}</p>
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
      <img className="Banner1" src={Banner_1} alt="Banner1" />
      <img className="Banner2" src={Banner_2} alt="Banner2" />
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

//오늘로부터 챌린지 시작일 날짜 구하기
export function getDayGab(startDate) {
  let startDateArr = startDate.split("-");
  startDate = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);

  let today = new Date();
  let todayStr =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let todayDateArr = todayStr.split("-");
  let todayDate = new Date(todayDateArr[0], todayDateArr[1], todayDateArr[2]);

  // console.log("startDate: ", startDate);
  // console.log("todayDate", todayDate);

  let gap = todayDate - startDate;
  var currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
  let dateGap = -parseInt(gap / currDay);
  return dateGap;
}

export default Main;
