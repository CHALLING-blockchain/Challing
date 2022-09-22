import { useState } from 'react';
import './challengeForm.css';

function ShotExample({formCnt,setFormCnt,goodShotUrl,setGoodShotUrl,badShotUrl,setBadShotUrl}){
  //파일 미리볼 url을 저장해줄 state
  const [good,setGood] = useState("");
  const [bad,setBad] = useState("");
  // 파일 저장
  const saveGoodFileImage = (e) => {
    setGood(URL.createObjectURL(e.target.files[0]));
    setGoodShotUrl(URL.createObjectURL(e.target.files[0]));
  };
  // 파일 삭제
  const deleteGoodFileImage = () => {
    URL.revokeObjectURL(good);
    setGood("");
    setGoodShotUrl("");
  };
  const saveBadFileImage = (e) => {
    setBad(URL.createObjectURL(e.target.files[0]));
    setBadShotUrl(URL.createObjectURL(e.target.files[0]));
  };
  const deleteBadFileImage = () => {
    URL.revokeObjectURL(bad);
    setBad("");
    setBadShotUrl("");
  };
  function NextButton(){
    return(
      <button className="NextButton" onClick={()=>{setFormCnt(formCnt+1)}}>Next( {formCnt} / 8)</button>
    )
  }
  return (
    <div>
      <div className="BackMyPage">
        <svg onClick={()=>{setFormCnt(formCnt-1)}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z" fill="#444444"/>
        </svg>
        <p>챌린지 개설하기</p>
      </div>
      <div>
        <p className="FormHeader">인증샷 예시를 등록해주세요.</p>
        <p className="FormEx">챌린지 참여자의 혼란을 방지하고, 참여자의 인증샷이<br/> 
                              올바른지 판단할 수 있는 기준을 마련해주세요.<br/> 
                              챌린지 개설 수 인증샷 예시는 변경할 수 없습니다.<br/> </p>
      </div>

      <div>
        <div>
          <p>좋은 인증샹 예시</p>
          <input type="file" accept="image/*" onChange={saveGoodFileImage}/>
          {good && (<div>
            <img alt="sample" src={good} style={{width:"120px",height:"120px"}}/> 
            <button onClick={() => deleteGoodFileImage()}>X</button>
          </div>)}
        </div>
        <div>
        <p>나쁜 인증샹 예시</p>
          <input type="file" accept="image/*" onChange={saveBadFileImage}/>
          {bad && (<div>
            <img alt="sample" src={bad} style={{width:"120px",height:"120px"}}/> 
            <button onClick={() => deleteBadFileImage()}>X</button>
          </div>)}
        </div>
      </div>
      {good && bad !== ""   ? <NextButton/> : <div className="NoNextButton">Next( {formCnt} / 8)</div>}
    </div>
  );
}
export default ShotExample;