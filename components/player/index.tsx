import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ProgressBar from './progressBar';
import TopPlayerPanel from './topPlayerPanel';
import CompilationSlider from './compilationSlider';
import CompilationSliderSerial from './compilationSliderSerial';
import CompilationModal from './compilationModal';
import CompilationModalSerial from './compilationModalSerial';
import PlayerModalOverlay from './playerModalOverlay';
import EndedModal from './endedModal';
import PauseIcon from "../playerIcons/pauseIcon";
import ChevronLeft from "../icons/chevronLeft";
import PlayIcon from "../playerIcons/playIcon";
import MobileProgressBar from "./mobileProgressBar";
import CompilationSliderMobile from "./compilationSliderMobile";
import { useSwipeable } from "react-swipeable";
import usePredictor from "../hooks/usePredictor";
import PlayerContext from "../context/playerContext";
import MovieContext from "../context/movieContext";
import AgeWarning from "./ageWarning";

export default function Player(data) {
  const [buttonState, setButton] = useState("visible");
  const [panelState, setPanel] = useState("hidden");
  const [serieState, setSerieState] = useState("closed");
  const [currentSeason, setSeason] = useState(0);
  const [seasonState, setSeasonState] = useState("closed");
  const [currentActing, setActing] = useState(0);
  const [actingState, setActingState] = useState("closed");
  const [interval, setIntervalVideo] = useState(undefined);
  const [realInterval, setRealInterval] = useState(0);
  const [durationTime, setVideoDuration] = useState(0);
  const [currentTime, setVideoCurrent] = useState(0);
  const [currentTimePercent, setVideoPercentCurrent] = useState("0");
  const [currentTimeBuffer, setVideoPercentBuffer] = useState("0");
  const [currentVolume, setVolumeCurrent] = useState(100);
  const [bufferVolume, setVolumeBuffer] = useState(100);
  const [isMuted, setMute] = useState(false);
  const [isDragged, setDrag] = useState(false);
  const [currentQuality, setCurrentQuality] = useState("AUTO");
  const [isEndedModalOpen, setIsEndedModalOpen] = useState(false);
  const [isCompliationModalOpen, setIsCompliationModalOpen] = useState(false);
  const [currentCompilationMovie, setCurrentCompilationMovie] = useState(data.movies[0]);
  const [globalGplayerAPI, setPlayer] = useState(undefined);
  const [draggerPercent, setDraggerPercent] = useState("0");
  const [draggerVisible, setDraggerVisible] = useState(false);
  const [possibleDurationTime, setPossibleDurationTime] = useState(0);

  // Интро
  const [isIntro, setIntro] = useState(true);

  //скелет
  const [isLoaded, setisLoaded] = useState(true);


  //Контекст, в идеале запихнуть в него всю функциональную часть плеера, здесь оставив лишь декорации
  const {
    setApi, 
    isFullScreen, 
    setFullScreen, 
    isMobile, 
    mobileOverlayStage, 
    setMobileOverlayStage,
    fullScreenHide,
    setFullScreenHide,
    isSliderOpen,
    setIsSliderOpen,
    isPlaying,
    setIsPlaying,
    realPanelState,
    setRealPanel,
    currentSerie,
    setSerie,
    setIsWarningVisible
    
  } = useContext(PlayerContext)

  const intro = "https://chillvision.gcdn.co/videos/18824_73D1CCWxB499h8xa"

  const getPlayer = async () => {
    setVideoPercentCurrent("0");
    const GcorePlayer = (window as any).GcorePlayer.gplayerAPI;
    const gplayerAPI = new GcorePlayer(document.getElementById("gplayer"))

    gplayerAPI.on("ready", () => {
      gplayerAPI.method({name: "play"});
    })

    gplayerAPI.on('play', () => {
      setButton("hidden");
      setVideoPercentCurrent("0");
      setIsPlaying(true);
      const timer = setTimeout(() => {
        setIntro(false);
        clearTimeout(timer);
      }, 5000)
      const timerforPanel = setTimeout(() => {
        removeFakeButton();
        clearTimeout(timerforPanel);
      }, 9000)
      setVideoPercentCurrent("0");
      gplayerAPI.method({
        name: 'getDuration', params: {}, callback: (res) => {
          setVideoDuration(res);
          gplayerAPI.on('progress', (data) => {
            const percent = 100 * data.current / res
            setVideoPercentBuffer(percent.toFixed(1))
          })
        }
      })
  })

    gplayerAPI.on("pause", () => {
      setIsPlaying(false)
    })


    gplayerAPI.on("ended", () => {
      console.log("Sirie ended")
      gplayerAPI.method({ name: "seekPercentage", params: 100 });
      gplayerAPI.method({ name: "pause" });
      setIsEndedModalOpen(true);
    })

    //Вот тут хэндлится вся логика фуллскрина при нажатии на ESC
    const fullScreenListener = () => {
      if (window.innerWidth > 1000) {
        if (!window.screenTop && !window.screenY) {
          data.setFullScreen(false);
          setFullScreen(false);
        }
        else {
          data.setFullScreen(true)
          setFullScreen(true);
        }
      }
    }

    window.addEventListener("fullscreenchange", fullScreenListener)
    setPlayer(gplayerAPI);
    return { gplayerAPI: gplayerAPI, userWindow: { width: (window).innerWidth, height: (window).innerHeight } }
  }

  useEffect(() => {
    if (globalGplayerAPI) {
      globalGplayerAPI.method({
        name: 'getCurrentTime', params: {}, callback: (res) => {
          setVideoCurrent(res)
          setIntervalVideo(setInterval(() => tick(), 500));
          const percent = 100 * res / durationTime
          console.log(percent)
          setVideoPercentCurrent(percent.toFixed(1))
        }
      })
    }
  }, [durationTime,globalGplayerAPI])

  useEffect(() => {
    if (globalGplayerAPI) {
      setApi(globalGplayerAPI)
    }
  }, [globalGplayerAPI])

  useEffect(() => {
    if (globalGplayerAPI) {
    globalGplayerAPI.method({name: "pause"})
    }
  }, [currentSerie])

  useEffect(() => {
    if (globalGplayerAPI) {
      globalGplayerAPI.method({
        name: 'getCurrentTime', params: {}, callback: (res) => {
          setVideoCurrent(res)
          const percent = 100 * res / durationTime
          console.log(res, durationTime)
          setVideoPercentCurrent(percent.toFixed(1))
        }
      })
    }
  }, [realInterval,durationTime])

  var tick = () => {
    if (realInterval > 60) {
      setRealInterval(0);
    };
    setRealInterval(realInterval+1);
  }

  useEffect(() => {
    if (globalGplayerAPI) {
      const spaceListener = (e) => {
        e.preventDefault();
        if (e.key == " ") {
          if (realPanelState == "hidden") {
            setRealPanel("visible");
            globalGplayerAPI.method({ name: "pause" });
            setIsSliderOpen(true);
          } else {
            setRealPanel("hidden");
            globalGplayerAPI.method({ name: "play" });
            setIsSliderOpen(false);
          }   
        }
        window.removeEventListener("keydown", spaceListener);
      }
      window.addEventListener("keydown", spaceListener);
    }
  }, [realPanelState])

  var removeFakeButton = () => {
    setPanel("visible");
    setButton("hidden");
  }


  var setPlay = () => {
    if (isPlaying) {
      setIsSliderOpen(true)
      globalGplayerAPI.method({name: "pause"})
    }
    else {
      globalGplayerAPI.method({name: "play"})
    }
  };

  var changeVideo = async (direction) => {
    if (direction == "prev") {
      setSerie(currentSerie - 1);
    } else {
      setSerie(currentSerie + 1);
    };
    setVideoPercentCurrent("0");
  }

  var changeSeason = async (newSeason) => {
    setSeason(newSeason);
    setVideoPercentCurrent("0");
  }

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
  }

  var changeActing = async (newActing) => {
    setActing(newActing);
    globalGplayerAPI.method({name: 'getPlugin', params: {
      pluginName: "audio_selector", 
      pluginMethod: "setIndexTrack",
      pluginValue: newActing
    }, callback: (e) => {
    }});
  }

  var changeSerieState = async () => {
    if (seasonState == "open") {
      setSerieState("closed")
    } else {
      setSerieState("open")
    }
  }

  var changeActingState = async () => {
    if (actingState == "open") {
      setActingState("closed")
    } else {
      setActingState("open")
    }
  }

  var changeSeasonState = async () => {
    if (seasonState == "open") {
      setSeasonState("closed");
    } else {
      setSeasonState("open");
    };
  }

  var changeMute = async () => {
    if (isMuted) {
      setMute(false);
      globalGplayerAPI.method({ name: "unmute" });
      setVolumeCurrent(bufferVolume);
    } else {
      setMute(true);
      globalGplayerAPI.method({ name: "mute" });
      setVolumeBuffer(currentVolume);
      setVolumeCurrent(0);
    }
  }

  var getMousePos = (e) => {
    const target = e.target.getBoundingClientRect();
    const percent = 100 * (e.clientX - target.x) / e.target.parentElement.offsetWidth
    if (isDragged) {
      globalGplayerAPI.method({ name: "seekPercentage", params: percent.toFixed(1) })
    }
    setDraggerVisible(true)
    setDraggerPercent((percent).toFixed(1))
    const time = durationTime * percent / 100
    setPossibleDurationTime(time)
  }

  var setMouseOver = () => {
    setDraggerVisible(false)
  }

  var setCurrentDuration = (e) => {
    const target = e.target.getBoundingClientRect();
    const percent = 100 * (e.clientX - target.x) / e.target.parentElement.offsetWidth
    globalGplayerAPI.method({ name: "seekPercentage", params: percent.toFixed(1) })
  }

  var changeCurrentVolume = (e) => {
    setMute(false);
    const target = e.target.parentElement.getBoundingClientRect();
    const percent = 100 * (e.clientX - target.x) / e.target.parentElement.offsetWidth
    globalGplayerAPI.method({ name: "setVolume", params: percent.toFixed(0) })
    setVolumeCurrent(Number(percent.toFixed(0)))
  }

  const changeCurrentVolumeY = (e, ref) => {
    setMute(false);
    const target = ref.current.parentElement.getBoundingClientRect();
    const result = (((target.height - (e.changedTouches[0].clientY - target.y))/ target.height) * 100)
    const percent = result < 100.1 ? result : 100
    globalGplayerAPI.method({ name: "setVolume", params: percent.toFixed(0) })
    setVolumeCurrent(Number(percent.toFixed(0)))
  }

  var changeCurrentLevel = (quality) => {
    setCurrentQuality(quality);
    globalGplayerAPI.method({
      name: 'getPlugin', params: {
        pluginName: 'level_selector',
        pluginMethod: 'setLevel',
        pluginValue: quality.toLowerCase()
      }, callback: (e) => {
      }
    })
  }

  const handle = useFullScreenHandle();

  const fullScreenFunc = async () => {
    if (isFullScreen) {
      handle.exit();
      data.setFullScreen(false);
      setFullScreen(false);
      return
    } else {
      handle.enter()
      data.setFullScreen(true)
      setFullScreen(true);
      return
    }
  }

  const [isMobileSliderOpen, setIsMobileSliderOpen] = useState(false)
  const overlayRef = useRef(null) as MutableRefObject<HTMLDivElement>
  const predictions = useContext(MovieContext)
  useEffect(() => {
    //set global player API
    getPlayer()
    return () => {}
  }, [])

  const TouchListener = async (e) => {
    const playingPanel = document.getElementById("playingPanel")
    if (e.target === playingPanel) {
      e.preventDefault()
      setMobileOverlayStage(1)
    }
  }


  // Хэндлеры для свайпера на мобиле
  const handlers = useSwipeable({
    onSwipedUp: (e) => {
      const mutePanel = document.getElementById("mutePanel")
      if (e.event.target !== mutePanel) {
      if (mobileOverlayStage > 0) {
        setIsMobileSliderOpen(true)
      }
    }
    },
    onSwipedDown: (e) => {
      const mutePanel = document.getElementById("mutePanel")
      if (e.event.target !== mutePanel) {
      setIsMobileSliderOpen(false)
    }
    }
  })


  return (
    <div>
      <div className={`${isLoaded ? "visible" : "hidden"}`}>
        <FullScreen handle={handle}>
          <div
            id="mainframe"
            className={`relative inline-block w-full h-full`}
          >

            <iframe
              width={data.width}
              height={data.height}
              src={isIntro ? `${intro}?player_id=777` : `${data.series[currentSeason][currentSerie].videoId}?player_id=777`}
              // src={`${data.series[currentSeason][currentSerie].videoId}?player_id=777`}
              // src={`${intro}?player_id=777`}
              allowFullScreen
              //allow='autoplay' 
              frameBorder="0"
              id="gplayer"
            ></iframe>
            
            <div className={`absolute  top-0 left-0 w-full h-auto ${buttonState}`} >
              <TopPlayerPanel
                data={data.series}
                changeSeasonState={changeSeasonState}
                changeSeason={changeSeason}
                currentSeason={currentSeason}
                seasonState={seasonState}
                changeSerieState={changeSerieState}
                changeSerie={changeSerie}
                currentSerie={currentSerie}
                serieState={serieState}
                changeActingState={changeActingState}
                changeActing={changeActing}
                currentActing={currentActing}
                actingState={actingState}
                langs={data.langs}
              />
            </div>

            <AgeWarning/>

            <div ref={overlayRef} className={`absolute inset-0 w-full h-full ${buttonState} pointer-events-none`} >
              <div className="flex justify-center flex-wrap content-center h-full">
                <div className="md:w-24 flex justify-end cursor-pointer w-12">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons cursor-pointer" onClick={() => setPlay()} >
                      <path  className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z" fill="white" fillOpacity="0.2"/>
                      <path className="svgFill" d="M75.6968 48.3804L36.3282 24.321C35.9966 24.1183 35.617 24.0077 35.2285 24.0004C34.8399 23.9931 34.4564 24.0895 34.1175 24.2796C33.7785 24.4697 33.4963 24.7466 33.2999 25.0819C33.1035 25.4173 33 25.7989 33 26.1875V74.3063C33 74.6949 33.1035 75.0765 33.2999 75.4118C33.4963 75.7472 33.7785 76.0241 34.1175 76.2142C34.4564 76.4043 34.8399 76.5007 35.2285 76.4934C35.617 76.4861 35.9966 76.3755 36.3282 76.1728L75.6968 52.1134C76.0165 51.918 76.2807 51.6437 76.464 51.3169C76.6473 50.9901 76.7436 50.6216 76.7436 50.2469C76.7436 49.8722 76.6473 49.5037 76.464 49.1769C76.2807 48.85 76.0165 48.5758 75.6968 48.3804Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
            <PlayerModalOverlay setModalOpen={setIsEndedModalOpen} modalOpen={isEndedModalOpen}>
              <EndedModal
                name={data.name}
                setModalOpen={setIsEndedModalOpen}
                series={data.series}
                currentSeason={currentSeason}
                currentSerie={currentSerie}
                modalOpen={isEndedModalOpen}
                changeSerie={changeSerie}
                setIsEndedModalOpen={setIsEndedModalOpen}
                prediction={predictions[0]}
              />
            </PlayerModalOverlay>
            <div className="hidden md:block">
              <div className={`${(buttonState === "hidden" || panelState === "hidden") && "opacity-0 "}`}>
                <CompilationSlider 
                currentSerie={currentSerie}
                title={data.name}
                isMovie={!data.series.length}
                setCurrentCompilationMovie={setCurrentCompilationMovie} 
                movies={data.series ? data.series[currentSeason] : predictions} 
                setModalOpen={setIsMobileSliderOpen} 
                isSliderOpen={isMobileSliderOpen} 
                setIsSliderOpen={setIsSliderOpen} 
                isFullscreen={isFullScreen} />
                  <PlayerModalOverlay setModalOpen={setIsCompliationModalOpen} modalOpen={isCompliationModalOpen}>
                  <CompilationModal 
                  changeSerie={changeSerie}
                  currentCompilationMovie={currentCompilationMovie} 
                  setModalOpen={setIsCompliationModalOpen} />
                  </PlayerModalOverlay>
                </div>
                <div className={`hidden md:block ${data.isSerial ? "":"md:hidden"}`}>
                  <CompilationSliderSerial setCurrentCompilationMovie={setCurrentCompilationMovie} movies={data.series[currentSeason]} setModalOpen={setIsCompliationModalOpen} isSliderOpen={isSliderOpen} setIsSliderOpen={setIsSliderOpen} isFullscreen={isFullScreen} />
                  <PlayerModalOverlay setModalOpen={setIsCompliationModalOpen} modalOpen={isCompliationModalOpen}>
                    <CompilationModalSerial currentCompilationMovie={currentCompilationMovie} setModalOpen={setIsCompliationModalOpen} setSerie={changeSerie}/>
                  </PlayerModalOverlay>
                </div>
              </div>
            </div>
            
            <div className={`absolute inset-0 z-0 w-full h-full ${panelState}`} 
              {...handlers}
              style={{
                touchAction: "none"
              }}
              onClick={(e) => { if (e.target === document.getElementById("playingPanel")) {setPlay()}}}
              onTouchEnd={TouchListener}
              id="playingPanel"
              onKeyDown ={(e) => {
                e.preventDefault()
                if (e.key == " ") {
                  setPlay()
                }
              }}
              tabIndex={0}
            >
              
            <div
              onClick={(e) => {
                setPlay()
              }}
              style={{
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%)"
              }}
              className={`
              ${isFullScreen? "opacity-0 z-0" : "z-10 opacity-100"}
              ${fullScreenHide ? "opacity-0 z-0" : "z-10 opacity-100"}
              ${realPanelState === "visible" && "z-10 opacity-100"}
              ${isMobile && "hidden"}
              transition-all duration-700 ease-out
              pointer-events-none absolute w-full h-full top-0 left-0`}
            >


            </div>
            
            <div className={`${mobileOverlayStage > 0 ? "absolute bg-opacity-50 h-full" : "bg-opacity-0 h-0 absolute"} 
            ${!isMobile && "hidden"}
            transition-all duration-400 bg-black bottom-0 left-0 w-full z-10 flex items-center overflow-hidden `}>
              <div className={`w-full flex justify-between items-center px-5`}>
                <div 
                onClick={() => {
                  
                  changeSerie(currentSerie - 1)}}
                className={`w-10 h-10 p-0.5 bg-opacity-20 bg-white  active:bg-orange  rounded-lg`}>
                  <ChevronLeft />
                </div>
                <TopPlayerPanel
                data={data.series}
                changeSeasonState={changeSeasonState}
                changeSeason={changeSeason}
                currentSeason={currentSeason}
                seasonState={seasonState}
                changeSerieState={changeSerieState}
                changeSerie={changeSerie}
                currentSerie={currentSerie}
                serieState={serieState}
                changeActingState={changeActingState}
                changeActing={changeActing}
                currentActing={currentActing}
                actingState={actingState}
                langs={data.langs}
              />
                <button
                  onClick={setPlay}
                  className={`flex-shrink-0 w-20 h-20 p-5 bg-opacity-20 bg-white  active:bg-orange rounded-lg`}>
                  {mobileOverlayStage === 1 && <PauseIcon />}
                  {mobileOverlayStage === 2 && <PlayIcon />}
                </button>
                <div 
                onClick={() => {changeSerie(currentSerie + 1)}}
                className={`w-10 h-10 p-0.5 bg-opacity-20 bg-white  active:bg-orange  rounded-lg transform rotate-180`}>
                  <ChevronLeft />
                </div>
              </div>
            </div>
            <div className={` ${isFullScreen &&  mobileOverlayStage < 1 ? "hidden" : "z-20 opacity-100"}`}>
            <CompilationSliderMobile 
            changeSerie={changeSerie}
            currentSerie={currentSerie}
            title={data.name}
            isMovie={!data.series.length}
            isMobile={isMobile}
            mobileOverlayStage={mobileOverlayStage} 
            setCurrentCompilationMovie={setCurrentCompilationMovie} 
            movies={data.series ? data.series[currentSeason] : predictions} 
            setModalOpen={setIsCompliationModalOpen} 
            isSliderOpen={isMobileSliderOpen} 
            setIsSliderOpen={setIsMobileSliderOpen} 
            isFullScreen={isFullScreen}
            />
            </div>

            <MobileProgressBar 
              isMobile={isMobile}
              mobileOverlayStage={mobileOverlayStage}
              setMobileOverlayStage={setMobileOverlayStage}
              globalGplayerAPI = {globalGplayerAPI}
              isFullScreen = {isFullScreen}
              fullScreenFunc={fullScreenFunc}
              possibleDurationTime={possibleDurationTime}
              setMouseOver={setMouseOver}
              draggerPercent={draggerPercent}
              draggerVisible={draggerVisible}
              setDrag={setDrag}
              currentTimePercent={currentTimePercent}
              bufferTimePercent={currentTimeBuffer}
              getMousePos={getMousePos}
              setCurrentDuration={setCurrentDuration}
              durationTime={durationTime}
              currentTime={currentTime}
              setCurrentVolume={changeCurrentVolumeY}
              currentVolume={currentVolume}
            />
              <ProgressBar
                isMobile = {isMobile}
                possibleDurationTime={possibleDurationTime}
                setMouseOver={setMouseOver}
                draggerPercent={draggerPercent}
                draggerVisible={draggerVisible}
                setDrag={setDrag}
                currentTimePercent={currentTimePercent}
                bufferTimePercent={currentTimeBuffer}
                getMousePos={getMousePos}
                setCurrentDuration={setCurrentDuration}
                setPlay={setPlay}
                isPlaying={realPanelState == "hidden"}
                durationTime={durationTime}
                currentTime={currentTime}
                handle={handle}
                isFullScreen={isFullScreen}
                fullScreenFunc={fullScreenFunc}
                setFullScreen={fullScreenFunc}
                changeMute={changeMute}
                isMuted={isMuted}
                setCurrentVolume={changeCurrentVolume}
                currentVolume={currentVolume}
                changeCurrentLevel={changeCurrentLevel}
                currentQuality={currentQuality}
              />
            </div>

            <div className={`absolute inset-0 w-full h-full ${realPanelState}`}  >
              <div 
                className="flex justify-between flex-wrap content-center h-full items-center px-4 "
                onClick={(e) => {
                  const target = e.target as Element;
                  if (target.id == "realPanel") {
                    setPlay()
                  }
                }}
                id="realPanel" 
              >
                <div className="md:w-24 cursor-pointer w-8">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${currentSerie == 0 ? "hidden" : ""}`} onClick={() => changeVideo("prev")}>
                    <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H52C56.4183 0 60 3.58172 60 8V52C60 56.4183 56.4183 60 52 60H8C3.58172 60 0 56.4183 0 52V8Z" fill="white" fillOpacity="0.2" />
                    <path className="svgStroke" d="M36 44L22 30.5L36 17" stroke="white" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons cursor-pointer" onClick={() => {
                  setPlay()
                }} >
                  <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z" fill="white" fillOpacity="0.2" />
                  <path className="svgFill" d="M75.6968 48.3804L36.3282 24.321C35.9966 24.1183 35.617 24.0077 35.2285 24.0004C34.8399 23.9931 34.4564 24.0895 34.1175 24.2796C33.7785 24.4697 33.4963 24.7466 33.2999 25.0819C33.1035 25.4173 33 25.7989 33 26.1875V74.3063C33 74.6949 33.1035 75.0765 33.2999 75.4118C33.4963 75.7472 33.7785 76.0241 34.1175 76.2142C34.4564 76.4043 34.8399 76.5007 35.2285 76.4934C35.617 76.4861 35.9966 76.3755 36.3282 76.1728L75.6968 52.1134C76.0165 51.918 76.2807 51.6437 76.464 51.3169C76.6473 50.9901 76.7436 50.6216 76.7436 50.2469C76.7436 49.8722 76.6473 49.5037 76.464 49.1769C76.2807 48.85 76.0165 48.5758 75.6968 48.3804Z" fill="white" />
                </svg>
                <div className="md:w-24 flex justify-end cursor-pointer w-8">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${currentSerie == data.series[0].length - 1 ? "hidden" : ""}`} onClick={() => changeVideo("next")}>
                    <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H52C56.4183 0 60 3.58172 60 8V52C60 56.4183 56.4183 60 52 60H8C3.58172 60 0 56.4183 0 52V8Z" fill="white" fillOpacity="0.2" />
                    <path className="svgStroke" d="M22 17L36 30.5L22 44" stroke="white" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

              </div>
            </div>
        </FullScreen>
      </div>
      {/* <div className={`${isLoaded ? "hidden" : "visible"} bg-cardBackground relative inline-block w-full h-full`}>
        <div className={`bg-cardBackground relative inline-block h-12 w-12`}>
        </div>
      </div> */}
    </div>
  )
}
