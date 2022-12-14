import React, { useEffect, useState } from "react";
import styles from "./CreateChallenge.module.css";
import SelectChallenge from "./challengeForm/SelectChallenge";
import SelectTopic from "./challengeForm/SelectTopic";
import InputTitle from "./challengeForm/InputTitle";
import SelectDonation from "./challengeForm/SelectDonation";
import ChallengeIntro from "./challengeForm/ChallengeIntro";
import ShotExample from "./challengeForm/ShotExample";
import SelectCertification from "./challengeForm/SelectCertification";
import SelectPeriod from "./challengeForm/SelectPeriod";
import SelectPeople from "./challengeForm/SelectPeople";
import SelectDeposit from "./challengeForm/SelectDeposit";
import CreateFinal from "./challengeForm/CreateFinal";
import { donationList } from "../../app/redux/DonationListSlice";
import { useSelector } from "react-redux";

function CreateChallenge() {
  const donations = useSelector(donationList).map((donation) => donation.name);

  const [selects, setSelects] = useState({
    challengeId: "0",
    challenge: "",
    topic: "",
    title: "",
    donation: "",
    donationMoney: 0,
    explanation: "",
    exPhotoUrl: "",
    goodShotUrl: "",
    badShotUrl: "",
    nTimesAWeek: "",
    authentications: "",
    startTime: "0",
    endTime: "24",
    period: 0,
    challengeStart: "",
    challengeEnd: "",
    peopleLimit: "",
    limitNum: 999,
    dailyMoney: 0,
  });

  useEffect(() => {
    // console.log("selects", selects);
  }, [selects]);

  const [formCnt, setFormCnt] = useState(0);

  return (
    <div className={styles.CreateChallenge}>
      <div>
        {/* 일상 & 기부 공통 폼 */}
        {formCnt === 0 ? (
          <SelectChallenge
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            value={setSelects.challenge}
            setValue={(value) => {
              setSelects((state) => ({
                ...state,
                challenge: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 1 ? (
          <SelectTopic
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            value={setSelects.topic}
            setValue={(value) => {
              setSelects((state) => ({
                ...state,
                topic: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 2 ? (
          <InputTitle
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            value={setSelects.title}
            setValue={(value) => {
              setSelects((state) => ({
                ...state,
                title: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 9 ? (
          <CreateFinal
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            selects={selects}
          />
        ) : null}

        {/* 여기부터 기부챌린지 */}
        {formCnt === 3 && selects.challenge === "기부챌린지" ? (
          <SelectDonation
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            donation={setSelects.donation}
            setDonation={(value) => {
              setSelects((state) => ({
                ...state,
                donation: value,
              }));
            }}
            donationMoney={setSelects.donationMoney}
            setDonationMoney={(value) => {
              setSelects((state) => ({
                ...state,
                donationMoney: value,
              }));
            }}
            options={donations}
          />
        ) : null}
        {formCnt === 4 && selects.challenge === "기부챌린지" ? (
          <ChallengeIntro
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            explanation={setSelects.explanation}
            setExplanation={(value) => {
              setSelects((state) => ({
                ...state,
                explanation: value,
              }));
            }}
            exPhotoUrl={selects.exPhotoUrl}
            setExPhotoUrl={(value) => {
              setSelects((state) => ({
                ...state,
                exPhotoUrl: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 5 && selects.challenge === "기부챌린지" ? (
          <ShotExample
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            goodShotUrl={selects.goodShotUrl}
            setGoodShotUrl={(value) => {
              setSelects((state) => ({
                ...state,
                goodShotUrl: value,
              }));
            }}
            badShotUrl={selects.badShotUrl}
            setBadShotUrl={(value) => {
              setSelects((state) => ({
                ...state,
                badShotUrl: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 6 && selects.challenge === "기부챌린지" ? (
          <SelectCertification
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            nTimesAWeek={selects.nTimesAWeek}
            setNTimesAWeek={(value) => {
              setSelects((state) => ({
                ...state,
                nTimesAWeek: value,
              }));
            }}
            authentications={selects.authentications}
            setAuthentications={(value) => {
              setSelects((state) => ({
                ...state,
                authentications: value,
              }));
            }}
            startTime={selects.startTime}
            setStartTime={(value) => {
              setSelects((state) => ({
                ...state,
                startTime: value,
              }));
            }}
            endTime={selects.endTime}
            setEndTime={(value) => {
              setSelects((state) => ({
                ...state,
                endTime: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 7 && selects.challenge === "기부챌린지" ? (
          <SelectPeriod
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            period={selects.period}
            setPeriod={(value) => {
              setSelects((state) => ({
                ...state,
                period: value,
              }));
            }}
            challengeStart={selects.challengeStart}
            setChallengeStart={(value) => {
              setSelects((state) => ({
                ...state,
                challengeStart: value,
              }));
            }}
            challengeEnd={selects.challengeEnd}
            setChallengeEnd={(value) => {
              setSelects((state) => ({
                ...state,
                challengeEnd: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 8 && selects.challenge === "기부챌린지" ? (
          <SelectPeople
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            peopleLimit={setSelects.peopleLimit}
            setPeopleLimit={(value) => {
              setSelects((state) => ({
                ...state,
                peopleLimit: value,
              }));
            }}
            limitNum={setSelects.limitNum}
            setLimitNum={(value) => {
              setSelects((state) => ({
                ...state,
                limitNum: value,
              }));
            }}
          />
        ) : null}
        {/* 여기서부터 일상 챌린지 */}
        {formCnt === 3 && selects.challenge === "일상챌린지" ? (
          <ChallengeIntro
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            explanation={setSelects.donation}
            setExplanation={(value) => {
              setSelects((state) => ({
                ...state,
                explanation: value,
              }));
            }}
            exPhotoUrl={selects.exPhotoUrl}
            setExPhotoUrl={(value) => {
              setSelects((state) => ({
                ...state,
                exPhotoUrl: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 4 && selects.challenge === "일상챌린지" ? (
          <ShotExample
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            goodShotUrl={selects.goodShotUrl}
            setGoodShotUrl={(value) => {
              setSelects((state) => ({
                ...state,
                goodShotUrl: value,
              }));
            }}
            badShotUrl={selects.badShotUrl}
            setBadShotUrl={(value) => {
              setSelects((state) => ({
                ...state,
                badShotUrl: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 5 && selects.challenge === "일상챌린지" ? (
          <SelectCertification
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            nTimesAWeek={selects.nTimesAWeek}
            setNTimesAWeek={(value) => {
              setSelects((state) => ({
                ...state,
                nTimesAWeek: value,
              }));
            }}
            authentications={selects.authentications}
            setAuthentications={(value) => {
              setSelects((state) => ({
                ...state,
                authentications: value,
              }));
            }}
            startTime={selects.startTime}
            setStartTime={(value) => {
              setSelects((state) => ({
                ...state,
                startTime: value,
              }));
            }}
            endTime={selects.endTime}
            setEndTime={(value) => {
              setSelects((state) => ({
                ...state,
                endTime: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 6 && selects.challenge === "일상챌린지" ? (
          <SelectPeriod
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            period={selects.period}
            setPeriod={(value) => {
              setSelects((state) => ({
                ...state,
                period: value,
              }));
            }}
            challengeStart={selects.challengeStart}
            setChallengeStart={(value) => {
              setSelects((state) => ({
                ...state,
                challengeStart: value,
              }));
            }}
            challengeEnd={selects.challengeEnd}
            setChallengeEnd={(value) => {
              setSelects((state) => ({
                ...state,
                challengeEnd: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 7 && selects.challenge === "일상챌린지" ? (
          <SelectPeople
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            peopleLimit={setSelects.peopleLimit}
            setPeopleLimit={(value) => {
              setSelects((state) => ({
                ...state,
                peopleLimit: value,
              }));
            }}
            limitNum={setSelects.limitNum}
            setLimitNum={(value) => {
              setSelects((state) => ({
                ...state,
                limitNum: value,
              }));
            }}
          />
        ) : null}
        {formCnt === 8 && selects.challenge === "일상챌린지" ? (
          <SelectDeposit
            formCnt={formCnt}
            setFormCnt={(cnt) => {
              setFormCnt(cnt);
            }}
            dailyMoney={setSelects.dailyMoney}
            setDailyMoney={(value) => {
              setSelects((state) => ({
                ...state,
                dailyMoney: value,
              }));
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
export default CreateChallenge;
