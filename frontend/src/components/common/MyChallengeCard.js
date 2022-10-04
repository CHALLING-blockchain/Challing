import React, { useState } from "react";
import styles from "./MyChallengeCard.module.css";
import pencil from "../../img/pencil.png";
import gym from "../../img/gym.png";
import calender from "../../img/calender.png";
import tea from "../../img/tea-cup.png";
import plus from "../../img/plus.png";
import paint from "../../img/paint-kit.png";
import chart from "../../img/chart.png";

function MyChallengeCard({ type, title, times, period, img, count }) {
  let typeImg = pencil;
  if (type === "운동") {
    typeImg = gym;
  } else if (type === "생활") {
    typeImg = calender;
  } else if (type === "취미") {
    typeImg = paint;
  } else if (type === "식생활") {
    typeImg = tea;
  } else if (type === "그 외") {
    typeImg = plus;
  }
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={img} alt="" />
      </div>
      <div className={styles.des}>
        <div className={styles.count}>
          <img src={chart} alt="" />
          <span>누적 참가횟수 {count}회</span>
        </div>
        <div className={styles.subBox}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={typeImg} alt="" />
            <span className={styles.title}>{title}</span>
          </div>
          <span className={styles.sub}>주 {times}회</span>
          <span className={styles.sub}>{period}</span>
        </div>
      </div>
    </div>
  );
}

export default MyChallengeCard;
