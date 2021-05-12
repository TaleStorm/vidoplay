import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext, useState } from "react";

import { ProgressBarData } from '../../interfaces'
import PlayerContext from '../context/playerContext';
import FullScreenIcon from '../playerIcons/fullScreen';
import MuteIcon from '../playerIcons/muteIcon';
import PlayIcon from '../playerIcons/playIcon';
import { convertTime } from './utils';

type ProgressBarProps = ProgressBarData

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

export default function ProgressBar({isMobile, ...data}) {
    const currentTimeUser = convertTime(data.currentTime);
    const durationTimeUser = convertTime(data.durationTime);
    const possibleDurationTimeUser = convertTime(data.possibleDurationTime);
    const {fullScreenHide} = useContext(PlayerContext)

    return(
      <div  
        className={`
          ${isMobile ? "hidden" : "flex"}
          ${data.isHidden ? "hidden" : ""}
          ${fullScreenHide && "hidden"}
          absolute md:bottom-4 px-5 pb-5 md:px-0 md:pb-0 bottom-0 z-20 inset-x-0 md:mx-4 w-auto  items-end`
        }
        onMouseOver={(e) => data.setHidden(false)}
      > 
        <div  className={`relative cursor-pointer hidden md:block`}>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons cursor-pointer ${data.isPlaying? "hidden" : ""}`} onClick={() => data.setPlay()}>
                <rect className="wrapper" width="42" height="42" rx="8" fill="white" fillOpacity="0.2"/>
                <path d="M31.5693 19.7533L15.3695 10.1284C15.2331 10.0473 15.0769 10.0031 14.917 10.0002C14.7571 9.99724 14.5993 10.0358 14.4598 10.1118C14.3204 10.1879 14.2042 10.2987 14.1234 10.4328C14.0426 10.567 14 10.7196 14 10.8751V30.1249C14 30.2804 14.0426 30.433 14.1234 30.5672C14.2042 30.7013 14.3204 30.8121 14.4598 30.8882C14.5993 30.9642 14.7571 31.0028 14.917 30.9998C15.0769 30.9969 15.2331 30.9527 15.3695 30.8716L31.5693 21.2467C31.7008 21.1685 31.8095 21.0588 31.885 20.9281C31.9604 20.7973 32 20.6499 32 20.5C32 20.3501 31.9604 20.2027 31.885 20.0719C31.8095 19.9412 31.7008 19.8315 31.5693 19.7533Z" fill="white"/>
            </svg>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons cursor-pointer ${data.isPlaying? "" : "hidden"}`} onClick={() => data.setPlay()}>
                <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H34C38.4183 0 42 3.58172 42 8V34C42 38.4183 38.4183 42 34 42H8C3.58172 42 0 38.4183 0 34V8Z" fill="white" fillOpacity="0.2"/>
                <path d="M30 10H25.5C24.9477 10 24.5 10.4477 24.5 11V31C24.5 31.5523 24.9477 32 25.5 32H30C30.5523 32 31 31.5523 31 31V11C31 10.4477 30.5523 10 30 10Z" fill="white"/>
                <path d="M16.5 10H12C11.4477 10 11 10.4477 11 11V31C11 31.5523 11.4477 32 12 32H16.5C17.0523 32 17.5 31.5523 17.5 31V11C17.5 10.4477 17.0523 10 16.5 10Z" fill="white"/>
            </svg>
        </div>
        <div 
        onClick={() => data.setPlay()}
        className={`md:hidden w-9 h-9 mr-4 flex-shrink-0`}>
        <PlayIcon/>
        </div>
        <div
        className={`w-9 h-9 md:hidden mr-4 flex-shrink-0`}
        >
        <MuteIcon/>
        </div>
        <div
        className={`text-h2-mobile font-medium md:hidden flex-shrink-0 mr-3`}
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
                <div className=" bg-white top-0 bg-opacity-20 w-full h-6 z-10">
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

        <div className="cursor-pointer mr-2 text-white hidden md:block z-20">
            <Menu as="div" className="relative inline-block text-left h-10.5">
                {({ open }) => (
                  <>
                    <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                        static
                        className="bottom-12 absolute left-0 mt-2 w-48 font-roboto rounded-md"
                      >
                        <div className="py-1 ">
                            {qualities.map((quality, i) => {
                            return (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                    <button
                                      className={classNames(
                                        active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                        'block pl-0 py-2 w-20 text-lg '
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
        className={`text-h2-mobile font-medium ml-3 md:hidden`}
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
          <div className={`w-9 h-9 md:h-11 md:w-11 md:p-1.5 md:bg-white md:bg-opacity-20 rounded-lg md:hover:bg-orange flex items-center`}>
          <FullScreenIcon/>
          </div>
        </div>

        


    </div>
    )
}