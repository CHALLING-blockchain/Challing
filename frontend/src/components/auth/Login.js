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

  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}

export default Login;
