import fetcher from "./fetcher";

const movieAPI = {
  getBanner: () => {
    return fetcher.get("QuanLyPhim/LayDanhSachBanner");
  },

  getMovie: () => {
    return fetcher.get("QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP07",
      },
    });
  },

  getMovieDetail: (movieId) => {
    return fetcher.get("QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },

  getMoviePaginate: (soTrang, soPhanTuTrenTrang) => {
    return fetcher.get("QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params: {
        maNhom: "GP07",
        soTrang,
        soPhanTuTrenTrang,
      },
    });
  },
};

export default movieAPI;
