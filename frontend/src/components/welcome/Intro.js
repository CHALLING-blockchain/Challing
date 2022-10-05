import React from "react";
import styles from "./Intro.module.css"
import logo from "../../img/logo-white.png"
import phone from "../../img/intro_phone.png"

function Intro(){
    return(
        <div className={styles.totalBox}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.flip}>  
                <div className={styles.card}>
                    <div className={styles.front}>
                        <div className={styles.imgBox}>
                            <img src={phone} alt="" />
                        </div>
                    </div>
                    <div className={styles.back}>
                        <div className={styles.contents}>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Intro;