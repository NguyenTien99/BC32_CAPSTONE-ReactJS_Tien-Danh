import fetcher from "./fetcher";

const bookingMovieAPI = {
    getListBooking : (maLichChieu) => {
        return fetcher.get("QuanLyDatVe/LayDanhSachPhongVe", {
            params: {
                MaLichChieu: maLichChieu,
            }
        })
    }
}

export default bookingMovieAPI;