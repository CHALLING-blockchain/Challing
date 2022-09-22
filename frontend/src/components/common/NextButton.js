import React from "react";
import styles from "./NextButton.module.css"

export default function NextButton(props) {
    const { label, onClick, disabled } = props;
    return (
        <div className={styles.buttonBox}>
            <button className={styles.NextButton} onClick={onClick} disabled={disabled}>
                {label}
            </button>
        </div>
    )
}