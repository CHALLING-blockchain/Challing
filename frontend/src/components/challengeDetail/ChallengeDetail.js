import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChallengeDetail.module.css"
import back from "../../img/test-back.jpg"
import profile from "../../img/profile-basic.png"
import person from "../../img/person.png"
import dollar from "../../img/dollarCoin.png"
import eth from "../../img/ethCoin.png"
import calender from "../../img/calender.png"
import bulb from "../../img/bulb.png"
import camera from "../../img/camera.png"
import Next from "../common/NextButton";


function TopBox(){
    return (
      <div>
        {/* 유저닉네임, 타이틀, 해시태그 */}
        <div className={styles.paddingBox}>
          <div className={styles.imgText}>
            <img src={profile} alt="" />
            <span>커다란 솜사탕</span>
          </div>
          <span style={{ fontSize: "16px", fontWeight: "bold", margin:'4px' }}>
            영어, 외국어 10문장 쓰기
          </span>
          <div className={styles.Tags}>
            <span className={styles.Tag}>4주동안</span>
            <span className={styles.Tag}>매일매일</span>
          </div>
          {/* 참가인원수, 예치금 */}
          <div className={styles.subtext}>
            <div className={styles.imgText}>
              <img src={person} alt="personChar" />
              <span>현재 3명</span>
            </div>
            <div className={styles.imgText}>
              <img src={dollar} alt="" />
              <span>0.05 eth</span>
            </div>
          </div>
        </div>
      </div>
    );
}

function PeriodBox(){
    return (
        <div className={styles.paddingBox}>
            <div className={styles.imgText}>
                <img src={calender} alt="" />
                <span style={{fontSize:'16px'}}>챌린지 기간</span>
            </div>
            <div>
                <p style={{margin:'4px'}}>9월 5일(월) ~ 9월 18일(일)</p>
            </div>
        </div>
    )
}

function RefundPolicy(){
    return (
      <div className={styles.paddingBox}>
        <div className={styles.imgText}>
          <img src={eth} alt="" />
          <span style={{ fontSize: "16px" }}>환급정책</span>
        </div>
        <div className={styles.refundBox}>
          <div className={styles.oneLine}>
            <span className={styles.percentage}>100% 성공</span>
            <span className={styles.policy}>참가비 전액 환급 + 성공 리워드</span>
          </div>
          <div className={styles.oneLine}>
            <span className={styles.percentage}>99%이하 80%이상</span>
            <span className={styles.policy}>참가비 전액 환급</span>
          </div>
          <div className={styles.oneLine}>
            <span className={styles.percentage}>79%이하 40%이상</span>
            <span className={styles.policy}>참가비 일부 환급</span>
          </div>
          <div className={styles.oneLine}>
            <span className={styles.percentage}>40% 미만</span>
            <span className={styles.policy}>환급금 없음</span>
          </div>
        </div>
      </div>
    );
}

function Description(){
    return (
      <div className={styles.paddingBox}>
        <div className={styles.imgText}>
          <img src={bulb} alt="" />
          <span style={{ fontSize: "16px" }}>챌린지 설명</span>
        </div>
        <div className={styles.description}>
          <div style={{ margin: "8px 0" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              챌린지 진행 시 꼭 알아주세요!
            </p>
            <p>☝ 4주 동안 매일, 하루에 1번 인증샷을 촬영하셔야 합니다.</p>
            <p>☝ 인증 가능한 요일은 월, 화, 수, 목, 금, 토, 일 입니다.</p>
            <p>☝ 사진첩을 사용하실 수 없습니다.</p>
            <p>☝ 인증샷 피드에 인증샷이 공개됩니다.</p>
          </div>
          <div style={{ margin: "8px 0" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              인증 방법 및 주의사항
            </p>
            <p>👉 필사한 내용 사진찍기</p>
            <p>👉 다른 챌린지에서 올리신 동일한 인증샷으로 재인증 하시면</p>
            <p>신고 혹은 불이익이 있을 수 있습니다.</p>
          </div>
        </div>
      </div>
    );
}

function ShotDescription(){
    return (
      <div className={styles.paddingBox}>
        <div className={styles.imgText}>
          <img src={camera} alt="" />
          <span style={{ fontSize: "16px" }}>인증샷 이렇게 찍어주세요!</span>
        </div>
        <div className={styles.shots}>
            <div></div>
        </div>
      </div>
    );
}



function ChallengeDetail() {
    const navigate= useNavigate();
    return (
      <div>
        {/* 뒤로가기, 공유, 백드롭 */}
        <div className={styles.header}>
          <div className={styles.icons} onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </div>
          <div className={styles.icons}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
              />
              <path
                fill-rule="evenodd"
                d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"
              />
            </svg>
          </div>
        </div>
        <img className={styles.backImg} src={back} alt="challegePhoto" />

        <TopBox></TopBox>
        <hr className={styles.hrTag} />
        <PeriodBox></PeriodBox>
        <hr className={styles.hrTag} />
        <RefundPolicy></RefundPolicy>
        <hr className={styles.hrTag} />
        <Description></Description>
        <hr className={styles.hrTag} />
        <ShotDescription></ShotDescription>

        <div style={{ width: "100vw", height: "56px" }}></div>
        <div className={styles.btnBox}>
            <Next
            type="submit"
            label="챌린지 신청하기"
            onClick={() => {}}
            disabled={false}
            ></Next>
        </div>
      </div>
    );
}

export default ChallengeDetail;