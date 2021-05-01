import { MutableRefObject, useEffect, useRef, useState } from "react"
import ChevronDown from "../icons/chevronDown"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import doramas from "../../data/doramas";
import PlayerFilmCard from "../filmCards/playerFilmCard";

SwiperCore.use([Navigation]);
const minWidth = 640

const CompilationSlider = ({setModalOpen, isSliderOpen, setIsSliderOpen, movies, setCurrentCompilationMovie}) => {

    const sliderContainerRef = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
                    
        if (isSliderOpen) {
            sliderContainerRef.current.style.height = sliderContainerRef.current.scrollHeight + "px"
        }
        else {
            sliderContainerRef.current.style.height = "0px"
        }
    }, [isSliderOpen])

    return (
        <div className={`absolute bottom-18 inset-x-0 w-full items-end flex flex-col px-4 `}>


            <div
                onClick={() => {
                    setIsSliderOpen(!isSliderOpen)
                }}
                className={`w-auto text-h2-mobile mb-3 font-medium flex cursor-pointer`}>
                <div className={`mr-1`}>Смотреть также</div>
                <ChevronDown classname={`stroke-current w-6 h-6 transform transition-all duration-150 ease-out ${isSliderOpen ? "rotate-0" : "-rotate-90"}`} />
            </div>
            <div
                ref={sliderContainerRef}
                className={`w-full overflow-hidden transition-all duration-300 ease-out`}>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2.5}
                    allowTouchMove={true}
                    navigation={{
                        nextEl: '#next' + 1,
                    }}
                >
                    {movies.map((card, i) => {
                        return <SwiperSlide key={i} className="">
                            <a onClick={(e) => {
                                e.preventDefault()
                                setIsSliderOpen(false)
                                setModalOpen(true)
                                setCurrentCompilationMovie(card)
                            }} className={`w-full relative z-20 cursor-pointer`}>
                                <PlayerFilmCard {...card} imageSize={"45"} />
                            </a>
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    )

}

export default CompilationSlider