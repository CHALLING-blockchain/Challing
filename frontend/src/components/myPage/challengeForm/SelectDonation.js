import { useState } from "react";
import styles from './challengeForm.module.css';

function SelectDonation({formCnt,setFormCnt,donation,setDonation,donationMoney,setDonationMoney,options}) {
  const [money,setMoney] = useState(0);
  const [dona,setDona] = useState("");
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
        <p className={styles.FormHeader}>기부금을 설정해주세요.</p>
        <p className={styles.FormEx}>챌린지 성공 시 기부처로 전달될 기부금을 설정해주세요.<br/>
                              최소금액은 0.05 ETH 입니다.<br/>
                              챌린지 개설 후 기부금 변경이 불가합니다.<br/></p>
        <input
          className={styles.Input}
          placeholder="기부금을 입력해주세요."
          // value는 텍스트인풋에서 넘겨준 props
          value={donationMoney}
          type="number"
          // 값이 바뀔때를 감지하여 setValue값을 변경시켜주어 넘겨주자
          onChange={(e) => {
            setDonationMoney(e.target.value);
            setMoney(e.target.value);
          }}
        />
        <p className={styles.SmallText}>*숫자만 입력가능합니다.</p>
      </div>
      <div style={{padding:'16px'}}>
        <p className={styles.FormHeader}>기부처를 선택해주세요.</p>
        <p className={styles.FormEx}>챌린지 성공 시 기부금이 전달 될 기부처를 선택해주세요.</p>
        <select className={styles.Select} value={donation} onChange={(e)=>{setDonation(e.target.value); setDona(e.target.value);}}>
          <option className={styles.Option} value=""> 기부처를 선택해주세요.</option>
          {options.map((item)=>(
            <option className={styles.Option} key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
     { money && dona !== "" ? <NextButton/> : <NextButtonX/>}
    </div>
  );
}
export default SelectDonation;