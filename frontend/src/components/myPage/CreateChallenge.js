import React , { useState } from 'react';
import './CreateChallenge.css';
import SelectChallenge from './challengeForm/SelectChallenge';
import SelectTopic from './challengeForm/SelectTopic';
import InputTitle from './challengeForm/InputTitle';
import SelectDonation from './challengeForm/SelectDonation';
import ChallengeIntro from './challengeForm/ChallengeIntro';
import ShotExample from './challengeForm/ShotExample';
import SelectCertification from './challengeForm/SelectCertification';

const donations = ["국경없는 의사회","세이브더 칠드런","초록우산","월드비전","유니세프"]
function CreateChallenge() {
  const [selects,setSelects] = useState({
    challengeId:"0",
    challenge:"",
    topic:"",
    title:"",
    donation:"",
    donationMoney:"",
    explanation:"",
    exPhotoUrl:"",
    goodShotUrl:"",
    badShotUrl:"",
    nTimesAWeek:"",
    authentications:"",
    period:"",
    challengeStart:"",
    peopleLimit:"",
    LimitNum:"",
    dailyMoney:""
  });
  
  const [formCnt,setFormCnt] = useState(0);
  
  console.log(selects,formCnt);

  return(
    <div className="CreateChallenge">
      <div>
        {/* 일상 & 기부 공통 폼 */}
        {formCnt === 0? 
        <SelectChallenge formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        value={setSelects.challenge}
        setValue={(value)=>{
          setSelects((state)=>({
            ...state,challenge:value
          }));
        }}/> : null }
        { formCnt === 1 ? 
        <SelectTopic formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        value={setSelects.topic}
        setValue={(value)=>{
          setSelects((state)=>({
            ...state,topic:value
          }))
        }}/>:null}
        { formCnt === 2 ? 
        <InputTitle formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        value={setSelects.title}
        setValue={(value)=>{
          setSelects((state)=>({
            ...state,title:value
          }))
        }}/>:null}
        {/* 여기부터 기부챌린지 */}
        { formCnt === 3 && selects.challenge ==="기부챌린지" ? 
        <SelectDonation formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        donation={setSelects.donation}
        setDonation={(value)=>{
          setSelects((state)=>({
            ...state,donation:value
          }));
        }}
        donationMoney={setSelects.donationMoney}
        setDonationMoney={(value)=>{
          setSelects((state)=>({
            ...state,donationMoney:value
          }));
        }}
        options={donations}
        />:null}
        { formCnt === 4 && selects.challenge ==="기부챌린지" ? 
        <ChallengeIntro formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        explanation={setSelects.explanation}
        setExplanation={(value)=>{
          setSelects((state)=>({
            ...state,explanation:value
          }));
        }}
        exPhotoUrl={selects.exPhotoUrl}
        setExPhotoUrl={(value)=>{
          setSelects((state)=>({
            ...state,exPhotoUrl:value
          }));
        }}
        />:null}
        { formCnt === 5 && selects.challenge === "기부챌린지" ? 
        <ShotExample formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        goodShotUrl={selects.goodShotUrl}
        setGoodShotUrl={(value)=>{
          setSelects((state)=>({
            ...state,goodShotUrl:value
          }));
        }}
        badShotUrl={selects.badShotUrl}
        setBadShotUrl={(value)=>{
          setSelects((state)=>({
            ...state,badShotUrl:value
          }));
        }}
        />:null}
        { formCnt === 6 && selects.challenge === "기부챌린지" ? 
        <SelectCertification formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        nTimesAWeek={selects.nTimesAWeek}
        setNTimesAWeek={(value)=>{
          setSelects((state)=>({
            ...state,nTimesAWeek:value
          }));
        }}
        authentications={selects.authentications}
        setAuthentications={(value)=>{
          setSelects((state)=>({
            ...state,authentications:value
          }));
        }}
        />:null}
        {/* 여기서부터 일상 챌린지 */}
        { formCnt === 3 && selects.challenge ==="일상챌린지" ? 
        <ChallengeIntro formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        explanation={setSelects.donation}
        setExplanation={(value)=>{
          setSelects((state)=>({
            ...state,explanation:value
          }));
        }}
        exPhotoUrl={selects.exPhotoUrl}
        setExPhotoUrl={(value)=>{
          setSelects((state)=>({
            ...state,exPhotoUrl:value
          }));
        }}
        />:null}
        { formCnt === 4 && selects.challenge === "일상챌린지" ? 
        <ShotExample formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        goodShotUrl={selects.goodShotUrl}
        setGoodShotUrl={(value)=>{
          setSelects((state)=>({
            ...state,goodShotUrl:value
          }));
        }}
        badShotUrl={selects.badShotUrl}
        setBadShotUrl={(value)=>{
          setSelects((state)=>({
            ...state,badShotUrl:value
          }));
        }}
        />:null}
        { formCnt === 5 && selects.challenge === "일상챌린지" ? 
        <SelectCertification formCnt={formCnt}
        setFormCnt={(cnt)=>{setFormCnt(cnt)}}
        nTimesAWeek={selects.nTimesAWeek}
        setNTimesAWeek={(value)=>{
          setSelects((state)=>({
            ...state,nTimesAWeek:value
          }));
        }}
        authentications={selects.authentications}
        setAuthentications={(value)=>{
          setSelects((state)=>({
            ...state,authentications:value
          }));
        }}
        />:null}
      </div>
    </div>
  );
};
export default CreateChallenge;