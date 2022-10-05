import { useEffect, useState } from "react";
import styles from "./challengeForm.module.css";
import Slider, {Range} from "rc-slider";
import tick from "../../../img/tick.png";
import "rc-slider/assets/index.css";
function SelectCertification({
  formCnt,
  setFormCnt,
  setNTimesAWeek,
  setAuthentications,
  setStartTime,
  setEndTime,
}) {
  const [emptyFlag, setEmptyFlag] = useState(0);
  const marks = {
    0: <strong>00:00</strong>,
    // 6: "06:00",
    // 12: "12:00",
    // 18: "18:00",
    24: <strong>24:00</strong>,
  };
  const [list, setList] = useState({
    start: null,
    end: null,
    joo: null,
    horu: null,
  });

  function NextButton() {
    if (emptyFlag !== 1) {
      return (
        <div className={styles.buttonBox}>
          <button
            className={styles.NextButton}
            onClick={() => {
              setFormCnt(formCnt + 1);
            }}
          >
            Next( {formCnt} / 8)
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.buttonBox}>
          <button type="submit" className={styles.NextButtonX}>
            Next( {formCnt} / 8)
          </button>
        </div>
      );
    }
  }
  function checkRange(weekOrDay) {
    if (weekOrDay === "week") {
      let input = document.getElementById("week");
      if (input.value < 1 || input.value > 7) {
        alert("1에서 7사이의 숫자를 입력하세요.");
        input.value = null;
        inputNullCheck();
      }
    } else {
      let input = document.getElementById("day");
      if (input.value < 1 || input.value > 3) {
        alert("1에서 3사이의 숫자를 입력하세요.");
        input.value = null;
        inputNullCheck();
      }
    }
  }
  function inputNullCheck() {
    if (
      document.getElementById("week") !== null ||
      document.getElementById("day") !== null
    ) {
      if (
        document.getElementById("week").value === null ||
        document.getElementById("day").value === null ||
        document.getElementById("week").value === "" ||
        document.getElementById("day").value === ""
      ) {
        // console.log("true");
        return 1;
      } else {
        // console.log("false");
        return 0;
      }
    }
  }
  function Header() {
    let weekValue = "";
    let dayValue = "";
    if (
      document.getElementById("week") !== null ||
      document.getElementById("day") !== null
    ) {
      weekValue = document.getElementById("week").value;
      dayValue = document.getElementById("day").value;
    }

    useEffect(() => {
      // console.log("헤이 암히얼");
      setEmptyFlag(inputNullCheck());
      // console.log("emptyFlag", emptyFlag);
    }, [weekValue, dayValue]);

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
      <div style={{ marginTop: "40px" }}>
        <div style={{ padding: "16px" }}>
          <p className={styles.FormHeader} style={{ marginBottom: "16px" }}>
            챌린지 인증의 디테일을 정해주세요.
          </p>
          <p className={styles.FormEx} style={{ marginBottom: "8px" }}>
            챌린지의 인증 빈도와 인증 가능시간을 정해
            <br />
            챌린지의 성공확률을 높여보세요.
            <br />
            챌린지 개설 후 디테일 설정을 변경할 수 없습니다.
            <br />{" "}
          </p>
        </div>
        <div style={{ padding: "16px" }}>
          <p>
            <img src={tick} alt="tick" style={{ width: "16px" }} />
            인증 빈도
          </p>
          <p className={styles.FormEx}>
            주간 참여 횟수와 하루 인증 횟수를 작성해주세요. <br /> 숫자만 입력
            가능합니다.
          </p>
          <div style={{ marginTop: "8px", fontWeight: "bold" }}>
            <div style={{ marginTop: "16px" }}>
              <label htmlFor="week" style={{ marginRight: "8px" }}>
                주
              </label>
              <input
                className={styles.inputN}
                id="week"
                type="number"
                min="1"
                max="7"
                onChange={(e) => {
                  checkRange("week");
                  setNTimesAWeek(e.target.value);
                  setList((list) => ({ ...list, joo: e.target.value }));
                }}
              />
              회<br />
            </div>
            <div style={{ marginTop: "16px" }}>
              <label htmlFor="day" style={{ marginRight: "8px" }}>
                하루
              </label>
              <input
                className={styles.inputN}
                id="day"
                type="number"
                min="1"
                max="3"
                onChange={(e) => {
                  checkRange("day");
                  setAuthentications(e.target.value);
                  setList((list) => ({ ...list, horu: e.target.value }));
                }}
              />
              회
            </div>
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <p style={{ marginBottom: "8px" }}>
            <img src={tick} alt="tick" style={{ width: "16px" }} />
            인증 가능시간{" "}
            {list.start !== null ? (
              <>
                ( {list.start}:00 ~ {list.end}:00 )
              </>
            ) : null}
          </p>
          <div
            className={styles.Slider}
            style={{ height: "30px", width: "328px" }}
          >
            <Slider
              style={{ width: "296px" }}
              range
              min={0}
              max={24}
              marks={marks}
              step={1}
              onChange={(e) => {
                setStartTime(e[0]);
                setEndTime(e[1]);
                setList((list) => ({ ...list, start: e[0], end: e[1] }));
              }}
              defaultValue={[0, 24]}
            />
          </div>
        </div>
        <NextButton />
      </div>
    </div>
  );
}
export default SelectCertification;
