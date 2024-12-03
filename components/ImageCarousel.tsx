//@ts-nocheck
// components/ImageCarousel.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const ImageCarousel = ({ images }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.image_path} alt={`Slide ${index + 1}`} className="w-full h-64 object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
