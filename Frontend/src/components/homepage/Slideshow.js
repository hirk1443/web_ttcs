import React from "react";
import { Carousel } from "antd";

const slides = [
  {
    id: 1,
    image:
      "https://scontent.fhan5-5.fna.fbcdn.net/v/t39.30808-6/472709908_897151605955308_4165085234155109734_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeFsugFwpXQl5MSj3Js-QoT9vgMWmnqHVcW-AxaaeodVxeK4bV8chZYg6D3qMAonDQs5qVWYyJo9T58JLfMs5uJz&_nc_ohc=rW53bA_9hQcQ7kNvwF0Cn4v&_nc_oc=AdkcpU6PIYp6ttAhzYZjzJx4apQKiw6ab-0sGYwaqG5bOXCxayHZmNmlxv_3U1w0Pu5vH5qBhRNumb8hyVS5V9d9&_nc_zt=23&_nc_ht=scontent.fhan5-5.fna&_nc_gid=ddGDoan2pg56RV3wyZVk0g&oh=00_AfIk5wVIU3RAdwYtHc4-u8gdDKs1VrMhoaRu4u5IIZj1XQ&oe=68289C6A",
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
