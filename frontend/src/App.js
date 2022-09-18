import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import ChallengeSearch from "./components/challengeSearch/ChallengeSearch";
import ChallengeShot from "./components/challengeShot/ChallengeShot";
import Main from "./components/main/Main";
import MyPage from "./components/myPage/MyPage";
import MyWallet from "./components/myWallet/MyWallet";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/loginresult" element={<Login />} />
      <Route path="/logoutresult" element={<Logout />} />
      <Route path="/challenge-search" element={<ChallengeSearch />} />
      <Route path="/challenge-shot" element={<ChallengeShot />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/my-wallet" element={<MyWallet />} />
    </Routes>
  );
}

export default App;
