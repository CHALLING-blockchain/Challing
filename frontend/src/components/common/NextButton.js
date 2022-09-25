import React from "react";
import styles from "./NextButton.module.css";

export default function NextButton(props) {
  const { label, onClick, disabled, flag } = props;
  return (
    <div className={styles.buttonBox}>
      <button
        className={flag ? styles.NextButton : styles.NextButtonX}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}
