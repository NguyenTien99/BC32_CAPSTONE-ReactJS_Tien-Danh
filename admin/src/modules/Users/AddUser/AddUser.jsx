import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import userAPI from "../../../services/userAPI";
import { getUsers } from "../../../slices/usersSlice";
import swal from "sweetalert";
import styles from "./AddUser.module.scss";

const AddUser = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      hoTen: "",
      maLoaiNguoiDung: "",
    },
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await userAPI.addUser(values);
      dispatch(getUsers());
      swal("Thêm người dùng thành công", "", "success");
      reset();
    } catch (error) {
      swal("Thêm người dùng Thất bại", `${error}`, "error");
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapAddUser}>
      <div className={styles.AddUser}>
        <h1>Thêm người dùng</h1>
        <div className={styles.formAddUser}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className={styles.inputAdd}>
                  <label>Tài khoản</label>
                  <input
                    type="text"
                    {...register("taiKhoan", {
                      required: {
                        value: true,
                        message: "Tài khoản không được để trống!",
                      },
                      minLength: {
                        value: 5,
                        message: "Tài khoản phải từ 5 - 20 kí tự",
                      },
                      maxLength: {
                        value: 20,
                        message: "Tài khoản phải từ 5 - 20 kí tự",
                      },
                    })}
                  />
                  {errors.taiKhoan && (
                    <p className={styles.txtError}>{errors.taiKhoan.message}</p>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className={styles.inputAdd}>
                  <label>Mật khẩu</label>
                  <input
                    type="text"
                    {...register("matKhau", {
                      required: {
                        value: true,
                        message: "Mật khẩu không được để trống!",
                      },
                      minLength: {
                        value: 5,
                        message: "Mật khẩu phải từ 5 - 20 kí tự",
                      },
                      maxLength: {
                        value: 20,
                        message: "Mật khẩu phải từ 5 - 20 kí tự",
                      },
                    })}
                  />
                  {errors.matKhau && (
                    <p className={styles.txtError}>{errors.matKhau.message}</p>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className={styles.inputAdd}>
                  <label>Email</label>
                  <input
                    type="text"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email không được để trống!",
                      },
                      pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                        message: "Email phải đúng định dạng",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className={styles.txtError}>{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className={styles.inputAdd}>
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    {...register("soDT", {
                      required: {
                        value: true,
                        message: "Số điện thoại không được để trống!",
                      },
                    })}
                  />
                  {errors.soDT && (
                    <p className={styles.txtError}>{errors.soDT.message}</p>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className={styles.inputAdd}>
                  <label>Loại người dùng</label>
                  <select
                    {...register("maLoaiNguoiDung", {
                      required: {
                        value: true,
                        message: "Loại người dùng không được để trống",
                      },
                    })}
                  >
                    <option value="">Chọn loại người dùng</option>
                    <option value="KhachHang">Khách hàng</option>
                    <option value="QuanTri">Quản trị</option>
                  </select>
                  {errors.maLoaiNguoiDung && (
                    <p className={styles.txtError}>
                      {errors.maLoaiNguoiDung.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className={styles.inputAdd}>
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    {...register("hoTen", {
                      required: {
                        value: true,
                        message: "Họ và tên không được để trống!",
                      },
                    })}
                  />
                  {errors.hoTen && (
                    <p className={styles.txtError}>{errors.hoTen.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-success py-3 px-5">
                Thêm người dùng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
