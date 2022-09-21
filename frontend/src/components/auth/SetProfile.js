import {React, useRef, useState} from "react";
import styles from "./SetProfile.module.css";
import basic from "../../img/profile-basic.png"


function SetProfile(){
    const [fileImage, setFileImage] = useState(basic);
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    }
    const photoInput = useRef();
    const handleClick = () => {
        photoInput.current.click();
    }

    return (
      <div>
        <div className={styles.title}>
          <span>프로필 설정</span>
        </div>
        <div className={styles.photoBox}>
          <div className={styles.photo}>
            <img onClick={handleClick} style={{width:"100px", height:"100px", borderRadius:"100px"}} src={fileImage} alt="sample" />
            <input
              type="file"
              name="imgUpload"
              accept="image/*"
              onChange={saveFileImage}
              style={{display:'none'}}
              ref={photoInput}
            />
          </div>
        </div>
      </div>
    );
}

export default SetProfile;