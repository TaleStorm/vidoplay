import { MutableRefObject, useEffect, useRef, useState } from "react"
import { convertTime } from "../player/utils"
import FullScreenIcon from "../playerIcons/fullScreen"
import MuteIcon from "../playerIcons/muteIcon"
import PauseIcon from "../playerIcons/pauseIcon"
import PlayIcon from "../playerIcons/playIcon"

const TrailerPlayer = ({
    videoUrl
}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [bufferPercent, setBufferPercent] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [hoveredPercent, setHoveredPercent] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [volumePercent, setVolumePercent] = useState(0)
    const [isFullScreen, setFullScreen] = useState(false)
    const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

    useEffect(() => {
        if (isPlaying) {
            videoRef.current.play()
            return
        }
        videoRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        setVolumePercent(videoRef.current.volume * 100)
    }, [])

    useEffect(() => {
        videoRef.current.volume = volumePercent/100
    }, [volumePercent])

    const fullScreenFunc = () => {
        const elem = document.getElementById("trailerFrame") as HTMLElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
          };
          if (isFullScreen) {
            document.exitFullscreen()
            setFullScreen(false);
            return
          } else {
           if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          }
            setFullScreen(true);
            return
          }
    }
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(videoRef.current.currentTime)
        }, 500)
        return () => { clearInterval(timer)}
    }, [])

    useEffect(() => {

        const listener = () => {
            setDuration(videoRef.current.duration)
            try {
                const r = videoRef.current.buffered;
                const total = videoRef.current.duration;
                const end = r.end(r.length - 1);
                setBufferPercent((end/total)*100)
            }
            catch (e) {
                console.log(e)
                setBufferPercent(0)
            }
        }
        videoRef.current.addEventListener("progress", listener)
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("progress", listener)
            }
            
        }
    }, [currentTime])

    const changeVideoPercent = () => {
        videoRef.current.currentTime = duration * hoveredPercent/100
    }

    return (
        <div 
        onClick={(e) => {
            const elem = videoRef.current
            if (e.target === elem) {
                setIsPlaying(!isPlaying)
            }
        }}
        id="trailerFrame"
        className={`h-full w-full relative`}>
        <video preload="metadata" ref={videoRef} className="w-full h-full" src={'http://' + videoUrl} />
        <div className={`absolute bottom-0 left-0 w-full pb-4 bg-black bg-opacity-10 flex px-4`}>
        <div onClick={() => (setIsPlaying(!isPlaying))}  className={`relative lg:hover:bg-orange transition-all duration-200 rounded-lg flex-shrink-0 p-2 cursor-pointer hidden md:block w-10 h-10 bg-white bg-opacity-20`}>
          {isPlaying ? <PauseIcon/>  : <PlayIcon/>}
        </div>
        <div 
        onClick={() => (setIsPlaying(!isPlaying))}
        className={`md:hidden w-9 h-9 mr-4 flex-shrink-0`}>
         {isPlaying ? <PauseIcon/> : <PlayIcon/>}
        </div>
        <div className={`h-7 mt-3 mr-4 bg-white bg-opacity-20 w-full ml-2 relative flex justify-end`}>
            <div className={`font-medium pr-4 relative z-20 select-none`}>
                    {convertTime(currentTime)}  | {convertTime(duration)}
            </div>
            <div
            style={{
                width: `${bufferPercent}%`
            }}
            className={`bg-white bg-opacity-20 h-full absolute left-0 top-0 z-0`}/>
            <div 
            style ={{
                width: `${(currentTime/duration) * 100}%`
            }}
            className={`absolute bg-orange h-full left-0 top-0 z-10`}/>
            <div 
            onMouseEnter={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect()
                const percent = ((e.pageX - bounds.x)/bounds.width) * 100
                setHoveredPercent(percent)
                setIsHovered(true)
            }}
            onMouseMove={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect()
                const percent = ((e.pageX - bounds.x)/bounds.width) * 100
                setHoveredPercent(percent)
            }}
            onMouseOut={() => setIsHovered(false)}
            onClick={changeVideoPercent}
            className={`absolute  h-full left-0 top-0 z-20 w-full cursor-pointer `}/>
                <div  className={`mb-2 ${!isHovered && "hidden"} w-0 overflow-visible text-center z-20 justify-center items-center absolute bottom-6 flex`} style={{
                    left: `${hoveredPercent}%`
                }}>
                      <div className={`absolute h-10 -top-14 w-36 bg-white bg-opacity-20 flex justify-center rounded-xl`}>
                      <span className="text-white text-sm pointer-events-none flex items-center font-medium" >
                      {convertTime(duration * hoveredPercent/100)} | {convertTime(duration)}
                      </span>  
                      </div>
                      <div 
                      style={{
                        clipPath: "polygon(50% 100%, 0 0, 100% 0)"
                      }}
                      className={`absolute h-4 w-7 -top-4 bg-white bg-opacity-20`}/>
                  </div>
        </div>
            <div className={`w-32 h-10 rounded-lg bg-white bg-opacity-20 flex-shrink-0 items-center flex px-2 mr-4`}>
                <div 
                onClick={() => {
                    if (volumePercent !== 0) {
                        setVolumePercent(0)
                        return
                    }
                    setVolumePercent(50)
                    }}
                className={`w-7 h-7 flex-shrink-0`}>
                <MuteIcon state={volumePercent !== 0}/>
                </div>
                <div className={`h-5 w-full bg-white bg-opacity-20 ml-2 relative`}>
                    <div 
                    style={{
                        width: `${volumePercent}%`
                    }}
                    className={`absolute top-0 left-0 h-full bg-orange`}/>
                    <div 
                    onClick={(e) => {
                        const bounds = e.currentTarget.getBoundingClientRect()
                        const percent = ((e.pageX - bounds.x)/bounds.width) * 100
                        setVolumePercent(percent)
                    }}
                    draggable={`false`}
                    className={`absolute top-0 left-0 h-full w-full cursor-pointer`}/>
             </div>

            </div>
            <div 
            onClick={fullScreenFunc}
            className={`lg:hover:bg-orange transition-all duration-200 rounded-lg flex-shrink-0 p-1.5 cursor-pointer md:block w-10 h-10 bg-white bg-opacity-20`}>
                    <FullScreenIcon isFullScreen={isFullScreen}/>
                </div>

        </div>
        </div>
        
    )
}

export default TrailerPlayer