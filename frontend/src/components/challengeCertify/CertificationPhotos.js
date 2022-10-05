import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CertificationPhotos.module.css";
import camera from "../../img/camera.png";
import megaphone from "../../img/megaphone.png";
import ContractAPI from "../../api/ContractAPI";
import useWeb3 from "../../hooks/useWeb3";
import { selectUser } from "../../app/redux/userSlice";
import { useSelector } from "react-redux";
import UserAPI from "../../api/UserAPI";
import ScheduleAPI from "../../api/ScheduleAPI";
import moment from "moment";

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
  );
}

function Title() {
  const title = useLocation().state.title;
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
      <label className={styles.tabItem} htmlFor="gather" onClick={handleClick1}>
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
      <label
        className={styles.tabItem}
        htmlFor="seperately"
        onClick={handleClick2}
      >
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
          return <img key={photo.id} src={photo.picURL} alt="" />;
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
  const navigate = useNavigate();
  const [exist, setExist] = useState(localStorage.getItem("myAccount"));
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState("");

  // get active account and balance data from useWeb3 hook
  const { account: activeAccount } = useWeb3(
    setIsLoading,
    setErrorMessage,
    exist,
    setExist
  );

  function handleClose() {
    onClose?.();
  }
  async function report() {
    if (activeAccount !== undefined && activeAccount !== "") {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const Contract = new ContractAPI(activeAccount);
      // console.log(challengeId, photoId, userId);
      const voteId = await Contract.report(challengeId, photoId, userId);
      const challengerInfo = await Contract.findingChallenger(
        challengeId,
        userId
      );

      const body = {
        voteId: voteId,
        challengeId: challengeId,
        userId: userId,
        challengerId: challengerInfo[0],
        userIdIndex: challengerInfo[1],
        challengeIdIndex: challengerInfo[2],
        triggerAt: tomorrow.getTime(),
        photoId:photoId
      };

      await ScheduleAPI.vote(body);
      handleClose();
      navigate(`/votinghome/${challengeId}`);
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

function checkReport(photo) {
  if (photo.report) {
    alert("신고 접수된 인증샷 입니다.");
    return false;
  } else return true;
}

function Separately() {
  // for 문 돌려서
  const [openModal, setOpenModal] = useState(false);
  const photoList = useLocation().state.photoList;
  const [photoId, setPhotoId] = useState();
  const [userList, setUserList] = useState([]);
  const showModal = () => {
    setOpenModal(true);
  };
  var today = new Date();
  const yesterday = moment(new Date(today.setDate(today.getDate() - 1)))
    .format()
    .substring(0, 19);
  today = moment(new Date()).format().substring(0, 19);

  useEffect(() => {
    const getNickname = async () => {
      let users = [];
      for (let i = 0; i < photoList.length; i++) {
        await UserAPI.getUserById(photoList[i].userId).then((response) => {
          users.push(response.data.body);
        });
      }
      setUserList([...users]);
    };
    getNickname();
  }, []);

  return (
    <div className={styles.scroll}>
      {photoList.map((photo, index) => {
        if (userList.length !== 0) {
          return (
            <div key={photo.id} className={styles.separately}>
              <div className={styles.userBox}>
                <div className={styles.user}>
                  <img src={userList[index].picURL} alt="" />
                  <span>{userList[index].nickname}</span>
                </div>
                <div className={styles.report}>
                  {photo.timestamp > yesterday && photo.timestamp < today ? (
                    <img
                      src={megaphone}
                      alt=""
                      onClick={() => {
                        if (checkReport(photoList[index])) {
                          showModal();
                          setPhotoId(photo.id);
                        }
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={styles.shotBox}>
                <img src={photo.picURL} alt="" />
              </div>
            </div>
          );
        }
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
