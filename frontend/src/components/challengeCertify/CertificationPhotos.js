import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CertificationPhotos.module.css";
import camera from "../../img/camera.png";
import megaphone from "../../img/megaphone.png";
import testphoto from "../../img/test-back.jpg";
import profile from "../../img/profile-basic.png";
import ContractAPI from "../../api/ContractAPI";
import useWeb3 from "../../hooks/useWeb3";
import { selectUser } from "../../app/redux/userSlice";
import { useSelector } from "react-redux";
import UserAPI from "../../api/UserAPI";
function Header() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
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

function Title() {
  const [title, setTitle] = useState("영어, 외국어 10문장 쓰기");
  return (
    <div className={styles.titleBox}>
      <span>
        <span style={{ color: "#755FFF" }}>{title}</span> 의 인증샷
      </span>
      <img src={camera} alt="" />
    </div>
  );
}

function Tabs() {
  const [state, setState] = useState("gather");
  const handleClickBtn = (e) => {
    setState(e.target.value);
  };
  const gatherInput = useRef();
  const handleClick1 = () => {
    gatherInput.current.click();
  };
  const sepaInput = useRef();
  const handleClick2 = () => {
    sepaInput.current.click();
  };

  return (
    <div className={styles.tabs}>
      <input
        type="radio"
        id={styles.gather}
        name="tab_item"
        value="gather"
        checked={state === "gather"}
        onChange={handleClickBtn}
        ref={gatherInput}
      />
      <label className={styles.tabItem} for="gather" onClick={handleClick1}>
        모아보기
      </label>
      <input
        type="radio"
        id={styles.separately}
        name="tab_item"
        value="separately"
        checked={state === "separately"}
        onChange={handleClickBtn}
        ref={sepaInput}
      />
      <label className={styles.tabItem} for="seperately" onClick={handleClick2}>
        따로보기
      </label>

      <div id={styles.gather_content} className={styles.content}>
        <Gather></Gather>
      </div>
      <div id={styles.separately_content} className={styles.content}>
        <Separately></Separately>
      </div>
    </div>
  );
}

function Gather() {
  const photoList = useLocation().state.photoList;
  // const [img, setImg] = useState(testphoto);
  // const [id, setId] = useState(1);
  // const [modalOpen, setModalOpen] = useState(false);
  // const showModal = (img, id) => {
  //     setImg(img);
  //     setId(id);
  //     setModalOpen(true);
  // }
  return (
    <div className={styles.scroll}>
      <div className={styles.gather}>
        {photoList.map((photo) => {
          return <img src={photo.picURL} alt="" />;
        })}
        {/* {modalOpen && <GatherModal setModalOpen={setModalOpen} />} */}
      </div>
    </div>
  );
}

// function GatherModal(setModalOpen){
//     const closeModal = () =>{
//         setModalOpen(false)
//     }
//     return(
//         <div className={styles.modal}>
//             <button className={styles.close} onClick={closeModal}>X</button>
//             <img src={testphoto} alt="" />
//         </div>
//     )
// }

function Modal({ onClose, photoId }) {
  const challengeId = useLocation().state.challengeId;
  const userId = useSelector(selectUser).id;

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

  function handleClose() {
    onClose?.();
  }
  function report() {
    if (activeAccount !== undefined && activeAccount !== "") {
      const Contract = new ContractAPI(activeAccount);
      // console.log(challengeId, photoId, userId);
      Contract.report(challengeId, photoId, userId);
    }
  }
  return (
    <div className={styles.Modal} onClick={handleClose}>
      <div className={styles.ModalBody} onClick={(e) => e.stopPropagation()}>
        <div>
          <svg
            className={styles.modalCloseBtn}
            onClick={handleClose}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#E5E5E5" />
            <path
              d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z"
              fill="#4F4F4F"
            />
          </svg>
        </div>
        <p className={styles.ModalTitle}>신고하기</p>
        <div style={{ position: "absolute", left: "28px", top: "76px" }}>
          <p className={styles.ModalText}>
            ☝ 인증샷이 해당 챌린지와 연관이 없을 때
          </p>
          <p className={styles.ModalText}>☝ 해당 인증샷이 불쾌감을 줄 때</p>
          <p className={styles.ModalText}>
            ☝ 해당 인증샷이 인증의 기능을 못할 때
          </p>
          <br />
          <p className={styles.ModalText}>
            ❗ 해당 인증샷이 위와 같을 경우 신고하기 기능을 <br />
            <span style={{ paddingLeft: "10px" }} />
            이용할 수 있습니다.
          </p>
          <p className={styles.ModalText}>
            ❗ 신고를 할 경우 해당 챌린지의 챌린저들이 투표를 <br />
            <span style={{ paddingLeft: "10px" }} />
            통해 성공여부를 판단하게 됩니다.
          </p>
          <p className={styles.ModalText}>
            ❗ 투표결과와 본인의 선택이 같을 시 패스코인이 <br />
            <span style={{ paddingLeft: "10px" }} />
            발급됩니다.
          </p>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.NextButton} onClick={report}>
            🚨 인증샷 신고하기
          </button>
        </div>
      </div>
    </div>
  );
}

function Separately() {
  // for 문 돌려서
  const [userimg, setUserimg] = useState(profile);
  const [user, setUser] = useState("커다란 솜사탕");
  const [openModal, setOpenModal] = useState(false);
  const photoList = useLocation().state.photoList;
  console.log("Separately::photoList", photoList);
  const [photoId, setPhotoId] = useState();
  const showModal = () => {
    setOpenModal(true);
  };
  // const nicknameList = [];
  // useEffect(() => {
  //   const getNickname = async () => {
  //     for (let i = 0; i < photoList.length; i++) {
  //       await UserAPI.getUserById(photoList[i].userId).then((response) => {
  //         console.log("user response", response);
  //       });
  //     }
  //   };
  //   getNickname();
  // });

  return (
    <div className={styles.scroll}>
      {photoList.map((photo) => {
        return (
          <div className={styles.separately}>
            <div className={styles.userBox}>
              <div className={styles.user}>
                <img src={userimg} alt="" />
                <span>{user}</span>
              </div>
              <div className={styles.report}>
                <img
                  src={megaphone}
                  alt=""
                  onClick={() => {
                    showModal();
                    setPhotoId(photo.id);
                  }}
                />
              </div>
            </div>
            <div className={styles.shotBox}>
              <img src={photo.picURL} alt="" />
            </div>
          </div>
        );
      })}
      {openModal && (
        <Modal
          photoId={photoId}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
}

function CertificationPhotos() {
  return (
    <div>
      <Header></Header>
      <Title></Title>
      <Tabs></Tabs>
    </div>
  );
}

export default CertificationPhotos;
