import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import movieAPI from "../../services/movieAPI";
import { FaPenFancy } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import styles from "./Movie.module.scss";
import { Link } from "react-router-dom";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getMovies();
        setMovies(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async (maPhim) => {
    await movieAPI.deleteMovies(maPhim);
    // console.log("delete");
  };

  const handleEdit = () => {
    console.log("click edit");
  };

  return (
    <div>
      <h1>Quản lí Phim</h1>
      <Link to="/movieEdit">
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
              <button className={styles.edit} onClick={() => handleEdit()}>
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
