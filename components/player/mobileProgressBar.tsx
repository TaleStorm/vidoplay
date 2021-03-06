import { MutableRefObject, useContext, useRef, useState } from "react"
import PlayerContext from "../context/playerContext"
import MenuWrapper from "../layout/menuDropdownWrapper"
import FullScreenIcon from "../playerIcons/fullScreen"
import MuteIcon from "../playerIcons/muteIcon"
import PauseIcon from "../playerIcons/pauseIcon"
import PlayIcon from "../playerIcons/playIcon"
import { convertTime } from "./utils"

const MobileProgressBar = ({
    isMobile,
    mobileOverlayStage,
    setMobileOverlayStage,
    globalGplayerAPI,
    isFullScreen,
    fullScreenFunc,
    getMousePos,
    setDrag,
    setCurrentDuration,
    setMouseOver,
    draggerVisible,
    draggerPercent,
    currentTime,
    durationTime,
    possibleDurationTime,
    bufferTimePercent,
    currentTimePercent,
    currentVolume,
    setCurrentVolume
}) => {



    const currentTimeUser = convertTime(currentTime)
    const durationTimeUser = convertTime(durationTime)
    const possibleDurationTimeUser = convertTime(possibleDurationTime)
    const volumeRef = useRef(null) as MutableRefObject<HTMLDivElement>
    const {isLandscape, isPlaying} = useContext(PlayerContext)


    const muteController = (        
      <div className={`w-9 h-9 mr-4 flex-shrink-0
      ${!isLandscape ? "absolute left-0 -top-8" : "relative"}
      `}>
              <MuteIcon/>
          </div>)
    return (
        <div 
        className={`
        ${!isMobile && "hidden"}
        ${!isLandscape ? "px-2 bottom-0" : "px-5 bottom-8"}
        ${isFullScreen &&  mobileOverlayStage < 1 ? "hidden" : "z-20 opacity-100"}
        absolute  flex  transition-all duration-300 items-end w-full left-0
        `}
        >
        <div 
        onClick={() => {
            if (mobileOverlayStage < 2) {
              globalGplayerAPI.method({ name: "pause" })
              setMobileOverlayStage(2)
            }
            if (mobileOverlayStage >= 2) {
              globalGplayerAPI.method({ name: "play" })
              setMobileOverlayStage(0)
            }
          }}
        className={`w-9 h-9 mr-4 flex-shrink-0
        ${!isLandscape && "hidden"}
        `}>
          {isPlaying ? <PauseIcon/> : <PlayIcon/>}  
        </div>
        <MenuWrapper controller={muteController}>
          <div 

          className={`bg-popupBackground rounded-lg p-3 w-auto h-32`}>
              <div 
              style={{
                touchAction: "none"
              }}
              ref={volumeRef}
                onTouchStart={(e) => {
                    e.preventDefault()
                    setCurrentVolume(e, volumeRef)
                }}
                onTouchMove={(e) => {

                    setCurrentVolume(e, volumeRef)
                }}
                onTouchEnd={(e) => {
                        e.preventDefault()
                        setCurrentVolume(e, volumeRef)
                         }}
              className={`bg-white bg-opacity-40
               w-7 h-full relative
               `}>
                <div 

                style={{
                    height: `${currentVolume}%`
                }}
                id={`mutePanel`}
                className={`absolute bottom-0 h-full w-full bg-orange`}>
                </div>
            </div>
          </div>
          <div>

          </div>

        </MenuWrapper>

        <div className={`flex w-full h-6 items-center`}>
        <div
        className={`text-h2-mobile font-medium flex-shrink-0 mr-3 ${!isLandscape && "hidden"}`}
        >
          {currentTimeUser}
        </div>
        <div  className={`w-full h-6 cursor-pointer md:mx-2 select-none`} 
              onTouchStart={(e) => {
                console.log(e)
                setDrag(true)
                getMousePos(e.touches[0])
                
                }}
              onTouchMove={(e) => getMousePos(e.touches[0])}
              onTouchEnd = {(e) => {
                  console.log(e)
                  getMousePos(e.changedTouches[0])
                  setCurrentDuration(e)
                  setMouseOver()
                  setDrag(false)  
              }}
            >
                <div className={`relative bg-white top-0 bg-opacity-20 w-full
                 ${!isLandscape ? "h-3" : "h-6"}
                 z-10
                `}>
                  <div  className={`mb-2 w-1 overflow-visible text-center z-20 justify-center items-center absolute bottom-6 flex ${draggerVisible ? '':'hidden'}`} style={{ left:draggerPercent + "%" }}>
                      <div className={`absolute h-10 -top-12 w-36 bg-white bg-opacity-20 flex justify-center rounded-xl`}>
                      <span className="text-white text-sm pointer-events-none flex items-center mb-1 font-medium" >
                        {possibleDurationTimeUser} | {durationTimeUser}
                      </span>  
                      </div>
                      <div 
                      style={{
                        clipPath: "polygon(50% 100%, 0 0, 100% 0)"
                      }}
                      className={`absolute h-4 w-7 -top-2 bg-white bg-opacity-20`}/>
                  </div>
                  <div className="absolute bg-white top-0 opacity-30 h-full z-20" style={{width:String(bufferTimePercent)+"%"}}/>
                    <div className={`absolute bg-playerSecond top-0 h-full z-20`} style={{width:String(currentTimePercent)+"%"}}/>
                </div>
                    
                <span className="absolute font-medium z-20 text-mainText text-sm pointer-events-none hidden" >
                    {currentTimeUser} | {durationTimeUser}
                </span>     
            </div>
            <div
        className={`text-h2-mobile font-medium ml-3 ${!isLandscape && "hidden"} `}
        >
        {durationTimeUser}
        </div>
        </div>

        <div 
                onTouchEnd={() => {
                    
                    fullScreenFunc()
                  }}
        className={`w-9 h-9 flex-shrink-0 ml-3
        ${!isLandscape ? "absolute right-1 -top-8" : "relative"}
        `}>
          <FullScreenIcon isFullScreen={isFullScreen}/>
        </div>
        </div>
    )
}

export default MobileProgressBar