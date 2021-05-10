import React from "react";
import ScreenshotsSliderCard from '../components/screenshotsSliderCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

import { ScreenshotsSliderData } from '../interfaces'

type ScreenshotsSliderProps = ScreenshotsSliderData

const ScreenshotsSlider = (data: ScreenshotsSliderProps) => (
      <div className="relative ">
        <Swiper
                spaceBetween={15}
                slidesPerView={5}
                allowTouchMove= {true}
                className=""
                navigation={{
                  nextEl: '#screensNext',
                }}
                loop
              >
                {data.screenshots.map((screenshot, i) => {    
                  return <SwiperSlide key={i} className="">
                    <div key={i} className="mr-5">
                      <ScreenshotsSliderCard 
                        image={screenshot}
                      />
                    </div>
                </SwiperSlide>
                })}
            </Swiper>
        <div className="-mr-8 absolute inset-y-0 right-0 h-full flex flex-wrap content-center" id="screensNext">
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
				</div>
      </div>
    );

export default ScreenshotsSlider
