import { useState,useRef } from 'react';
import styles from './challengeForm.module.css';
import {uploadImageFile} from '../../../plugins/s3upload';
import photoUpload from '../../../img/PhotoUpload.png';

function ChallengeIntro({formCnt,setFormCnt,explanation,setExplanation,exPhotoUrl,setExPhotoUrl}){
  // aws config

  const [length,setLength] = useState(0);
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState(photoUpload);
  const [s3file, setS3File] = useState("");
  // 파일 선택
  const selectFileImage = async(e) => {
    if (e.target.files[0] !== undefined){
      setFileImage(URL.createObjectURL(e.target.files[0]))
      // setExPhotoUrl(URL.createObjectURL(e.target.files[0]))
      setS3File(e.target.files[0])
    } else { setFileImage(photoUpload) }
  };

  // 파일 s3에 저장
  const s3SaveFileImage = async() => {
    const url=await uploadImageFile(s3file);
    setExPhotoUrl(url);
  };
  
  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    setExPhotoUrl("");
  };
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
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
  const[list,setList] = useState([]);
  console.log(fileImage)
  return (
    <div>
      <Header/>
      <div style={{padding:'16px'}}>
        <p className={styles.FormHeader}>챌린지와 인증방법을 설명해주세요.</p>
        <p className={styles.FormEx}>챌린지 참가자가 이해할 수 있도록 챌린지에 대한 자세한 설명과 
                              구체적인 인증방법을 작성해주세요.<br/>
                              개설된 챌린지의 설명은 수정할 수 없습니다.<br/></p>
        <p style={{marginTop: '16px'}}>챌린지 설명</p>
        <textarea
          className={styles.InputIntro}
          // value는 텍스트인풋에서 넘겨준 props
          value={explanation}
          type="text"
          maxLength="1000"
          // 값이 바뀔때를 감지하여 setValue값을 변경시켜주어 넘겨주자
          onChange={(e) => {
            setExplanation(e.target.value);
            setLength(e.target.value.length);
            setList(e.target.value);
          }}
        />
        <p style={{marginTop: '8px'}}>{length}/1000자 이내</p>
      </div>
      <div style={{padding:'16px'}}>
        <div className="PhotoBox">
          <p style={{marginBottom:'8px'}}>챌린지 대표 사진(선택)</p>
          <img
            onClick={handleClick}
            style={{ width: "120px", height: "120px" }}
            src={fileImage}
            alt="sample"
          />
          <input
            type="file"
            name="imgUpload"
            accept="image/*"
            onChange={selectFileImage}
            style={{ display: "none" }}
            ref={photoInput}
          />
        </div>
      </div>
      {list.length >=1 && fileImage!==photoUpload ? <NextButton/> : <NextButtonX/>}
    </div>
  );
}
export default ChallengeIntro;