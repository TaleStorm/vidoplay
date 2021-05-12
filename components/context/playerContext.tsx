import React, { ReactNode, useEffect, useState } from "react";
import authAxios from "../network/authAxios";

const PlayerContext = React.createContext({
    setFullScreen: (arg:boolean) => {},
    isFullScreen: false,
    setApi: (arg: any) => {},
    isMobile: false,
    mobileOverlayStage: 0,
    setMobileOverlayStage: (arg:number) => {},
    fullScreenHide: false,
    setFullScreenHide: (arg:boolean) => {},
    isSliderOpen: false,
    setIsSliderOpen: (arg:boolean) => {},
    realPanelState:"hidden",
    setRealPanel: (arg:string) => {},
    isPlaying: false,
    setIsPlaying: (arg:boolean) => {},
    isMouseMoving: true,
    setIsMouseMoving: (arg:boolean) => {}
});

interface Props {
  children: ReactNode;
}

const PlayerContextProvider = ({ children }: Props) => {
  const [isFullScreen, setFullScreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOverlayStage, setMobileOverlayStage] = useState(0)
  const [fullScreenHide, setFullScreenHide] = useState(false)
  const [api, setApi] = useState(null)
  const [isPlaying , setIsPlaying] = useState(false)
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [realPanelState, setRealPanel] = useState("hidden");
  const [isMouseMoving, setIsMouseMoving] = useState(true)
  

//Определяем, мобильное ли устройство при маунте
  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true)
    }
    else {
      setIsMobile(false)
    }
    return () => {}
  }, [])

// Играется ли видео и все, что с этим связано
  useEffect(() => {
      if (api) {
        if (isPlaying) {
            setRealPanel("hidden");
            api.method({ name: "play" })
            setIsSliderOpen(false)
        }
        else {
            setRealPanel("visible");
            api.method({ name: "pause" })
            setIsSliderOpen(true)
        }
      }
  }, [isPlaying])


//Таймаут для мобильного оверлея
    useEffect(() => {
        const timer = setTimeout(() => {
          if (mobileOverlayStage === 1) {
            setMobileOverlayStage(0)
          }
        }, 4000)
        return () => {clearTimeout(timer)}
      }, [mobileOverlayStage])


//Хэндлим фуллскрин
  useEffect(() => {
    if (api) {
        if (!isFullScreen) {
            api.method({
                name: "resize", params: {
                  width: "100%",
                  height: "100%"
                }})
            }
            else {
              api.method({
                name: "resize", params: {
                  width: window.screen.availWidth,
                  height: window.screen.availHeight
                }
              })
              window.dispatchEvent(new Event("resize"))
            }
    }
  }, [api, isFullScreen])

// Цепляем на апи листнеры
  useEffect(() => {
    if (api) {
        const resizeListener = () => {
            api.method({
              name: "resize", params: {
                width: "100%",
                height: "100%"
              }
            })
          }
      
        window.addEventListener("resize", resizeListener)
    }
  }, [api])

  

//Юзэффекты на движение мышью при фуллскрине
  useEffect(() => {
    if (isFullScreen && isMouseMoving) {
      setFullScreenHide(false)
    }
    const timer = setTimeout(() => {
      if (isFullScreen) {
        setFullScreenHide(true)
      } 
    }, 4000)
    if (isMouseMoving && !isFullScreen) {
      clearTimeout(timer)
    }

    return () => {clearTimeout(timer)}
  }, [isMouseMoving, isFullScreen])

  useEffect(() => {
    const listener = () => {
      if (isFullScreen) {
        setIsMouseMoving(true)
        setTimeout(() => {
          setIsMouseMoving(false)
      }, 4000)
      }    
    }
    setFullScreenHide(false)
    window.addEventListener("mousemove", listener)
    const timer = setTimeout(() => {
      setFullScreenHide(true)
    }, 4000)
    if (!isFullScreen) {
      clearTimeout(timer)
    }
    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", listener)
    }
  }, [isFullScreen])

//Прячем курсор когда надо, а когда не надо, не прячем)
  useEffect(() => {
    const body = document.querySelector('body')
    console.log("cursor changed")
    if (fullScreenHide) {
      body.style.cursor = "none"
    }
    else {
      body.style.cursor = "auto"
    }
  }, [fullScreenHide])

  return (
    <PlayerContext.Provider
    value={{
        setFullScreen,
        isFullScreen,
        setApi,
        isMobile,
        mobileOverlayStage,
        setMobileOverlayStage,
        fullScreenHide,
        setFullScreenHide,
        isSliderOpen,
        setIsSliderOpen,
        realPanelState,
        setRealPanel,
        isPlaying,
        setIsPlaying,
        isMouseMoving,
        setIsMouseMoving
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;

export { PlayerContextProvider };