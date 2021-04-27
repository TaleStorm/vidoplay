import React, { useState } from "react";
import FilmCategorySliderCard from '../components/filmCategorySliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

import { FilmCategorySliderData, PartnerSliderData } from '../interfaces'
import PartnerSliderCard from "./partnerSliderCard";

type PartnerSliderProps = PartnerSliderData

const minWidth = 640

export default function PartnerSlider(data: PartnerSliderProps) {
  const [swiperWidth, setSwiperWidth] = useState(1920)


  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-3xl mb-4 sm:mb-1 font-roboto font-medium text-mainText">
        Наши партнёры
        </h1>
      <div className="relative w-full">
        <Swiper
          spaceBetween={20}
          slidesPerView={swiperWidth/290}
          allowTouchMove={true}
          className="sm:rounded-lg"
          navigation={{
            nextEl: '#next' + data.sliderIndex,
            prevEl: '#prev' + data.sliderIndex,
          }}
          onInit={(swiper) => {
            setSwiperWidth(swiper.width)
          }}
          onResize={(swiper) => {
            setSwiperWidth(swiper.width)
          }}
        >
          {data.cards.map((card, i) => {
            return <SwiperSlide key={i} className="sm:py-5">
              <PartnerSliderCard {...card}/>
            </SwiperSlide>
          })}
        </Swiper>
        <div className="hidden -mr-2.5 z-10 sm:-mr-8 absolute inset-y-0 right-0 h-full sm:flex flex-wrap content-center" id={`next${data.sliderIndex}`}>
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="hidden -ml-2.5 z-10 sm:-ml-8 absolute inset-y-0 h-full sm:flex flex-wrap content-center" id={`prev${data.sliderIndex}`}>
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" style={{transform:"scaleX(-1)"}}>
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

