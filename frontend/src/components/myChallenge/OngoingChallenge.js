import React, { useEffect, useState } from "react";
import styles from "./OngoingChallenge.module.css"
import { useNavigate } from 'react-router-dom';
import MyChallengeCard from "../common/MyChallengeCard";
import ContractAPI from "../../api/ContractAPI";
import { useSelector } from 'react-redux';
import { selectUser, setUserInfo } from './../../app/redux/userSlice';
import UserAPI from "../../api/UserAPI";
import { useDispatch } from 'react-redux';
import { challengeList } from './../../app/redux/allChallengeSlice';
import * as getInterestStr from "../main/Main.js";
import * as getDayGap from "../main/Main.js";


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
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>

        <p style={{ fontSize: "20px", margin: "auto" }}>참가한 챌린지</p>
        <div></div>
      </div>
    </div>
  );
}

function AchieveRateBox(){
  const Contract = new ContractAPI();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(selectUser));
  const [ingChal, setIngChal] = useState("");
  const [totalDeposit, setTotalDeposit] = useState("");
  const selector = useSelector(challengeList);
  useEffect(() => {
     UserAPI.mypage(user.email).then((response) => {
       dispatch(setUserInfo(response.data.body));
       setUser(response.data.body);
     });
   }, [user.email, dispatch]);
  useEffect(() => {
    async function load() {
      await Contract.getMyChallenge(user.id).then((result) => {
        const join = result[1];
        let ingCount = 0;
        for (let i = 0; i < join.length; i++) {
          if (join[i].complete !== true) {
            ingCount += 1;

          }
        }
        setIngChal(ingCount);
      });
    }
    load();
  }, [user.id]);
  
  useEffect(() => {
    async function load() {
      await Contract.getChallengersByUserId(user.id).then((result) => {
        let tmpDeposit = 0;
        const myChallengeInfo = result;
        for (let i = 0; i < myChallengeInfo.length; i++) {
          // challenger struct
          let tmpInfo = myChallengeInfo[i];
          if ("userDeposit" in tmpInfo){
            if (selector[tmpInfo.challengeId].complete !== true) {
              tmpDeposit += Number(tmpInfo.userDeposit);
            }
          }
        }
        setTotalDeposit(tmpDeposit/1e18);
      })
    }
    load();
  }, [])
    
    return (
      <div className={styles.achRateBox}>
        <div className={styles.boxLeft}>
          <p>챌린지</p>
          <p>
            <span>{ingChal}</span> 개
          </p>
        </div>
        <div className={styles.boxRight}>
          <p>총 예치금</p>
          <span>
            {totalDeposit} <span style={{fontSize:'14px'}}>ETH</span>{" "}
          </span>
        </div>
      </div>
    );
}

function ChallengeList(){
  const navigate = useNavigate();
  const Contract = new ContractAPI();
  const [infos,setInfos] = useState([]); 
  const [challengers,setChallengers] = useState([]);
  const [user, setUser] = useState(useSelector(selectUser));
  const dispatch = useDispatch();
  const selector = useSelector(challengeList);
  const tmp = [];
  const tmpp = [];

  useEffect(() => {
    UserAPI.mypage(user.email).then((response) => {
      dispatch(setUserInfo(response.data.body));
      setUser(response.data.body);
    });
  }, [user.email, dispatch]);
  useEffect(() => {
    async function load() {
      const ids = await Contract.getMyChallenge(user.id);

      const filterIds = ids[1].filter((id) => selector[id].complete !== true);
      for (const id of filterIds) {
        let challengers = await Contract.getChallengers(id);
        challengers.forEach((challenger) => {
          tmpp.push(challenger)
        });
        tmp.push(selector[id])
      }
      setChallengers(tmpp)
      setInfos(tmp);

    }
    load();
  }, []);
  function navigateDetail(info,index){
    const NoIng = getDayGap.getDayGapFromToday(info.startDate)
    console.log(NoIng)
    if(NoIng>0){
      navigate(`/challenge-detail/${info.challengeId}`);
    }else{
      navigate(`/challenge-certify/${info.challengeId}`, {
        state: {
          challengeInfo: info,
          percentage: ((challengers[index].totalCount / info.authTotalTimes) *100).toFixed(2),
          challengerInfo:challengers[index]
        },
      });
    }

  }
    return (
      <div className={styles.listBox}>
          { infos.map(function(info, index){
            console.log(info)
            
            let week = Math.floor(
              getDayGap.getDayGapFromDates(info.startDate, info.endDate) / 7
            );
            let perWeek = Math.floor(info.authTotalTimes / week);
            return(
              <div onClick={()=>{navigateDetail(info,index)}}>
                <MyChallengeCard
                type={getInterestStr.interestIdToName(info.interestId)}
                title={info.name}
                times={perWeek}
                period={info.startDate + "~" + info.endDate}
                img={info.mainPicURL}
                count={challengers[index].totalCount}
              ></MyChallengeCard>
              </div>
              
            )
          })}
        
      </div>
    );
}

function OngoingChallenge(){
    return(
        <div>
            <Header></Header>
            <AchieveRateBox></AchieveRateBox>
            <ChallengeList></ChallengeList>
        </div>
    )
}

export default OngoingChallenge;