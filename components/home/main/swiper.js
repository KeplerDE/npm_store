import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import styles from './swiper.module.scss';

const imagePaths = [
  '/images/swiper/1.jpg',
  '/images/swiper/2.jpg',
  '/images/swiper/3.jpg',
  '/images/swiper/4.jpg',
  '/images/swiper/5.jpg',
];

const MainSwiper = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className={styles.mySwiper}
    >
      {imagePaths.map((path, index) => (
        <SwiperSlide key={index}>
          <img src={path} alt={`Slide ${index + 1}`} className={styles.slideImage} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSwiper;
