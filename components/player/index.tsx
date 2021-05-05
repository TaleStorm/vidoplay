import { useEffect, useState } from "react";
import ReactFullscreen from 'react-easyfullscreen';
import ProgressBar from './progressBar';
import TopPlayerPanel from './topPlayerPanel';

import { PlayerData } from '../../interfaces'
import CompilationSlider from './compilationSlider';
import CompilationModal from './compilationModal';
import PlayerModalOverlay from './playerModalOverlay';
import EndedModal from './endedModal';

type PlayerProps = PlayerData

let series = [
  [
    [
      {
        videoId: "18824_vxmu7DQnLXkQElz",
        acting: "LostFilm"
      },{
        videoId: "18824_vxmu7DQnLXkQElz",
        acting: "Озвучка 2"
      },{
        videoId: "18824_vxmu7DQnLXkQElz",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_4BPkkGpdq56E6O6y",
        acting: "LostFilm"
      },{
        videoId: "18824_4BPkkGpdq56E6O6y",
        acting: "Озвучка 2"
      },{
        videoId: "18824_4BPkkGpdq56E6O6y",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_ndApY31r6Q41aLG",
        acting: "LostFilm"
      },{
        videoId: "18824_ndApY31r6Q41aLG",
        acting: "Озвучка 2"
      },{
        videoId: "18824_ndApY31r6Q41aLG",
        acting: "Озвучка 3"
      },
    ],
  ],[
    [
      {
        videoId: "18824_q5gS3ArtjoivvkAH",
        acting: "LostFilm"
      },{
        videoId: "18824_q5gS3ArtjoivvkAH",
        acting: "Озвучка 2"
      },{
        videoId: "18824_q5gS3ArtjoivvkAH",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_4BPkkGpdq56E6O6y",
        acting: "LostFilm"
      },{
        videoId: "18824_4BPkkGpdq56E6O6y",
        acting: "Озвучка 2"
      },{
        videoId: "18824_4BPkkGpdq56E6O6y",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_ndApY31r6Q41aLG",
        acting: "LostFilm"
      },{
        videoId: "18824_ndApY31r6Q41aLG",
        acting: "Озвучка 2"
      },{
        videoId: "18824_ndApY31r6Q41aLG",
        acting: "Озвучка 3"
      },
    ],
  ]
]

export default function Player(data) {
  const[buttonState, setButton] = useState("visible");
  const[panelState, setPanel] = useState("hidden");
  const[realPanelState, setRealPanel] = useState("hidden");
  const[currentSerie, setSerie] = useState(0);
  const[serieState, setSerieState] = useState("closed");
  const[currentSeason, setSeason] = useState(0);
  const[seasonState, setSeasonState] = useState("closed");
  const[currentActing, setActing] = useState(0);
  const[actingState, setActingState] = useState("closed");
  const[interval, setIntervalVideo] = useState(undefined);
  const[durationTime, setVideoDuration] = useState(0);
  const[currentTime, setVideoCurrent] = useState(0);
  const[currentTimePercent, setVideoPercentCurrent] = useState("0");
  const[currentTimeBuffer, setVideoPercentBuffer] = useState("0");
  const[currentVolume, setVolumeCurrent] = useState(100);
  const[bufferVolume, setVolumeBuffer] = useState(100);
  const[userWindow, setUserWindow] = useState({width: 0, height: 0});
  const[isFullScreen, setFullScreen] = useState(false);
  const[isMuted, setMute] = useState(false);
  const[isDragged, setDrag] = useState(false);
  const[currentQuality, setCurrentQuality] = useState("AUTO");

  const [isEndedModalOpen, setIsEndedModalOpen] = useState(false)
  const [isCompliationModalOpen, setIsCompliationModalOpen] = useState(false)
  const [currentCompilationMovie, setCurrentCompilationMovie] = useState(data.movies[0])
  const [isSliderOpen, setIsSliderOpen] = useState(false)

  const[globalGplayerAPI, setPlayer] = useState(undefined);

  const getPlayer = async () => {
    clearInterval(interval);
    setVideoPercentCurrent("0");

    const GcorePlayer = (window as any).GcorePlayer.gplayerAPI;
    const gplayerAPI = new GcorePlayer(document.getElementById("gplayer"))
    setPlayer(gplayerAPI);

    gplayerAPI.on('play', () => {
      gplayerAPI.method({name: 'getCurrentTime', params: {}, callback: (res) => {
        if (res < 0.1) {
          clearInterval(interval)
          setVideoPercentCurrent("0");
          removeFakeButton();
          gplayerAPI.method({name: 'getDuration', params: {}, callback: (res) => {
            setVideoDuration(res)
            setIntervalVideo(setInterval(() => tick(res,gplayerAPI), 500));
            gplayerAPI.on('progress', (data) => {
              console.log(data)
              const percent = 100 * data.current / res
              setVideoPercentBuffer(percent.toFixed(1))
              console.log(percent)
            })
          }})
          setUserWindow({width: (window as any).innerWidth, height: (window as any).innerHeight})
        }
      }});

    })

    // gplayerAPI.on('progress', (data) => {
    //   console.log(data)
    //   const percent = 100 * data.current / durationTime
    //   setVideoPercentCurrent(percent.toFixed(1))
    //   console.log(percent)
    // })

    gplayerAPI.on('tracks', (info) => {
      console.log('[Event]', 'tracks')
      console.log(info)
    })

    gplayerAPI.on("ended", () => {
      gplayerAPI.method({name: "seekPercentage", params: 100});
      gplayerAPI.method({name: "pause"});
      setRealPanel("visible");
      console.log(currentSerie , series[currentSeason].length-1)
      if (currentSerie < series[currentSeason].length-1) {
        setIsEndedModalOpen(true);
      }
    })

    return {gplayerAPI:gplayerAPI,userWindow:{width: (window).innerWidth, height: (window).innerHeight}}
  }

  var tick = (duration,gplayerAPI) => {
    gplayerAPI.method({name: 'getCurrentTime', params: {}, callback: (res) => {
      setVideoCurrent(res)
      const percent = 100 * res / duration
      setVideoPercentCurrent(percent.toFixed(1))
    }})

    // gplayerAPI.method({name: 'getCurrentTime', params: {}, callback: (res) => {
    //   setVideoCurrent(res)
    //   const percent = 100 * res / duration
    //   setVideoPercentCurrent(percent.toFixed(1))
    // }})
  }

  var removeFakeButton = () => {
    setPanel("visible");
    setButton("hidden");
  }

  var showRealPanel = async (e) => {
    if (e.target.id == "playingPanel") {
      setRealPanel("visible");
      setIsSliderOpen(true)
      globalGplayerAPI.method({ name: "pause" });
    }
  }

  var setPlay = () => {
    if (realPanelState == "hidden") {
      setRealPanel("visible");
      globalGplayerAPI.method({ name: "pause" })
      setIsSliderOpen(true)
    } else {
      setRealPanel("hidden");
      globalGplayerAPI.method({ name: "play" })
      setIsSliderOpen(false)
    }
    
  };

  var changeVideo = async (direction) => {
    clearInterval(interval);
    if (direction == "prev") {
      setSerie(currentSerie-1);
    } else {
      setSerie(currentSerie+1);
    };
    setVideoPercentCurrent("0");
  }

  var changeSeason = async (newSeason) => {
    clearInterval(interval);
    setSeason(newSeason);
    setVideoPercentCurrent("0");
  }

  var changeSerie = async (newSerie) => {
    if (isEndedModalOpen) {
      setIsEndedModalOpen(false);
    }
    clearInterval(interval);
    setSerie(newSerie);
    setVideoPercentCurrent("0");
  }

  var changeActing = async (newActing) => {
    setActing(newActing);
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
      globalGplayerAPI.method({ name: "unmute"});
      setVolumeCurrent(bufferVolume);
    } else {
      setMute(true);
      globalGplayerAPI.method({ name: "mute"});
      setVolumeBuffer(currentVolume);
      setVolumeCurrent(0);
    }
  }

  var getMousePos = (e) => {
    const target = e.target.getBoundingClientRect();
    if (isDragged) {
      const percent = 100 * (e.screenX - target.x) / e.target.parentElement.offsetWidth
      globalGplayerAPI.method({ name: "seekPercentage", params: percent.toFixed(1) })
    }
    // console.log(e.screenX - target.x, e.target.parentElement.offsetWidth)
  }

  var setCurrentDuration = (e) => {
    const target = e.target.getBoundingClientRect();
    const percent = 100 * (e.screenX - target.x) / e.target.parentElement.offsetWidth
    globalGplayerAPI.method({ name: "seekPercentage", params: percent.toFixed(1) })
  }
  
  var changeCurrentVolume = (e) => {
    setMute(false);
    const target = e.target.parentElement.getBoundingClientRect();
    const percent = 100 * (e.screenX - target.x) / e.target.parentElement.offsetWidth
    globalGplayerAPI.method({ name: "setVolume", params: percent.toFixed(0) })
    setVolumeCurrent(Number(percent.toFixed(0)))
  }

  var changeCurrentLevel = (quality) => {    
    setCurrentQuality(quality);
    globalGplayerAPI.method({name: 'getPlugin', params: {
      pluginName: 'level_selector', 
      pluginMethod: 'setLevel',
      pluginValue: quality.toLowerCase()
      }, callback: (e) => {
    }})
  }

  var fullScreenFunc = async () => {
    if (isFullScreen) {
      globalGplayerAPI.method({ name: "resize", params: {width: 960, height: 540} })
      setFullScreen(false)
    } else {
      globalGplayerAPI.method({ name: "resize", params: 
    {
      width: window.innerWidth,
      height: window.innerHeight
    } } )
      setFullScreen(true)
    }
  }
  
  const setEventListener = (gplayerAPI, userWindow, isFullScreen) => {
    if (typeof window !== 'undefined') {
      (document as any).addEventListener('fullscreenchange', () => {
        if (isFullScreen) {
          gplayerAPI.method({ name: "resize", params: {width: 960, height: 540} });
          data.setFullScreen(false)
          setFullScreen(false);
          (document as any).removeEventListener('fullscreenchange', () => setEventListener(gplayerAPI, userWindow, false));
          setEventListener(gplayerAPI, userWindow, false);
        } else {
          gplayerAPI.method({ name: "resize", params: {
            width: window.innerWidth,
            height: window.innerHeight
          } });
          data.setFullScreen(true)
          setFullScreen(true);
          (document as any).removeEventListener('fullscreenchange', () => setEventListener(gplayerAPI, userWindow, true));
          setEventListener(gplayerAPI, userWindow, true);
        }
      });
    }
  }

  useEffect(  () => {
    getPlayer().then(vars => {
      setEventListener(vars.gplayerAPI, vars.userWindow, false);
    })
  }, [])

  return (
    <div>
      <ReactFullscreen>
        {({ ref, onRequest, onExit }) => (
          <div
            ref={ref}
            className="relative inline-block"
          >
        <iframe
          width={data.width}
          height={data.height}
          src={`https://chillvision.gcdn.co/videos/${series[currentSeason][currentSerie][currentActing].videoId}?player_id=777`}
          allowFullScreen
          frameBorder="0"
          id="gplayer"
        >
        </iframe>

        <div className={`absolute top-0 left-0 w-full h-auto ${buttonState}`} >
          <TopPlayerPanel 
            data={series}
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
          />
        </div>

        <div className={`absolute inset-0 w-full h-full ${buttonState} pointer-events-none`} >
            <div className="flex justify-center flex-wrap content-center h-full">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons">
                <path d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z" fill="white" fillOpacity="0.2"/>
                <path className="svgFill" d="M75.6968 48.3804L36.3282 24.321C35.9966 24.1183 35.617 24.0077 35.2285 24.0004C34.8399 23.9931 34.4564 24.0895 34.1175 24.2796C33.7785 24.4697 33.4963 24.7466 33.2999 25.0819C33.1035 25.4173 33 25.7989 33 26.1875V74.3063C33 74.6949 33.1035 75.0765 33.2999 75.4118C33.4963 75.7472 33.7785 76.0241 34.1175 76.2142C34.4564 76.4043 34.8399 76.5007 35.2285 76.4934C35.617 76.4861 35.9966 76.3755 36.3282 76.1728L75.6968 52.1134C76.0165 51.918 76.2807 51.6437 76.464 51.3169C76.6473 50.9901 76.7436 50.6216 76.7436 50.2469C76.7436 49.8722 76.6473 49.5037 76.464 49.1769C76.2807 48.85 76.0165 48.5758 75.6968 48.3804Z" fill="white"/>
              </svg>
            </div>
        </div>
        <PlayerModalOverlay setModalOpen={setIsEndedModalOpen} modalOpen={isEndedModalOpen}>
          <EndedModal 
            name={data.name} 
            image={data.series[currentSeason][currentSerie].image} 
            setModalOpen={setIsEndedModalOpen} 
            series={series} 
            currentSeason={currentSeason} 
            currentSerie={currentSerie} 
            modalOpen={isEndedModalOpen} 
            changeSerie={changeSerie} 
            setIsEndedModalOpen={setIsEndedModalOpen}
          />
        </PlayerModalOverlay>
        <div className={`${(buttonState === "hidden" || panelState === "hidden") && "opacity-0"}`}>
          <CompilationSlider setCurrentCompilationMovie={setCurrentCompilationMovie} movies={data.movies} setModalOpen={setIsCompliationModalOpen} isSliderOpen={isSliderOpen} setIsSliderOpen={setIsSliderOpen}/>
          <PlayerModalOverlay setModalOpen={setIsCompliationModalOpen} modalOpen={isCompliationModalOpen}>
            <CompilationModal currentCompilationMovie={currentCompilationMovie} setModalOpen={setIsCompliationModalOpen}/>
          </PlayerModalOverlay>
        </div>
        <div className={`absolute inset-0 w-full h-full ${panelState}`} onClick = {(e) => showRealPanel(e)} id="playingPanel">

          <ProgressBar 
            currentTimePercent={currentTimePercent} 
            bufferTimePercent={currentTimeBuffer}
            getMousePos={getMousePos}
            setCurrentDuration={setCurrentDuration}
            setPlay={setPlay}
            isPlaying={realPanelState == "hidden"}
            durationTime = {durationTime}
            currentTime = {currentTime}
            fullScreenFunc = {isFullScreen ? onExit : onRequest}
            setFullScreen = {fullScreenFunc}
            changeMute={changeMute}
            isMuted={isMuted}
            setCurrentVolume={changeCurrentVolume}
            currentVolume={currentVolume}
            changeCurrentLevel={changeCurrentLevel}
            currentQuality={currentQuality}
            setDrag={setDrag}
          />
        </div>

        <div className={`absolute inset-0 w-full h-full ${realPanelState}`} >
          <div className="flex justify-between flex-wrap content-center h-full items-center px-4 ">
            <div className="w-24 cursor-pointer">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${currentSerie == 0 ? "hidden" : ""}`} onClick = {() => changeVideo("prev")}>
                  <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H52C56.4183 0 60 3.58172 60 8V52C60 56.4183 56.4183 60 52 60H8C3.58172 60 0 56.4183 0 52V8Z" fill="white" fillOpacity="0.2"/>
                  <path className="svgStroke" d="M36 44L22 30.5L36 17" stroke="white" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons cursor-pointer" onClick={() => setPlay()} >
                <path  className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z" fill="white" fillOpacity="0.2"/>
                <path className="svgFill" d="M75.6968 48.3804L36.3282 24.321C35.9966 24.1183 35.617 24.0077 35.2285 24.0004C34.8399 23.9931 34.4564 24.0895 34.1175 24.2796C33.7785 24.4697 33.4963 24.7466 33.2999 25.0819C33.1035 25.4173 33 25.7989 33 26.1875V74.3063C33 74.6949 33.1035 75.0765 33.2999 75.4118C33.4963 75.7472 33.7785 76.0241 34.1175 76.2142C34.4564 76.4043 34.8399 76.5007 35.2285 76.4934C35.617 76.4861 35.9966 76.3755 36.3282 76.1728L75.6968 52.1134C76.0165 51.918 76.2807 51.6437 76.464 51.3169C76.6473 50.9901 76.7436 50.6216 76.7436 50.2469C76.7436 49.8722 76.6473 49.5037 76.464 49.1769C76.2807 48.85 76.0165 48.5758 75.6968 48.3804Z" fill="white"/>
            </svg>
            <div className="w-24 flex justify-end cursor-pointer">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${currentSerie == series[0].length - 1 ? "hidden" : ""}`} onClick = {() => changeVideo("next")}> 
                  <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H52C56.4183 0 60 3.58172 60 8V52C60 56.4183 56.4183 60 52 60H8C3.58172 60 0 56.4183 0 52V8Z" fill="white" fillOpacity="0.2"/>
                  <path className="svgStroke" d="M22 17L36 30.5L22 44" stroke="white" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

          </div>

          <TopPlayerPanel 
            data={series}
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
          />
          <div>
          <CompilationSlider setCurrentCompilationMovie={setCurrentCompilationMovie} movies={data.movies} setModalOpen={setIsCompliationModalOpen} isSliderOpen={isSliderOpen} setIsSliderOpen={setIsSliderOpen}/>
          <PlayerModalOverlay setModalOpen={setIsCompliationModalOpen} modalOpen={isCompliationModalOpen}>
            <CompilationModal currentCompilationMovie={currentCompilationMovie} setModalOpen={setIsCompliationModalOpen}/>
          </PlayerModalOverlay>
          </div>
          <ProgressBar 
            currentTimePercent={currentTimePercent} 
            bufferTimePercent={currentTimeBuffer}
            getMousePos={getMousePos}
            setCurrentDuration={setCurrentDuration}
            setPlay={setPlay}
            isPlaying={realPanelState == "hidden"}
            durationTime = {durationTime}
            currentTime = {currentTime}
            fullScreenFunc = {onRequest}
            setFullScreen = {isFullScreen ? onExit : onRequest}
            changeMute={changeMute}
            isMuted={isMuted}
            setCurrentVolume={changeCurrentVolume}
            currentVolume={currentVolume}
            changeCurrentLevel={changeCurrentLevel}
            currentQuality={currentQuality}
            setDrag={setDrag}
          />
        </div>
        </div>
        )}
      </ReactFullscreen>
    </div>
  )
}
