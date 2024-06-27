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
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeTxt : styles.txtNav
        }
      >
        Home
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
        Model
      </NavLink>
      <NavLink
        to="/game"
        className={({ isActive }) =>
          isActive ? styles.activeTxt : styles.txtNav
        }
      >
        Game
      </NavLink>
      <NavLink
        to="/asl"
        className={({ isActive }) =>
          isActive ? styles.activeTxt : styles.txtNav
        }
      >
        ASL
      </NavLink>
    </div>
  );
};
