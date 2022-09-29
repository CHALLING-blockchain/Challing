import React from "react";
import styles from './VotingHome.module.css'
import { useNavigate,useLocation } from "react-router-dom";
import test from "../../img/test-back.jpg"

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
        <p style={{ fontSize: "20px", margin: "auto" }}>투표</p>
        <div></div>
      </div>
    </div>
  );
}

function Shots({voteList}){
  console.log(voteList)
  const moveDetail = () => {
    console.log('디테일 페이지로 이동')
  }
  return(
    <div className={styles.shots}>
      {
        voteList.map(vote=>{
          return (
            <img onClick={moveDetail} src={vote.photo.picURL} alt="" />
          )
        })
      }
      
    </div>
  )
}

function VotingHome() {
  const voteList = useLocation().state.voteList;
  return <div>
    <Header></Header>
    <Shots voteList={voteList}></Shots>


  </div>;
}

export default VotingHome;
