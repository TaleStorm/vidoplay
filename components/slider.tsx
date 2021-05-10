import React from "react";
import SliderCard from '../components/sliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

import { SliderData } from '../interfaces'
import ChevronRight from "./icons/chevronRight";
import ChevronLeft from "./icons/chevronLeft";

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

        <div  
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.21922272326899506) 47%, rgba(0,0,0,0.5833683815323004) 100%)"
          }}
        className={`opacity-50 hover:opacity-100 w-16 hidden z-10 absolute right-0 h-full sm:flex transition-all duration-200 cursor-pointer top-0 items-center`}  id={"nextMainSlide"}>
            <ChevronRight classname={`  w-full h-full`}/>
				</div>
        <div  
        style={{
          background: "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.21922272326899506) 47%, rgba(0,0,0,0.5833683815323004) 100%)"
          }}
        className={`hidden w-16 z-10 sm:-mr-8 absolute left-0 top-0 h-full sm:block transition-all duration-200 opacity-50 hover:opacity-100 cursor-pointer`}  id={"prevMainSlide"}>
           <ChevronLeft classname={`w-full h-full`}/>
				</div>
      </div>
    );

export default Slider
