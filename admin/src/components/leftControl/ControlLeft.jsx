import React from "react";
import styles from "./ControlLeft.module.scss";
import { Link } from "react-router-dom";
import { NavLink } from "@mantine/core";

const ControlLeft = () => {
  return (
    <div className={styles.control}>
      <img height="80px" width="100%" src="./onepiece.png" alt="#" />
      <ul>
        <li>
          <Link to="/">
            <NavLink label="USER" />
          </Link>
        </li>
        <li>
          <NavLink label="MOVIES">
            <Link to="/movie">
              <NavLink label="MOVIES" />
            </Link>
            <Link to="/movieAdd">
              <NavLink label="MOVIES_ADD" />
            </Link>
          </NavLink>
        </li>
        <li></li>
        <li>
          <Link to="/movie">Showtimes</Link>
        </li>
      </ul>
    </div>
  );
};

export default ControlLeft;
