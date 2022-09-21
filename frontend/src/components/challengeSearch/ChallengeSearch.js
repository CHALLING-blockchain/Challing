import React from 'react';
import { useState } from 'react';
import './ChallengeSearch.css';

function ChallengeSearch(){
    const [search,setSearch] = useState("");
    const onChange = (event) => setSearch(event.target.value);

    return (
        <div>
          <h2 className="SearchHeader">
            챌린지 검색
          </h2>
          <form className="InputSearch">
            <svg className="SearchIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.94286 3C10.519 3 12.0306 3.62612 13.1451 4.74062C14.2596 5.85512 14.8857 7.36671 14.8857 8.94286C14.8857 10.4149 14.3463 11.768 13.4594 12.8103L13.7063 13.0571H14.4286L19 17.6286L17.6286 19L13.0571 14.4286V13.7063L12.8103 13.4594C11.768 14.3463 10.4149 14.8857 8.94286 14.8857C7.36671 14.8857 5.85512 14.2596 4.74062 13.1451C3.62612 12.0306 3 10.519 3 8.94286C3 7.36671 3.62612 5.85512 4.74062 4.74062C5.85512 3.62612 7.36671 3 8.94286 3ZM8.94286 4.82857C6.65714 4.82857 4.82857 6.65714 4.82857 8.94286C4.82857 11.2286 6.65714 13.0571 8.94286 13.0571C11.2286 13.0571 13.0571 11.2286 13.0571 8.94286C13.0571 6.65714 11.2286 4.82857 8.94286 4.82857Z" fill="#999999"/>
            </svg>
            <input value={search} type="text" onChange={onChange} placeholder="Search"/>
          </form>
          <svg width="360" height="10" viewBox="0 0 360 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_214_2049)">
              <rect y="3" width="360" height="1" rx="0.5" fill="#E5E1FF"/>
              </g>
              <defs>
              <filter id="filter0_d_214_2049" x="-4" y="0.5" width="368" height="9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
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
    );
};

export default ChallengeSearch;