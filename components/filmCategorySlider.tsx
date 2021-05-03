import React, {useState} from "react";
import FilmCategorySliderCard from '../components/filmCategorySliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

import { FilmCategorySliderData } from '../interfaces'
import ChevronDown from "./icons/chevronDown";

type FilmCategorySliderProps = FilmCategorySliderData

const minWidth = 640

export default function FilmCategorySlider(data) {
    const [swiperWidth,setSwiperWidth] = useState(1920)
    const [leftActive, setLeftActive] = useState(false)
    const [rightActive, setRightActive] =  useState(true)

    return (
      <div className="relative">
        <div  className={`hidden w-12 -ml-8 z-10 sm:-mr-8 absolute -left-2 h-full sm:flex flex-wrap content-center   transition-all duration-200 ${!leftActive ? "opacity-0" : "opacity-50 hover:opacity-100"} transform rotate-180 cursor-pointer`}  id={`prev${data.sliderIndex}`}>
           <ChevronDown classname={`transform -rotate-90 w-full h-full`}/>
				</div>

        <Swiper
                slidesPerGroup={swiperWidth < minWidth ? 1 : data.cardToShow}
                spaceBetween={20}
                slidesPerView={swiperWidth < minWidth ? 1.2 : data.cardToShow}
                allowTouchMove= {true}
                navigation={{
                  nextEl: '#next' + data.sliderIndex,
                  prevEl: `#prev` + data.sliderIndex
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
                  if (swiper.activeIndex === data.cards.length - data.cardToShow) {
                    setRightActive(false)
                  }
                  if (swiper.activeIndex === 0) {
                    setLeftActive(false)
                  }
                  if (swiper.activeIndex < data.cards.length - data.cardToShow) {
                    setRightActive(true)
                  }
                }}
              >
                {data.cards.map((card, i) => {    
                  return (
                  <SwiperSlide key={i} className="">
                  <FilmCategorySliderCard 
                    title={card.title} 
                    image={card.image}
                    stringName={card.stringName}
                    imageSize={data.cardToShow == 2 ? "72" : "52"}
                    excerpt={card.excerpt}
                    localization={card.localization}
                    _comment={card._comment}
                    rating={card.score}
                    tags={card.tags}
                  />
                </SwiperSlide>
                
                  
                  )
                })}
            </Swiper>
        <div  className={`${!rightActive ? "opacity-0" : "opacity-50 hover:opacity-100"} w-12 hidden z-10 sm:-mr-8 absolute -right-2 h-full sm:flex flex-wrap transition-all duration-200 cursor-pointer`}  id={`next${data.sliderIndex}`}>
                <ChevronDown classname={`transform -rotate-90 w-full h-full`}/>
				</div>
      </div>
    );
  }