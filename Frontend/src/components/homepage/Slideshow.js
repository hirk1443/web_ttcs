import React from "react";
import { Carousel } from "antd";

const slides = [
  {
    id: 1,
    image:
      "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/472709908_897151605955308_4165085234155109734_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2285d6&_nc_ohc=jVLw7isdT-8Q7kNvwF9UW4k&_nc_oc=Adkn1TUNWpMQpeGbuyppijgeVeLnjuAOQ0X05jpA0D44kvlPwcKmoBF7mcF2xn3yvIMvNO6nCIbe48AYRZb07RFF&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=dExWxWubxs8HGJ9RDR9trw&oh=00_AfGxMhR1yFgDVtSmMC2w_AZZA2_n-jag9j92ewfmz0jA1A&oe=6815466A",
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
