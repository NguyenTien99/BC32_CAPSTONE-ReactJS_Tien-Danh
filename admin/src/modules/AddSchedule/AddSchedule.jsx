import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddSchedule.module.scss";
import { useParams } from "react-router-dom";
import movieAPI from "../../services/movieAPI";
import Loading from "../Loading";
import swal from "sweetalert";

const AddSchedule = () => {
  const { movieId } = useParams();
  const [theater, setTheater] = useState([]);

  useEffect(() => {
    setValue("maPhim", movieId);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getDetailTheater();
        setTheater(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { register, handleSubmit, setValue, reset, formState } = useForm({
    defaultValues: {
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await movieAPI.addScheduleMovie(values);
      swal("Tạo lịch chiếu thành công", "", "success");
      reset();
    } catch (error) {
      swal("Tạo lịch chiếu thất bại", `${error}`, "error");
      console.log(error);
    }
  };
  if (theater.length === 0) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapSchedule}>
      <div className={styles.schedule}>
        <h1>Thêm lịch chiếu</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputSchedule}>
              <label>Mã Phim</label>
              <input
              disabled
                {...register("maPhim", {
                  required: {
                    value: true,
                    message: "Mã phim không được để trống",
                  },
                })}
              />
              {errors.maPhim && (
                <p className={styles.txtError}>{errors.maPhim.message}</p>
              )}
            </div>
            <div className={styles.inputSchedule}>
              <label>Ngày giờ chiếu</label>
              <input
                {...register("ngayChieuGioChieu", {
                  required: {
                    value: true,
                    message: "Ngày giờ chiếu không được để trống",
                  },
                })}
              />
              {errors.ngayChieuGioChieu && (
                <p className={styles.txtError}>{errors.ngayChieuGioChieu.message}</p>
              )}
            </div>
            <div className={styles.inputSchedule}>
              <label>Mã rạp</label>
              <select
                {...register("maRap", {
                  required: {
                    value: true,
                    message: "Chọn cụm rạp",
                  },
                })}
              >
                <option value="">Chọn cụm rạp</option>
                {theater.map((item) =>
                  item.lstCumRap.map((i) => (
                    <option value={`${i.maCumRap}`} key={i.maCumRap}>
                      {i.tenCumRap}
                    </option>
                  ))
                )}
              </select>

              {errors.maRap && <p className={styles.txtError}>{errors.maRap.message}</p>}
            </div>
            <div className={styles.inputSchedule}>
              <label>Giá vé</label>
              <input
                type="number"
                {...register("giaVe", {
                  required: {
                    value: true,
                    message: "Giá vé không được để trống",
                  },
                })}
              />
              {errors.giaVe && <p className={styles.txtError}>{errors.giaVe.message}</p>}
            </div>

            <div className={styles.btnSchedule}>
              <button className="btn btn-success">Thêm lịch chiếu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
