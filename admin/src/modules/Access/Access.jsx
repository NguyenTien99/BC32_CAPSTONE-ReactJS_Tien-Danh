import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Access.module.scss';

const Access = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapAccess}>
      <div className={styles.Access}>
      <h1>HELLO ADMIN</h1>
      <p>PLEASE LOG IN HERE</p>
      <button className="btn btn-primary" onClick={() => navigate(`/logIn`)}>
        Access
      </button>
      </div>
    </div>
  );
};

export default Access;
