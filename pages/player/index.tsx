import Head from 'next/head'
import { useEffect, useState, Fragment } from "react"
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/solid'
import ProgressBar from '../../components/progressBar'

let series = [
  [
    [
      {
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "LostFilm"
      },{
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "Озвучка 2"
      },{
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "LostFilm"
      },{
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "Озвучка 2"
      },{
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "LostFilm"
      },{
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "Озвучка 2"
      },{
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "Озвучка 3"
      },
    ],
  ],[
    [
      {
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "LostFilm"
      },{
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "Озвучка 2"
      },{
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "LostFilm"
      },{
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "Озвучка 2"
      },{
        videoId: "18824_kyFF9u8UPlC1XKs",
        acting: "Озвучка 3"
      },
    ],
    [
      {
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "LostFilm"
      },{
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "Озвучка 2"
      },{
        videoId: "18824_iW5v2SQ5YnKYSgl",
        acting: "Озвучка 3"
      },
    ],
  ]
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Player() {
  const[buttonState, setButton] = useState("visible");
  const[panelState, setPanel] = useState("hidden");
  const[realPanelState, setRealPanel] = useState("hidden");
  const[currentSerie, setSerie] = useState(1);
  const[serieState, setSerieState] = useState("closed");
  const[currentSeason, setSeason] = useState(0);
  const[seasonState, setSeasonState] = useState("closed");
  const[currentActing, setActing] = useState(0);
  const[actingState, setActingState] = useState("closed");

  const[interval, setIntervalVideo] = useState(undefined);
  const[durationTime, setVideoDuration] = useState(0);
  const[currentTime, setVideoCurrent] = useState(0);
  const[currentTimePercent, setVideoPercentCurrent] = useState("0");

  const[globalGplayerAPI, setPlayer] = useState(undefined);

  const getPlayer = async () => {
    clearInterval(interval)
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
          }})
        }
      }});
    })
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
      globalGplayerAPI.method({ name: "pause" });
    }
  }

  var setPlay = () => {
    if (realPanelState == "hidden") {
      setRealPanel("visible");
      globalGplayerAPI.method({ name: "pause" })
    } else {
      setRealPanel("hidden");
      globalGplayerAPI.method({ name: "play" })
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
      setSeasonState("closed")
    } else {
      setSeasonState("open")
    }
  }

  var getMousePos = (e) => {
    const target = e.target.getBoundingClientRect();
    // console.log(e.screenX - target.x, e.target.parentElement.offsetWidth)
  }

  var setCurrentDuration = (e) => {
    const target = e.target.getBoundingClientRect();
    const percent = 100 * (e.screenX - target.x) / e.target.parentElement.offsetWidth
    globalGplayerAPI.method({ name: "seekPercentage", params: percent.toFixed(1) })
  }

  var fullScreen = () => {
    console.log(1)
    globalGplayerAPI.method({ name: "toggleFullscreen"})
  }

  var testFunc = async () => {

  }

  useEffect( () => {
    getPlayer();
  }, [])

  return (
    <div>
      <Head>
        <script src="https://vplatform.gcdn.co/_players/v2.0.71/gplayerAPI.js"></script>
      </Head>
      <div className="relative inline-block">
        <iframe
          width="960"
          height="540"
          src={`https://chillvision.gcdn.co/videos/${series[currentSeason][currentSerie][currentActing].videoId}?player_id=777`}
          allow="autoplay"
          allowFullScreen
          frameBorder="0"
          id="gplayer"
        >
        </iframe>

        <div className={`absolute inset-0 w-full h-full pointer-events-none ${buttonState} `}>
          <div className="flex justify-center flex-wrap content-center h-full">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons">
              <path d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z" fill="white" fillOpacity="0.2"/>
              <path className="svgFill" d="M75.6968 48.3804L36.3282 24.321C35.9966 24.1183 35.617 24.0077 35.2285 24.0004C34.8399 23.9931 34.4564 24.0895 34.1175 24.2796C33.7785 24.4697 33.4963 24.7466 33.2999 25.0819C33.1035 25.4173 33 25.7989 33 26.1875V74.3063C33 74.6949 33.1035 75.0765 33.2999 75.4118C33.4963 75.7472 33.7785 76.0241 34.1175 76.2142C34.4564 76.4043 34.8399 76.5007 35.2285 76.4934C35.617 76.4861 35.9966 76.3755 36.3282 76.1728L75.6968 52.1134C76.0165 51.918 76.2807 51.6437 76.464 51.3169C76.6473 50.9901 76.7436 50.6216 76.7436 50.2469C76.7436 49.8722 76.6473 49.5037 76.464 49.1769C76.2807 48.85 76.0165 48.5758 75.6968 48.3804Z" fill="white"/>
            </svg>
          </div>
        </div>

        <div className={`absolute inset-0 w-full h-full ${panelState}`} onClick = {(e) => showRealPanel(e)} id="playingPanel">
          <ProgressBar 
            currentTimePercent={currentTimePercent} 
            bufferTimePercent={""}
            getMousePos={getMousePos}
            setCurrentDuration={setCurrentDuration}
            setPlay={setPlay}
            isPlaying={realPanelState == "hidden"}
            durationTime = {durationTime}
            currentTime = {currentTime}
            fullScreen = {fullScreen}
          />
        </div>

        <div className={`absolute inset-0 w-full h-full ${realPanelState}`} >
          <div className="flex justify-between flex-wrap content-center h-full inline-block items-center px-4 ">
            <div className="w-24">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${currentSerie == 0 ? "hidden" : ""}`} onClick = {() => changeVideo("prev")}>
                  <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H52C56.4183 0 60 3.58172 60 8V52C60 56.4183 56.4183 60 52 60H8C3.58172 60 0 56.4183 0 52V8Z" fill="white" fillOpacity="0.2"/>
                  <path className="svgStroke" d="M36 44L22 30.5L36 17" stroke="white" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons" onClick={() => setPlay()} >
                <path  className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z" fill="white" fillOpacity="0.2"/>
                <path className="svgFill" d="M75.6968 48.3804L36.3282 24.321C35.9966 24.1183 35.617 24.0077 35.2285 24.0004C34.8399 23.9931 34.4564 24.0895 34.1175 24.2796C33.7785 24.4697 33.4963 24.7466 33.2999 25.0819C33.1035 25.4173 33 25.7989 33 26.1875V74.3063C33 74.6949 33.1035 75.0765 33.2999 75.4118C33.4963 75.7472 33.7785 76.0241 34.1175 76.2142C34.4564 76.4043 34.8399 76.5007 35.2285 76.4934C35.617 76.4861 35.9966 76.3755 36.3282 76.1728L75.6968 52.1134C76.0165 51.918 76.2807 51.6437 76.464 51.3169C76.6473 50.9901 76.7436 50.6216 76.7436 50.2469C76.7436 49.8722 76.6473 49.5037 76.464 49.1769C76.2807 48.85 76.0165 48.5758 75.6968 48.3804Z" fill="white"/>
            </svg>
            <div className="w-24 flex justify-end">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${currentSerie == series[0].length - 1 ? "hidden" : ""}`} onClick = {() => changeVideo("next")}> 
                  <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H52C56.4183 0 60 3.58172 60 8V52C60 56.4183 56.4183 60 52 60H8C3.58172 60 0 56.4183 0 52V8Z" fill="white" fillOpacity="0.2"/>
                  <path className="svgStroke" d="M22 17L36 30.5L22 44" stroke="white" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

          </div>

          <div  className="absolute top-4 left-4 flex flex-wrap content-center space-x-4">
            <div className="">
              <Menu as="div" className="relative inline-block text-left " onClick={() => changeSeasonState()}>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-playerMain text-sm font-roboto ${seasonState == "open" ? "text-playerSecond" : "text-mainText" }`} >
                        <div onClick={() => changeSeasonState()} className="inline-flex">
                          {currentSeason+1} Сезон 
                          <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${seasonState == "open" ? "hidden" : "" }`}/>
                          <ChevronUpIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${seasonState == "open" ? "" : "hidden" }`}/>
                        </div>
                        
                      </Menu.Button>
                    </div>

                    <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-full font-roboto rounded-md shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                        {series.map((serie, i) => {
                            return (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                    <button
                                      className={classNames(
                                        active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                        'block pr-4 pl-0 py-2 text-sm w-full'
                                      )}
                                      onClick = {() => changeSeason(i)}
                                    >
                                      {i+1} Сезон
                                    </button>
                                )}
                              </Menu.Item>
                            )
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            <div className="">
              <Menu as="div" className="relative inline-block text-left " onClick={() => changeSerieState()}>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-playerMain text-sm font-roboto ${serieState == "open" ? "text-playerSecond" : "text-mainText" }`} >
                        <div onClick={() => changeSerieState()} className="inline-flex">
                          {currentSerie+1} Серия 
                          <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${serieState == "open" ? "hidden" : "" }`}/>
                          <ChevronUpIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${serieState == "open" ? "" : "hidden" }`}/>
                        </div>
                        
                      </Menu.Button>
                    </div>

                    <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-full font-roboto rounded-md shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                        {series[currentSeason].map((serie, i) => {
                            return (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                    <button
                                      className={classNames(
                                        active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                        'block pr-4 pl-0 py-2 text-sm w-full'
                                      )}
                                      onClick = {() => changeSerie(i)}
                                    >
                                      {i+1} Серия 
                                    </button>
                                )}
                              </Menu.Item>
                            )
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            <div className="">
              <Menu as="div" className="relative inline-block text-left " onClick={() => changeActingState()}>
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-playerMain text-sm font-roboto ${actingState == "open" ? "text-playerSecond" : "text-mainText" }`} >
                        <div onClick={() => changeActingState()} className="inline-flex">
                          {series[currentSeason][currentSerie][currentActing].acting}
                          <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${actingState == "open" ? "hidden" : "" }`}/>
                          <ChevronUpIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${actingState == "open" ? "" : "hidden" }`}/>
                        </div>
                        
                      </Menu.Button>
                    </div>

                    <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-full font-roboto rounded-md shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                        {series[currentSeason][currentSerie].map((acting, i) => {
                            return (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                    <button
                                      className={classNames(
                                        active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                        'block pr-4 pl-0 py-2 text-sm w-full'
                                      )}
                                      onClick = {() => changeActing(i)}
                                    >
                                      {acting.acting}
                                    </button>
                                )}
                              </Menu.Item>
                            )
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            
          </div>
          <ProgressBar 
            currentTimePercent={currentTimePercent} 
            bufferTimePercent={""}
            getMousePos={getMousePos}
            setCurrentDuration={setCurrentDuration}
            setPlay={setPlay}
            isPlaying={realPanelState == "hidden"}
            durationTime = {durationTime}
            currentTime = {currentTime}
            fullScreen = {fullScreen}
          />
        </div>
      </div>
      {/* <button onClick = {() => testFunc()}>
        test
      </button> */}
    </div>
  )
}