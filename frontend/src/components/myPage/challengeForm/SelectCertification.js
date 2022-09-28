import { useState } from 'react';
import styles from './challengeForm.module.css';
import Slider from 'rc-slider';
import tick from '../../../img/tick.png';
import '../../../../node_modules/rc-slider/assets/index.css';

function SelectCertification({formCnt,setFormCnt,setNTimesAWeek,setAuthentications,setStartTime,setEndTime}){
  const marks = {
    0: <strong>00:00</strong>,
    6: '06:00',
    12: '12:00',
    18: '18:00',
    24: <strong>24:00</strong>
  };
  const[list,setList] = useState({
    start:null,
    end:null,
    joo:null,
    horu:null
  });
  function NextButton(){
    return(
      <div className={styles.buttonBox}>
        <button className={styles.NextButton} onClick={()=>{setFormCnt(formCnt+1)}}>Next( {formCnt} / 8)</button>
      </div>
    )
  }
  function NextButtonX(){
    return(
      <div className={styles.buttonBox}>
        <button className={styles.NextButtonX} onClick={()=>{setFormCnt(formCnt+1)}} disabled='false'>Next( {formCnt} / 8)</button>
      </div>
    )
  }
  function Header(){
    return (
      <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
        <div className={styles.header}>
          <svg
            onClick={()=>{setFormCnt(formCnt-1)}}
            style={{ margin: "16px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 개설하기</p>
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header/>
      <div style={{padding:'16px'}}>
        <p className={styles.FormHeader}>챌린지 인증의 디테일을 정해주세요.</p>
        <p className={styles.FormEx}>챌린지의 인증 빈도와 인증 가능시간을 정해<br/>
                              챌린지의 성공확률을 높여보세요.<br/>
                              챌린지 개설 후 디테일 설정을 변경할 수 없습니다.<br/> </p>
      </div>
      <div style={{padding:'16px'}}>
        <p><img src={tick} alt='tick' style={{width:'16px'}}/>인증 빈도</p>
        <p className={styles.FormEx}>주간 참여 횟수와 하루 인증 횟수를 작성해주세요. 숫자만 입력 가능합니다.</p>
        <div style={{marginTop:'8px',fontWeight:'bold'}}>
          <div style={{marginTop:'16px'}}>
            <label for="week" style={{marginRight:'8px'}}>주</label>
            <input className={styles.inputN}
              id="week" type="number" min="1" max="7" onChange={(e)=>{
              setNTimesAWeek(e.target.value);
              setList((list)=>({...list,joo:e.target.value}));
              }}/>회<br/>
          </div>
          <div style={{marginTop:'16px'}}>
            <label for="week" style={{marginRight:'8px'}}>하루</label>
            <input className={styles.inputN} 
              id="week" type="number" min="1" max="3" onChange={(e)=>{
              setAuthentications(e.target.value);
              setList((list)=>({...list,horu:e.target.value}));
              }}/>회
          </div>
        </div>
      </div>
      <div  style={{padding:'16px'}}>
        <p style={{marginBottom:'8px'}}><img src={tick} alt='tick' style={{width:'16px'}}/>인증 가능시간 {list.start !== null ? <>( {list.start}:00 ~ {list.end}:00 )</> : null}</p>
        <div className={styles.Slider} style={{height:'30px',width:'328px'}}>
          <Slider
            style={{width:'296px'}}
            range min={0} max={24} marks={marks} step={1} onChange={(e)=>{
            setStartTime(e[0]);
            setEndTime(e[1]);
            setList((list)=>({...list,start:e[0],end:e[1]}));
          }} defaultValue={[0, 24]} />
        </div>
      </div>
      { Object.values(list).includes(null)  ? <NextButtonX/> : <NextButton/> }
    </div>
  );
}
export default SelectCertification;