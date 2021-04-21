import React from "react";
import FilmCategorySliderCard from '../components/filmCategorySliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

import { FilmCategorySliderData } from '../interfaces'

type FilmCategorySliderProps = FilmCategorySliderData

export default function FilmCategorySlider(data: FilmCategorySliderProps) {
    return (
      <div className="relative">
        <Swiper
                spaceBetween={20}
                slidesPerView={data.cardToShow}
                allowTouchMove= {true}
                className="rounded-lg"
                navigation={{
                  nextEl: '#next' + data.sliderIndex,
                }}
                loop
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
        <div  className="-mr-8 absolute inset-y-0 right-0 h-full flex flex-wrap content-center inline-block" id={`next${data.sliderIndex}`}>
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
				</div>
      </div>
    );
  }