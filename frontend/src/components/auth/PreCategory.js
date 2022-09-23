import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import UserAPI from "../../api/UserAPI";
import styles from "./PreCategory.module.css";
import CategoryCard from "../common/CategoryCard";
import Next from "../common/NextButton";
import calender from "../../img/calender.png";
import gym from "../../img/gym.png";
import paint from "../../img/paint-kit.png";
import pencil from "../../img/pencil.png";
import plus from "../../img/plus.png";
import tea from "../../img/tea-cup.png";

function PreCategory() {
  const interests = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const addInterest = (props) => {
    console.log("click", props.title);
    if (interests.includes(props.title)) {
      interests.pop(props.title);
    } else {
      interests.push(props.title);
    }
    console.log(interests);
  };

  const join = () => {
    if (interests.length === 0) {
      alert("관심사를 선택해주세요!");
      return;
    } else {
      const body = {
        email: user.email,
        nickname: user.nickname,
        picURL: user.picURL,
        interests: interests,
      };
      UserAPI.join(body).then((response) => {
        console.log("response", response);
        dispatch(setUserInfo(response.data.body));
        navigate("/my-wallet");
      });
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <span>관심 카테고리</span>
      </div>

      <div className={styles.cardBox}>
        <CategoryCard
          photo={gym}
          title="운동"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={calender}
          title="생활"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={paint}
          title="취미"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={tea}
          title="식생활"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={pencil}
          title="학습"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={plus}
          title="그 외"
          sendClick={addInterest}
        ></CategoryCard>
      </div>

      <Next
        type="submit"
        label="시작하기"
        onClick={join}
        disabled={false}
      ></Next>
    </div>
  );
}

export default PreCategory;
