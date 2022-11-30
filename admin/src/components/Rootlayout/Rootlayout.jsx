import ControlLeft from "../leftControl/ControlLeft";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "@mantine/core";
import { useDispatch } from "react-redux";
import { changeModalEditMovie, changModalUser } from "../../slices/modalSlice";
import styles from "./Rootlayout.module.scss";

const Rootlayout = () => {
  const { isopeneditmovies } = useSelector((state) => state.modalSlice);
  const { modalUser } = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();

  return (
    <div className="row">
      <div className="col-2">
        <ControlLeft />
      </div>
      <div className="col-10">
        <Outlet />
      </div>
      <Modal
        opened={isopeneditmovies}
        onClose={() => dispatch(changeModalEditMovie)}
        title="Edit Movie"
      >
        <form>
          <div className={styles.form}>
            <h5>Mã Phim</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Hình Ảnh</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Tên Phim</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Mô Tả</h5>
            <input type="text" />
          </div>
          <button>Cập Nhật</button>
        </form>
      </Modal>
      <Modal
        opened={modalUser}
        onClose={() => dispatch(changModalUser)}
        title="Edit User"
      >
        <form>
          <div className={styles.form}>
            <h5>Email</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Họ Tên</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Mã Loại Người Dùng</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Mật Khẩu</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Số Điện Thoại</h5>
            <input type="text" />
          </div>
          <div className={styles.form}>
            <h5>Tài Khoản</h5>
            <input type="text" />
          </div>
          <button>Cập Nhật</button>
        </form>
      </Modal>
    </div>
  );
};

export default Rootlayout;
