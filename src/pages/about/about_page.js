import React from "react";
import styles from "./about_page.module.css";
import homeStyles from "../home/home_page.module.css";
export const AboutPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.element1}>
        <div className={styles.subContainer}>
          <div className={styles.contentContainer1}>
            <img
              src={require("../../assets/imgs/aboutElement2.png")}
              alt="img"
              className={styles.aboutElement2}
            />
          </div>
          <div className={styles.contentContainer2}>
            <div className={styles.txtContainer}>
              <p className={styles.label}>ABOUT US</p>
              <p className={styles.detail}>
                Welcome to <b>Website</b>, We are student of the
                <b> 2021 (K16) </b>
                class at <b>University of Information Technology</b> in Ho Chi
                Minh city. This website is our 2nd project, developed under the
                guidance of our instructor, <b>Nguyen Tan Tran Minh Khang</b>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.contentContainer2}>
            <div className={styles.txtContainer}>
              <p className={styles.label}>ABOUT THIS WEBSITE</p>
              <p className={styles.detail}>
                Tenweb is a website developed for everyone to apply Artificial
                Intelligence to real life. The main function is “Hand Gesture
                Recognition”. Nonetheless, we have tried to develop more
                interesting functions for you such as “Realtime HGR”, “Control
                web by hand gesture”. These function are developed base on YOLO
              </p>
            </div>
          </div>
          <div className={styles.contentContainer3}>
            <img
              src={require("../../assets/imgs/aboutElement3.png")}
              alt="img"
              className={styles.aboutElement2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
