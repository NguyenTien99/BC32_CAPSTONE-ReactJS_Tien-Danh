import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import movieAPI from "../../services/movieAPI";
import { FaPenFancy } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Movie.module.scss";
import { changeModalEditMovie } from "../../slices/modalSlice";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const getMoviesAPI = async () => {
    try {
      const data = await movieAPI.getMovies();
      setMovies(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoviesAPI();
  }, []);

  const handleDelete = async (maPhim) => {
    try {
      await movieAPI.deleteMovies(maPhim);
      getMoviesAPI();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const data = await movieAPI.getInfoMoviesById(id);
      dispatch(changeModalEditMovie());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Quản lí Phim</h1>
      <Link to="/movieAdd">
        <button>Thêm Phim</button>
      </Link>

      <Table>
        <thead>
          <tr>
            <th>Mã Phim</th>
            <th>Hình Ảnh</th>
            <th>Tên Phim</th>
            <th>Mô Tả</th>
            <th>Hành Động</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Movie;
