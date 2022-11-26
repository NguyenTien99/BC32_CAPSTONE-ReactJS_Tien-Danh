import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import ReactPlayer from "react-player";
import { onCloseModal } from '../../slices/modalMovie';
import { Modal } from "@mantine/core";
import styles from "./rootLayout.module.scss"


const RootLayout = () => {
  const { isOpen, movie } = useSelector((state) => state.modalMovie);
  const dispatch = useDispatch();
  
  return (
    <div>
        <Header />

        <Outlet />

        <Modal
        opened={isOpen}
        onClose={() => dispatch(onCloseModal())}
        withCloseButton={false}
        padding="none"
        size="75%"
        centered={true}
      >
        <div 
        className={styles.playerWrap}
        >
          <ReactPlayer
            width="100%"
            height="100%"
            url={movie ? movie.trailer : null}
            className={styles.videoModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RootLayout;