import styles from "./User.module.scss";
import { useState, useEffect } from "react";
import movieAPI from "../../services/movieAPI";
import { Table } from "@mantine/core";
import { FaPenFancy } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { changModalUser } from "../../slices/modalSlice";

const User = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  const getUsersAPI = async () => {
    try {
      const data = await movieAPI.getUsers();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersAPI();
  }, []);

  const handleDelete = async (id) => {
    try {
      await movieAPI.deleteUsers(id);
      getUsersAPI();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await movieAPI.getUsers(id);
      dispatch(changModalUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Quản lí Người Dùng</h1>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Họ Tên</th>
            <th>Mã Loại Người Dùng</th>
            <th>Mật Khẩu</th>
            <th>Số Điện Thoại</th>
            <th>Tài Khoản</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item) => (
            <tr key={item.taiKhoan}>
              <td>{item.email}</td>
              <td>{item.hoTen}</td>
              <td>{item.maLoaiNguoiDung}</td>
              <td>{item.matKhau}</td>
              <td>{item.soDT}</td>
              <td>{item.taiKhoan}</td>
              <button
                className={styles.edit}
                onClick={() => handleEdit(item.taiKhoan)}
              >
                <FaPenFancy />
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDelete(item.taiKhoan)}
              >
                <AiFillDelete />
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
