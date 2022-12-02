import { useForm } from "react-hook-form";
import { Switch } from "@mantine/core";
import swal from "sweetalert";
import movieAPI from "../../../services/movieAPI";
import { useState } from "react";
import styles from "./MoviesAdd.module.scss";

const MovieAdd = () => {
  const { register, handleSubmit, formState, setValue, reset } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: "",
      sapChieu: "",
      hot: "",
      danhGia: "",
      hinhAnh: "",
    },
    mode: "onTouched",
  });

  const { errors } = formState;
  const [imgPreview, setImgPreview] = useState(null);

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, maNhom: "GP06" };

      const formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }

      // await fetcher.post("QuanLyPhim/ThemPhimUploadHinh", formData);
      await movieAPI.AddMovies(formData);

      swal("Thêm phim thành công", "", "success");
      reset()
    } catch (error) {
      swal("Thêm phim thất bại", `${error}`, "error");
      console.log(error);
    }
  };

  const handleChangeImage = (evt) => {

    const file = evt.target.files[0]

    if(!file) return;

    setValue("hinhAnh", file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {

      setImgPreview(evt.target.result)
    }
  }

  return (
    <div className={styles.wrapAddMovies}>
      <div className={styles.addmovie}>
        <h1>Thêm Mới Phim</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6">
              <div className={styles.inputAddMovie}>
                <label>Tên Phim :</label>
                <input
                  type="text"
                  {...register("tenPhim", {
                    required: {
                      value: true,
                      message: "Tên phim không được để trống",
                    },
                  })}
                />
                {errors.tenPhim && (
                  <p className={styles.txtError}>{errors.tenPhim.message}</p>
                )}
              </div>
            </div>

            <div className="col-6">
              <div className={styles.inputAddMovie}>
                <label>Trailer :</label>
                <input
                  type="text"
                  {...register("trailer", {
                    required: {
                      value: true,
                      message: "Trailer không được để trống",
                    },
                  })}
                />
                {errors.trailer && (
                  <p className={styles.txtError}>{errors.trailer.message}</p>
                )}
              </div>
            </div>

            <div className="col-6">
              <div className={styles.inputAddMovie}>
                <label>Mô Tả : </label>
                <input
                  type="text"
                  {...register("moTa", {
                    required: {
                      value: true,
                      message: "Mô tả không được để trống",
                    },
                  })}
                />
                {errors.moTa && (
                  <p className={styles.txtError}>{errors.moTa.message}</p>
                )}
              </div>
            </div>

            <div className="col-6">
              <div className={styles.inputAddMovie}>
                <label>Ngày chiếu : </label>
                <input
                  {...register("ngayKhoiChieu", {
                    required: {
                      value: true,
                      message: "Ngày chiếu không được để trống",
                    },
                  })}
                />
                {errors.ngayKhoiChieu && (
                  <p className={styles.txtError}>
                    {errors.ngayKhoiChieu.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-6">
              <div className={styles.inputAddMovie}>
                <label>Đang Chiếu :</label>
                <Switch {...register("dangChieu")} />
              </div>
              <div className={styles.inputAddMovie}>
                <label>Sắp Chiếu :</label>
                <Switch {...register("sapChieu")} />
              </div>
              <div className={styles.inputAddMovie}>
                <label>Hot : </label>
                <Switch {...register("hot")} />
              </div>
              <div className={styles.inputAddMovie}>
                <label>Đánh giá: </label>
                <input
                  width="20px"
                  type="text"
                  {...register("danhGia", {
                    required: {
                      value: true,
                      message: "Đánh giá không được để trống",
                    },
                  })}
                />
                {errors.danhGia && (
                  <p className={styles.txtError}>{errors.danhGia.message}</p>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className={styles.inputAddMovie}>
                <label>Hình Ảnh : </label>
                <input
                  type="file"
                  // {...register("hinhAnh", {
                  //   required: {
                  //     value: true,
                  //     message: "Đánh giá không được để trống",
                  //   },
                  // })}
                  onChange={handleChangeImage}
                />
                {/* {errors.hinhAnh && <p className={styles.txtError}>{errors.hinhAnh.message}</p>} */}
                {imgPreview && (
                  <img
                    src={imgPreview}
                    width={250}
                    height={250}
                    alt="preview"
                  />
                )}
              </div>
            </div>

            <div className={styles.btnAddMovie}>
              <button className="btn btn-success">Thêm Phim</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieAdd;
