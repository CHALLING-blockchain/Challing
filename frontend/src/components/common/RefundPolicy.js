import React from "react";
import styles from "./RefundPolicy.module.css";
import tick from "../../img/tick.png"


function RefundPolicy(props) {
  const type = props.type;
  return (
    <div className={styles.paddingBox}>
      {type === "daily" ? (
        <div>
          <div className={styles.imgText}>
            <img src={tick} alt="" />
            <span style={{ fontSize: "16px" }}>환급정책</span>
          </div>
          <div className={styles.refundBox}>
            <div className={styles.oneLine}>
              <span className={styles.percentage}>100% 성공</span>
              <span className={styles.policy}>
                참가비 전액 환급 + 성공 리워드
              </span>
            </div>
            <div className={styles.oneLine}>
              <span className={styles.percentage}>99%이하 80%이상</span>
              <span className={styles.policy}>참가비 전액 환급</span>
            </div>
            <div className={styles.oneLine}>
              <span className={styles.percentage}>79%이하 40%이상</span>
              <span className={styles.policy}>참가비 일부 환급</span>
            </div>
            <div className={styles.oneLine}>
              <span className={styles.percentage}>40% 미만</span>
              <span className={styles.policy}>환급금 없음</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.imgText}>
            <img src={tick} alt="" />
            <span style={{ fontSize: "16px" }}>환급정책</span>
          </div>
          <div className={styles.refundBox}>
            <div className={styles.textone}>
              <span>☝ </span>
              <span>
                개개인의 참여 챌린저들은 80% 이상 인증 시 성공으로 판단합니다.
              </span>
            </div>
            <div className={styles.textone}>
              <span>☝ </span>
              <span>
                전체 참가자의 80%가 챌린지 성공 시 해당 챌린지를 성공으로
                판단합니다.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RefundPolicy;