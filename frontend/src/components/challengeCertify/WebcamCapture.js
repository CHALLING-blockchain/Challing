import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./ChallengeCertify.module.css";
import UserAPI from "../../api/UserAPI";
import ContractAPI from "../../api/ContractAPI";
import { uploadImageFile } from "../../plugins/s3upload";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import moment from "moment";
import useWeb3 from "../../hooks/useWeb3";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_USER,
};

function WebcamCapture() {
  const [exist, setExist] = useState(localStorage.getItem("myAccount"));
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState("");
  // get active account and balance data from useWeb3 hook
  const {
    connect,
    disconnect,
    provider,
    account: activeAccount,
  } = useWeb3(setIsLoading, setErrorMessage, exist, setExist);
  const Contract = new ContractAPI(activeAccount);
  const navigate = useNavigate();

  function Header() {
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
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={styles.bi}
            viewBox="0 0 16 16"
          >
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path
              fillRule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
        </div>
      </div>
    );
  }

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const handleClick = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [s3File, setS3File] = useState();
  // 사진찍을때
  async function handleCapture() {
    let URL = webcamRef.current.getScreenshot();
    const blobBin = atob(URL.split(",")[1]); // base64 데이터 디코딩
    const array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }

    const file = new Blob([new Uint8Array(array)], { type: "image/jpg" });
    setS3File(file);
    // const url=await uploadImageFile(file);
    // setImgSrc(url);
  }
  async function authenticate() {
    const url = await uploadImageFile(s3File);
    setImgSrc(url);
    if (activeAccount !== undefined && activeAccount !== "") {
      await Contract.authenticate(challengeId, user.id, today, url);
      // navigate(`/certify-loading/${id}`);
    }
  }
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const challengeId = useLocation().state.challengeId;
  const today = moment(new Date()).format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(selectUser));
  useEffect(() => {
    UserAPI.mypage(user.email).then((response) => {
      dispatch(setUserInfo(response.data.body));
      setUser(response.data.body);
    });
  }, [user.email, dispatch]);

  return (
    <div>
      {/* {console.log(user.id,challengeId,today,imgSrc)} */}
      {imgSrc === null ? (
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
              facingMode,
            }}
          />
          <div className={styles.Shot}>
            <svg
              onClick={() => {
                handleCapture();
                capture();
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={styles.ShotIcon}
              viewBox="0 0 16 16"
            >
              <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
            </svg>
          </div>
        </div>
      ) : null}
      {imgSrc !== null ? (
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
          <img src={imgSrc} alt="shot" />
          <div className={styles.btnBox}>
            <button
              onClick={() => {
                authenticate();
              }}
              className={styles.ShotBtn}
            >
              인증하기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default WebcamCapture;
