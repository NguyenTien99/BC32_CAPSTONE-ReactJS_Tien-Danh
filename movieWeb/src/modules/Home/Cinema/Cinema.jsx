import React, { useState, useEffect } from "react";
import { Tabs } from "@mantine/core";
import theaterAPI from "../../../services/theaterAPI";


const Cinema = () => {
  const [theaterSystem, setTheaterSystem] = useState([]);
  const [detailTheater, setDetailTheater] = useState([]);
  const [maRap, setMaRap] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const dataTheater = await theaterAPI.getTheaterSystem();
        setTheaterSystem(dataTheater);
        setMaRap(dataTheater[0].maHeThongRap);

        // gọi API Thông tin cụm rạp
        (async () => {
          try {
            const dataPerTheater = await theaterAPI.getDetailTheater(
              dataTheater[0].maHeThongRap
            );
            setDetailTheater(dataPerTheater);
          } catch (error) {
            console.log(error);
          }
        })();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const selectedTheater = (maHeThongRap) => {
    (async () => {
      try {
        const data = await theaterAPI.getDetailTheater(maHeThongRap);
        setDetailTheater(data);
        setMaRap(maHeThongRap);
      } catch (error) {
        console.log(error);
      }
    })();
  };


  if (!maRap) return;

  return (
    <div className="py-5">
      <div className="container">
        <div>
          <Tabs defaultValue={maRap} orientation="vertical">
            <Tabs.List>
              {theaterSystem.map((theater) => (
                <Tabs.Tab
                  value={theater.maHeThongRap}
                  key={theater.maHeThongRap}
                  onClick={() => selectedTheater(theater.maHeThongRap)}
                >
                  <img
                    src={theater.logo}
                    alt={theater.tenHeThongRap}
                    width="50px"
                    height="50px"
                  />
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel value={maRap} >
              {detailTheater.map((item) => (
                <p key={item.tenCumRap}>{item.tenCumRap}</p>
              ))}
            </Tabs.Panel>
          </Tabs>



          {/* <Tabs defaultValue="gallery" orientation="vertical">
            <Tabs.List>
              <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
              <Tabs.Tab value="messages">Messages</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              <Tabs  defaultValue="first" orientation="vertical">
                <Tabs.List>
                  <Tabs.Tab value="first">First tab</Tabs.Tab>
                  <Tabs.Tab value="second">Second tab</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
            <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
            <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
};

export default Cinema;
