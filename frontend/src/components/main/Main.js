import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./Main.css";
import Nav from "../Nav";
import Banner_1 from "../../img/배너1.png";
import Banner_2 from "../../img/배너2.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setChallengeList,
  challengeList,
} from "../../app/redux/allChallengeSlice";
import { setNickName, selectUser } from "../../app/redux/userSlice";

function Main() {
  // const [challengeList, setChallengeList] = useState([]);
  const dispatch = useDispatch();
  const selector = useSelector(challengeList);
  const user = useSelector(selectUser);
  const artifact = require("../../contracts/ChallengeContract.json");

  //주제 이름 저장
  const [interest, setInterest] = useState("");

  //로컬 테스트넷 배포시 provider 주소
  //https://ropsten.infura.io/v3/38d65d8f902943d38a2876a0f4f9ad49
  useEffect(() => {
    async function load() {
      const web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
      const networkId = await web3.eth.net.getId();
      const abi = artifact.abi;
      const address = artifact.networks[networkId].address;
      const contract = new web3.eth.Contract(abi, address);
      const privateKey1 = process.env.REACT_APP_METAMASK_PRIVATE_KEY;

      const account1 = web3.eth.accounts.privateKeyToAccount(
        "0x" + privateKey1
      );

      web3.eth.accounts.wallet.add(account1);
      const getAllChallenge = await contract.methods
        .getAllChallenge()
        .call({
          from: account1.address,
        })
        .catch(console.error);

      // 로컬 잔액 확인
      // const accounts = await web3.eth.getAccounts();
      // accounts.forEach(async (account, index) => {
      //   const blance = await web3.eth.getBalance(account);
      //   console.log(index + ":", blance, "ether");
      // });

      // 일상 챌린지
      const challenges = {};
      getAllChallenge[0].forEach((id, index) => {
        const challenge = Object.assign({}, getAllChallenge[2][index]);
        const size = Object.keys(challenge).length;
        for (let i = 0; i < size / 2; i++) {
          delete challenge[i];
        }
        challenges[Number(id)] = challenge;
      });

      // 기부 챌린지
      getAllChallenge[1].forEach((id, index) => {
        const challenge = Object.assign({}, getAllChallenge[3][index]);
        const size = Object.keys(challenge).length;
        for (let i = 0; i < size / 2; i++) {
          delete challenge[i];
        }
        challenges[Number(id)] = challenge;
      });
      // redux에 저장하기 ! (persist)
      dispatch(setChallengeList(challenges));
    }

    let topicName = pickATopic(Object.keys(user.interests).length);
    setInterest(topicName);
    load();
  }, []);

  //오늘로부터 챌린지 시작일 날짜 구하기
  function getDayGab(startDate) {
    // startDate = "2022-09-31";
    let startDateArr = startDate.split("-");
    startDate = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);

    let today = new Date();
    let todayStr =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let todayDateArr = todayStr.split("-");
    let todayDate = new Date(todayDateArr[0], todayDateArr[1], todayDateArr[2]);

    // console.log("startDate: ", startDate);
    // console.log("todayDate", todayDate);

    let gap = todayDate - startDate;
    var currDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
    let dateGap = -parseInt(gap / currDay);
    return dateGap;
  }
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
  //추천 챌린지 목록 for문
  function challengeRendering() {
    const result = [];
    for (let index = 1; index <= Object.keys(selector).length; index++) {
      if (selector[index] !== undefined) {
        const element = selector[index];
        // console.log(element);
        let dayGap = getDayGab(element.startDate);
        // (시작 전&&관심사 일치&&일상) 챌린지만
        if (
          dayGap >= 0 &&
          interestIdToName(element.interestId) === interest &&
          "donationId" in element === false
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
        {user.nickname}님에게 딱 맞는 {interest} 챌린지 목록
      </p>
      {challengeRendering()}
    </div>
  );
}

export default Main;
