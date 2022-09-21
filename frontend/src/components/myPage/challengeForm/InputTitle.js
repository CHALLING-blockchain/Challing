import { useState } from "react";


function InputTitle({formCnt,setFormCnt,value,setValue }) {
  const[title,setTitle] = useState("");
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
      <p className="FormHeader">챌린지 제목을 작성해주세요.</p>
      <p className="FormEx">챌린지를 잘 표현하는 제목을 사용해주세요.<br/>
        비속어와 같은 타인에게 불쾌감을 주는 언어 사용시 <br/>
        계정이 영구적으로 정지 될 수 있습니다.</p>
      <input
        className="Input"
        placeholder="제목을 작성해주세요."
        // value는 텍스트인풋에서 넘겨준 props
        value={value}
        type="text"
        maxLength="50"
        // 값이 바뀔때를 감지하여 setValue값을 변경시켜주어 넘겨주자
        onChange={(e) => {
          setValue(e.target.value);
          setTitle(e.target.value)
        }}
      />
      <p>(50자이내)</p>
      {title !== "" ? <NextButton/> : <div className="NoNextButton">Next( {formCnt} / 8)</div>}
    </div>
  );
}
export default InputTitle;