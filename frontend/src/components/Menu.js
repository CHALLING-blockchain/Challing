import React from "react";
import styles from "./Menu.module.css";
import { Link, useLocation } from "react-router-dom";

function Menu() {
  const location = useLocation();

  return (
    <div className={styles.Footer}>
      {console.log(location.pathname)}
      <div className={styles.Menu}>
        <Link to="/">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {location.pathname === "/" ? (
              <path
                d="M1 10.6667V23.6667C1 24.4031 1.59695 25 2.33333 25H8.23809C8.97448 25 9.57143 24.4031 9.57143 23.6667V14.7143H16.4285V23.6667C16.4285 24.4031 17.0255 25 17.7619 25H23.6667C24.4031 25 25 24.4031 25 23.6667V10.6667C25 10.247 24.8024 9.8518 24.4667 9.6L13 1L1.53333 9.6C1.19759 9.8518 1 10.247 1 10.6667V10.6667Z"
                fill="#755fff"
                stroke="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M1 10.6667V23.6667C1 24.4031 1.59695 25 2.33333 25H8.23809C8.97448 25 9.57143 24.4031 9.57143 23.6667V14.7143H16.4285V23.6667C16.4285 24.4031 17.0255 25 17.7619 25H23.6667C24.4031 25 25 24.4031 25 23.6667V10.6667C25 10.247 24.8024 9.8518 24.4667 9.6L13 1L1.53333 9.6C1.19759 9.8518 1 10.247 1 10.6667V10.6667Z"
                fill="white"
                stroke="#BABDFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </Link>
        <Link to="/challenge-search">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {location.pathname === "/challenge-search" ||
            location.pathname.includes("/challenge-detail/") ? (
              <path
                d="M0 9.74649C0 15.1293 4.38832 19.4862 9.80926 19.4862C15.2222 19.4862 19.6173 15.1293 19.6173 9.74649C19.6173 4.36371 15.2222 0 9.80926 0C4.38832 0 0 4.36371 0 9.74649ZM3.10832 9.74649C3.10832 6.0671 6.10402 3.08986 9.80988 3.08986C13.5084 3.08986 16.5102 6.06771 16.5102 9.74649C16.5102 13.4259 13.5084 16.4037 9.80988 16.4037C6.10402 16.4037 3.10832 13.4253 3.10832 9.74649ZM16.7151 18.6838L20.9336 23.4893C21.613 24.1675 22.0511 24.173 22.7416 23.4893L24.0961 22.1471C24.7619 21.4819 24.8032 21.053 24.0961 20.3496L19.237 16.1804L16.7151 18.6838Z"
                fill="#755fff"
              />
            ) : (
              <path
                d="M0 9.74649C0 15.1293 4.38832 19.4862 9.80926 19.4862C15.2222 19.4862 19.6173 15.1293 19.6173 9.74649C19.6173 4.36371 15.2222 0 9.80926 0C4.38832 0 0 4.36371 0 9.74649ZM3.10832 9.74649C3.10832 6.0671 6.10402 3.08986 9.80988 3.08986C13.5084 3.08986 16.5102 6.06771 16.5102 9.74649C16.5102 13.4259 13.5084 16.4037 9.80988 16.4037C6.10402 16.4037 3.10832 13.4253 3.10832 9.74649ZM16.7151 18.6838L20.9336 23.4893C21.613 24.1675 22.0511 24.173 22.7416 23.4893L24.0961 22.1471C24.7619 21.4819 24.8032 21.053 24.0961 20.3496L19.237 16.1804L16.7151 18.6838Z"
                fill="#BABDFF"
              />
            )}
          </svg>
        </Link>
        <Link to="/challenge-shot">
          <svg
            width="28"
            height="26"
            viewBox="0 0 28 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {location.pathname === "/challenge-shot" ||
            location.pathname.includes("/challenge-certify/") ||
            location.pathname.includes("/web-cam-capture") ||
            location.pathname.includes("/certification-photos") ||
            location.pathname.includes("/votinghome") ? (
              <path
                d="M3.6 25H24.4C25.836 25 27 23.8061 27 22.3333V8.46667C27 6.99391 25.836 5.8 24.4 5.8H20.5L17.25 1H10.75L7.5 5.8H3.6C2.16406 5.8 1 6.99391 1 8.46667V22.3333C1 23.8061 2.16406 25 3.6 25Z"
                fill="#755fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M3.6 25H24.4C25.836 25 27 23.8061 27 22.3333V8.46667C27 6.99391 25.836 5.8 24.4 5.8H20.5L17.25 1H10.75L7.5 5.8H3.6C2.16406 5.8 1 6.99391 1 8.46667V22.3333C1 23.8061 2.16406 25 3.6 25Z"
                stroke="#BABDFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {location.pathname === "/challenge-shot" ||
            location.pathname.includes("/challenge-certify/") ||
            location.pathname.includes("/web-cam-capture") ||
            location.pathname.includes("/certification-photos") ||
            location.pathname.includes("/votinghome") ? (
              <path
                d="M13.9999 19.6667C16.8718 19.6667 19.1999 17.2789 19.1999 14.3333C19.1999 11.3878 16.8718 9 13.9999 9C11.128 9 8.79993 11.3878 8.79993 14.3333C8.79993 17.2789 11.128 19.6667 13.9999 19.6667Z"
                fill="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M13.9999 19.6667C16.8718 19.6667 19.1999 17.2789 19.1999 14.3333C19.1999 11.3878 16.8718 9 13.9999 9C11.128 9 8.79993 11.3878 8.79993 14.3333C8.79993 17.2789 11.128 19.6667 13.9999 19.6667Z"
                stroke="#BABDFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </Link>
        <Link to="/my-wallet">
          <svg
            width="28"
            height="26"
            viewBox="0 0 28 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {location.pathname === "/my-wallet" ? (
              <path
                d="M12.05 25C5.94723 25 0.999975 19.6274 0.999975 13C0.999975 6.37258 5.94723 1 12.05 1C18.1527 1 23.1 6.37258 23.1 13C23.1 19.6274 18.1527 25 12.05 25Z"
                stroke="#755fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M12.05 25C5.94723 25 0.999975 19.6274 0.999975 13C0.999975 6.37258 5.94723 1 12.05 1C18.1527 1 23.1 6.37258 23.1 13C23.1 19.6274 18.1527 25 12.05 25Z"
                stroke="#BABDFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {location.pathname === "/my-wallet" ? (
              <path
                d="M15.3 8.73329C14.4852 8.06352 13.4723 7.66663 12.3747 7.66663C9.68248 7.66663 7.5 10.0544 7.5 13C7.5 15.9454 9.68248 18.3333 12.3747 18.3333C13.4723 18.3333 14.4852 17.9364 15.3 17.2666"
                stroke="#755fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M15.3 8.73329C14.4852 8.06352 13.4723 7.66663 12.3747 7.66663C9.68248 7.66663 7.5 10.0544 7.5 13C7.5 15.9454 9.68248 18.3333 12.3747 18.3333C13.4723 18.3333 14.4852 17.9364 15.3 17.2666"
                stroke="#BABDFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {location.pathname === "/my-wallet" ? (
              <path
                d="M12.7001 1C17.4668 1 27.0001 2.2 27.0001 13C27.0001 23.8 17.4668 25 12.7001 25"
                stroke="#755fff"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M12.7001 1C17.4668 1 27.0001 2.2 27.0001 13C27.0001 23.8 17.4668 25 12.7001 25"
                stroke="#BABDFF"
                strokeWidth="2"
              />
            )}
          </svg>
        </Link>
        <Link to="/my-page">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {location.pathname === "/my-page" ||
            location.pathname.includes("/my-shot-detail/") ||
            location.pathname === "/my-profile" ||
            location.pathname === "/edit-profile" ||
            location.pathname === "/ongoing-challenge" ||
            location.pathname === "/completed-challenge" ||
            location.pathname === "/my-shot-zip" ||
            location.pathname === "/create-challenge" ||
            location.pathname === "/my-favorite" ||
            location.pathname === "/created-challenge" ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C16 7.06087 15.5786 8.07828 14.8284 8.82843C14.0783 9.57857 13.0609 10 12 10C10.9391 10 9.92172 9.57857 9.17157 8.82843C8.42143 8.07828 8 7.06087 8 6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6ZM12 12C13.5913 12 15.1174 11.3679 16.2426 10.2426C17.3679 9.11742 18 7.5913 18 6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6C6 7.5913 6.63214 9.11742 7.75736 10.2426C8.88258 11.3679 10.4087 12 12 12ZM24 22C24 24 22 24 22 24H2C2 24 0 24 0 22C0 20 2 14 12 14C22 14 24 20 24 22ZM22 21.992C21.998 21.5 21.692 20.02 20.336 18.664C19.032 17.36 16.578 16 12 16C7.42 16 4.968 17.36 3.664 18.664C2.308 20.02 2.004 21.5 2 21.992H22Z"
                fill="#755fff"
                stroke="none"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C16 7.06087 15.5786 8.07828 14.8284 8.82843C14.0783 9.57857 13.0609 10 12 10C10.9391 10 9.92172 9.57857 9.17157 8.82843C8.42143 8.07828 8 7.06087 8 6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6ZM12 12C13.5913 12 15.1174 11.3679 16.2426 10.2426C17.3679 9.11742 18 7.5913 18 6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6C6 7.5913 6.63214 9.11742 7.75736 10.2426C8.88258 11.3679 10.4087 12 12 12ZM24 22C24 24 22 24 22 24H2C2 24 0 24 0 22C0 20 2 14 12 14C22 14 24 20 24 22ZM22 21.992C21.998 21.5 21.692 20.02 20.336 18.664C19.032 17.36 16.578 16 12 16C7.42 16 4.968 17.36 3.664 18.664C2.308 20.02 2.004 21.5 2 21.992H22Z"
                fill="#BABDFF"
                stroke="none"
              />
            )}
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
