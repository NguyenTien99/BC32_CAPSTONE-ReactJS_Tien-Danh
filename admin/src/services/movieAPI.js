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

  AddMovies: (values) => {
    return fetcher.post("QuanLyPhim/ThemPhimUploadHinh", values);
  },

  getInfoMoviesById: (id) => {
    return fetcher.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: id,
      },
    });
  },

  updateMovie: (values) => {
    return fetcher.post("QuanLyPhim/CapNhatPhimUpload", values);
  },


  //Add schedule
  addScheduleMovie: (values) => {
    return fetcher.post("QuanLyDatVe/TaoLichChieu", values);
  },

  //Get Lấy mã cụm rạp
  getDetailTheater : () => {
    return fetcher.get("QuanLyRap/LayThongTinLichChieuHeThongRap")
  }

};

export default movieAPI;
