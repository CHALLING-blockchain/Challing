import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ChallengeShot.module.css';
import { useSelector, useDispatch } from "react-redux";
import { setChallengeList,challengeList} from "../../app/redux/allChallengeSlice"
import * as getDayGab from "../main/Main.js";
import moment from 'moment';
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import ContractAPI from "../../api/ContractAPI";
// import useWeb3 from "../../../hooks/useWeb3";

function ChallengeShot(){
    const [myChallenge,setMyChallenge] = useState("");
    const onChange = (event) => setMyChallenge(event.target.value);
    const allChallenge=useSelector(challengeList);
    const user = useSelector(selectUser);
    const [challengers,setChallegers]=useState();
    const dispatch = useDispatch();
    const Contract = new ContractAPI();
    const navigate = useNavigate();

    useEffect(()=>{
      async function load(){
        let allChallengeList = {};
        await Contract.getAllChallenge().then((result)=>{
          allChallengeList = result;
        });
        dispatch(setChallengeList(allChallengeList));
      }
      load()
    },[])

    useEffect(() => {
      async function load() {
        const challengers= await Contract.getChallengersByUserId(1)
        setChallegers(challengers);
      }
      load()
    }, []);

    function ChallengeCard(props){
      const today =moment(new Date()).format('YYYY-MM-DD');
      const dayGab=getDayGab.getDayGapFromDates(today,props.challengeInfo.endDate)
      
      let userCount=0;

      
      if(challengers){
        userCount=challengers.filter(el=>el.challengeId==props.challengeInfo.challengeId)[0].totalCount
      }
      const percentage=(1/props.challengeInfo.authTotalTimes*100).toFixed(2)

      return(
        <div onClick={()=>{navigate(`/challenge-certify/${props.challengeInfo.challengeId}`,{
          state: {
            challengeInfo:props.challengeInfo,
            percentage:percentage
          }
        })}}>
          <img src={props.challengeInfo.mainPicURL} height="50" width="50" alt=""></img>
          <p>{props.challengeInfo.name}</p>
            <button onClick={() => {
              navigate(`/challenge-certify/${props.challengeInfo.challengeId}`, {
                state: {
                  challengeInfo:props.challengeInfo,
                  percentage:percentage
                }
              });
            }}>인증하기</button>
          
          <p>{dayGab}일 뒤 종료</p>
          <p></p>
          <p>현재{percentage}%달성</p>
          {/* {console.log(props.challengeInfo)} */}
        </div>
      )
    }
    function NoChallenging(){
      return (
        <div className="NoChallenging">
          <h1>진행중인 챌린지가 없습니다.😢</h1>
          <Link to="/">
              <button className="AroundButton">챌린지 둘러보기</button>
          </Link>
        </div>
      )
    }
    function YesChallenge(){
      return(
        <div className={styles.Contents}>
          {
            Object.values(allChallenge).map((challenge,index)=>{
            return <ChallengeCard key={index} challengeInfo={challenge}></ChallengeCard>
            })
          }
        </div>
      )
    }

    return (
      <div>
        <div className={styles.Header}>
          <p className={styles.ShotHeader}>
            챌린지 인증
          </p>
          <div style={{padding:'16px',paddingTop:'0px'}}>
            <form className={styles.InputSearch}>
              <svg className={styles.SearchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#999999"/>
              </svg>
              <input className={styles.Input} value={myChallenge} type="text" onChange={onChange} placeholder="내 챌린지 검색"/>
            </form>
        </div>
          { Object.values(allChallenge).length === 0 ? <NoChallenging/> : <YesChallenge/> }
        </div>
      </div>
    );
};

export default ChallengeShot;