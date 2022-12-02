import { useEffect, useState } from "react";
import { Table, ScrollArea,Switch,Modal } from "@mantine/core";
import movieAPI from "../../services/movieAPI";
import { FaPenFancy } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeModalEditMovie } from "../../slices/modalSlice";
import { getMoviebyId, getMovies } from "../../slices/movieSlive";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import styles from "./Movie.module.scss";

const Movie = () => {
  //State Movies
  const { movies, loading, loadingInfoMovie, infoMovie } = useSelector(
    (state) => state.movieSlive
  );

  // State Modal
  const { isopeneditmovies } = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  // Handle Delete
  const handleDelete = async (maPhim) => {
    try {
      await movieAPI.deleteMovies(maPhim);
      swal("Xóa phim thành công", "", "success");
      dispatch(getMovies());
    } catch (error) {
      console.log(error);
    }
  };

  // handle Edit
  const handleEdit = (id) => {
    dispatch(getMoviebyId(id));

    if (loadingInfoMovie) {
      return;
    }

    dispatch(changeModalEditMovie());
  };


  // Form
  const [imgPreview, setImgPreview] = useState(null);
  const { register, handleSubmit, setValue, formState } = useForm({
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

  useEffect(() => {
    if (!isopeneditmovies) return;
    if (!infoMovie) return;
    for (const [key, value] of Object.entries(infoMovie)) {
      setValue(key, value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isopeneditmovies]);

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, maNhom: "GP06" };

      const formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }

      await movieAPI.updateMovie(formData);

      swal("Chỉnh sửa phim thành công", "", "success");
      dispatch(getMovies());
      dispatch(changeModalEditMovie());
    } catch (error) {
      swal("Chỉnh sửa phim thất bại", `${error}`, "error");
      console.log(error);
    }
  };

  const handleChangeImage = (evt) => {
    const file = evt.target.files[0];

    if (!file) return;

    setValue("hinhAnh", file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  };

  if (loading) {
    return;
  }

  return (
    <div className={styles.wrapMoves}>
      <div className="text-center my-4 ">
        <h1>Quản lí Phim</h1>
      </div>

      <div className={styles.tableMovies}>
        <ScrollArea style={{ height: 680 }}>
          <Table fontSize="md" striped withColumnBorders>
            <thead>
              <tr>
                <th>Mã Phim</th>
                <th>Hình Ảnh</th>
                <th>Tên Phim</th>
                <th>Mô Tả</th>
                <th>Hành Động</th>
                <th>Thêm lịch chiếu</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((item) => (
                <tr key={item.maPhim}>
                  <td>{item.maPhim}</td>
                  <td>
                    <img
                      height="50px"
                      width="50px"
                      src={item.hinhAnh}
                      alt={item.maPhim}
                    />
                  </td>
                  <td>{item.tenPhim}</td>
                  <td>{item.moTa}</td>
                  <td>
                    <button
                      className={styles.edit}
                      onClick={() => handleEdit(item.maPhim)}
                    >
                      <FaPenFancy />
                    </button>

                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(item.maPhim)}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate(`/admin/movies/${item.maPhim}`)}
                    >
                      Thêm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </div>

      <Modal
        size="55%"
        opened={isopeneditmovies}
        onClose={() => dispatch(changeModalEditMovie())}
        title="Chỉnh sửa phim"
        classNames={{ modal: styles.wrapEditMovie }}
        styles={{ title: { fontSize: "30px" } }}
      >
        <div className={styles.modalEditMovie}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className={styles.inputEditMovie}>
                  <label>Tên Phim</label>
                  <input
                    type="text"
                    defaultValue="test"
                    {...register("tenPhim", {
                      required: {
                        value: true,
                        message: "Tên phim không được để trống",
                      },
                    })}
                  />
                  {errors.tenPhim && (
                    <p className={styles.txeError}>{errors.tenPhim.message}</p>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className={styles.inputEditMovie}>
                  <label>Trailer </label>
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
                    <p className={styles.txeError}>{errors.trailer.message}</p>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className={styles.inputEditMovie}>
                  <label>Mô Tả </label>
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
                    <p className={styles.txeError}>{errors.moTa.message}</p>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className={styles.inputEditMovie}>
                  <label>Ngày chiếu </label>
                  <input
                    {...register("ngayKhoiChieu", {
                      required: {
                        value: true,
                        message: "Ngày chiếu không được để trống",
                      },
                    })}
                  />
                  {errors.ngayKhoiChieu && (
                    <p className={styles.txeError}>
                      {errors.ngayKhoiChieu.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className={styles.inputEditMovie}>
                  <label>Đang Chiếu</label>
                  <Switch {...register("dangChieu")} />
                </div>
                <div className={styles.inputEditMovie}>
                  <label>Sắp Chiếu</label>
                  <Switch {...register("sapChieu")} />
                </div>
                <div className={styles.inputEditMovie}>
                  <label>Hot</label>
                  <Switch {...register("hot")} />
                </div>
                <div className={styles.inputEditMovie}>
                  <label>Đánh giá</label>
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
                    <p className={styles.txeError}>{errors.danhGia.message}</p>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className={styles.inputEditMovie}>
                  <label>Hình Ảnh </label>
                  <input
                    type="file"
                    // {...register("hinhAnh")}
                    onChange={handleChangeImage}
                  />
                  {/* {errors.hinhAnh && <p>{errors.hinhAnh.message}</p>} */}
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
            </div>
            <button className="btn btn-primary mt-3">Chỉnh sửa</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Movie;
