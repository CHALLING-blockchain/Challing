import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/redux/userSlice";
import "./MyProfile.css";

function MyProfile() {
  const user = useSelector(selectUser);
  console.log(user);
  const fileImage = user.picURL;

  const getInterest = () => {
    const items = [];
    for (let index = 0; index < user.interests.length; index++) {
      items.push(
        <span key={index} className="selectItem">
          {user.interests[index]}
        </span>
      );
    }
    return items;
  };

  return (
    <div className="MyProfile">
      <div className="BackMyPage">
        <Link to="/my-page">
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
        <Link to="/edit-profile">
          <p>편집</p>
        </Link>
      </div>
      <div className="Profile">
        <img
          style={{ width: "80px", height: "80px", borderRadius: "100px" }}
          src={fileImage}
          alt="sample"
        />
        <p className="UserName">{user.nickname}</p>
      </div>
      <div className="Box">
        <p>한줄소개</p>
        {user.description == null ? (
          <p>입력하신 소개 내용이 없습니다.</p>
        ) : (
          <p>{user.description}</p>
        )}
      </div>
      <svg
        width="360"
        height="8"
        viewBox="0 0 360 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="360" height="8" fill="#E5E6FF" fillOpacity="0.5" />
      </svg>
      <div className="Box">
        <span>이메일</span>
        <span>{user.email}</span>
      </div>
      <div className="Box">
        <span>관심사</span>
        <span>{getInterest()}</span>
      </div>
    </div>
  );
}

export default MyProfile;
