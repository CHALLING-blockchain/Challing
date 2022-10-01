import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import styles from "./Voting.module.css"
import { useState } from "react";
import styled, { keyframes } from 'styled-components';
import ContractAPI from "../../api/ContractAPI";
import useWeb3 from "../../hooks/useWeb3";
import { selectUser } from "../../app/redux/userSlice";
import { useSelector } from "react-redux";
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
    const vote=useLocation().state.vote;
    return(
        <div className={styles.voteImg}>
            <img src={vote.photo.picURL} alt="" />
        </div>
    )
}

function Vote(){
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

    const vote=useLocation().state.vote;
    const votedUsers = vote.userIdList;
    const [voteState, setVoteState] = useState(false);
    const [pass, setPass] = useState(Number(vote.pass));
    const [fail, setFail] = useState(Number(vote.fail));
    let userId = useSelector(selectUser).id;
    if (activeAccount !== undefined && activeAccount !== "") {
      const Contract=new ContractAPI(activeAccount)
      const voted = (myVote) => {
        // 투표한걸로 상태 바꾸고 투표 퍼센테이지 다시 계산 로직
        setVoteState(true);
        if (myVote ){
            // 찬성 +1
            setPass(pass+1)
            console.log('pass');
        } else {
            // 반대 +1
            setFail(fail+1)
            console.log('fail');
        }
        Contract.voting(vote.challengeId, userId, vote.id, myVote)
      }
      // 투표 한 유저거나 방금 
      if  ((voteState == true) || votedUsers.includes(userId.toString())){
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
      } else{
        return(
            <div className={styles.prevoteBox}>
                <button className={styles.pass} onClick={()=>{voted(true)}}>👍 PASS</button>
                <button className={styles.fail} onClick={()=>{voted(false);}}>👎 FAIL</button>
            </div>
        )

      }

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

