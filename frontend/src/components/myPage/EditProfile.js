import { React, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EditProfile.css";
import UserAPI from "../../api/UserAPI";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import { uploadImageFile } from "../../plugins/s3upload";

function EditProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("user", user);
  const [fileImage, setFileImage] = useState(user.picURL);
  const [uploadImage, setUploadImage] = useState(user.picURL);
  const [nickname, setNickname] = useState(user.nickname);
  const [description, setDescription] = useState(
    user.description == null ? "" : user.description
  );
  const [validFlag, setValidFlag] = useState(true);
  const [checkMsg, setCheckMsg] = useState("");
  const [interests, setInterests] = useState(user.interests);
  const totalInterests = ["운동", "학습", "생활", "취미", "식생활", "그 외"];

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    setUploadImage(e.target.files[0]);
  };
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    if (e.target.value === user.nickname) {
      setCheckMsg("");
      setValidFlag(true);
    } else if (e.target.value) {
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
  const onChangeDesc = (e) => {
    setDescription(e.target.value);
  };
  const getInterest = () => {
    console.log("1", interests);
    const items = [];
    for (let index = 0; index < totalInterests.length; index++) {
      items.push(
        <span
          key={index}
          className={
            interests.includes(totalInterests[index])
              ? "selectItem"
              : "disSelectItem"
          }
          onClick={() => {
            addInterest(index);
          }}
        >
          {totalInterests[index]}
        </span>
      );
    }
    return items;
  };

  const addInterest = (props) => {
    console.log("props", props);
    console.log("item", totalInterests[props]);
    console.log("interests", interests);
    if (interests.includes(totalInterests[props])) {
      let newInterests = [...interests];
      newInterests.splice(interests.indexOf(totalInterests[props]), 1);
      setInterests([...newInterests]);
    } else {
      setInterests([...interests, totalInterests[props]]);
    }
  };

  const editInfo = async () => {
    if (validFlag) {
      let url =
        uploadImage !== user.picURL
          ? await uploadImageFile(uploadImage)
          : uploadImage;

      let desc = description === "" ? null : description;
      const body = {
        email: user.email,
        nickname: nickname,
        picURL: url,
        description: desc,
        interests: interests,
      };
      console.log("body", body);
      UserAPI.updateMyPage(body).then((response) => {
        console.log("update response", response);
        dispatch(setUserInfo(response.data.body));
        navigate("/my-profile");
      });
    } else {
      alert("닉네임을 확인하세요");
    }
  };

  return (
    <div className="EditProfile">
      <div className="BackProfile">
        <Link to="/my-profile">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z"
              fill="#444444"
            />
          </svg>
        </Link>
        <p>내 정보</p>
        <p className="EditSave" onClick={editInfo}>
          완료
        </p>
      </div>
      <div className="Profile">
        <img
          onClick={handleClick}
          style={{ width: "80px", height: "80px", borderRadius: "100px" }}
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
      <div className="inputBox">
        <p>닉네임</p>
        <input
          value={nickname}
          onChange={onChangeNickname}
          className="NickName"
          maxLength={10}
        />
      </div>
      <div className="checkMsg">
        <p></p>
        <span>{checkMsg}</span>
      </div>
      <div className="inputBox">
        <p>소개</p>
        {user.description == null ? (
          <input
            className="EditDesc"
            placeholder="자신을 소개해보세요"
            value={description}
            onChange={onChangeDesc}
            maxLength={18}
          />
        ) : (
          <input
            className="EditDesc"
            value={description}
            onChange={onChangeDesc}
            maxLength={18}
          />
        )}
      </div>
      <div className="inputBox">
        <p>관심사</p>
        <span>{getInterest()}</span>
      </div>
    </div>
  );
}

export default EditProfile;
