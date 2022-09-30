import styles from './MainCategory.module.css';
import calender from "../../img/calender.png";
import gym from "../../img/gym.png";
import paint from "../../img/paint-kit.png";
import pencil from "../../img/pencil.png";
import plus from "../../img/plus.png";
import tea from "../../img/tea-cup.png";

function MainCategory({setCategory}){
  return(
    <div className={styles.CategoryBox}>
      <div className={styles.Category} 
           onClick={()=>{setCategory('0');console.log('click')}}>
        <img className={styles.Icon} alt="" src={gym}/>
        <p className={styles.Name}>운동</p>
      </div>
      <div className={styles.Category} 
           onClick={()=>{setCategory('4');console.log('click')}}>
        <img className={styles.Icon} alt="" src={pencil}/>
        <p className={styles.Name}>학습</p>
      </div>
      <div className={styles.Category} 
           onClick={()=>{setCategory('1');console.log('click')}}>
        <img className={styles.Icon} alt="" src={calender}/>
        <p className={styles.Name}>생활</p>
      </div>
      <div className={styles.Category} 
           onClick={()=>{setCategory('2');console.log('click')}}>
        <img className={styles.Icon} alt="" src={paint}/>
        <p className={styles.Name}>취미</p>
      </div>
      <div className={styles.Category} 
           onClick={()=>{setCategory('3');console.log('click')}}>
        <img className={styles.Icon} alt="" src={tea}/>
        <p className={styles.Name}>식생활</p>
      </div>
      <div className={styles.Category} 
           onClick={()=>{setCategory('5');console.log('click')}}>
        <img className={styles.Icon} alt="" src={plus}/>
        <p className={styles.Name}>그 외</p>
      </div>
    </div>
  )
}
export default MainCategory;