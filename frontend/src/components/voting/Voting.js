import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Voting.module.css"
import test from "../../img/test-back.jpg"
import { useState } from "react";
import styled, { keyframes } from 'styled-components';


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

function Description(){
    return (
        <div className={styles.desBox}>
            <span>이럴 때 인증 실패입니다!</span>
            <div style={{marginTop:'4px'}}>
                <p>☝ 인증샷이 해당 챌린지와 연관이 없을 때</p>
                <p>☝ 해당 인증샷이 불쾌감을 줄 때</p>
                <p>☝ 해당 인증샷이 인증의 기능을 하지 못할 때</p>
            </div>
        </div>
    )
}

function VoteImg(){
    // url에서 id, prop으로 이미지 받아와서 이미지 넣어야 됨
    return(
        <div className={styles.voteImg}>
            <img src={test} alt="" />
        </div>
    )
}

function Vote(){
    const [voteState, setVoteState] = useState(false);
    const [pass, setPass] = useState(23);
    const [fail, setFail] = useState(10);
    const voted = (myVote) => {
        // 투표한걸로 상태 바꾸고 투표 퍼센테이지 다시 계산 로직
        setVoteState(true);
        if (myVote === 1){
            // 찬성 +1
            console.log('pass');
        } else {
            // 반대 +1
            console.log('fail');
        }
    }
    // 투표 안 한 상태
    if (voteState === false) {
        return(
            <div className={styles.prevoteBox}>
                <button className={styles.pass} onClick={()=>{voted(1)}}>👍 PASS</button>
                <button className={styles.fail} onClick={()=>{voted(2);}}>👎 FAIL</button>
            </div>
        )
    } else { // 투표 했으면
        return (
          <div className={styles.votedBox}>
            <div className={styles.passBox}>
              <span>👍 PASS</span>
              <Container>
                <Progress width={(pass * 100) / (pass + fail) + "%"} />
              </Container>
            </div>
            <div className={styles.failBox}>
              <span>👎 FAIL</span>
              <Container>
                <Progress width={(fail * 100) / (pass + fail) + "%"} />
              </Container>
            </div>
          </div>
        );
    }
}

function Voting(){
    return(
        <div>
            <Header></Header>
            <Description></Description>
            <VoteImg></VoteImg>
            <Vote></Vote>


        </div>
    )
}

export default Voting;

const Container = styled.div`
  margin: 16px auto;
  background-color: #e5e1ff;
  width: 240px;
  height: 12px;
  display: flex;
  align-items: center;
  border-radius: 7px;
`;
const ani = keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: width;
    }
`;
const Progress = styled.div`
  background-color: #755fff;
  width: ${(props) => props.width};
  height: 100%;
  transition: width 1s;
  border-radius: 7px;
  animation: ${ani} 1s ;
`;

