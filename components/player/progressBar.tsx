import { Menu, Transition } from '@headlessui/react';
import { Fragment, MutableRefObject, useContext, useRef, useState } from "react";

import { ProgressBarData } from '../../interfaces'
import PlayerContext from '../context/playerContext';
import MenuWrapper from '../layout/menuDropdownWrapper';
import FullScreenIcon from '../playerIcons/fullScreen';
import MuteIcon from '../playerIcons/muteIcon';
import PauseIcon from '../playerIcons/pauseIcon';
import PlayIcon from '../playerIcons/playIcon';
import { convertTime } from './utils';

const qualities = [
  "AUTO",
  "1080",
  "720",
  "480",
  "360",
  "240",
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function ProgressBar({isMobile, setCurrentVolumeY, ...data}) {
    const currentTimeUser = convertTime(data.currentTime);
    const durationTimeUser = convertTime(data.durationTime);
    const possibleDurationTimeUser = convertTime(data.possibleDurationTime);
    const {fullScreenHide, isIntro, isPlaying, setIsPlaying, currentVolume} = useContext(PlayerContext)
    const volumeRef = useRef(null) as MutableRefObject<HTMLDivElement>

    const muteController = (        
      <div className={`absolute bottom-1 left-0 xs:static w-8 h-8 xs:w-9 xs:h-9 md:h-11 md:w-11 mr-4 flex-shrink-0 md:hidden
      `}>
              <MuteIcon/>
          </div>)

    return(
      <div  
        className={`
          ${fullScreenHide && "hidden"}
          ${isIntro && "invisible"}
          absolute md:bottom-4 xs:px-5 px-2 xs:pb-5 pb-1 md:px-0 md:pb-0 bottom-0 z-20 inset-x-0 md:mx-4 w-auto xs:flex items-end`
        }
      > 
        <div onClick={() => (setIsPlaying(!isPlaying))}  className={`relative lg:hover:bg-orange transition-all duration-200 rounded-lg flex-shrink-0 p-2 cursor-pointer hidden md:block w-10 h-10 bg-white bg-opacity-20 z-10`}>
          {isPlaying ? <PauseIcon/>  : <PlayIcon/>}
        </div>
        <div 
        onClick={() => data.setPlay()}
        className={`md:hidden w-9 h-9 mr-4 flex-shrink-0 absolute hidden xs:block xs:static`}>
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
              onClick={(e) => {
                e.preventDefault()
                setCurrentVolumeY(e, volumeRef)
              }}
                onTouchStart={(e) => {
                    e.preventDefault()
                    //setCurrentVolume(e, volumeRef)
                }}
                onTouchMove={(e) => {

                    //setCurrentVolume(e, volumeRef)
                }}
                onTouchEnd={(e) => {
                        e.preventDefault()
                        //setCurrentVolume(e, volumeRef)
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
        <div
        className={`text-h2-mobile font-medium hidden xs:block md:hidden flex-shrink-0 mr-3`}
        >
          {currentTimeUser}
        </div>
        <div  className={`w-full md:mr-2 `}>
            <div  className={`relative w-full md:h-6 cursor-pointer md:mx-2`} 
              onMouseMove= {(e) => data.getMousePos(e)}  
              onClick= {(e) => data.setCurrentDuration(e)} 
              onMouseUp={() => 
                data.setDrag(false)} 
              onMouseDown={() => 
                data.setDrag(true)}
              onMouseOut={() => data.setMouseOver()}
              onTouchStart={(e) => {
                data.setDrag(true)
                data.getMousePos(e.touches[0])
                }}
              onTouchMove={(e) => data.getMousePos(e.touches[0])}
              onTouchEnd = {(e) => {
                  data.setCurrentDuration(e)
                  data.setMouseOver()
                  data.setDrag(false)  
              }}
            >
                <div className=" bg-white top-0 bg-opacity-20 w-full xs:h-6 h-2 z-10">
                  <div  className={`mb-2 w-1 overflow-visible text-center z-20 justify-center items-center absolute bottom-6 flex ${data.draggerVisible ? '':'hidden'}`} style={{ left:data.draggerPercent + "%" }}>
                      <div className={`absolute h-10 -top-12 w-36 bg-white bg-opacity-20 flex justify-center rounded-xl`}>
                      <span className="text-white text-sm pointer-events-none flex items-center font-medium" >
                        {possibleDurationTimeUser} | {durationTimeUser}
                      </span>  
                      </div>
                      <div 
                      style={{
                        clipPath: "polygon(50% 100%, 0 0, 100% 0)"
                      }}
                      className={`absolute h-4 w-7 -top-2 bg-white bg-opacity-20`}/>
                  </div>
                </div>
                <div className="absolute bg-white top-0 opacity-30 w-34/100 h-full z-20" style={{width:String(data.bufferTimePercent)+"%"}}/>
                <div className={`absolute bg-playerSecond top-0 h-full z-20`} style={{width:String(data.currentTimePercent)+"%"}}/>
                <span className="absolute font-medium md:block inset-y-0 right-4 z-20 text-mainText text-sm pointer-events-none hidden" >
                    {currentTimeUser} | {durationTimeUser}
                </span>     
            </div>
        </div>

        <div  className={`relative mx-2 hidden md:block`}>
            <svg width="132" height="42" viewBox="0 0 132 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mb-10.5">
                <rect width="132" height="42" rx="8" fill="white" fillOpacity="0.2"/>
            </svg>
            <div  className={`w-full flex items-center px-2 `} >
                <svg width="42" height="42" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`cursor-pointer mr-2 ${ data.isMuted ? "hidden" : ""}`} onClick={() => data.changeMute()}>
                    <path d="M22.2302 7.82928C22.9093 8.50831 23.4479 9.31444 23.8154 10.2016C24.1829 11.0888 24.372 12.0397 24.372 13C24.372 13.9603 24.1829 14.9112 23.8154 15.7984C23.4479 16.6856 22.9093 17.4917 22.2302 18.1707" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.125 17.0625H3.25C3.03451 17.0625 2.82785 16.9769 2.67548 16.8245C2.5231 16.6722 2.4375 16.4655 2.4375 16.25V9.75C2.4375 9.53451 2.5231 9.32785 2.67548 9.17548C2.82785 9.0231 3.03451 8.9375 3.25 8.9375H8.125L15.4375 3.25V22.75L8.125 17.0625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.125 8.9375V17.0625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.3577 10.7019C19.6595 11.0037 19.8988 11.362 20.0622 11.7563C20.2255 12.1506 20.3096 12.5732 20.3096 13C20.3096 13.4268 20.2255 13.8494 20.0622 14.2437C19.8988 14.638 19.6595 14.9963 19.3577 15.2981" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="42" height="42" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={`cursor-pointer mr-2 ${ data.isMuted ? "" : "hidden"}`} onClick={() => data.changeMute()}>
                    <path d="M22.2307 7.83046C23.6021 9.20182 24.3725 11.0618 24.3725 13.0012C24.3725 14.9406 23.6021 16.8005 22.2307 18.1719" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.12451 8.93867V17.0637" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.3582 10.7031C19.9676 11.3126 20.3101 12.1392 20.3101 13.0012C20.3101 13.8631 19.9676 14.6898 19.3582 15.2993" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.875 4.0625L21.125 21.9375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.4375 15.6813V22.7512L8.125 17.0637H3.25C3.03451 17.0637 2.82785 16.9781 2.67548 16.8257C2.5231 16.6733 2.4375 16.4667 2.4375 16.2512V9.75119C2.4375 9.5357 2.5231 9.32904 2.67548 9.17666C2.82785 9.02429 3.03451 8.93869 3.25 8.93869H8.125L8.81793 8.39973" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.3909 6.39854L15.4375 3.25122V10.8498" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <div  className={`w-full h-4 cursor-pointer mx-2 flex flex-wrap`} onClick= {(e) => data.setCurrentVolume(e)}>
                    <div className={`bg-playerSecond h-full z-20`} style={{width:String(data.currentVolume)+"%"}}>
                    
                    </div>
                    <div className="bg-white opacity-20 w-full h-full z-20" style={{width:String(100-data.currentVolume)+"%"}}>

                    </div>
                </div>
            </div>
        </div>

        <div className="cursor-pointer mr-2 text-white hidden md:block relative z-30">
            <Menu as="div" className="relative inline-block text-left z-30 h-10.5">
                {({ open }) => (
                  <>
                    <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                        static
                        className="bottom-12 absolute left-0 mt-2 w-48 font-roboto rounded-md z-30"
                      >
                        <div className="py-1 ">
                            {qualities.map((quality, i) => {
                            return (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                    <button
                                      className={classNames(
                                        active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                        'block pl-0 py-2 w-20 text-lg relative z-30'
                                      )}
                                      onClick = {() => data.changeCurrentLevel(quality)}
                                    >
                                      {quality}
                                    </button>
                                )}
                              </Menu.Item>
                            )
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                    <div>
                      <Menu.Button className={`inline-flex justify-center w-20 h-10.5 rounded-md shadow-sm px-4 py-2 bg-white hover:bg-orange bg-opacity-20 text-sm font-roboto`} >
                        <div className="inline-flex text-lg">
                          {data.currentQuality} 
                        </div>
                      </Menu.Button>
                    </div>
                  </>
                )}
              </Menu>
            </div>
        <div
        className={`text-h2-mobile font-medium ml-3 hidden xs:block md:hidden`}
        >
        {durationTimeUser}
        </div>
        <div 
        
        onClick={(e) => {
          data.fullScreenFunc()
        }}
        onTouchEnd={(e) => {
          
        }}
        className={`cursor-pointer block ml-3 md:ml-0`}>
          <div className={`absolute xs:static right-2 bottom-4 w-8 h-8  xs:w-9 xs:h-9 md:h-11 md:w-11 md:p-1.5 md:bg-white md:bg-opacity-20 rounded-lg md:hover:bg-orange flex items-center`}>
            <FullScreenIcon isFullScreen={data.isFullScreen}/>
          </div>
        </div>
    </div>
    )
}