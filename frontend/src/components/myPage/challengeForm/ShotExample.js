import { useState,useRef } from 'react';
import styles from './challengeForm.module.css';
import {uploadImageFile} from '../../../plugins/s3upload';
import photoUpload from '../../../img/PhotoUpload.png';

function ShotExample({formCnt,setFormCnt,setGoodShotUrl,setBadShotUrl}){
  const goodInput = useRef();
  const goodClick = () => {
    goodInput.current.click();
  };
  const badInput = useRef();
  const badClick = () => {
    badInput.current.click();
  };
  //파일 미리볼 url을 저장해줄 state
  const [good,setGood] = useState(photoUpload);
  const [bad,setBad] = useState(photoUpload);
  const [s3Good,setS3Good] = useState("");
  const [s3Bad,setS3Bad] = useState("");

  // 파일 저장
  const saveGoodFileImage = (e) => {
    if (e.target.files[0] !== undefined){
      setGood(URL.createObjectURL(e.target.files[0]));
      setS3Good(e.target.files[0])
      setGoodShotUrl(URL.createObjectURL(e.target.files[0]));
    } else { setGood(photoUpload) }
  };
  // 파일 s3에 저장
  const s3SaveFileImage = async() => {
    const goodUrl=await uploadImageFile(s3Good);
    setGoodShotUrl(goodUrl);
    const badUrl=await uploadImageFile(s3Bad);
    setBadShotUrl(badUrl);
  };
    
  // 파일 삭제
  const deleteGoodFileImage = () => {
    URL.revokeObjectURL(good);
    setGood("");
    setGoodShotUrl("");
  };
  const saveBadFileImage = (e) => {
    if (e.target.files[0] !== undefined){
      setBad(URL.createObjectURL(e.target.files[0]));
      setS3Bad(e.target.files[0])
      setBadShotUrl(URL.createObjectURL(e.target.files[0]));
    } else { setBad(photoUpload) }
  };
  const deleteBadFileImage = () => {
    URL.revokeObjectURL(bad);
    setBad("");
    setBadShotUrl("");
  };
  function NextButton(){
    return(
      <div className={styles.buttonBox}>
        <button className={styles.NextButton} onClick={()=>{setFormCnt(formCnt+1);s3SaveFileImage();}}>Next( {formCnt} / 8)</button>
      </div>
    )
  }
  function NextButtonX(){
    return(
      <div className={styles.buttonBox}>
        <button className={styles.NextButtonX}>Next( {formCnt} / 8)</button>
      </div>
    )
  }
  function Header(){
    return (
      <div style={{ position: "sticky", top: "0px", backgroundColor: "white" }}>
        <div className={styles.header}>
          <svg
            onClick={()=>{setFormCnt(formCnt-1)}}
            style={{ margin: "16px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <p style={{ fontSize: "20px", margin: "auto" }}>챌린지 개설하기</p>
          <div></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
        <div style={{padding:'16px', marginTop:"64px"}}>
          <div style={{ padding: "16px 0" }}>
            <p className={styles.FormHeader} style={{ marginBottom: "16px" }}>
              인증샷 예시를 등록해주세요.
            </p>
            <p className={styles.FormEx} style={{ marginBottom: "8px" }}>
              챌린지 참여자의 혼란을 방지하고, 참여자의 인증샷이
              <br />
              올바른지 판단할 수 있는 기준을 마련해주세요.
              <br />
              챌린지 개설 수 인증샷 예시는 변경할 수 없습니다.
              <br />{" "}
            </p>
          </div>
          <div className={styles.ShotEX}>
            <div className="PhotoBox">
              <p style={{ marginBottom: "8px" }}>👍 좋은 인증샷 예시</p>
              <img
                onClick={goodClick}
                style={{ width: "160px", height: "160px" }}
                src={good}
                alt="sample"
                />
              <input
                type="file"
                name="imgUpload"
                accept="image/*"
                onChange={saveGoodFileImage}
                style={{ display: "none" }}
                ref={goodInput}
                />
            </div>
            <div className="PhotoBox">
              <p style={{ marginBottom: "8px" }}>👎 나쁜 인증샷 예시</p>
              <img
                onClick={badClick}
                style={{ width: "160px", height: "160px" }}
                src={bad}
                alt="sample"
                />
              <input
                type="file"
                name="imgUpload"
                accept="image/*"
                onChange={saveBadFileImage}
                style={{ display: "none" }}
                ref={badInput}
                />
            </div>
        </div>
      </div>
      {good && bad !== photoUpload ? <NextButton /> : <NextButtonX />}
    </div>
  );
}
export default ShotExample;