import React from "react";
import ControlLeft from "../leftControl/ControlLeft";
import { Outlet } from "react-router-dom";

const Rootlayout = () => {
  return (
    <div className="row">
      <div className="col-2">
        <ControlLeft />
      </div>
      <div className="col-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Rootlayout;
