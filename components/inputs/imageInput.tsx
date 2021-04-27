import { MutableRefObject, useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import ChevronDown from "../icons/chevronDown";
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([ Navigation]);

const ImageInput = ({buttonText, notice, header, multiple=true}) => {
    const [images, SetImages] = useState([])
    const leftRef = useRef(null) as MutableRefObject<HTMLDivElement>
    const rightRef = useRef() as MutableRefObject<HTMLDivElement>
    const alt = "bg-black bg-opacity-50 rounded-full right-0 absolute"
    useEffect(() => {
        if (images.length > 0) {
            var event = new CustomEvent("refreshDropdown");
            window.dispatchEvent(event)
        }
    }, [images])
    return (
        <div className={`w-full`}>

            <label className={`w-full mb-4`}>
            <div className={`mb-3 text-h2-mobile font-medium`}>
            {header}
            </div>
            
            <div className={`w-72 bg-orange flex justify-center items-center py-4 cursor-pointer rounded-lg hover:bg-opacity-80 transition-all duration-200 ease-out`}>
                <div className={`flex items-center`}>
                    <div className={`mr-4 text-h1-mobile`}>
                    {buttonText}
                    </div>
                    <img src="/icons/clip.svg" className={`flex-shrink-0 w-7 h-7 `}/>
                </div>                
            </div>
            <input type="file" multiple={multiple} className={`hidden`} onChange={(e) => {
                const images = Array.from(e.target.files).filter(file => file.type.split("/")[0] === "image")
                SetImages(images)
                e.target.files = null
            }}/>
            </label>
            <div className={`mt-3 mb-3 text-sm`}>
                {notice}
            </div>

            <div className={`w-full h-auto flex relative items-center`}>
            <div ref={leftRef} id={`poster-prev`} className={`${images.length < 1 && "hidden"} transform w-8 h-8 rotate-90 cursor-pointer flex-shrink-0 z-10 select-none`}>
                <ChevronDown/>
            </div>
            
            <Swiper
                    spaceBetween={10}
                    slidesPerView={multiple ? images.length < 5 ? 2 : 5 : 1}
                    allowTouchMove={true}
                    navigation={{
                        nextEl: `#poster-next`,
                        prevEl: `#poster-prev`
                    }}

                >
                    {images.map((image, i) => {
                        return <SwiperSlide key={i} className="">
<                       div 
                        style={{
                            backgroundImage: `url(${URL.createObjectURL(image)})`
                        }}
                        className={`bg-center w-12 h-12 lg:w-18 lg:h-18 bg-cover`}>
                            <img src="/icons/close.svg" className={`ml-auto`} alt="" onClick={() => {
                                SetImages(images.filter(file => image.name !== file.name))
                            }}/>
                        </div>
                        </SwiperSlide>
                    })}
                </Swiper>
                <div id={`poster-next`} className={`${images.length < 1 && "hidden"} transform w-8 h-8 -rotate-90 flex-shrink-0 cursor-pointer z-10 select-none `}>
                    <ChevronDown/>
                </div>
                
            </div>
            <div className={`${images.length < 1 && "hidden"} text-sm mt-3 select-none`}>
                {images.length} из 30
            </div>
        </div>
    )
}

export default ImageInput
