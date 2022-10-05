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

function SelectTopic({formCnt,setFormCnt,value,setValue}){
  const[topic,setTopic] = useState("");
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
        <button className={styles.NextButtonX} onClick={()=>{setFormCnt(formCnt+1)}}>Next( {formCnt} / 8)</button>
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
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
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
      <p style={{padding:'16px'}} className={styles.FormHeader2}>어떤 주제의 챌린지인가요?</p>
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