import { Link } from 'react-router-dom';
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
  return (
    <div>
      <Header/>
      <div style={{padding:'16px'}}>
        <p className={styles.FormHeader}>어떤 형태의 챌린지인가요?</p>
        <div className={styles.SelectChallenge} value={value} onClick={()=>{
          setValue('기부챌린지')
          setFormCnt(formCnt+1)
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
    </div>
  );
};

export default SelectChallenge;