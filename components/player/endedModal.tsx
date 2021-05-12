import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const EndedModal = ({
    setModalOpen, 
    series,
    currentSeason, 
    currentSerie, 
    modalOpen, 
    changeSerie, 
    setIsEndedModalOpen, 
    name, 
    prediction

}) => {

    const [isLast, setIsLast] = useState(false)
    const [next, setNext] = useState(series.length ? series[currentSeason][currentSerie] : {})
    const [nextNumbers, setNextNumbers] = useState({season: 0, serie: 0,})
    const router = useRouter()

    useEffect(() => {
        const getNext = () => {
            if (currentSerie + 2 > series[currentSeason].length) {
                if (currentSeason + 2 > series.length) {
                    setIsLast(true)
                    setNext(prediction)
                    setNextNumbers( {
                        season: 0,
                        serie: 0,
                    })
                    return
                }
                setNext(series[currentSeason + 1][0])
                setNextNumbers({
                    season: currentSeason + 1,
                    serie: 0,
                })
                return 
            }
            setNext(series[currentSeason][currentSerie + 1] )
            setNextNumbers({
                season: currentSeason,
                serie: currentSerie + 1,
            })
            return 
        }
        getNext()
    }, [currentSerie, currentSeason])

    const [timeLeft, setTimeLeft] = useState(10)
    let ticks = 10

    const switchToNext = () => {
        setModalOpen(false)
        if (isLast) {
            router.push(`/films/${next.stringName}`)
            return
        }
        changeSerie(nextNumbers.serie)
    }

    useEffect(() => {
           const clear = setInterval(() => {
                if (modalOpen) {
                    if (ticks === 0) {
                        switchToNext()
                        clearInterval(clear)
                    }
                    else {
                        ticks--
                        setTimeLeft(ticks)
                    }
                    
                }
            }, 1000)

            return () => {clearInterval(clear)}
        
    }, [modalOpen])

    useEffect(() => {
        if (!modalOpen) {
            ticks = 10
            setTimeLeft(10)
        }
    }, [modalOpen])
    
    return (
    <div className={`md:w-96 w-54 `}>
        <div className={`text-h2-mobile font-medium mb-2 md:block hidden`}>Следующая серия</div>
        <div className="bg-cardBackground w-full relative ">
            <div className={`md:h-54 h-24 bg-cover relative bg-center md:block hidden`}> 
                <Image
                    src={`${next?.image ? next.image : "https://chillvision.ru/media/lent_poster/383/49e20b8766c85b92858bdf473be281af.SW_400H_520CF_1.jpg"}`}
                    alt="Picture of the film"
                    layout="fill"
                    objectFit="cover"
                /> 
            </div>
            <div className={`p-3`}>
            <div className="flex justify-between items-center mb-1">
                <p className="text-mainText text-xs md:text-h1-mobile font-medium">
                    {isLast ? next?.title ? next.title : "" : name}
                </p>
                <p className={`opacity-70 text-xs md:text-h2-mobile`}>
                    30 мин.
                </p>
            </div>
            <div className={`md:text-h1-mobile text-xs font-medium mb-3`}>
            {nextNumbers.serie + 1} серия, {nextNumbers.season + 1} сезон
            </div>
            <p className={`md:text-smol text-xs opacity-70 mb-4`}>
                Смотрите далее через {timeLeft} секунд
            </p>
            <div className={`grid grid-cols-2 gap-2`}>
                    <button onClick={() => {
                        setModalOpen(false);
                    }} className="text-xs md:text-h2-mobile text-center text-white bg-black bg-opacity-20 opacity-50 p-2 duration-300 rounded-lg w-full flex items-center justify-center">
                        Отмена
                    </button>

                    <button onClick={() => {
                        switchToNext()
                    }} className="text-xs md:text-h2-mobile text-center text-white bg-orange p-2 duration-300 rounded-lg hover:bg-orange w-full flex items-center justify-center">
                        Воспроизвести
                    </button>
            </div>
        </div>
    </div>
    </div>
    );
};

export default EndedModal