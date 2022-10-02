import React,{useState} from "react";
import styles from'./Nav.module.css';
import Logo from "../img/logo-color.png";
import Plus from "../img/plus-front-gradient.png"
import { useNavigate } from "react-router-dom";

function Modal({onClose}){
  const navigate = useNavigate();
  function handleClose(){
    onClose ?.();
  };
  return (
    <div className={styles.Modal} onClick={handleClose}>
      <div className={styles.ModalBody} onClick={(e)=>e.stopPropagation()}>
        <div>
          <svg className={styles.modalCloseBtn} onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="#E5E5E5"/>
            <path d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z" fill="#4F4F4F"/>
          </svg>
        </div>
        <p className={styles.ModalTitle}>챌린지 개설하기</p>
        <div style={{position:'absolute',left:'36px',top:'88px'}}>
          <p className={styles.ModalText}>☝ 생성된 챌린지는 삭제할 수 없습니다.</p>
          <p className={styles.ModalText}>☝ 생성된 챌린지의 설정은 수정할 수 없습니다.</p>
          <p className={styles.ModalText} style={{marginTop:'28px'}}>위 주의사항을 확인 후 챌린지를 개설해주세요!</p>
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.NextButton} onClick={() => {
            navigate("/create-challenge");
          }}>GO !</button>
        </div>
      </div>
    </div>
  )
}

function Nav(){
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
}
  return(
      <div className={styles.Navbar}>
        <img className={styles.LogoImg} src={Logo} alt="logo"/>
        <img onClick={showModal} className={styles.Plus} src={Plus} alt=""/>
        {openModal && (<Modal 
          open={openModal} 
          onClose={()=>{setOpenModal(false);}}/>)}
      </div>
  );
};

export default Nav;