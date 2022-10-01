import { Background, LoadingText } from "./LoadingStyled";
import spinner from "../../img/spinner.gif";


function Loading () {
    return (
      <div>
        <Background>
          <LoadingText>잠시만 기다려 주세요🙂</LoadingText>
          <img src={spinner} alt="로딩중"/>
        </Background>
      </div>
    );
}

export default Loading;