import { useEffect } from "react";
import { Table, Modal, ScrollArea } from "@mantine/core";
import { FaPenFancy } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changModalUser } from "../../slices/modalSlice";
import { getInfoUserById, getUsers } from "../../slices/usersSlice";
import userAPI from "../../services/userAPI";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import styles from "./User.module.scss";

const User = () => {
  const { users, loadingUsers, loadingUserId, infoUser } = useSelector(
    (state) => state.usersSlice
  );
  const dispatch = useDispatch();
  const { modalUser } = useSelector((state) => state.modalSlice);

  const { register, handleSubmit, setValue, formState, reset } = useForm({
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

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!modalUser) return;
    if (!infoUser) return;
    for (const [key, value] of Object.entries(infoUser)) {
      setValue(key, value);
    }
  });

  const handleDelete = async (id) => {
    try {
      await userAPI.deleteUsers(id);
      dispatch(getUsers());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeletedUser = async (id) => {
    try {
      const data = await userAPI.getUserById(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log(id);
    dispatch(getInfoUserById(id));

    if (loadingUserId) {
      return;
    }

    dispatch(changModalUser());
  };

  const onSubmit = async (values) => {
    const { taiKhoan } = values;
    try {
      await userAPI.editUser(taiKhoan, values);
      swal("Chỉnh sửa người dùng thành công", "", "success");
      reset();
    } catch (error) {
      swal("Chỉnh sửa người dùng thất bại", `${error}`, "error");
      console.log(error);
    }
  };

  if (loadingUsers) {
    return;
  }

  return (
    <div className={styles.wrapUsers}>
      <div className="text-center my-4 ">
        <h1>QUẢN LÍ NGƯỜI DÙNG</h1>
      </div>

      <div className={styles.tableUser}>
        <ScrollArea style={{ height: 680 }}>
          <Table fontSize="md" striped withColumnBorders>
            <thead>
              <tr>
                <th>Tài Khoản</th>
                <th>Mật Khẩu</th>
                <th>Email</th>
                <th>Họ Tên</th>
                <th>Mã Loại Người Dùng</th>
                <th>Số Điện Thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.taiKhoan}>
                  <td>{item.taiKhoan}</td>
                  <td>{item.matKhau}</td>
                  <td>{item.email}</td>
                  <td>{item.hoTen}</td>
                  <td>{item.maLoaiNguoiDung}</td>
                  <td>{item.soDT}</td>
                  <td>
                    <button
                      className={styles.edit}
                      onClick={() => handleSeletedUser(item.taiKhoan)}
                    >
                      <FaPenFancy />
                    </button>

                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(item.taiKhoan)}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </div>

      <Modal
        opened={modalUser}
        onClose={() => dispatch(changModalUser())}
        title="Edit User"
        size="55%"
        classNames={{ modal: styles.wrapEditModal }}
        styles={{ title: { fontSize: "30px" } }}
      >
        <div className={styles.modalEditUser}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className={styles.inputAdd}>
                  <label>Tài khoản</label>
                  <input
                    disabled={modalUser}
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
                  <label className="d-block">Mật khẩu</label>
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

            <div className={styles.btnEditUser}>
              <button className="btn btn-success ">Sửa người dùng</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default User;
