import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import swal from "sweetalert";


const AdminProtected = ({ children }) => {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/logIn" replace />;
  }

  if (user.maLoaiNguoiDung !== "QuanTri") {
    swal("Tài khoản phải là quản trị","", "error")
    dispatch(logout());
    return;
  }

  return children;
};

export default AdminProtected;
