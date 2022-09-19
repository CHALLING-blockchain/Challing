import React from 'react';
import { Link } from 'react-router-dom';
import './Alarm.css';

function Alarm(){
    return (
        <div className="Alarm">
          <div className="Back">
            <Link to="/">
              <svg className='BackIcon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z" fill="#444444"/>
              </svg>
            </Link>
            <p className="HeaderText">알림</p>
          </div>
          <div>
            <h3 className="ChallengeAlarm">챌린지 알림</h3>
            <h3 className="AllAlarm">전체 알림</h3>
            <svg className="HalfLine" width="180" height="2" viewBox="0 0 180 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="180" height="2" rx="1" fill="#755FFF"/>
            </svg>
            <svg className="UnderLine" width="360" height="10" viewBox="0 0 360 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_214_2049)">
              <rect y="3" width="360" height="1" rx="0.5" fill="#E5E1FF"/>
              </g>
              <defs>
              <filter id="filter0_d_214_2049" x="-4" y="0.5" width="368" height="9" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1.5"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_214_2049"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_214_2049" result="shape"/>
              </filter>
              </defs>
            </svg>

          </div>
          <div className="Empty">
            <svg width="50" height="67" viewBox="0 0 50 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 24.3563L46.5205 30.3758L4.31454 6.01949L7.79401 0L18.3716 6.08907L23.1037 4.80167L38.1698 13.5003L39.4572 18.2672L50 24.3563ZM0 59.4642V17.7105H17.6409L41.7537 31.6284V59.4642C41.7537 61.3098 41.0205 63.0798 39.7154 64.3849C38.4104 65.6899 36.6403 66.4231 34.7947 66.4231H6.95894C5.11332 66.4231 3.34328 65.6899 2.03823 64.3849C0.733172 63.0798 0 61.3098 0 59.4642ZM6.95894 59.4642H34.7947V35.8038L15.5184 24.6694H6.95894V59.4642Z" fill="#6A6A6A"/>
            </svg>
          </div>
        </div>
    );
};

export default Alarm;