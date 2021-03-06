import PLayer from "../components/player"
import { useRef, useEffect, useState, MutableRefObject, useContext } from "react";
import axios from "axios"
import ShareButtons from "./shareButtons";
import MovieContext from "./context/movieContext";
import Tabs from "./Tabs";
import TrailerPlayer from "./trailerPlayer";
import PlayerContext from "./context/playerContext";

export default function Video({
    name,
    series,
    movies,
    langs,
    isSerial,
    video,
    allow=true
}) {
    const targetRef = useRef() as MutableRefObject<HTMLDivElement>
    const containRef = useRef() as MutableRefObject<HTMLDivElement>
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const {isFullScreen} = useContext(PlayerContext)

    const [shareUrl, setShareUrl] = useState<string>("")

    const { movie } = useContext(MovieContext)

    useEffect(() => {
        containRef.current.style.height = isFullScreen ? window.screen.height + "px" : (containRef.current.getBoundingClientRect().width * 9 / 16) + "px"
    }, [isFullScreen, dimensions])

    useEffect(() => {
        setShareUrl(document.location.href)
    }, [])

    useEffect(() => {
        const body = document.querySelector("body")
        const listener = () => {
            setDimensions({
                width: containRef.current.getBoundingClientRect().width,
                height: containRef.current.getBoundingClientRect().height
            });

            if (isFullScreen) {
                body.style.overflow = "hidden"
            } else {
                body.style.overflow = ""
            }

        }
        listener()
        const changeListner = () => {
            setDimensions({
                width: containRef.current.getBoundingClientRect().width,
                height: containRef.current.getBoundingClientRect().height
            });
            containRef.current.style.height = "100%"
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"))
            }, 1000)
        }
        window.addEventListener("orientationchange", changeListner)
        window.addEventListener("resize", listener)
        return () => {
            window.addEventListener("orientationchange", changeListner)
            window.removeEventListener("resize", listener)
        }
    }, [isFullScreen])

    const isActive  = () => {
        if (!allow) {
            return false
        }
        if((movies?.length > 0 && series?.length > 0) || (video !== '')){
            return true
        }else{
            return false
        }
    }

    return (
        <>            
            <div className="mb-14 flex items-center">
                <h4 className="hidden mt-6 font-roboto text-mainText font-normal text-3xl sm:block mb-4 col-span-1 w-full">
                    {name}
                </h4>
                <div className="hidden sm:block">
                    <ShareButtons url={shareUrl} title={name} image={movie.image} text="???????????????? ???? Chill" />
                </div>
            </div>
            <div ref={containRef} className={`md:mx-auto ${isFullScreen ? "fixed h-full max-h-full top-0 left-0 z-50" : "max-w-5xl"}  w-full`}>
                <div
                    className="relative w-full h-full" ref={targetRef}>
                    <Tabs startIndex={0} tabs={["??????????", "??????????????"]}>
                        {true ? (
                            <PLayer
                                movies={movies}
                                width={String(dimensions.width)}
                                height={String(dimensions.height)}
                                series={series}
                                langs={langs}
                                name={name}
                                parentRef={targetRef}
                                isSerial={isSerial}
                            />) :
                            (<div className="flex justify-center items-center w-full h-full">
                                <h1 className="text-h1-mobile sm:text-3xl">
                                   {allow ? "?????????? ?????????? ????????????????" : "?????????? ???? ???????????????? ?? ?????????? ??????????????"} 
                            </h1>
                            </div>)}
                        <TrailerPlayer videoUrl={movie.trailer}/>
                    </Tabs>
                </div>
                <div className="hidden grid-cols-2 grid-rows-1 gap-4 mb-6">
                    <div className="hidden mt-10 space-x-6 col-span-1 sm:flex flex-wrap content-end">
                        {/* <button className="bg-orange hover:bg-orange text-mainText font-normal py-3 px-14 rounded-md text-sm">
                        ???????????????????? ????????????????
                    </button>
                    <button className="bg-orange hover:bg-orange text-mainText font-normal py-3 px-14 rounded-md text-sm">
                        ???????????????? ??????????????
                    </button> */}
                    </div>

                </div>
            </div>
            <h4 className="mt-6 font-roboto text-mainText font-normal text-xl sm:hidden block sm:mb-5 col-span-1">
                {name}
            </h4>
            <div className="sm:hidden">
                <ShareButtons wrap url={"http://coderhs.com/archive/change_text_url"} title={name} image={movie.image} text="???????????????? ???? Chill" />
            </div>
            <div className={`w-full`}>

            </div>
        </>
    )
}