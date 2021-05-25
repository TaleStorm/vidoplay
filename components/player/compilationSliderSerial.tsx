import { MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import ChevronDown from "../icons/chevronDown"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import PlayerFilmCardSerial from "../filmCards/playerFilmCardSerial";
import PlayerContext from "../context/playerContext";

SwiperCore.use([Navigation]);

const CompilationSlider = ({setModalOpen, isSliderOpen, setIsSliderOpen, movies, setCurrentCompilationMovie, isFullscreen}) => {

    const {currentSerie} = useContext(PlayerContext)

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
        <div className={`absolute bottom-18 inset-x-0 w-full items-end flex flex-col px-4 z-10`}>
            <div
                ref={sliderContainerRef}
                className={`w-full overflow-hidden transition-all duration-300 ease-out`}>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={isFullscreen ? 3.5 : 2.5}
                    allowTouchMove={true}
                    navigation={{
                        nextEl: '#next' + 1,
                    }}
                >
                    {movies.map((movie, i) => {
                        const card = {
                            image: movie.image,
                            title: "Серия " + (Number(i)+1),
                            serie: i
                        }
                        if (i !== currentSerie) return <SwiperSlide key={i} className="">
                            <a onClick={(e) => {
                                e.preventDefault()
                                setIsSliderOpen(false)
                                setModalOpen(true)
                                setCurrentCompilationMovie(card)
                            }} className={`w-full relative z-20 cursor-pointer`}>
                                <PlayerFilmCardSerial {...card} imageSize={"45"} />
                            </a>
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    )

}

export default CompilationSlider