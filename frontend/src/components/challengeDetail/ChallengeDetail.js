import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChallengeDetail.module.css"
import back from "../../img/test-back.jpg"
import profile from "../../img/profile-basic.png"

function ChallengeDetail() {
    const navigate= useNavigate();
    return (
      <div>
        <div className={styles.header}>
          <div className={styles.icons} onClick={()=> navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </div>
          <div className={styles.icons}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
              />
              <path
                fill-rule="evenodd"
                d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"
              />
            </svg>
          </div>
        </div>
        <img className={styles.backImg} src={back} alt="challegePhoto" />
        <div className={styles.titles}>
            <div className={styles.user}>
                <img style={{margin:'4px', width:'16px', height:'16px', borderRadius:'20px'}} src={profile} alt="" />
                <span style={{fontSize:'16px'}}>커다란 솜사탕</span>
            </div>
            <div className={styles.title}>
                
            </div>
        </div>
      </div>
    );
}

export default ChallengeDetail;