import React, { useEffect } from "react";
import UserAPI from "../../api/UserAPI";

function Login() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("code", code);
    UserAPI.register(code).then((response) => {
      console.log("response", response);
    });
  });

  function logout() {
    window.location.replace(
      `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URL}`
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default Login;
