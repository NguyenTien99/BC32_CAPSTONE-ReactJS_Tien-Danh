import fetcher from "./fetcher";

const userAPI = {
  getUsers: () => {
    return fetcher.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        MaNhom: "GP06",
      },
    });
  },

  addUser: (values) => {
    return fetcher.post("QuanLyNguoiDung/ThemNguoiDung", {
      ...values,
      MaNhom: "GP06",
    });
  },

  getUserById: (taiKhoan) => {
    return fetcher.post("QuanLyNguoiDung/LayThongTinNguoiDung",null, {
      params: {
        taiKhoan
      },
    });
  },

  getInfoAccount: () => {
    return fetcher.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  editUser: (taiKhoan,values) => {
    return fetcher.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", values, {
      params: {
        taiKhoan : taiKhoan,
      }
    });
  },

  deleteUsers: (TaiKhoan) => {
    return fetcher.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan,
      },
    });
  },
};

export default userAPI;
