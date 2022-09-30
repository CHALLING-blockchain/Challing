import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import SetProfile from "./components/auth/SetProfile";
import PreCategory from "./components/auth/PreCategory";
import ChallengeDetail from "./components/challengeDetail/ChallengeDetail";
import ChallengeSearch from "./components/challengeSearch/ChallengeSearch";
import ChallengeShot from "./components/challengeShot/ChallengeShot";
import ChallengeCertify from "./components/challengeCertify/ChllengeCertify";
import CertificationPhotos from "./components/challengeCertify/CertificationPhotos";
import Main from "./components/main/Main";
import MyPage from "./components/myPage/MyPage";
import MyProfile from "./components/myPage/MyProfile";
import EditProfile from "./components/myPage/EditProfile";
import MyShotZip from "./components/myPage/MyShotZip";
import MyShotDetail from "./components/myPage/MyShotDetail";
import CreateChallenge from "./components/myPage/CreateChallenge";
import MyFavorite from "./components/myPage/MyFavorite";
import MyWallet from "./components/myWallet/MyWallet";
import Menu from "./components/Menu";
import Voting from "./components/voting/Voting";
import VotingHome from "./components/voting/VotingHome";
import ConfirmRegister from "./components/challengeRegister/ConfirmRegister";
import SuccessRegister from "./components/challengeRegister/SuccessRegister";
import WebcamCapture from "./components/challengeCertify/WebcamCapture";
import OngoingChallenge from "./components/myChallenge/OngoingChallenge";
import CompletedChallenge from "./components/myChallenge/CompletedChallenge";
import CompletedDetail from "./components/myChallenge/CompletedDetail";
import CreateLoading from "./components/myPage/CreateLoading";
import JoinLoading from "./components/challengeRegister/JoinLoading";
import CertifyLoading from "./components/challengeCertify/CertifyLoading";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/loginresult" element={<Login />} />
        <Route path="/logoutresult" element={<Logout />} />
        <Route path="/setprofile" element={<SetProfile />} />
        <Route path="/precategory" element={<PreCategory />} />
        <Route path="/challenge-detail/:id" element={<ChallengeDetail />} />
        <Route path="/challenge-search" element={<ChallengeSearch />} />
        <Route path="/challenge-shot" element={<ChallengeShot />} />
        <Route path="/challenge-certify/:id" element={<ChallengeCertify />} />
        <Route path="/certification-photos" element={<CertificationPhotos />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-shot-zip" element={<MyShotZip />} />
        <Route path="/my-shot-detail/:id" element={<MyShotDetail />} />
        <Route path="/create-challenge" element={<CreateChallenge />} />
        <Route path="/create-loading/:id" element={<CreateLoading />} />
        <Route path="/my-favorite" element={<MyFavorite />} />
        <Route path="/my-wallet" element={<MyWallet />} />
        <Route path="/votinghome" element={<VotingHome />} />
        <Route path="/voting/:id" element={<Voting />} />
        <Route path="/confirm-register/:id" element={<ConfirmRegister />} />
        <Route path="/join-loading/:id" element={<JoinLoading />} />
        <Route path="/success-register/:id" element={<SuccessRegister />} />
        <Route path="/web-cam-capture" element={<WebcamCapture />} />
        <Route path="/certify-loading/:id" element={<CertifyLoading />} />
        <Route path="/ongoing-challenge" element={<OngoingChallenge />} />
        <Route path="/completed-challenge" element={<CompletedChallenge />} />
        <Route path="/completed-detail/:id" element={<CompletedDetail />} />
      </Routes>
      <Menu />
    </div>
  );
}

export default App;
