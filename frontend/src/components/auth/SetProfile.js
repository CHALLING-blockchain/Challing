import { React, useState, useEffect } from "react";
import styles from "./SetProfile.module.css";
// import basic from "../../img/profile-basic.png";
import Next from "../common/NextButton";
import UserAPI from "../../api/UserAPI";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNickName, selectUser } from "../../app/redux/userSlice";

function SetProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const fileImage = user.picURL;
  // const [fileImage, setFileImage] = useState(basic);
  // const saveFileImage = (e) => {
  //   setFileImage(URL.createObjectURL(e.target.files[0]));
  // };
  // const photoInput = useRef();
  // const handleClick = () => {
  //   photoInput.current.click();
  // };
  const [nickname, setNickname] = useState("");
  const [validFlag, setValidFlag] = useState(false);
  const [checkMsg, setCheckMsg] = useState("");
  useEffect(() => {
    console.log("state user", user);
  });
  const handleChange = (e) => {
    setNickname(e.target.value);
    if (e.target.value) {
      UserAPI.validCheck(e.target.value).then((response) => {
        if (response.data.body) {
          setCheckMsg("사용 가능한 닉네임 입니다.");
          setValidFlag(true);
        } else {
          setCheckMsg("이미 사용 중인 닉네임 입니다.");
          setValidFlag(false);
        }
      });
    } else {
      setCheckMsg("");
      setValidFlag(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validFlag) {
      dispatch(setNickName(nickname));
      navigate("/precategory");
    } else {
      alert("닉네임을 확인하세요");
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <span>프로필 설정</span>
      </div>
      <div className={styles.photoBox}>
        <div className={styles.photo}>
          {/* <img
            onClick={handleClick}
            style={{ width: "100px", height: "100px", borderRadius: "100px" }}
            src={fileImage}
            alt="sample"
          />
          <input
            type="file"
            name="imgUpload"
            accept="image/*"
            onChange={saveFileImage}
            style={{ display: "none" }}
            ref={photoInput}
          /> */}
          <img
            style={{ width: "100px", height: "100px", borderRadius: "100px" }}
            src={fileImage}
            alt="sample"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <p>
            닉네임<span style={{ color: "red" }}>*</span>
          </p>
          <input
            className={styles.inputTag}
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkMsg}>
          <span>{checkMsg}</span>
        </div>

        <Next
          type="submit"
          label="Next"
          onClick={() => {}}
          disabled={false}
        ></Next>
      </form>
    </div>
  );
}

export default SetProfile;
