import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss';
import cn from "classnames";
// import useScrollY from '../hooks/useScrollY';

const Header = () => {
  // const { scrollY } = useScrollY();
  return (
    // <div className={cn(styles.header,{"bg-black": scrollY})}>
    <div className={styles.header}>
      <div className={cn("container",styles.header__content)}>
        <Link to="/" className={styles.title}>Movie</Link>
        <nav>
          <ul>
            <li>
              Lịch chiếu
            </li>
            <li>
            Cụm rạp
            </li>
            <li>
            Tin tức
            </li>
          </ul>
        </nav>
        <div></div>
      </div>
    </div>
  );
};

export default Header;