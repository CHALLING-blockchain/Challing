import { useState } from "react";


function SelectDonation({formCnt,setFormCnt,donation,setDonation,donationMoney,setDonationMoney,options}) {
  const [money,setMoney] = useState(0);
  const [dona,setDona] = useState("");
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
        <p className="FormHeader">기부금을 설정해주세요.</p>
        <p className="FormEx">챌린지 성공 시 기부처로 전달될 기부금을 설정해주세요.<br/>
                              최소금액은 0.05 ETH 입니다.<br/>
                              챌린지 개설 후 기부금 변경이 불가합니다.<br/></p>
        <input
          className="Input"
          placeholder="기부금을 입력해주세요."
          // value는 텍스트인풋에서 넘겨준 props
          value={donationMoney}
          type="number"
          // 값이 바뀔때를 감지하여 setValue값을 변경시켜주어 넘겨주자
          onChange={(e) => {
            setDonationMoney(e.target.value);
            setMoney(e.target.value);
          }}
        />
        <p>*숫자만 입력가능합니다.</p>
      </div>
      <div>
        <p className="FormHeader">기부처를 선택해주세요.</p>
        <p className="FormEx">챌린지 성공 시 기부금이 전달 될 기부처를 선택해주세요.</p>
        <select value={donation} onChange={(e)=>{setDonation(e.target.value); setDona(e.target.value);}}>
          <option value=""> 기부처를 선택해주세요.</option>
          {options.map((item)=>(
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
     { money && dona !== "" ? <NextButton/> : <div className="NoNextButton">Next( {formCnt} / 8)</div>}
    </div>
  );
}
export default SelectDonation;