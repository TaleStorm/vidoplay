import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

import ChevronDown from "../icons/chevronDown";
import ChevronRight from "../icons/chevronRight";
import ChevronLeft from "../icons/chevronLeft";



const SliderWrapper = ({
children,
cardsToShow,
id,
spaceBetween=15,
mobileCardsToShow=1.5

}) => {
    const childArray = [...children]
    const [swiperWidth,setSwiperWidth] = useState(1920)
    const [leftActive, setLeftActive] = useState(false)
    const [rightActive, setRightActive] =  useState(true)
    const minWidth = 640
    return (
      <div className="relative">
        <div  className={`hidden w-12 z-10 sm:-mr-8 absolute -left-10 top-0 h-full lg:block transition-all duration-200 ${!leftActive ? "opacity-0" : "opacity-50 hover:opacity-100"} cursor-pointer`}  id={`prev${id}`}>
           <ChevronLeft classname={`w-full h-full`}/>
				</div>
        <Swiper
                slidesPerGroup={swiperWidth < minWidth ? Number(mobileCardsToShow.toFixed()) : cardsToShow}
                spaceBetween={spaceBetween}
                slidesPerView={swiperWidth < minWidth ? mobileCardsToShow : cardsToShow}
                allowTouchMove= {true}
                navigation={{
                  nextEl: '#next' + id,
                  prevEl: `#prev` + id
                }}
                className={`padding-containter`}
                onInit={(swiper)=>{
                  setSwiperWidth(swiper.width)
                }}
                onResize={(swiper)=>{
                  setSwiperWidth(swiper.width)
                }}
                onSlideChange={(swiper) => {
                  if (swiper.activeIndex > 0) {
                    setLeftActive(true)
                  }
                  if (swiper.activeIndex >= childArray.length/cardsToShow - 1) {
                    setRightActive(false)
                  }
                  if (swiper.activeIndex === 0) {
                    setLeftActive(false)
                  }
                  if (swiper.activeIndex < childArray.length/cardsToShow - 1) {
                    setRightActive(true)
                  }
                }}
              >
                {childArray.map((child, i) => {    
                  return (
                  <SwiperSlide key={i} className="">
                      {child}
                  </SwiperSlide>
                  )
                })}
            </Swiper>
        <div  className={`${!rightActive ? "opacity-0" : "opacity-50 hover:opacity-100"} w-12 hidden z-10 absolute -right-10 h-full lg:block transition-all duration-200 cursor-pointer top-0 items-center`}  id={`next${id}`}>
                <ChevronRight classname={`  w-full h-full`}/>
			</div>
      </div>
    );
  }

export default SliderWrapper