import PLayer from "../components/player"
import { useRef, useEffect, useState, MutableRefObject, useContext } from "react";
import axios from "axios"
import ShareButtons from "./shareButtons";
import MovieContext from "./context/movieContext";
import Tabs from "./Tabs";

export default function Video(data) {
    const targetRef = useRef() as MutableRefObject<HTMLDivElement>
    const containRef = useRef() as MutableRefObject<HTMLDivElement>
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isFullScreen, setFullScreen] = useState(false)

    const [shareUrl, setShareUrl] = useState<string>("")

    const { movie } = useContext(MovieContext)

    useEffect(() => {
        containRef.current.style.height = isFullScreen ? window.screen.height + "px" : (containRef.current.getBoundingClientRect().width * 9 / 16) + "px"
    }, [isFullScreen, dimensions])

    useEffect(() => {
        setShareUrl(document.location.href)
    }, [])

    useEffect(() => {
        const listener = () => {
            setDimensions({
                width: containRef.current.getBoundingClientRect().width,
                height: containRef.current.getBoundingClientRect().height
            });
            containRef.current.style.height = isFullScreen ? window.screen.height + "px" : (containRef.current.getBoundingClientRect().width * 9 / 16) + "px"
            targetRef.current.style.height = isFullScreen ? window.screen.height + "px" : (containRef.current.getBoundingClientRect().width * 9 / 16) + "px"
        }
        listener()
        const changeListner = () => {
            setDimensions({
                width: containRef.current.getBoundingClientRect().width,
                height: containRef.current.getBoundingClientRect().height
            });
            containRef.current.style.height = isFullScreen ? window.screen.height + "px" : (containRef.current.getBoundingClientRect().width * 9 / 16) + "px"
            targetRef.current.style.height = isFullScreen ? window.screen.height + "px" : (containRef.current.getBoundingClientRect().width * 9 / 16) + "px"
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

    const pickInFavorites = async () => {
        let tmp = {
            movieId: data.movieId,
            _user: localStorage.getItem('_user')
        }
        const resp = await axios.post("/api/favorites", tmp)
    }

    return (
        <>
            <div className="mb-14 flex items-center">
                <h4 className="hidden mt-6 font-roboto text-mainText font-normal text-3xl sm:block mb-4 col-span-1 w-full">
                    {data.name}
                </h4>
                <div className="hidden sm:block">
                    <ShareButtons url={shareUrl} title={data.name} image={movie.image} text="Смотрите на Chill" />
                </div>
            </div>
            <div ref={containRef} className={`md:mx-auto ${isFullScreen ? "fixed max-h-screen top-0 left-0 z-50" : "max-w-5xl"}  w-full`}>
                <div
                    className="relative" ref={targetRef}>
                    <Tabs startIndex={0} tabs={["Плеер", "Трейлер"]}>
                        {data.movies?.length > 0 && data.series?.length > 0 ? (
                            <PLayer
                                movies={data.movies}
                                width={String(dimensions.width)}
                                height={String(dimensions.height)}
                                series={data.series}
                                langs={data.langs}
                                name={data.name}
                                parentRef={targetRef}
                                isFullScreen={isFullScreen}
                                setFullScreen={setFullScreen}
                                isSerial={data.isSerial}
                            />) :
                            (<div className="flex justify-center items-center w-full h-full">
                                <h1 className="text-h1-mobile sm:text-3xl">
                                    Видео скоро появится
                            </h1>
                            </div>)}
                        <video preload="metadata" className="w-full h-full" controls src={'http://' + movie.trailer} />
                    </Tabs>
                </div>
                <div className="hidden grid-cols-2 grid-rows-1 gap-4 mb-6">
                    <div className="hidden mt-10 space-x-6 col-span-1 sm:flex flex-wrap content-end">
                        {/* <button className="bg-orange hover:bg-orange text-mainText font-normal py-3 px-14 rounded-md text-sm">
                        Совместный просмотр
                    </button>
                    <button className="bg-orange hover:bg-orange text-mainText font-normal py-3 px-14 rounded-md text-sm">
                        Смотреть трейлер
                    </button> */}
                    </div>

                </div>
            </div>
            <h4 className="mt-6 font-roboto text-mainText font-normal text-xl sm:hidden block sm:mb-5 col-span-1">
                {data.name}
            </h4>
            <div className="sm:hidden">
                <ShareButtons wrap url={"http://coderhs.com/archive/change_text_url"} title={data.name} image={movie.image} text="Смотрите на Chill" />
            </div>
            <div className={`w-full`}>

            </div>
        </>
    )
}