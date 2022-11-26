import fetcher from "./fetcher";

const theaterAPI = {
    getTheaterSystem : () => {
        return fetcher.get("QuanLyRap/LayThongTinHeThongRap");
    },

    getDetailTheater : (maHeThongRap) => {
        return fetcher.get("QuanLyRap/LayThongTinCumRapTheoHeThong",{
            params: {
                maHeThongRap: maHeThongRap,
            }
        })
    },

    getMovieSchedule : (maPhim) => {
        return fetcher.get("QuanLyRap/LayThongTinLichChieuPhim", {
            params: {
                MaPhim: maPhim,
            }
        })
    }

    
}

export default theaterAPI;