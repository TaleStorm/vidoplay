import React, { ReactNode, useEffect, useState } from "react";


const PlayerContext = React.createContext({
  setIsSpaceListenerActive: (arg: boolean | ((arg:boolean)=>boolean)) => { },
  setFullScreen: (arg: boolean) => { },
  isFullScreen: false,
  setApi: (arg: any) => { },
  isMobile: false,
  mobileOverlayStage: 0,
  setMobileOverlayStage: (arg: number) => { },
  fullScreenHide: false,
  setFullScreenHide: (arg: boolean) => { },
  isSliderOpen: false,
  setIsSliderOpen: (arg: boolean) => { },
  realPanelState: "hidden",
  setRealPanel: (arg: string) => { },
  isPlaying: false,
  setIsPlaying: (arg: boolean) => { },
  isMouseMoving: true,
  setIsMouseMoving: (arg: boolean) => { },
  isLandscape: true,
  currentSerie: 0,
  setSerie: (arg: number) => { },
  isWarningVisible: true,
  setIsWarningVisible: (arg: boolean) => { },
  warningDuration: 4,
  currentSeason: 0,
  setSeason: (arg: number) => { },
  isIntro: true,
  setIntro: (arg: boolean) => { },
  panelState: "hidden",
  setPanel: (arg: string) => { },
  isEndedModalOpen: false,
  setIsEndedModalOpen: (arg: boolean) => { },
  currentTimePercent: "0",
  setVideoPercentCurrent: (arg: string) => { },
  changeSerie: (arg: number) => { },
  currentActing: 0,
  setActing: (arg: number) => { },
  changeActing: (arg: number) => { },
  durationTime: 0,
  setVideoDuration: (arg: number) => { },
  buttonState: "visible",
  setButton: (arg: string) => { },
  currentTimeBuffer: "0",
  setVideoPercentBuffer: (arg: string) => { },
  currentVolume: 100,
  setVolumeCurrent: (arg: number) => { },
  isTopPanelActive: false,
  api: null
});

// В этой функции отправляем сообщения
export const sendPostMessage = (message) => {
  console.log(message)
  return window.parent.postMessage(message, "*")
}

interface Props {
  children: ReactNode;
}

const PlayerContextProvider = ({ children }: Props) => {
  const [currentVolume, setVolumeCurrent] = useState(100);
  const [isFullScreen, setFullScreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOverlayStage, setMobileOverlayStage] = useState(0)
  const [currentSerie, setSerie] = useState(0);
  const [currentSeason, setSeason] = useState(0);
  const [fullScreenHide, setFullScreenHide] = useState(false)
  const [isIntro, setIntro] = useState(true);
  const [durationTime, setVideoDuration] = useState(0);
  const [api, setApi] = useState(null)
  const [panelState, setPanel] = useState("hidden");
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [realPanelState, setRealPanel] = useState("hidden");
  const [isMouseMoving, setIsMouseMoving] = useState(true)
  const [isLandscape, setIsLandscape] = useState(true)
  const [hasBeenPlayed, setHasBeenPlayed] = useState(false)
  const [isWarningVisible, setIsWarningVisible] = useState(true)
  const [isEndedModalOpen, setIsEndedModalOpen] = useState(false);
  const [currentTimePercent, setVideoPercentCurrent] = useState("0");
  const [currentActing, setActing] = useState(0);
  const [buttonState, setButton] = useState("visible");
  const [currentTimeBuffer, setVideoPercentBuffer] = useState("0");
  const [isSpaceListenerActive, setIsSpaceListenerActive] = useState(false)
  const [isTopPanelActive, setTopPanelActive] = useState(false)
  const warningDuration = 4

  var removeFakeButton = () => {
    setPanel("visible");
    setButton("hidden");
  }

  //Определяем, мобильное ли устройство при маунте
  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true)
    }
    else {
      setIsMobile(false)
    }
    return () => { }
  }, [])

  // Играется ли видео и все, что с этим связано
  useEffect(() => {
    if (api) {
      if (isPlaying) {
        api.method({ name: "setVolume", params: currentVolume });
        setRealPanel("hidden")
        setMobileOverlayStage(0)
        api.method({ name: "play" })
        setHasBeenPlayed(true)
        if (!hasBeenPlayed) {
          setIsWarningVisible(true)
        }
        setIsSliderOpen(false)
      }
      else {
        setIsSliderOpen(true)
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
    return () => { clearTimeout(timer) }
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
                window.dispatchEvent(new Event("resize"))
            }
            else {
              window.dispatchEvent(new Event("resize"))
            }
    }
  }, [api, isFullScreen])

  useEffect(() => {
    if (api) {
      delete api._events["play"]
      api.on('play', () => {
        if (isIntro) {
          sendPostMessage("PLAYING_INTRO")
        }
        else {
          sendPostMessage("PLAYING_VIDEO")
        }

        console.log("playing")
        api.method({name: "setVolume", params: currentVolume})
        setButton("hidden");
        changeActing(currentActing)
        setIsPlaying(true);
        api.method({
          name: 'getDuration', params: {}, callback: (res) => {
            setVideoDuration(res);
            delete api._events["progress"]
            api.on('progress', (data) => {
              const percent = 100 * data.current / res
              setVideoPercentBuffer(percent.toFixed(1))
            })
          }
        })

      })

    }
  }, [api, currentActing, currentVolume, isIntro])

  //Листенеры на ended
  useEffect(() => {
    if (api) {
      delete api._events["ended"]
      if (isIntro) {
        api.on("ended", () => {
          setIntro(false)
          sendPostMessage("INTRO_ENDED")
          removeFakeButton();
        })
      }
      else {
        api.on("ended", () => {
          api.method({ name: "seekPercentage", params: 100 });
          api.method({ name: "pause" });
          sendPostMessage("VIDEO_ENDED")
          setIsEndedModalOpen(true);
        })
        
      }
    }
    return () => {if (api) delete api._events["ended"]}

  }, [api, isIntro])


  //Реклама
  useEffect(() => { 
    if (api) {
      api.on("advertisementWasStarted", () => {
        sendPostMessage("ADS_STARTED")
        setTopPanelActive(false)
        setButton("hidden")
        setPanel("hidden")
      })
      api.on("advertisementWasFinished", () => {
        sendPostMessage("ADS_ENDED")
        setTopPanelActive(true)
        setButton("visible")
        setPanel("visible")
      })
    }
  }, [api])

  // Цепляем на апи листнеры
  useEffect(() => {
    
    if (api) {
      console.log(api)
      const resizeListener = () => {
        setTimeout(() => {
          api.method({
            name: "resize", params: {
              width: "100%",
              height: "100%"
            }
          })
        }, 1000)
      }
       if (hasBeenPlayed) {   
          api.on("ready", () => {
            sendPostMessage("READY_VIDEO")
            api.method({ name: "play" });
          })
        }
        else {
          api.on("ready", () => {
            sendPostMessage("READY_INTRO")
          })
        }

      window.addEventListener("resize", resizeListener)

    }

    return () => { if (api) console.log(api)}
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

    return () => { clearTimeout(timer) }
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

  function spaceListener(e) {

    if (e.key == " ") {
      e.preventDefault();

      if (isPlaying) {
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
      }
    }
  }

  //Добляем или удаляем обработчик пробела
  useEffect(() => {
    if (isSpaceListenerActive && !isIntro)
      window.addEventListener("keydown", spaceListener);
    else
      window.removeEventListener("keydown", spaceListener);
    return(()=>{window.removeEventListener("keydown", spaceListener)}) 
  }, [isSpaceListenerActive, isPlaying, isIntro])

  var changeSerie = async (newSerie) => {
    setPanel("hidden");
    setIntro(true);
    setIsWarningVisible(true)
    setIsPlaying(false)
    setMobileOverlayStage(0)
    if (isEndedModalOpen) {
      setIsEndedModalOpen(false);
    }
    setVideoPercentCurrent("0");
    setSerie(newSerie);
    changeActing(currentActing)
  }


  var changeActing = (newActing) => {
    setActing(newActing);
    api.method({
      name: 'getPlugin', params: {
        pluginName: "audio_selector",
        pluginMethod: "setIndexTrack",
        pluginValue: currentActing
      }, callback: (e) => {
      }
    });
  }

  return (
    <PlayerContext.Provider
      value={{
        setIsSpaceListenerActive,
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
        warningDuration,
        setSeason,
        currentSeason,
        setIntro,
        isIntro,
        panelState,
        setPanel,
        isEndedModalOpen,
        setIsEndedModalOpen,
        currentTimePercent,
        setVideoPercentCurrent,
        changeSerie,
        setActing,
        currentActing,
        changeActing,
        durationTime,
        setVideoDuration,
        buttonState,
        setButton,
        currentTimeBuffer,
        setVideoPercentBuffer,
        currentVolume, 
        setVolumeCurrent,
        isTopPanelActive,
        api
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;

export { PlayerContextProvider };