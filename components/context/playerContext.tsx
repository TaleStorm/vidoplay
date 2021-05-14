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
    setIsMouseMoving: (arg:boolean) => {},
    isLandscape: true,
    currentSerie: 0,
    setSerie: (arg:number) => {},
    isWarningVisible: true,
    setIsWarningVisible: (arg:boolean) => {},
    warningDuration: 4
});

interface Props {
  children: ReactNode;
}

const PlayerContextProvider = ({ children }: Props) => {
  const [isFullScreen, setFullScreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOverlayStage, setMobileOverlayStage] = useState(0)
  const [currentSerie, setSerie] = useState(0);
  const [fullScreenHide, setFullScreenHide] = useState(false)
  const [api, setApi] = useState(null)
  const [isPlaying , setIsPlaying] = useState(false)
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [realPanelState, setRealPanel] = useState("hidden");
  const [isMouseMoving, setIsMouseMoving] = useState(true)
  const [isLandscape, setIsLandscape] = useState(true)
  const [hasBeenPlayed, setHasBeenPlayed] = useState(false)
  const [isWarningVisible, setIsWarningVisible] = useState(true)
  const warningDuration = 4
  

// Определяем ориентацию (устройства)
  useEffect(() => {
    console.log(screen.orientation.angle)
    const listener = () => {
      if (screen.orientation.angle === 0) {
        setIsLandscape(false)
      }
      else {
        setIsLandscape(true)
      }
    }
    listener()
    window.addEventListener("orientationchange", listener)
    return () => {window.removeEventListener("orientationchange", listener)}
  },[])

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
            console.log("Вызван плей")
            setMobileOverlayStage(0)
            setHasBeenPlayed(true)
            if  (!hasBeenPlayed) {
              setIsWarningVisible(true)
            }
            setIsSliderOpen(false)
            setHasBeenPlayed(true)
        }
        else {
            console.log('Вызван пауз')
            setMobileOverlayStage(2)
            api.method({ name: "pause" })   
        }
      }
  }, [isPlaying, api])


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
          if (hasBeenPlayed) {
            api.on("ready", () => {
              api.method({name: "play"})
            })
          } 
        window.addEventListener("resize", resizeListener)
    }
  }, [api, hasBeenPlayed])

  

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
  }, [isMouseMoving, isFullScreen, api])

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
  }, [isFullScreen, api])

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
        setIsMouseMoving,
        isLandscape,
        currentSerie,
        setSerie,
        isWarningVisible,
        setIsWarningVisible,
        warningDuration
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;

export { PlayerContextProvider };