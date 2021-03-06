import {MutableRefObject, useEffect, useRef, useState } from "react"
import ChevronDown from "../icons/chevronDown"

const DropdownWrapper = ({heading, children}) => {
    const [isSliderOpen, setIsSliderOpen] = useState(true)
    const sliderContainerRef = useRef() as MutableRefObject<HTMLDivElement>
    useEffect(() => {
        const listener = () => {
            if (isSliderOpen) {
                sliderContainerRef.current.style.maxHeight = sliderContainerRef.current.scrollHeight + "px"
            }
            else {
                sliderContainerRef.current.style.maxHeight = "0px"
            }
        }
        if (isSliderOpen) {
            sliderContainerRef.current.style.maxHeight = sliderContainerRef.current.scrollHeight + "px"
        }
        else {
            sliderContainerRef.current.style.maxHeight = "0px"
        }
        window.addEventListener("refreshDropdown", listener)
        window.addEventListener('autosize:resized', listener)
        
        return () => {
            window.removeEventListener("refreshDropdown", listener)
            window.removeEventListener('autosize:resized', listener)
        }
    }, [isSliderOpen])
    
    return (
        <div className={`w-full mb-8`}>
            <div
                onClick={() => {
                    window.dispatchEvent(new Event('resize'));
                    setIsSliderOpen(!isSliderOpen)
                }}
                className={`w-auto text-h2-mobile font-medium flex cursor-pointer ${isSliderOpen && "text-orange"}`}>
                <div className={`mr-3 text-mainText text-h7`}>{heading}</div>
                <ChevronDown classname={`stroke-current w-8 h-8 transform transition-all duration-150 ease-out ${isSliderOpen ? "rotate-0" : "-rotate-90"}`} />
            </div>
            <div 
            className={`w-full overflow-y-hidden transition-all duration-300 ease-out ${!isSliderOpen && "opacity-10"}`}
            ref={sliderContainerRef}>
            {children}
            </div>

        </div>
    )

}

export default DropdownWrapper