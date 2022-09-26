import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/redux/userSlice";
import "./MyShotDetail.css";
function MyShotDetail() {
  const { id } = useParams();
  const photoList = useSelector(selectUser).photos;

  return (
    <div className="MyShotDetail">
      <div className="HeaderMyShotDetail">
        <Link to="/my-shot-zip">
          <svg
            width="30"
            height="30"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z"
              fill="#ffffff"
            />
          </svg>
        </Link>
      </div>
      <img style={{ width: "360px" }} src={photoList[id]} alt="sample" />
    </div>
  );
}
export default MyShotDetail;
