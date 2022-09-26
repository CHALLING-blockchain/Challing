import React from "react";
import styles from "./RefundPolicy.module.css";
import eth from "../../img/ethCoin.png"
import tick from "../../img/tick.png"


function RefundPolicy() {
  return (
    <div className={styles.paddingBox}>
      <div className={styles.imgText}>
        <img src={tick} alt="" />
        <span style={{ fontSize: "16px" }}>환급정책</span>
      </div>
      <div className={styles.refundBox}>
        <div className={styles.oneLine}>
          <span className={styles.percentage}>100% 성공</span>
          <span className={styles.policy}>참가비 전액 환급 + 성공 리워드</span>
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
  );
}

export default RefundPolicy;