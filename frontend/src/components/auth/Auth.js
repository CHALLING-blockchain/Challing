import React from "react";
import { useState } from "react";

function login(setFlag) {
  setFlag(true);
  window.location.replace(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URL}&response_type=code`
  );
}
function logout(setFlag) {
  setFlag(false);
  window.location.replace(
    `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URL}`
  );
}

function Auth() {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <h2>Auth</h2>
      <button onClick={login(setFlag)}>카카오로그인</button>
      {/* {flag ? (
        <button onClick={login(setFlag)}>카카오로그인</button>
      ) : (
        <button onClick={logout(setFlag)}>키카오로그아웃</button>
      )} */}
    </div>
  );
}

export default Auth;
