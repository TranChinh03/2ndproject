import React from "react";
import styles from "./nav_bar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <NavLink to="/" className={styles.txtWeb}>
        Henzesture
      </NavLink>
      <NavLink to="/about" className={styles.txtNav}>
        About us
      </NavLink>
      <NavLink to="/game" className={styles.txtNav}>
        Game
      </NavLink>
    </div>
  );
};
