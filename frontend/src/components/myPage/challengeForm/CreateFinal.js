import calender from "../../../img/calender.png";
import gym from "../../../img/gym.png";
import paint from "../../../img/paint-kit.png";
import pencil from "../../../img/pencil.png";
import plus from "../../../img/plus.png";
import tea from "../../../img/tea-cup.png";
import donationIcon from '../../../img/donation-challenge-hand.png';
import dailyIcon from '../../../img/daily-challenge-hand.png';
import ethCoin from '../../../img/ethCoin.png';
import camera from '../../../img/camera.png';
import profile from '../../../img/profile-basic.png';

function CreateFinal({selects,formCnt,setFormCnt}){
  function DonationChallenge(){
    return(
      <div style={{display:'flex',justifyContent:'space-around'}}>
        <div style={{width:'104px',height:'96px'}}>
          <img src={donationIcon} alt="donationIcon" style={{width:'52px'}}/>
          <p>{selects.challenge}</p>
        </div>
        <div style={{width:'104px',height:'96px'}}>
          {selects.topic === "운동" ? <div><img src={gym} alt="gym" style={{width:'48px'}}/><p>{selects.topic}</p></div> : null}
          {selects.topic === "생황" ? <div><img src={calender} alt="calender" style={{width:'48px'}}/><p>{selects.topic}</p></div> : null}
          {selects.topic === "취미" ? <div><img src={paint} alt="paint" style={{width:'48px'}}/><p>{selects.topic}</p></div> : null}
          {selects.topic === "식생활" ? <div><img src={tea} alt="tea" style={{width:'48px'}}/><p>{selects.topic}</p></div> : null}
          {selects.topic === "학습" ? <div><img src={pencil} alt="pencil" style={{width:'48px'}}/><p>{selects.topic}</p></div> : null}
          {selects.topic === "그 외" ? <div><img src={plus} alt="plus" style={{width:'48px'}}/><p>{selects.topic}</p></div> : null}
        </div>
        <div style={{width:'104px',height:'96px'}}>
          <img src={ethCoin} alt="ethCoin" style={{width:'40px'}}/>
          <p>{selects.donationMoney}</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={ethCoin} alt="ethCoin" style={{width:'40px'}}/>
          <p>챌린지 설명 보기</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={camera} alt="camera" style={{width:'40px'}}/>
          <p>인증샷 예시 보기</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={ethCoin} alt="ethCoin" style={{width:'40px'}}/>
          <p>주 {selects.nTimesAWeek}일 / 하루 {selects.authentications}회</p>
          <p>{selects.startTime}:00 ~ {selects.endTime}:00</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={calender} alt="calender" style={{width:'40px'}}/>
          <p>{selects.period/7}주동안</p>
          <p>{selects.challengeStart.toLocaleDateString()}부터</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={profile} alt="profile" style={{width:'40px'}}/>
          <p>{selects.peopleLimit === false ? <p>인원 제한 없음</p> : <p>인원 제한 있음</p>}</p>
          <p>{selects.limitNum}명</p>
        </div>
      </div>
    )
  }
  function DailyChallenge(){
    return(
      <div>
        <div style={{width:'104px',height:'96px'}}>
          <img src={dailyIcon} alt="dailyIcon" style={{height:'50px'}}/>
          <p>{selects.challenge}</p>
        </div>
        <div style={{width:'104px',height:'96px'}}>
          {selects.topic === "운동" ? <div><img src={gym} alt="gym"/><p>{selects.topic}</p></div> : null}
          {selects.topic === "생황" ? <div><img src={calender} alt="calender"/><p>{selects.topic}</p></div> : null}
          {selects.topic === "취미" ? <div><img src={paint} alt="paint"/><p>{selects.topic}</p></div> : null}
          {selects.topic === "식생활" ? <div><img src={tea} alt="tea"/><p>{selects.topic}</p></div> : null}
          {selects.topic === "학습" ? <div><img src={pencil} alt="pencil"/><p>{selects.topic}</p></div> : null}
          {selects.topic === "그 외" ? <div><img src={plus} alt="plus"/><p>{selects.topic}</p></div> : null}
        </div>
        <div style={{width:'104px',height:'96px'}}>
          <img src={ethCoin} alt="ethCoin" style={{width:'40px'}}/>
          <p>{selects.dailyMoney}</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={ethCoin} alt="ethCoin" style={{width:'40px'}}/>
          <p>챌린지 설명 보기</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={camera} alt="camera" style={{width:'40px'}}/>
          <p>인증샷 예시 보기</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={ethCoin} alt="ethCoin" style={{width:'40px'}}/>
          <p>주 {selects.nTimesAWeek}일 / 하루 {selects.authentications}회</p>
          <p>{selects.startTime}:00 ~ {selects.endTime}:00</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={calender} alt="calender" style={{width:'40px'}}/>
          <p>{selects.period/7}주동안</p>
          <p>{selects.challengeStart.toLocaleDateString()}부터</p>
        </div>
        <div style={{width:'160px',height:'96px'}}>
          <img src={profile} alt="profile" style={{width:'40px'}}/>
          <p>{selects.peopleLimit === false ? <p>인원 제한 없음</p> : <p>인원 제한 있음</p>}</p>
          <p>{selects.limitNum}명</p>
        </div>
      </div>
    )
  }
  return(
    <div>
      <div className="BackMyPage">
        <svg onClick={()=>{setFormCnt(formCnt-1)}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.08 1.99341C10.7534 1.66675 10.2267 1.66675 9.90004 1.99341L4.36004 7.53341C4.10004 7.79341 4.10004 8.21341 4.36004 8.47341L9.90004 14.0134C10.2267 14.3401 10.7534 14.3401 11.08 14.0134C11.4067 13.6867 11.4067 13.1601 11.08 12.8334L6.25337 8.00008L11.0867 3.16675C11.4067 2.84675 11.4067 2.31341 11.08 1.99341Z" fill="#444444"/>
        </svg>
        <p>챌린지 개설하기</p>
      </div>
      {selects.challenge === "기부챌린지" ? <DonationChallenge/> : <DailyChallenge/>}
    </div>
  )
}
export default CreateFinal;