import React from "react";
import { Carousel } from "antd";

const slides = [
  {
    id: 1,
    image:
      "/imgslideshow.jpg",
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
