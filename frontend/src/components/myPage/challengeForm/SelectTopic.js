import { useState } from 'react';
import styles from './challengeForm.module.css';
import categoryStyles from "../../auth/PreCategory.module.css";
import cardStyles from "../../common/CategoryCard.module.css";
import calender from "../../../img/calender.png";
import gym from "../../../img/gym.png";
import paint from "../../../img/paint-kit.png";
import pencil from "../../../img/pencil.png";
import plus from "../../../img/plus.png";
import tea from "../../../img/tea-cup.png";
import NextButtonStyles from '../../common/NextButton.module.css';

function SelectTopic({formCnt,setFormCnt,value,setValue}){
  const[topic,setTopic] = useState("");
  function NextButton(){
    return(
      <button className={NextButtonStyles.NextButton} onClick={()=>{setFormCnt(formCnt+1)}}>Next( {formCnt} / 8)</button>
    )
  }
  function NextButtonX(){
    return(
      <button className={NextButtonStyles.NextButtonX} onClick={()=>{setFormCnt(formCnt+1)}} disabled='false'>Next( {formCnt} / 8)</button>
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
      <p className={styles.FormHeader}>어떤 주제의 챌린지인가요?</p>
      <div className={categoryStyles.cardBox}>
        <div className={topic === "운동" ? cardStyles.card : cardStyles.cardX} value={value} onClick={()=>{setValue('운동');setTopic('운동');}}>
          <div>
            <img className={cardStyles.imgTag} src={gym} alt="img" />
            <hr className={cardStyles.hrTag} />
            <p className={cardStyles.textTag}>운동</p>
          </div>
        </div>
        <div className={topic === "생활" ? cardStyles.card : cardStyles.cardX} onClick={()=>{setValue('생활');setTopic('생활');}}>
          <div>
            <img className={cardStyles.imgTag} src={calender} alt="img" />
            <hr className={cardStyles.hrTag} />
            <p className={cardStyles.textTag}>생활</p>
          </div>
        </div>
        <div className={topic === "취미" ? cardStyles.card : cardStyles.cardX} onClick={()=>{setValue('취미');setTopic('취미');}}>
          <div>
            <img className={cardStyles.imgTag} src={paint} alt="img" />
            <hr className={cardStyles.hrTag} />
            <p className={cardStyles.textTag}>취미</p>
          </div>
        </div>
        <div className={topic === "식생활" ? cardStyles.card : cardStyles.cardX} onClick={()=>{setValue('식생활');setTopic('식생활');}}>
          <div>
            <img className={cardStyles.imgTag} src={tea} alt="img" />
            <hr className={cardStyles.hrTag} />
            <p className={cardStyles.textTag}>식생활</p>
          </div>
        </div>
        <div className={topic === "학습" ? cardStyles.card : cardStyles.cardX} onClick={()=>{setValue('학습');setTopic('학습');}}>
        <div>
            <img className={cardStyles.imgTag} src={pencil} alt="img" />
            <hr className={cardStyles.hrTag} />
            <p className={cardStyles.textTag}>학습</p>
          </div>
        </div>
        <div className={topic === "그 외" ? cardStyles.card : cardStyles.cardX} onClick={()=>{setValue('그 외');setTopic('그 외');}}>
        <div>
            <img className={cardStyles.imgTag} src={plus} alt="img" />
            <hr className={cardStyles.hrTag} />
            <p className={cardStyles.textTag}>그 외</p>
          </div>
        </div>
      </div>
      {topic !== "" ? <NextButton/> : <NextButtonX/>}
    </div>
  );
};

export default SelectTopic;