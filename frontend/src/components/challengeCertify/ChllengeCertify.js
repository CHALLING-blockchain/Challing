import React, { useState,useEffect } from "react";
import styles from "./ChallengeCertify.module.css"
import chart from "../../img/chart.png"
import heart from "../../img/heart.png"
import calender from "../../img/calender.png"
import chat from "../../img/chat.png"
import { Link, useNavigate,useLocation } from "react-router-dom";
import moment from 'moment';
import * as getDayGab from "../main/Main.js";

import ContractAPI from "../../api/ContractAPI";

function Header(){
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
          <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 인증</p>
          <div></div>
        </div>
      </div>
    );
}

function BackDrop({picURL}){
    return(
        <img className={styles.backdrop} src={picURL} alt="" />
    )
}

function Description({info,percentage}){
  const today =moment(new Date()).format('YYYY-MM-DD');
  const dayGab=getDayGab.getDayGapFromDates(info.startDate,today)
    return (
      <div className={styles.desBox}>
        <p className={styles.title}>{info.name}</p>
        <div className={styles.subBox}>
          <div className={styles.oneline}>
            <img src={heart} alt="" />
            <span>
              챌린지 <span style={{color:'#755FFF'}}>{dayGab}</span> 일째
            </span>
          </div>
          <div className={styles.oneline}>
            <img src={calender} alt="" />
            <span>
              {info.startDate} ~ {info.endDate}
            </span>
          </div>
          <div className={styles.oneline}>
            <img src={chart} alt="" />
            <span>
                현재 <span style={{color:'#755FFF'}}>{percentage}</span>% 달성
            </span>
          </div>
        </div>
      </div>
    );
}

function Btn({challengeId}){
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    return (
      <div>
        { state === false ? 
        <div className={styles.btnBox}>
          <button className={styles.btn} onClick={() => {
            navigate(`/web-cam-capture`, {
              state: {
                challengeId:challengeId,
              }
            });
          }}>📸 인증하기</button>
        </div>
        :
        <div className={styles.btnBox}>
          <button className={styles.btn} disabled='true'>📸 인증완료</button>
        </div>}
        
      </div>
    );
}


function OtherShot({photoList}){
    const navigate = useNavigate();

    return (
      <div className={styles.otherShot}>
        <div className={styles.shotTitle}>
          <span>다른 챌린저의 인증샷</span>
          <div style={{ color: "#755FFF" }} onClick={() => {
              navigate(`/certification-photos`, {
                state: {
                  photoList:photoList
                }
              });
            }}>더보기</div>

        </div>
        <div className={styles.shots}>
          {
            photoList.map(photo=>{
              return (<img src={photo.picURL} alt="" />)
              
            })
          }

        </div>
      </div>
    );
}

function Voting({voteList}){
  const navigate = useNavigate();
  
    return (
      <div className={styles.voting} onClick={() => {
        navigate(`/votinghome`, {
          state: {
            voteList:voteList
          }})}
        }>
        <div className={styles.votingSub}>
            <img style={{ width: "32px", height: "32px" }} src={chat} alt="" />
            <span style={{margin:'0 4px', fontSize:'16px'}}>투표</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        
      </div>
    );
}

function ChallengeCertify() {
  const challenge = useLocation().state.challengeInfo;
  const percentage=useLocation().state.percentage;
  const [challengers,setChallegers]=useState();
  const [voteList,setVoteList]=useState([]);    
  const [photoList,setPhotoList]=useState([]);

  const Contract = new ContractAPI();   
      
  useEffect(() => {
    async function load() {
      const challengers= await Contract.getChallengers(challenge.challengeId)
      setChallegers(challengers);

      const vote= await Contract.getChallengeVote(challenge.challengeId);
      setVoteList(vote);

      challengers.forEach(async challenger => {
        const photo= await Contract.getChallengerPhoto(challenger.id)        
        setPhotoList([...photoList,...photo]);
      });
    }
    load()
  }, []);

    return (
      <div>
        <Header></Header>
        <BackDrop picURL={challenge.mainPicURL}></BackDrop>
        <Description info={challenge} percentage={percentage}></Description>
        <Btn challengeId={challenge.challengeId}></Btn>
        <hr className={styles.hrTag} />
        <OtherShot photoList={photoList}></OtherShot>
        <Voting voteList={voteList}></Voting>
        <div style={{ width: "100vw", height: "90px" }}></div>
      </div>
    );
}

export default ChallengeCertify;