import React, {useState} from "react";
import FilmCategorySliderCard from '../components/filmCategorySliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

import { FilmCategorySliderData } from '../interfaces'

type FilmCategorySliderProps = FilmCategorySliderData

const minWidth = 640

export default function FilmCategorySlider(data: FilmCategorySliderProps) {
    const [swiperWidth,setSwiperWidth] = useState(1920)

    return (
      <div className="relative">
        <Swiper
                spaceBetween={20}
                slidesPerView={swiperWidth < minWidth ? 1.2 : data.cardToShow}
                allowTouchMove= {true}
                className="sm:rounded-lg"
                navigation={{
                  nextEl: '#next' + data.sliderIndex,
                }}
                onInit={(swiper)=>{
                  setSwiperWidth(swiper.width)
                }}
                onResize={(swiper)=>{
                  setSwiperWidth(swiper.width)
                }}
              >
                {data.cards.map((card, i) => {    
                  return <SwiperSlide key={i} className="">
                    <FilmCategorySliderCard 
                      name={card.name} 
                      image={card.image}
                      imageSize={data.cardToShow == 2 ? "72" : "52"}
                      description={card.description}
                      languages={card.languages}
                      tags={card.tags}
                      comments={card.comments}
                      rating={card.rating}
                    />
                  </SwiperSlide>
                })}
            </Swiper>
        <div  className="hidden -mr-2.5 z-10 sm:-mr-8 absolute inset-y-0 right-0 h-full sm:flex flex-wrap content-center inline-block" id={`next${data.sliderIndex}`}>
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
				</div>
      </div>
    );
  }