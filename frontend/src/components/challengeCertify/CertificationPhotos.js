import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CertificationPhotos.module.css"
import camera from "../../img/camera.png"

function Header() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "fixed", top: "0" }}>
      <div className={styles.header}>
        <svg
          style={{ margin: "auto" }}
          onClick={() => navigate(-1)}
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
        <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 인증</p>
        <div></div>
      </div>
    </div>
  );
}

function Title(){
    const [title, setTitle] = useState('영어, 외국어 10문장 쓰기')
    return (
      <div className={styles.titleBox}>
        <span>
          <span style={{ color: "#755FFF" }}>{title}</span> 의 인증샷
        </span>
        <img src={camera} alt="" />
      </div>
    );
}



function CertificationPhotos(){
    return(
        <div>
            <Header></Header>
            <Title></Title>
        </div>
    )
}

export default CertificationPhotos;