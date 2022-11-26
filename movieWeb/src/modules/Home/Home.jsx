
import React from "react";
import Banner from "./Banner";
import Intro from "./Intro/Intro";
import Showing from "./Showing";
import styles from "./home.module.scss";
import Cinema from "./Cinema/Cinema";

const Home = () => {

  return (
    <div>
      <Intro />

      <Banner />

      <Showing />

      <Cinema />
    </div>
  );
};

export default Home;
