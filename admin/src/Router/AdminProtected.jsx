import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const { user } = useSelector((state) => state.authSlice);
  console.log(user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.maLoaiNguoiDung !== "QuanTri") {
    alert("thất bại");
    return;
  }
  return children;
};

export default AdminProtected;
