import React from "react";
import styles from "./CategoryCard.module.css";

export default function CategoryCard(props) {
  const { photo, title, flag } = props;

  const sendClick = () => {
    props.sendClick(props);
  };
  return (
    <div className={flag ? styles.card : styles.cardX} onClick={sendClick}>
      <div>
        <img className={styles.imgTag} src={photo} alt="img" />
        <hr className={styles.hrTag} />
        <p className={styles.textTag}>{title}</p>
      </div>
    </div>
  );
}
