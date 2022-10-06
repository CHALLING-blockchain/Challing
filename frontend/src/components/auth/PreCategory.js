import { React, useState } from "react";
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
  const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [flagList, setFlagList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const totalInterests = ["운동", "생활", "취미", "식생활", "학습", "그 외"];
  const [nextFlag, setNextFlag] = useState(false);

  const addInterest = (props) => {
    // console.log("click", props.title);
    let newFlagList = [...flagList];
    let newInterests = [...interests];

    if (interests.includes(props.title)) {
      let totalIndex = totalInterests.indexOf(props.title);
      newFlagList[totalIndex] = false;
      newInterests.splice(interests.indexOf(props.title), 1);
      setInterests([...newInterests]);
    } else {
      let totalIndex = totalInterests.indexOf(props.title);
      newFlagList[totalIndex] = true;
      newInterests.push(props.title);
      setInterests([...newInterests]);
    }
    setFlagList(newFlagList);
    // console.log("interests", interests);
    // console.log("newInterests", newInterests);
    // console.log("flagList", flagList);

    if (newInterests.length === 0) {
      setNextFlag(false);
    } else {
      setNextFlag(true);
    }
  };

  const join = () => {
    // console.log("join Interests", interests);
    if (!nextFlag) {
      return;
    } else {
      const body = {
        email: user.email,
        nickname: user.nickname,
        picURL: user.picURL,
        interests: interests,
      };
      UserAPI.join(body).then((response) => {
        // console.log("response", response);
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
          flag={flagList[0]}
          title="운동"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={calender}
          flag={flagList[1]}
          title="생활"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={paint}
          flag={flagList[2]}
          title="취미"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={tea}
          flag={flagList[3]}
          title="식생활"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={pencil}
          flag={flagList[4]}
          title="학습"
          sendClick={addInterest}
        ></CategoryCard>
        <CategoryCard
          photo={plus}
          flag={flagList[5]}
          title="그 외"
          sendClick={addInterest}
        ></CategoryCard>
      </div>

      <Next
        type="submit"
        label="시작하기"
        flag={nextFlag}
        onClick={join}
        disabled={false}
      ></Next>
    </div>
  );
}

export default PreCategory;
