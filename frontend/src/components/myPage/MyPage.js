import { React, useEffect, useState } from "react";
import "./MyPage.css";
import UserAPI from "../../api/UserAPI";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import tick from "../../img/tick.png"
import picture from "../../img/picture.png"
import folder from "../../img/folder.png"
import bookmark from "../../img/bookmark.png"

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(selectUser));
  const fileImage = user.picURL;

  useEffect(() => {
    UserAPI.mypage(user.email).then((response) => {
      console.log("response", response);
      dispatch(setUserInfo(response.data.body));
      setUser(response.data.body);
    });
  }, [user.email, dispatch]);

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
            <p>0</p>
            <span>진행중</span>
          </div>
          <div>
            <p>0</p>
            <span>완료</span>
          </div>
          <div>
            <p>0</p>
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
