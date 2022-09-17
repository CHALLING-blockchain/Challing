import React from "react";

function login() {
  window.location.replace(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URL}&response_type=code`
  );
}

function Auth() {
  return (
    <div>
      <h2>Auth</h2>
      <button onClick={login}>카카오로그인</button>
    </div>
  );
}

export default Auth;
