import React from "react";
import styles from "./ControlLeft.module.scss";
import { Link } from "react-router-dom";
import { NavLink } from "@mantine/core";
import { useDispatch } from "react-redux";

import { logout } from '../../slices/authSlice'

const ControlLeft = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.control}>
      <div>
        <img
          height="80px"
          width="100%"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png"

          alt="onepiece"
        />
      </div>
      <div className="mt-4">
        <NavLink label=" Quản lí người dùng" active variant="filled">
          <Link to="/admin/users">
            <NavLink label="Người dùng" active color="gray" />
          </Link>
          <Link to="/admin/addUsers">
            <NavLink label="Thêm người dùng" active color="gray" />
          </Link>
        </NavLink>
        <NavLink label="Quản lí phim" active variant="filled">
          <Link to="/admin/movies">
            <NavLink label="Phim và thêm lịch chiếu" active color="gray" />
          </Link>
          <Link to="/admin/addMovies">
            <NavLink label="Thêm phim" active color="gray" />
          </Link>
        </NavLink>
        <NavLink label="Tài khoản" active variant="filled">
            <NavLink label="Đăng xuất" active color="gray" onClick={() => dispatch(logout())} />
        </NavLink>
      </div>

    </div>
  );
};

export default ControlLeft;
