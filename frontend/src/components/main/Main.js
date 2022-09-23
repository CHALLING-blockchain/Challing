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

function Main() {
  // const [challengeList, setChallengeList] = useState([]);
  const dispatch = useDispatch();
  const selector = useSelector(challengeList);
  const artifact = require("../../contracts/ChallengeContract.json");

  useEffect(() => {
    async function load() {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://ropsten.infura.io/v3/38d65d8f902943d38a2876a0f4f9ad49"
        )
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

      // setChallengeList(challenges);
      console.log(selector);
    }
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
  //추천 챌린지 목록 for문
  function challengeRendering() {
    const result = [];
    // if (Object.keys(challengeList).length !== 0) {
    //   for (let index = 1; index <= Object.keys(challengeList).length; index++) {
    //     if (challengeList[index] !== undefined) {
    //       const element = challengeList[index];
    //       // console.log(element.name);
    //       let dayGap = getDayGab(element.startDate);
    //       if (!isNaN(dayGap)) {
    //         // 추가) 여기에 유저 관심사로 조건문 걸어주기(element.interestId)
    //         result.push(
    //           <span key={index}>
    //             <br></br>
    //             <p>사진주소: {element.mainPicURL}</p>
    //             <p>{element.name}</p>
    //             <p>{dayGap}일 뒤 시작</p>
    //           </span>
    //         );
    //       }
    //     }
    //   }
    // }
    return result;
  }

  return (
    <div className="Main">
      <Nav />
      <img className="Banner1" src={Banner_1} alt="Banner1" />
      <img className="Banner2" src={Banner_2} alt="Banner2" />
      <p>챌린지 목록</p>
      {challengeRendering()}
    </div>
  );
}

export default Main;
