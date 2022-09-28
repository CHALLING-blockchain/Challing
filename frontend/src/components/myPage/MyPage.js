import { React, useEffect, useState } from "react";
import "./MyPage.css";
import UserAPI from "../../api/UserAPI";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";

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
        <img
          style={{ width: "40px", height: "40px", borderRadius: "100px" }}
          src={fileImage}
          alt="sample"
        />
        <p>{user.nickname}</p>
        <Link to="/my-profile">
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L8 8L1 15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="ChallengeStatus">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.10746 2.81453C3.60853 2.81453 4.01473 2.40834 4.01473 1.90727C4.01473 1.4062 3.60853 1 3.10746 1C2.60639 1 2.2002 1.4062 2.2002 1.90727C2.2002 2.40834 2.60639 2.81453 3.10746 2.81453Z"
            fill="#BABDFF"
          />
          <path
            d="M3.01566 4.7775C3.01566 4.7775 3.10754 5.89888 4.0148 7.512C4.08862 7.64341 4.47799 8.35389 4.47799 8.35389L2.51213 11.5563L2.43652 16.9999H3.47196L4.02424 12.4636L5.83877 10.649L7.6533 9.13692V7.92723L5.83877 4.60059"
            fill="#BABDFF"
          />
          <path
            d="M7.65322 8.83472L9.77018 11.8589L12.8449 13.6735L12.5425 14.5807L8.86291 13.0686L6.14111 10.6492"
            fill="#BABDFF"
          />
          <path
            d="M5.83873 4.60076C5.23388 3.39107 4.52035 3.32064 4.01476 3.51718C3.86262 3.58643 3.72601 3.68567 3.61313 3.80897C3.50025 3.93226 3.41341 4.07707 3.35782 4.23471C3.30223 4.39236 3.27902 4.5596 3.2896 4.72643C3.30017 4.89326 3.3443 5.05624 3.41935 5.2056"
            fill="#BABDFF"
          />
          <path
            d="M3.10746 2.81453C3.60853 2.81453 4.01473 2.40834 4.01473 1.90727C4.01473 1.4062 3.60853 1 3.10746 1C2.60639 1 2.2002 1.4062 2.2002 1.90727C2.2002 2.40834 2.60639 2.81453 3.10746 2.81453Z"
            stroke="#BABDFF"
            strokeMiterlimit="10"
          />
          <path
            d="M7.65322 8.83472L9.42345 11.3634C9.66254 11.6806 9.9564 11.9525 10.2912 12.1664L12.3239 13.366C12.4586 13.437 12.567 13.5491 12.6335 13.686C12.7 13.8229 12.7211 13.9774 12.6937 14.1271C12.6634 14.19 12.6205 14.246 12.5677 14.2917C12.5149 14.3374 12.4534 14.3718 12.3868 14.3928C12.3202 14.4137 12.25 14.4208 12.1805 14.4136C12.1111 14.4064 12.0439 14.3851 11.983 14.3509L9.42239 13.2985C9.0573 13.1363 8.7168 12.9236 8.41088 12.6667L6.14111 10.6492"
            stroke="#BABDFF"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.35205 7.50013C4.35205 7.50013 4.43068 7.67968 4.52628 7.89933C4.62532 8.24894 4.5873 8.62316 4.41998 8.94571L2.83701 11.0458C2.64034 11.3865 2.52625 11.7685 2.50389 12.1612L2.4448 16.3951C2.43852 16.4683 2.44671 16.542 2.46892 16.612C2.49113 16.682 2.52691 16.747 2.57422 16.8031C2.62153 16.8593 2.67944 16.9056 2.74465 16.9394C2.80986 16.9731 2.88109 16.9937 2.95426 17C3.10745 16.9849 3.25049 16.9165 3.35847 16.8068C3.46645 16.6971 3.53254 16.553 3.54522 16.3996L3.95101 13.0641C4.01724 12.6809 4.19095 12.3243 4.45191 12.036L5.41113 11.0768C5.64624 10.8417 6.04788 10.475 6.30328 10.2619L7.18877 9.52412C7.46555 9.26561 7.63195 8.9103 7.65332 8.53218C7.72261 7.92996 6.76266 6.78312 6.60319 6.49101L5.84057 4.59863"
            stroke="#BABDFF"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.8187 4.53992C5.35554 3.31208 4.52037 3.32064 4.01478 3.51719C3.78894 3.61102 3.59829 3.77344 3.46974 3.98149C3.3412 4.18954 3.28127 4.43271 3.2984 4.67667"
            stroke="#BABDFF"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.30774 4.60059L3.87863 6.13601C3.82617 6.29908 3.72508 6.44219 3.58893 6.54614C3.45277 6.65009 3.28808 6.7099 3.11695 6.71754H1"
            stroke="#BABDFF"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>챌린지 현황</p>
      </div>
      <div className="ChallengeStatusBar">
        <div>
          0<br />
          진행중
        </div>
        <div>
          0<br />
          완료
        </div>
        <div>
          0<br />
          개설
        </div>
      </div>
      <div
        className="menuItem"
        onClick={() => {
          navigate("/my-shot-zip");
        }}
      >
        <p>나의 인증샷 모아보기</p>

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
        <p>챌린지 개설하기</p>

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
          navigate("/my-favorite");
        }}
      >
        <p>챌린지 즐겨찾기</p>

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
  );
}

export default MyPage;
