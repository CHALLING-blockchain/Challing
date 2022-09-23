import { useState } from 'react';
import styles from './challengeForm.module.css';
import NextButtonStyles from '../../common/NextButton.module.css';

function SelectPeople({formCnt,setFormCnt,peopleLimit,setPeopleLimit,limitNum,setLimitNum}){
  const[tF,setTF] = useState(null);
  const [people,setPeople] = useState(25);
  const plus = () => {setPeople((current)=>current+1);setLimitNum(people+1);}
  const minus = () => {setPeople((current)=>current-1);setLimitNum(people-1);}
  function LimitFalse(){
    return(
      <div className={styles.False} >
        <p>제한 인원</p>
        <div className={styles.LimitTF}>
          <p>총</p>
          <div className={styles.People}>
            <button disabled='false'>-</button>
            <p>{people}</p>
            <button disabled='false'>+</button>
          </div>
          <p>명</p>
        </div>
      </div>
    )
  }
  function LimitTrue(){
    return(
      <div className={styles.True} >
        <p>제한 인원</p>
        <div className={styles.LimitTF}>
          <p>총</p>
          <div className={styles.People}>
            <button disabled={!tF} onClick={minus}>-</button>
            <p>{people}</p>
            <button disabled={!tF} onClick={plus}>+</button>
          </div>
          <p>명</p>
        </div>
      </div>
    )
  }
  function NextButton(){
    return(
      <button className={NextButtonStyles.NextButton} onClick={()=>{setFormCnt(formCnt+1)}}>Next( {formCnt} / 8 )</button>
    )
  }
  function NextButtonX(){
    return(
      <button className={NextButtonStyles.NextButtonX} onClick={()=>{setFormCnt(formCnt+1)}} disabled='false'>Next( {formCnt} / 8 )</button>
    )
  }
  return(
    <div>
      <div className="BackMyPage">
        <svg onClick={()=>{setFormCnt(formCnt-1)}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z" fill="#444444"/>
        </svg>
        <p>챌린지 개설하기</p>
      </div>
      <p className={styles.FormHeader}>모집인원을 설정해주세요.</p>
      <p className={styles.FormEx}>챌린지에 참여할 인원 수를 정해수세요.<br/>
                            챌린지 개설후 인원 수 변경이 불가합니다.<br/></p>
      <p>인원 제한 여부</p>
      <div className={styles.Limit}>
        <div className={tF === true ? styles.SelectLimit : styles.SelectLimitX} value={peopleLimit} onClick={()=>{setPeopleLimit("true");setTF(true);setLimitNum(people);}}>
          <p>인원 제한 있음</p>
        </div>
        <div className={tF === false ? styles.SelectLimit : styles.SelectLimitX} value={peopleLimit} onClick={()=>{setPeopleLimit("false");setTF(false);}}>
          <p>인원 제한 없음</p>
        </div>
      </div>
      {tF === false || tF === null ? <LimitFalse/> : <LimitTrue/>}
      { tF !== null ? <NextButton/> : <NextButtonX/>}
    </div>
  )
}
export default SelectPeople;