import React, { useEffect, useState } from "react";
import theaterAPI from "../../../services/theaterAPI";
import { Tabs } from "@mantine/core";
import styles from "./Theaters.module.scss";

const Theaters = () => {
  const [theaters, setTheater] = useState([]);
  const [indexTheater, setIndexTheater] = useState(0);
  const [indexDetailTheater, setIndexDetailTheater] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await theaterAPI.getTheaterSchedule();
        setTheater(data);
      } catch (error) {
        console.log(error);
      }
    })();
    console.log("useEffect-Re");
  }, []);

  const selectedTheater = (index) => {
    setIndexTheater(index);
    setIndexDetailTheater(0);
  };

  const selectedDetailTheater = (index) => {
    setIndexDetailTheater(index);
  };

  if (theaters.length === 0) return;

  console.log(theaters[2].lstCumRap[0]);
  return (
    <div className={styles.wrapTheater}>
      <div className="container">
        <div className={styles.theaters} height="500px">
          <Tabs defaultValue={theaters[indexTheater].maHeThongRap}>
            <Tabs.List>
              {theaters.map((item, index) => (
                <Tabs.Tab
                  value={item.maHeThongRap}
                  key={item.maHeThongRap}
                  onClick={() => selectedTheater(index)}
                >
                  <img
                    src={item.logo}
                    alt={item.tenHeThongRap}
                    width="60px"
                    height="60px"
                  />
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel value={theaters[indexTheater].maHeThongRap} pt="xs">
              <Tabs
                defaultValue={
                  theaters[indexTheater].lstCumRap[indexDetailTheater].maCumRap
                }
                orientation="vertical"
                classNames={
                  {
                    // root: styles.tabsDetailTheater,
                    // tabsList: styles.tabsListDetailTheater,
                  }
                }
                styles={
                  {
                    //   root:{background: 'red'},
                    //   tabsList:{background: 'yellow', },
                    // tabLabel: {background: 'blue', width:"30%" },
                    //   tab : {background: 'green', }
                  }
                }
              >
                <Tabs.List>
                  {theaters[indexTheater].lstCumRap.map((item, index) => (
                    <Tabs.Tab
                      value={item.maCumRap}
                      key={item.maCumRap}
                      onClick={() => selectedDetailTheater(index)}
                    >
                      <div >
                        <h6>{item.tenCumRap}</h6>
                        <p>{item.diaChi}</p>
                      </div>
                    </Tabs.Tab>
                  ))}
                </Tabs.List>

                <Tabs.Panel
                  value={
                    theaters[indexTheater].lstCumRap[indexDetailTheater]
                      .maCumRap
                  }
                >
                  {theaters[indexTheater].lstCumRap[
                    indexDetailTheater
                  ].danhSachPhim.map((item, index) => (
                    <div className={styles.movieTheater}>
                      <div className="row">
                        <div className="col-4">
                          <img src={item.hinhAnh} alt={item.tenPhim} />
                        </div>
                        <div className="col-8">
                          <h6 key={item.maPhim}>{item.tenPhim}</h6>
                          <div className="row">
                            {item.lstLichChieuTheoPhim.map((i) => (
                              <div className="col">{i.ngayChieuGioChieu}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Theaters;
