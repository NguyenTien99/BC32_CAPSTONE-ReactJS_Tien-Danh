import { useState } from "react";
import styles from "./MoviesEdit.module.scss";
import { useForm } from "react-hook-form";
import { Switch } from "@mantine/core";
import fetcher from "../../../services/fetcher";

const MovieAdd = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayChieu: "",
      dangChieu: "",
      sapChieu: "",
      hot: "",
      soSao: "",
      hinhAnh: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, hinhAnh: values.hinhAnh[0], maNhom: "GP06" };

      const formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }

      await fetcher.post("QuanLyPhim/ThemPhimUploadHinh", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <h1>Thêm Mới Phim</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <label>Tên Phim</label>
          <input type="text" {...register("tenPhim")} />
        </div>
        <div className={styles.input}>
          <label>Trailer </label>
          <input type="text" {...register("trailer")} />
        </div>
        <div className={styles.input}>
          <label>Mô Tả : </label>
          <input type="text" {...register("moTa")} />
        </div>
        <div className={styles.input}>
          <label>Ngày chiếu : </label>
          <input type="date" {...register("ngayChieu")} />
        </div>
        <div className={styles.right}>
          <label>Đang Chiếu :</label>
          <Switch {...register("dangChieu")} />
        </div>
        <div className={styles.right}>
          <label>Sắp Chiếu :</label>
          <Switch {...register("sapChieu")} />
        </div>
        <div className={styles.right}>
          <label>Hot : </label>
          <Switch {...register("hot")} />
        </div>
        <div className={styles.input}>
          <label>Số Sao : </label>
          <input width="20px" type="text" {...register("soSao")} />
        </div>
        <div>
          <label>Hình Ảnh : </label>
          <input type="file" {...register("hinhAnh")} />
        </div>
        <button>Thêm Phim</button>
      </form>
    </div>
  );
};

export default MovieAdd;
