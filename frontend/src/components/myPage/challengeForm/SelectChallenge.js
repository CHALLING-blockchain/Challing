import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './challengeForm.module.css';
import donationIcon from '../../../img/donation-challenge-hand.png'
import dailyIcon from '../../../img/daily-challenge-hand.png'

function Header(){
  return (
    <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
      <div className={styles.header}>
        <Link to="/my-page">
          <svg
            style={{ margin: "16px" }}
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
        </Link>
        <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 개설하기</p>
        <div></div>
      </div>
    </div>
  );
}

function SelectChallenge({formCnt,setFormCnt,value,setValue}){
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  }
function Modal({onClose}){
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
        <p className={styles.ModalTitle}>기부 챌린지</p>
        <div style={{position:'absolute',left:'36px',top:'72px'}}>
          <p className={styles.ModalText} style={{marginBottom:'16px'}}>기부챌린지의 성공여부 판단은 다음과 같습니다.</p>
          <p className={styles.ModalText}>☝ 참여 챌린저들은 80% 이상 인증 시 성공으로<br/><span style={{paddingRight:'16px'}}/>판단합니다.</p>
          <p className={styles.ModalText}>☝ 전체 참가자의 80%가 챌린지 성공 시 해당<br/><span style={{paddingRight:'16px'}}/>
                                             챌린지를 성공으로 판단하여 기부금이 전달됩니<br/><span style={{paddingRight:'16px'}}/>다. </p>
          <p className={styles.ModalText}>☝ 챌린지 성공 시 전액이 기부됩니다.</p>
          <p className={styles.ModalText}>☝ 챌린지 실패 시 기부금은 환급됩니다.</p>        
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.MdNextButton} onClick={() => {
            setFormCnt(formCnt+1)
          }}>GO !</button>
        </div>
      </div>
    </div>
  )
}
  return (
    <div>
      <Header/>
      <div style={{padding:'16px'}}>
        <p className={styles.FormHeader}>어떤 형태의 챌린지인가요?</p>
        <div className={styles.SelectChallenge} value={value} onClick={()=>{
          setValue('기부챌린지');
          showModal();
          }
          }>
          <img src={donationIcon} alt="donationIcon" style={{width:'120px'}}/>
          <p>기부 챌린지</p>
        </div>
        <div className={styles.SelectChallenge} onClick={()=>{
          setValue('일상챌린지')
          setFormCnt(formCnt+1)
          }}>
          <p>일상챌린지</p>
          <img src={dailyIcon} alt="dailyIcon" style={{height:'120px'}}/>
        </div>
      </div>
      {openModal && (<Modal 
          open={openModal} 
          onClose={()=>{setOpenModal(false);}}/>)}
    </div>
  );
};

export default SelectChallenge;