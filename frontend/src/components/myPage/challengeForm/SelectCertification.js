import { useState } from 'react';
import './challengeForm.css';
import Slider from 'rc-slider';
import '../../../../node_modules/rc-slider/assets/index.css';
import { current } from '@reduxjs/toolkit';

function SelectCertification({formCnt,setFormCnt,setNTimesAWeek,setAuthentications,setStartTime,setEndTime}){
  const marks = {
    0: <strong>00:00</strong>,
    6: '06:00',
    12: '12:00',
    18: '18:00',
    24: {
      style: {
        color: 'red',
      },
      label: <strong>24:00</strong>,
    },
  };
  const[num,setNum] = useState(0);
  function NextButton(){
    return(
      <button className="NextButton" onClick={()=>{setFormCnt(formCnt+1)}}>Next( {formCnt} / 8)</button>
    )
  }
  return (
    <div>
      <div className="BackMyPage">
        <svg onClick={()=>{setFormCnt(formCnt-1)}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z" fill="#444444"/>
        </svg>
        <p>챌린지 개설하기</p>
      </div>
      <div>
        <p className="FormHeader">챌린지 인증의 디테일을 정해주세요.</p>
        <p className="FormEx">챌린지의 인증 빈도와 인증 가능시간을 정해<br/>
                              챌린지의 성공확률을 높여보세요.<br/>
                              챌린지 개설 후 디테일 설정을 변경할 수 없습니다.<br/> </p>
      </div>
      <div>
        <p>인증 빈도</p>
        <p>주간 참여 횟수와 하루 인증 횟수를 작성해주세요. 숫자만 입력 가능합니다.</p>
        <label for="week">주</label>
        <input id="week" type="number" min="1" max="7" onChange={(e)=>{
          setNTimesAWeek(e.target.value);
          setNum((current)=>current+1);
          }}/>회
        <label for="week">하루</label>
        <input id="week" type="number" min="1" max="3" onChange={(e)=>{
          setAuthentications(e.target.value);
          setNum((current)=>current+1);;
          }}/>회
      </div>
      <div>
        <p>인증 가능시간</p>
        <div style={{height:'30px'}}>
        <Slider dots range min={0} max={24} marks={marks} step={1} onChange={(e)=>{
          setStartTime(e[0]);
          setEndTime(e[1]);
          setNum((current)=>current+1);;
        }} defaultValue={[0, 24]} />
      </div>
      </div>

      {num >= 3  ? <NextButton/> : <div className="NoNextButton">Next( {formCnt} / 8)</div>}
    </div>
  );
}
export default SelectCertification;