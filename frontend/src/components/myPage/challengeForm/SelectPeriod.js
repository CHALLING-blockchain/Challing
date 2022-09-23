import { useEffect, useState } from 'react';
import './challengeForm.css';
import Calender from "../../../img/calender.png";
import DatePicker from "react-datepicker";
import addMonths from 'date-fns/addMonths';
import { ko } from '../../../../node_modules/date-fns/esm/locale';
import  '../../../../node_modules/react-datepicker/dist/react-datepicker.css'

function SelectPeriod({formCnt,setFormCnt,period,setPeriod,setChallengeStart,setChallengeEnd}){
  const[num,setNum] = useState(0);
  const[day,setDay] = useState(0);
  const[endDate,setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  useEffect(()=>{setChallengeEnd(endDate)},[endDate])
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
      <p className="FormHeader">챌린지의 기간을 설정해주세요.</p>
      <p className="FormEx">챌린지의 시작일자와 기간을 설정해주세요.<br/>
                            챌린지 개설 후 변경이 불가합니다.<br/></p>
      <div className="Weeks">
        <div className="SelectWeeks" value={period} onClick={()=>{setPeriod(7);setDay(7);setNum((current)=>current+1);}}>
          <p>1주</p>
        </div>
        <div className="SelectWeeks" value={period} onClick={()=>{setPeriod(14);setDay(14);setNum((current)=>current+1);}}>
          <p>2주</p>
        </div>
        <div className="SelectWeeks" value={period} onClick={()=>{setPeriod(21);setDay(21);setNum((current)=>current+1);}}>
          <p>3주</p>
        </div>
        <div className="SelectWeeks" value={period} onClick={()=>{setPeriod(28);setDay(28);setNum((current)=>current+1);}}>
          <p>4주</p>
        </div>
        <div className="SelectWeeks" value={period} onClick={()=>{setPeriod(35);setDay(35);setNum((current)=>current+1);}}>
          <p>5주</p>
        </div>
        <div className="SelectWeeks" value={period} onClick={()=>{setPeriod(42);setDay(42);setNum((current)=>current+1);}}>
          <p>6주</p>
        </div>
      </div>
      <div className='SelectDate'>
        <DatePicker
        className='DatePicker'
        dateFormat='yyyy/MM/dd'
        locale={ko}
        selected={startDate}
        onChange={(date) => {
                    const start = new Date(date) 
                    setStartDate(start);
                    setChallengeStart(date);
                    setEndDate(new Date(date.setDate(date.getDate()+day)));
                    setNum((current)=>current+1);}}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 5)}
        showDisabledMonthNavigation
        />
        <img style={{width:'24px',height:'24px'}} src={Calender} alt='calenderIcon'/>
      </div>
      <div>
        {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
      </div>
      {num === 2 ? <NextButton/> : <div className="NoNextButton">Next( {formCnt} / 8)</div>}
    </div>
  );
};

export default SelectPeriod;