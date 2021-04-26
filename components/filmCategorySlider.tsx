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
                      title={card.title} 
                      image={card.image}
                      stringName={card.stringName}
                      imageSize={data.cardToShow == 2 ? "72" : "52"}
                      excerpt={card.excerpt}
                      languages={["EN","RU","KO"]}
                      tags={[{
                        name:"#дорамы",
                        color:"#36A4C9",
                        genre: "Дорамы"
                      },
                      {
                        name:"#драма",
                        color:"#A036C9",
                        genre: "Драма"
                      }]}
                      comments={30}
                      rating={7.8}
                    />
                  </SwiperSlide>
                })}
            </Swiper>
        <div  className="hidden -mr-2.5 z-10 sm:-mr-8 absolute inset-y-0 right-0 h-full sm:flex flex-wrap content-center" id={`next${data.sliderIndex}`}>
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
				</div>
      </div>
    );
  }