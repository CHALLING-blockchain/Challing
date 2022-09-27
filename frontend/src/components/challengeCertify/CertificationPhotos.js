import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CertificationPhotos.module.css"
import camera from "../../img/camera.png"
import megaphone from "../../img/megaphone.png"
import testphoto from "../../img/test-back.jpg"
import profile from "../../img/profile-basic.png"

function Header() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "sticky", top: "0px", backgroundColor:'white' }}>
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

function Tabs(){
    const [state, setState] = useState('gather');
    const handleClickBtn = (e) => {
        setState(e.target.value)
    }
    const gatherInput = useRef();
    const handleClick1 = () => {
        gatherInput.current.click();
    }
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
        <label
          className={styles.tabItem}
          for="seperately"
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

function Gather(){
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
          <img src={testphoto} alt="" />
          <img src={testphoto} alt="" />
          <img src={testphoto} alt="" />
          <img src={testphoto} alt="" />
          <img src={testphoto} alt="" />
          <img src={testphoto} alt="" />
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

function Separately(){
    // for 문 돌려서
    const [userimg, setUserimg] = useState(profile);
    const [user, setUser] = useState('커다란 솜사탕');
    const [openModal, setOpenModal] = useState(false);
    const showModal = () => {
        console.log('modal 열려야돼')
        setOpenModal(true);
    }
    return (
      <div className={styles.scroll}>
        <div className={styles.separately}>
          <div className={styles.userBox}>
            <div className={styles.user}>
              <img src={userimg} alt="" />
              <span>{user}</span>
            </div>
            <div className={styles.report}>
              <img src={megaphone} alt="" onClick={showModal} />
            </div>
          </div>
          <div className={styles.shotBox}>
            <img src={testphoto} alt="" />
          </div>
        </div>

        <div className={styles.separately}>
          <div className={styles.userBox}>
            <div className={styles.user}>
              <img src={userimg} alt="" />
              <span>{user}</span>
            </div>
            <div className={styles.report}>
              <img src={megaphone} alt="" onClick={showModal} />
            </div>
          </div>
          <div className={styles.shotBox}>
            <img src={testphoto} alt="" />
          </div>
        </div>
        
      </div>
    );
}



function CertificationPhotos(){
    return (
      <div>
        <Header></Header>
        <Title></Title>
        <Tabs></Tabs>
      </div>
    );
}

export default CertificationPhotos;