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
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? styles.activeTxt : styles.txtNav
        }
      >
        About us
      </NavLink>
      <NavLink
        to="/model"
        className={({ isActive }) =>
          isActive ? styles.activeTxt : styles.txtNav
        }
      >
        Detect
      </NavLink>
      <NavLink
        to="/game"
        className={({ isActive }) =>
          isActive ? styles.activeTxt : styles.txtNav
        }
      >
        Game
      </NavLink>
    </div>
  );
};
