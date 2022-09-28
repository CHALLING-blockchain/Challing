import { useState } from "react";
import styles from './challengeForm.module.css';

function SelectDeposit({formCnt,setFormCnt,dailyMoney,setDailyMoney}) {
  const [money,setMoney] = useState(0);
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
        <button className={styles.NextButtonX}>Next( {formCnt} / 8)</button>
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
      <div style={{padding:'16px'}}>
        <p className={styles.FormHeader}>예치금을 설정해주세요.</p>
        <p className={styles.FormEx}>챌린지 참여자의 예치금을 지정해주세요.<br/>
                              챌린지 개설 후 예치금 변경이 불가합니다.<br/></p>
        <input
          className={styles.Input}
          placeholder="예치금을 입력해주세요."
          // value는 텍스트인풋에서 넘겨준 props
          value={dailyMoney}
          type="number"
          // 값이 바뀔때를 감지하여 setValue값을 변경시켜주어 넘겨주자
          onChange={(e) => {
            setDailyMoney(e.target.value);
            setMoney(e.target.value);
          }}
        />
        <p>*숫자만 입력가능합니다.</p>
      </div>

     { money !== 0 ? <NextButton/> : <NextButtonX/>}
    </div>
  );
}
export default SelectDeposit;