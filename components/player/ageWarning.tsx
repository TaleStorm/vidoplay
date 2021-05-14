import { MutableRefObject, useContext, useEffect, useRef } from "react"
import MovieContext from "../context/movieContext"
import PlayerContext from "../context/playerContext"

const AgeWarning = () => {
    const {movie} = useContext(MovieContext)
    const {isWarningVisible, setIsWarningVisible, warningDuration} = useContext(PlayerContext)
    const warningRef = useRef(null) as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        let timer
        if (!isWarningVisible) {
            timer = setTimeout(() => {
                warningRef.current.style.display = "hidden"
            }, 500)
        }
        else {
            warningRef.current.style.display = ""
            timer = setTimeout(() => {
                setIsWarningVisible(false)
            }, warningDuration * 1000)
        }
        return () => {clearTimeout(timer)}
    }, [isWarningVisible])

    return (
        <div 
        ref={warningRef}
        className={`
        ${isWarningVisible ? "opacity-100" : "opacity-0"}
        transition-all duration-500
        right-4 top-4 rounded-lg py-2 px-5 bg-black absolute font-bold text-3xl`}>
            {movie.age}
        </div>
    )

}

export default AgeWarning