import styles from "./User.module.scss";
import { useState, useEffect } from "react";
import movieAPI from "../../services/movieAPI";
import { Table } from "@mantine/core";
import { FaPenFancy } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getUsers();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    // await movieAPI.deleteUsers(id)
    console.log(id);
  };

  return (
    <div>
      <div>
        <h1>Quản lí Người Dùng</h1>
        <a href="/">Đăng Nhập</a>
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
              <button className={styles.edit}>
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
