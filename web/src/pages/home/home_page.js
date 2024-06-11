import React from "react";
import styles from "./home_page.module.css";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.homeElenment1}>
        <div className={styles.labelContainer}>
          <p className={styles.labelleft}>AN</p>
          <p className={styles.labelleft}>ADVANCED</p>
          <div className={styles.subTextContainer}>
            <div className={styles.smallTextContainer}>
              <p className={styles.smalllabelleft}>Explore The Meaning Of</p>
              <b className={styles.smalllabelleft2}>Hand Gesture</b>
            </div>
            <p className={styles.labelright}>AI</p>
          </div>
          <button onClick={() => navigate("/model")} className={styles.button}>
            Try Now
          </button>
        </div>
      </div>

      <img
        alt=""
        src={require("../../assets/imgs/homeElement2.png")}
        className={styles.homeElenment2}
      />
    </div>
  );
};
