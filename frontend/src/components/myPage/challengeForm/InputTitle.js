import { useState } from "react";
import styles from './challengeForm.module.css';


function InputTitle({formCnt,setFormCnt,value,setValue }) {
  const[title,setTitle] = useState("");
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
        <p className={styles.FormHeader}>챌린지 제목을 작성해주세요.</p>
        <p className={styles.FormEx}>챌린지를 잘 표현하는 제목을 사용해주세요.<br/>
          비속어와 같은 타인에게 불쾌감을 주는 언어 사용시 <br/>
          계정이 영구적으로 정지 될 수 있습니다.</p>
        <input
          className={styles.Input}
          placeholder="제목을 작성해주세요."
          // value는 텍스트인풋에서 넘겨준 props
          value={value}
          type="text"
          maxLength="50"
          // 값이 바뀔때를 감지하여 setValue값을 변경시켜주어 넘겨주자
          onChange={(e) => {
            setValue(e.target.value);
            setTitle(e.target.value)
          }}
        />
        <p>(50자이내)</p>
      </div>
      {title !== "" ? <NextButton/> : <NextButtonX/>}
    </div>
  );
}
export default InputTitle;