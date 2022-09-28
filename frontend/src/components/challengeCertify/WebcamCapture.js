import React,{useRef,useState,useCallback} from "react";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ChallengeCertify.module.css"
import {uploadImageFile} from '../../plugins/s3upload';
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_USER
};

function WebcamCapture() {

  function Header(){
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
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 인증</p>
          <svg onClick={handleClick}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.bi} viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
          </svg>
        </div>
      </div>
    );
  }

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const handleClick = useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);

  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user"
  };

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] =useState(null);

  function handleCapture(){
    let URL = webcamRef.current.getScreenshot();
    var blobBin = atob(URL.split(',')[1]);	// base64 데이터 디코딩
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], {type: 'image/jpg'});
    uploadImageFile(file);
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      {imgSrc === null ? 
        <div>
          <Header></Header>
          <Webcam
            width={360}
            height={360}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
          />
          <div className={styles.Shot}>
            <svg
              onClick={()=>{handleCapture();capture();}} 
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.ShotIcon} viewBox="0 0 16 16">
              <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
            </svg>
          </div>
        </div>
      : null}
      {imgSrc !== null ? 
        <div>
          <div style={{ display: "fixed", top: "0" }}>
            <div className={styles.header}>
              <svg
                style={{ margin: "auto" }}
                onClick={() => setImgSrc(null)}
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
              <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 인증</p>
              <div></div>
            </div>
          </div>
            <img src={imgSrc} alt="shot"/>
            <div className={styles.btnBox}>
              <button className={styles.ShotBtn}>인증하기</button>
            </div>
        </div>
      : null}
    </div>
  );
};
export default WebcamCapture;