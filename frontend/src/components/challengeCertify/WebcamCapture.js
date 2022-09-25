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
          <svg 
            onClick={handleClick}
            style={{ margin: "auto" }}
            width="16" 
            height="16" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M83.3334 16.6666H70.125L64.9584 11.0416C63.4167 9.33325 61.1667 8.33325 58.8334 8.33325H41.1667C38.8334 8.33325 36.5834 9.33325 35 11.0416L29.875 16.6666H16.6667C12.0834 16.6666 8.33337 20.4166 8.33337 24.9999V74.9999C8.33337 79.5832 12.0834 83.3332 16.6667 83.3332H83.3334C87.9167 83.3332 91.6667 79.5832 91.6667 74.9999V24.9999C91.6667 20.4166 87.9167 16.6666 83.3334 16.6666ZM62.5 64.5832V54.1666H37.5V64.5832L24.375 51.4583C23.5417 50.6249 23.5417 49.3333 24.375 48.4999L37.5 35.4166V45.8333H62.5V35.4166L75.625 48.5416C76.4584 49.3749 76.4584 50.6666 75.625 51.4999L62.5 64.5832Z" fill="black"/>
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
          <svg 
            onClick={()=>{handleCapture();capture();}}
            width="100" 
            height="100" 
            viewBox="0 0 241 240" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M120.236 227.846C179.83 227.846 228.14 179.535 228.14 119.941C228.14 60.3475 179.83 12.0371 120.236 12.0371C60.6422 12.0371 12.3318 60.3475 12.3318 119.941C12.3318 179.535 60.6422 227.846 120.236 227.846Z" stroke="black" strokeWidth="23.9787"/>
          </svg>
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
              <button className={styles.btn}>인증하기</button>
            </div>
        </div>
      : null}
    </div>
  );
};
export default WebcamCapture;