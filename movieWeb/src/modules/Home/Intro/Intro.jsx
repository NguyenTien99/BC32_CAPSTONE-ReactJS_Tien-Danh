import React, { useState } from "react";
import ReactPlayer from "react-player";
import { VscMute, VscUnmute } from "react-icons/vsc";
import styles from "./Intro.module.scss";

const Intro = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className={styles.Intro}>
      <ReactPlayer
        playing={true}
        loop={true}
        controls={false}
        width="100%"
        height="100%"
        volume={1}
        muted={isMuted}
        // url="https://vimeo.com/265260715"
        url="https://vimeo.com/273686020"
        // url="https://www.youtube.com/watch?v=xVMkyDSqlH4"

        className={styles.videoIntro}
      />

      <div className={styles.infoIntro}>
        <h1 className={styles.headingIntro}>BC32 Movie</h1>
        <p className={styles.contentIntro}>
          Trailer for movie series "New Movies"
          <br />
           Production: Fox Devil Films GmbH
          for Netflix 
          Amsterdam 
          <br />
          Director: Simon Ritzler 
          <br />
          Dop: Carlo Jelavic
          <br />
          Editor: Michael Timmers 
          <br />
          Colorist: Mike Bothe 
          <br />
          Compositing: Stathis
          Nafpliotis
        </p>
      </div>
      {isMuted ? (
        <VscMute
          className={styles.iconMute}
          onClick={() => setIsMuted((state) => !state)}
        />
      ) : (
        <VscUnmute
          className={styles.iconMute}
          onClick={() => setIsMuted((state) => !state)}
        />
      )}
      <div className={styles.fadeBottom}></div>
    </div>
  );
};

export default Intro;
