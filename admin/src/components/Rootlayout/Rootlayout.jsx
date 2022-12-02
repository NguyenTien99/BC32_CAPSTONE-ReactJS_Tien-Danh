import ControlLeft from "../leftControl/ControlLeft";
import { Outlet } from "react-router-dom";
import styles from "./Rootlayout.module.scss";

const Rootlayout = () => {


  return (
    <div className={styles.wrapRoot}>
    <div className="row" style={{width: "100%", margin: 0}}>
      <div className="col-2 p-0">
        <ControlLeft />
      </div>
      <div className="col-10 p-0">
        <Outlet />
      </div>
    </div>
    </div>
  );
};

export default Rootlayout;
