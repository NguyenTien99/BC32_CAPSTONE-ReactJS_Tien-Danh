import { Notification, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import bookingMovieAPI from '../../../services/bookingMovieAPI';
import { calcTotal, reloadBooking } from '../../../slices/bookingMovieSlice';
import {BsCheckCircleFill} from 'react-icons/bs'
import styles from './InfoBooking.module.scss'

const InfoBooking = ({maLichChieu}) => {
  const [isPage, setIsPage] = useState(false);
  const {infoMovie, selectedSeat, totalCost} = useSelector(state => state.bookingMovieSlice);

  const dispatch = useDispatch();

  useEffect(() => {

    return () => {
      dispatch(reloadBooking());
    }
  },[]);

  useEffect(() => {
    dispatch(calcTotal());
  },[selectedSeat]);

  const handlePayment = async () => {
    try {
      const danhSachVe = {
        maLichChieu : maLichChieu,
        danhSachVe: selectedSeat,
      }

      if(selectedSeat.length === 0) {
        alert("Bạn cần chọn ghê");
        return;
      }

      await bookingMovieAPI.postBookingTicket(danhSachVe);

      <Notification icon={<BsCheckCircleFill size={18} />} color="teal" title="Teal notification">
        This is teal notification with icon
      </Notification>

      dispatch(reloadBooking());

    } catch (error) {
      alert("Đặt vé thất bại");
      console.log(error);
    }
  }
  
  if(!infoMovie) {
    return <Loading />;
  }
  
  return (
    <div className={styles.wrapInfoBooking}>
      <h1>Thông tin đặt vé</h1>
      <Table verticalSpacing={"md"}>
      <tbody className={styles.tableInfo}>
      <tr>
        <td>Cụm rạp :</td>
        <td>{infoMovie.thongTinPhim.tenCumRap}</td>
      </tr>
      <tr>
        <td>Địa chỉ :</td>
        <td>{infoMovie.thongTinPhim.diaChi}</td>
      </tr>
      <tr>
        <td>Rạp :</td>
        <td>{infoMovie.thongTinPhim.tenRap}</td>
      </tr>
      <tr>
        <td>Ngày giờ chiếu :</td>
        <td>{`${infoMovie.thongTinPhim.ngayChieu} - ${infoMovie.thongTinPhim.gioChieu}`}</td>
      </tr>
      <tr>
        <td>Tên phim :</td>
        <td>{infoMovie.thongTinPhim.tenPhim}</td>
      </tr>
      <tr>
        <td>Ghế đang chọn :</td>
        <td>{selectedSeat.map(item => `Ghế ${item.tenGhe}, `)}</td>
      </tr>
      <tr></tr>
      </tbody>
    </Table>
      <p className={styles.totalCost}>{totalCost.toLocaleString()} VND</p>
      <button className={styles.buttonInfo} onClick={handlePayment}>Thanh toán</button>
    </div>
  );
};

export default InfoBooking;