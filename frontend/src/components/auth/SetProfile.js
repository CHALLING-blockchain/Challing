import {React, useRef, useState} from "react";
import styles from "./SetProfile.module.css";
import basic from "../../img/profile-basic.png"
import Next from "../common/NextButton";

function SetProfile(){
    const [fileImage, setFileImage] = useState(basic);
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    }
    const photoInput = useRef();
    const handleClick = () => {
        photoInput.current.click();
    }
    const [profiles, setProfiles] = useState({
        nickname: "",
        intro: "",
    })
    const handleChange = (e) => {
        setProfiles({
            ...profiles,
            [e.target.name] : e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(profiles, null, 2))
    }

    return (
      <div>
        <div className={styles.title}>
          <span>프로필 설정</span>
        </div>
        <div className={styles.photoBox}>
          <div className={styles.photo}>
            <img
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
                    value={profiles.nickname}
                    onChange = {handleChange}
                />
            </div>

            <div className={styles.inputBox}>
                <p>소개</p>
                <input
                    className={styles.inputTag}
                    type="text"
                    name="intro"
                    placeholder="한 줄 소개를 입력해주세요."
                    value={profiles.intro}
                    onChange={handleChange}
                />
            </div>
            <Next
                type="submit"
                label="Next"
                onClick={()=>{
                    
                }}
                disabled={false}
            ></Next>
        </form>
      </div>
    );
}

export default SetProfile;