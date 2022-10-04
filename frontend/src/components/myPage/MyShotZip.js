import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/redux/userSlice";
import styles from "./MyShotZip.module.css";

function Header() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
      <div className={styles.header}>
        <svg
          style={{ margin: "auto" }}
          onClick={() => navigate("/my-page")}
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
        <p style={{ fontSize: "20px", margin: "auto" }}>나의 인증샷 모아보기</p>
        <div></div>
      </div>
    </div>
  );
}

function MyShotZip() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const photoList = user.photos;
  // console.log(photoList);
  const getPhotoList = () => {
    const photoItems = [];
    for (let index = 0; index < photoList.length; index++) {
      photoItems.push(
        <img
          style={{ width: "120px", height: "120px" }}
          key={index}
          src={photoList[index]}
          alt="sample"
          onClick={() => {
            goPhotoDetail(index);
          }}
        />
      );
    }
    return photoItems;
  };

  const goPhotoDetail = (index) => {
    // console.log("index", index);
    navigate(`/my-shot-detail/${index}`);
  };

  return (
    <div className={styles.MyShotZip}>
      <Header></Header>
      <div className={styles.PhotoList}>{getPhotoList()}</div>
    </div>
  );
}

export default MyShotZip;
