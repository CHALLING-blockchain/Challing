import { React, useEffect, useState } from "react";
import "./MyPage.css";
import UserAPI from "../../api/UserAPI";
import Web3 from "web3";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import tick from "../../img/tick.png";
import picture from "../../img/picture.png";
import folder from "../../img/folder.png";
import bookmark from "../../img/bookmark.png";
import ContractAPI from "../../api/ContractAPI";

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(selectUser));
  const fileImage = user.picURL;
  const web3 = new Web3(window.ethereum);
  const Contract = new ContractAPI();
  const [ingChal, setIngChal] = useState(0);
  const [edChal, setEdChal] = useState(0);
  const [madeChal, setMadeChal] = useState(0);
  useEffect(() => {
    UserAPI.mypage(user.email).then((response) => {
      dispatch(setUserInfo(response.data.body));
      setUser(response.data.body);
    });
  }, [user.email, dispatch]);
  useEffect(() => {
    async function load() {
      await Contract.getMyChallenge(user.id).then((result) => {
        const join = result[1];
        let ingCount = 0;
        let edCount = 0;
        if (join.length !== 0) {
          for (let i = 0; i < join.length(); i++) {
            if (join[i].complete === true) {
              edCount += 1;
            } else {
              ingCount += 1;
            }
          }
        }
        setEdChal(edCount);
        setIngChal(ingCount);
        setMadeChal(result[0].length);
      });
    }
    load();
  }, [user.id]);

  return (
    <div>
      <h2 className="MyPageHeader">마이페이지</h2>
      <div
        className="UserProfile"
        onClick={() => {
          navigate("/my-profile");
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ width: "44px", height: "44px", borderRadius: "100px" }}
            src={fileImage}
            alt="sample"
          />
          <p style={{ fontSize: "18px" }}>{user.nickname}</p>
        </div>
        <Link to="/my-profile">
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L1 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="StatusBox">
        <div className="ChallengeStatus">
          <img
            style={{ width: "20px", height: "24px", marginRight: "8px" }}
            src={tick}
            alt=""
          />
          <p>챌린지 현황</p>
        </div>
        <div className="ChallengeStatusBar">
          <div>
            <p>{ingChal}</p>
            <span>진행중</span>
          </div>
          <div>
            <p>{edChal}</p>
            <span>완료</span>
          </div>
          <div>
            <p>{madeChal}</p>
            <span>개설</span>
          </div>
        </div>
      </div>
      <div className="MenuListBox">
        <div
          className="menuItem"
          onClick={() => {
            navigate("/my-shot-zip");
          }}
        >
          <div className="menuTitle">
            <img src={picture} alt="" />
            <p>나의 인증샷 모아보기</p>
          </div>

          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L1 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="menuItem"
          onClick={() => {
            navigate("/create-challenge");
          }}
        >
          <div className="menuTitle">
            <img src={folder} alt="" />
            <p>챌린지 개설하기</p>
          </div>

          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L1 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="menuItem"
          onClick={() => {
            navigate("/my-favorite-zip");
          }}
        >
          <div className="menuTitle">
            <img src={bookmark} alt="" />
            <p>챌린지 즐겨찾기</p>
          </div>

          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L1 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
