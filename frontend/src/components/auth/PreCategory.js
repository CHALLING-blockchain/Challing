import { React } from "react";
import styles from "./PreCategory.module.css";
import CategoryCard from "../common/CategoryCard";
import Next from "../common/NextButton";
import calender from "../../img/calender.png"
import gym from "../../img/gym.png"
import paint from "../../img/paint-kit.png"
import pencil from "../../img/pencil.png"
import plus from "../../img/plus.png"
import tea from "../../img/tea-cup.png"


function PreCategory(){
  return (
    <div>
      <div className={styles.title}>
        <span>관심 카테고리</span>  
      </div>  

      <div className={styles.cardBox}>
        <CategoryCard photo={gym} title="운동"></CategoryCard>
        <CategoryCard photo={calender} title="생활"></CategoryCard>
        <CategoryCard photo={paint} title="취미"></CategoryCard>
        <CategoryCard photo={tea} title="식생활"></CategoryCard>
        <CategoryCard photo={pencil} title="학습"></CategoryCard>
        <CategoryCard photo={plus} title="그 외"></CategoryCard>
      </div>
      
      <Next 
        type="submit"
        label="시작하기"
        onClick={()=>{}}
        disabled="false"></Next>
    </div>
  );
}

export default PreCategory;