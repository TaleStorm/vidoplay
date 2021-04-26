import {MutableRefObject, useEffect, useRef, useState } from "react"
import ChevronDown from "../icons/chevronDown"

const DropdownWrapper = ({heading, children}) => {
    const [isSliderOpen, setIsSliderOpen] = useState(true)
    const sliderContainerRef = useRef() as MutableRefObject<HTMLDivElement>
    useEffect(() => {
        if (isSliderOpen) {
            sliderContainerRef.current.style.height = sliderContainerRef.current.scrollHeight + "px"
        }
        else {
            sliderContainerRef.current.style.height = "0px"
        }
    }, [isSliderOpen])

    useEffect(() => {
        window.addEventListener("refreshDropdown", () => {
            if (isSliderOpen) {
                sliderContainerRef.current.style.height = sliderContainerRef.current.scrollHeight + "px"
            }
            else {
                sliderContainerRef.current.style.height = "0px"
            }
        })
    },[])
    return (
        <div className={`w-full`}>
            <div
                onClick={() => {
                    window.dispatchEvent(new Event('resize'));
                    setIsSliderOpen(!isSliderOpen)
                }}
                className={`w-auto text-h2-mobile mb-3 font-medium flex cursor-pointer items-center`}>
                <div className={`mr-3`}>{heading}</div>
                <ChevronDown classname={`stroke-current w-8 h-8 transform transition-all duration-150 ease-out ${isSliderOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
            <div 
            className={`w-full overflow-hidden transition-all duration-300 ease-out ${!isSliderOpen && "opacity-10"}`}
            ref={sliderContainerRef}>
            {children}
            </div>

        </div>
    )

}

export default DropdownWrapper