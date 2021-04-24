import React, { useState } from "react";
import SeriesSliderCard from '../components/seriesSliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

import { SeriesSliderData } from '../interfaces'

type SeriesSliderProps = SeriesSliderData

const minWidth = 640

export default function SeriesSlider(data: SeriesSliderProps) {
  const [swiperWidth, setSwiperWidth] = useState(1920)

  return (
    <div className="relative">
      <Swiper
        spaceBetween={data.sliderInfo.space}
        slidesPerView={swiperWidth < minWidth ? 2.2 : data.sliderInfo.sliders}
        allowTouchMove={true}
        className=""
        navigation={{
          nextEl: '#nextSeries' + data.index,
        }}
        onInit={(swiper) => {
          setSwiperWidth(swiper.width)
        }}
        onResize={(swiper) => {
          setSwiperWidth(swiper.width)
        }}
      >
        {data.series.map((serie, i) => {
          return <SwiperSlide key={i} className="">
            <div key={i} className="">
              <SeriesSliderCard
                id={i}
                videoLength={serie.videoLength}
                image={serie.image}
              />
            </div>
          </SwiperSlide>
        })}
      </Swiper>
      <div className="-mr-3.5 z-10 sm:-mr-8 absolute inset-y-0 right-0 h-full hidden sm:flex flex-wrap content-center inline-block" id={"nextSeries" + data.index}>
        <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
