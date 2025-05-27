import React from "react";
import { Carousel } from "antd";

const slides = [
  {
    id: 1,
    image:
      "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/472709908_897151605955308_4165085234155109734_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeFsugFwpXQl5MSj3Js-QoT9vgMWmnqHVcW-AxaaeodVxeK4bV8chZYg6D3qMAonDQs5qVWYyJo9T58JLfMs5uJz&_nc_ohc=q_XELk8ww78Q7kNvwEfURBf&_nc_oc=AdncRsLjRCxH0wJGlR5i0j-6DnV3xY9kwuO5V4eNeCiY3JNPF7nODkviV6V2aHf3lR9PgaleO8SH2sVRbq4oI-zi&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=-FIRhle-hJV4eF5jjxs75g&oh=00_AfL2wFe5z8YmpTjNPfl6r7oLeBj0wZBpC0otnU03PIetKQ&oe=683B49AA",
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
