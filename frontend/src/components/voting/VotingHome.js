import React, { useEffect, useState } from "react";
import styles from "./VotingHome.module.css";
import { useNavigate, useParams } from "react-router-dom";
import pass from "../../img/passBubble.png";
import fail from "../../img/failBubble.png";
import ContractAPI from "../../api/ContractAPI";

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
        <p style={{ fontSize: "20px", margin: "auto" }}>투표</p>
        <div></div>
      </div>
    </div>
  );
}

function Shots({ voteList }) {
  const navigate = useNavigate();
  const moveDetail = (vote) => {
    navigate(`/voting/${vote.id}`, {
      state: { vote },
    });
  };
  return (
    <div>
      {voteList.length === 0 ? (
        <NoVoting></NoVoting>
      ) : (
        <div className={styles.shots}>
          {voteList.map((vote) => {
            return (
              <img
                key={vote.id}
                className={styles.voteImgs}
                onClick={() => moveDetail(vote)}
                src={vote.photo.picURL}
                alt=""
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function NoVoting() {
  return (
    <div className={styles.noVoting}>
      <div className={styles.votebubbles}>
        <img className={styles.passbubble} src={pass} alt="" />
        <img className={styles.failbubble} src={fail} alt="" />
      </div>

      <div className={styles.bookText}>
        <p>진행중인 투표가 없습니다.</p>
      </div>
    </div>
  );
}

function VotingHome() {
  const { id } = useParams();
  const [voteList, setVoteList] = useState([]);
  
  const Contract = new ContractAPI();

  useEffect(() => {
    async function load() {
      const vote = await Contract.getChallengeVote(id);
      setVoteList(vote);
    }
    load();
  },[]);

  return (
    <div>
      <Header></Header>
      <Shots voteList={voteList}></Shots>
    </div>
  );
}

export default VotingHome;
