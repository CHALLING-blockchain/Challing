import React, { useState } from "react";
import styles from "./RegisterCard.module.css";
import pencil from "../../img/pencil.png";
import gym from "../../img/gym.png";
import calender from "../../img/calender.png";
import tea from "../../img/tea-cup.png";
import plus from "../../img/plus.png";
import paint from "../../img/paint-kit.png";

function RegisterCard({ type, title, times, period, img }) {
  console.log(type);
  let typeImg = pencil;
  if (type === "운동") {
    typeImg = gym;
  } else if (type === "생활") {
    typeImg = calender;
  } else if (type === "취미") {
    typeImg = paint;
  } else if (type === "식생활") {
    typeImg = tea;
  } else {
    typeImg = plus;
  }
  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={img} alt="" />
      </div>
      <div className={styles.des}>
        <div className={styles.type}>
          <img src={pencil} alt="" />
          <span>{type}</span>
        </div>
        <div className={styles.subBox}>
          <p className={styles.title}>{title}</p>
          <span className={styles.sub}>주 {times}회</span>
          <span className={styles.sub}>{period}</span>
        </div>
      </div>
    </div>
  );
}

export default RegisterCard;
