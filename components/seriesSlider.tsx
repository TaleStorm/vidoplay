import React, { useState } from "react";
import SeriesSliderCard from '../components/seriesSliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

import { SeriesSliderData } from '../interfaces'
import SliderWrapper from "./layout/sliderWrapper";

type SeriesSliderProps = SeriesSliderData

const minWidth = 640

export default function SeriesSlider(data) {
  const [swiperWidth, setSwiperWidth] = useState(1920)

  return (
    <div className="relative">
      <SliderWrapper spaceBetween={15} id={`series-slider${data.index}`} cardsToShow={data.sliderInfo.sliders}>
        {data.series.map((serie, i) => {
          return <SeriesSliderCard
                id={i}
                videoLength={serie.videoLength}
                image={serie.image}
                season = {data.slider}
              />
        })}
    </SliderWrapper>
    </div>
  );
}
