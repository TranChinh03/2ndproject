import React from "react";
import styles from "./nav_bar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <NavLink to="/" exact={true} className={styles.txtWeb}>
        Webname
      </NavLink>
      <NavLink to="/about" exact={true} className={styles.txtNav}>
        About us
      </NavLink>
    </div>
  );
};
