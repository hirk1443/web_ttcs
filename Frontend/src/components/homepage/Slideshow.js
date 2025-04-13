import React from "react";
import { Carousel } from "antd";

const slides = [
  {
    id: 1,
    image:
      "https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/480283196_122093623076782670_9042381560504868616_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFbD8phqBpwJTM3emh0DmBCOFIFkb0twmk4UgWRvS3Cafn9Px5_6MuGb2kG93LcV8GBW5SY37b-PXuj6lQ7Eb6R&_nc_ohc=RT0X0_GlYVsQ7kNvwFMRUtw&_nc_oc=AdkWC_tw74qgquaWsrCSrnnxN32quXL1PTqsrVU_pT10Dke2pzkX097fF9HmfYeKugmblovZjBVSGW6jIhpcNoWA&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=Nyc6V7nAc405_jiINRESMw&oh=00_AfF0kXA5a4y0EJUAwHKy6176mZsXFXMyZvgwmwEFh_H_tg&oe=680126C5",
  },
];

const Slideshow = () => {
  return (
    <div className="w-full mt-10 ">
      <Carousel autoplay effect="fade" dots className="rounded-md">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full sm:h-64 md:h-80 overflow-hidden rounded-md"
          >
            <img
              src={slide.image}
              alt="Slideshow"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slideshow;
