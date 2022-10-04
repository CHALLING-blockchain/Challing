import { useState } from "react";
import styles from "./challengeForm.module.css";
import tick from "../../../img/tick.png";

function SelectPeople({
  formCnt,
  setFormCnt,
  peopleLimit,
  setPeopleLimit,
  limitNum,
  setLimitNum,
}) {
  const [tF, setTF] = useState(null);
  const [people, setPeople] = useState(25);
  const plus = () => {
    setPeople((current) => current + 1);
    setLimitNum(people + 1);
  };
  const minus = () => {
    setPeople((current) => current - 1);
    setLimitNum(people - 1);
  };
  function LimitFalse() {
    return (
      <div className={styles.False}>
        <p style={{ marginTop: "16px", marginBottom: "16px" }}>
          <img src={tick} alt="tick" style={{ width: "16px" }} /> 제한 인원
        </p>
        <div className={styles.LimitTF}>
          <p>총</p>
          <div className={styles.People}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-dash"
              viewBox="0 0 16 16"
            >
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
            <p style={{ display: "flex", alignItems: "center" }}>{people}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          <p>명</p>
        </div>
      </div>
    );
  }
  function LimitTrue() {
    return (
      <div className={styles.True}>
        <p style={{ marginTop: "16px", marginBottom: "16px" }}>
          <img src={tick} alt="tick" style={{ width: "16px" }} /> 제한 인원
        </p>
        <div className={styles.LimitTF}>
          <p>총</p>
          <div className={styles.People}>
            <svg
              disabled={!tF}
              onClick={minus}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-dash"
              viewBox="0 0 16 16"
            >
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
            <p style={{ display: "flex", alignItems: "center" }}>{people}</p>
            <svg
              disabled={!tF}
              onClick={plus}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          <p>명</p>
        </div>
      </div>
    );
  }
  function NextButton() {
    return (
      <div className={styles.buttonBox}>
        <button
          className={styles.NextButton}
          onClick={() => {
            setFormCnt(formCnt + 1);
          }}
        >
          Next( {formCnt} / 8 )
        </button>
      </div>
    );
  }
  function NextButtonX() {
    return (
      <div className={styles.buttonBox}>
        <button className={styles.NextButtonX}>Next( {formCnt} / 8 )</button>
      </div>
    );
  }
  function Header() {
    return (
      <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
        <div className={styles.header}>
          <svg
            onClick={() => {
              setFormCnt(formCnt - 1);
            }}
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
      <Header />
      <div style={{ padding: "16px" }}>
        <p className={styles.FormHeader}>모집인원을 설정해주세요.</p>
        <p className={styles.FormEx}>
          챌린지에 참여할 인원 수를 정해수세요.
          <br />
          챌린지 개설후 인원 수 변경이 불가합니다.
          <br />
        </p>
        <p style={{ marginTop: "16px", marginBottom: "16px" }}>
          <img src={tick} alt="tick" style={{ width: "16px" }} /> 인원 제한 여부
        </p>
        <div className={styles.Limit}>
          <div
            className={tF === true ? styles.SelectLimit : styles.SelectLimitX}
            value={peopleLimit}
            onClick={() => {
              setPeopleLimit("true");
              setTF(true);
              setLimitNum(people);
            }}
          >
            <p>인원 제한 있음</p>
          </div>
          <div
            className={tF === false ? styles.SelectLimit : styles.SelectLimitX}
            value={peopleLimit}
            onClick={() => {
              setPeopleLimit("false");
              setTF(false);
            }}
          >
            <p>인원 제한 없음</p>
          </div>
        </div>
        {tF === false || tF === null ? <LimitFalse /> : <LimitTrue />}
      </div>
      {tF !== null ? <NextButton /> : <NextButtonX />}
    </div>
  );
}
export default SelectPeople;
