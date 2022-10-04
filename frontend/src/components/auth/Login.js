import { React, useEffect } from "react";
import UserAPI from "../../api/UserAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserInfo } from "../../app/redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    // console.log("code", code);
    UserAPI.kakaoLogin(code).then((response) => {
      // console.log("response", response);
      if (response.data.message === "noEmail") {
        alert("email 동의를 해주세요");
        window.location.replace(
          `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URL}&response_type=code`
        );
      }
      dispatch(setUserInfo(response.data.body.user));
      if (response.data.body.visited === true) {
        // 회원가입한 유저인 경우 정보 저장
        dispatch(setToken(response.data.body.jwt));
        navigate("/");
      } else {
        navigate("/setprofile");
      }
    });
  });

  // function logout() {
  //   window.location.replace(
  //     `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URL}`
  //   );
  // }

  return <div>{/* <button onClick={logout}>로그아웃</button> */}</div>;
}

export default Login;
