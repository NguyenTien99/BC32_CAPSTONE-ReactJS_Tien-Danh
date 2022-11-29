import fetcher from "./fetcher";

const movieAPI = {
  getMovies: () => {
    return fetcher.get("QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP06",
      },
    });
  },

  deleteMovies: (id) => {
    return fetcher.delete("QuanLyPhim/XoaPhim", {
      params: {
        MaPhim: id,
      },
    });
  },

  AddMovies: (movieAPI) => {
    return fetcher.post("QuanLyPhim/ThemPhimUploadHinh", {
      params: {
        maPhim: movieAPI,
      },
    });
  },

  getUsers: () => {
    return fetcher.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        MaNhom: "GP06",
      },
    });
  },

  deleteUsers: (id) => {
    return fetcher.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: id,
      },
    });
  },
};

export default movieAPI;
