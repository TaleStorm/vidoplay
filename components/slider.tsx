import React from "react";
import SliderCard from '../components/sliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

import { SliderData } from '../interfaces'

type SliderProps = SliderData

const Slider = (data) => (


      <div className="relative sm:h-72 h-40">
          <Swiper
                spaceBetween={0}
                slidesPerView={1}
                allowTouchMove= {true}
                className=""
                loop
                navigation={{
                  nextEl: '#nextMainSlide',
                  prevEl: '#prevMainSlide',
                }}
                onInit={(swiper) => {
                  if (swiper) {
                    setInterval(() => {swiper.slideNext()}, 3000)
                  }
                  
                }}
              >
                {data.cards.map((card, i) => {    
                  const sliderCardProps = {
                    key: i,
                    link: card.link,
                    image: card.image,
                    onClick: card.onClick || (()=>{}),
                  }
                  return <SwiperSlide key={i} className="h-full">
                    <SliderCard {...sliderCardProps} />
                </SwiperSlide>
                })}
            </Swiper>

        <div  className="ml-5 absolute inset-y-0 left-0 h-full flex flex-wrap content-center z-20" id="prevMainSlide">
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.4375 35.875L1.5625 19L18.4375 2.125" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
				</div>
          
        <div  className="mr-5 absolute inset-y-0 right-0 h-full flex flex-wrap content-center z-20" id="nextMainSlide">
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
				</div>
      </div>
    );

export default Slider
