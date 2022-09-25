import { useState } from 'react';
import styles from './challengeForm.module.css';
import NextButtonStyles from '../../common/NextButton.module.css';
import {uploadImageFile} from '../../../plugins/s3upload';

function ChallengeIntro({formCnt,setFormCnt,explanation,setExplanation,exPhotoUrl,setExPhotoUrl}){
  // aws config

  const [length,setLength] = useState(0);
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  const [s3file, setS3File] = useState("");
  // 파일 선택
  const selectFileImage = async(e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]))
    setS3File(e.target.files[0])
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
  function NextButton(){
    return(
      <button className={NextButtonStyles.NextButton} onClick={()=>{setFormCnt(formCnt+1);s3SaveFileImage();}}>Next( {formCnt} / 8)</button>
    )
  }
  function NextButtonX(){
    return(
      <button className={NextButtonStyles.NextButtonX} disabled='false'>Next( {formCnt} / 8)</button>
    )
  }
  const[list,setList] = useState([]);
  return (
    <div>
      <div className="BackMyPage">
        <svg onClick={()=>{setFormCnt(formCnt-1)}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z" fill="#444444"/>
        </svg>
        <p>챌린지 개설하기</p>
      </div>
      <div>
        <p className={styles.FormHeader}>챌린지와 인증방법을 설명해주세요.</p>
        <p className={styles.FormEx}>챌린지 참가자가 이해할 수 있도록 챌린지에 대한 자세한 설명과 
                              구체적인 인증방법을 작성해주세요.<br/>
                              개설된 챌린지의 설명은 수정할 수 없습니다.<br/></p>
        <p>챌린지 설명</p>
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
        <p>{length}/1000자 이내</p>
      </div>
      <div>

        <input className={styles.FileUpload} type="file" accept="image/*" onChange={selectFileImage}/>
        {fileImage && (<div>
          <img alt="sample" src={fileImage} style={{width:"120px",height:"120px"}}/> 
          <button onClick={() => deleteFileImage()}>X</button>
        </div>)}
      </div>
      {list.length >=1   ? <NextButton/> : <NextButtonX/>}
    </div>
  );
}
export default ChallengeIntro;