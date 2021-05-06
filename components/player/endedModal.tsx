import Image from "next/image";
import { useEffect, useState } from "react";
import doramas from "../../data/doramas";

const EndedModal = ({setModalOpen, series, currentSeason, currentSerie, modalOpen, changeSerie, setIsEndedModalOpen, name, image}) => {
    const getNext = () => {

        if (currentSerie + 2 > series[currentSeason].length) {
            if (currentSeason + 2 > series.length) {
                return {
                    season: currentSeason,
                    serie: 0
                }
            }
            return {
                season: currentSeason,
                serie: 0
            }
        }
        return {
            season: currentSeason,
            serie: currentSerie + 1
        }
    }

    const [timeLeft, setTimeLeft] = useState(10)
    let ticks = 10

    const next = getNext()
    const data = doramas[0]


    const switchToNext = () => {
        setModalOpen(false)
        changeSerie(next.serie)
    }

    useEffect(() => {
           const clear = setInterval(() => {
                if (modalOpen) {
                    if (ticks === 0) {
                        switchToNext()
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
    <div className={`w-96`}>
        <div className={`text-h2-mobile font-medium mb-2`}>Следующая серия</div>
        <div className="bg-cardBackground w-full relative ">
            <div className={`h-54 bg-cover relative bg-center`}> 
                <Image
                    src={`${image}`}
                    alt="Picture of the film"
                    layout="fill"
                    objectFit="cover"
                /> 
                <div  className="absolute top-0 right-0 h-12 mx-auto w-20 flex flex-wrap content-center bg-filmInfoBackground">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline ml-2">
                        <path d="M18.4504 21.501C18.2925 21.5016 18.1385 21.4524 18.0102 21.3603L11.9816 16.9897L5.95302 21.3603C5.82422 21.4537 5.66905 21.5038 5.50994 21.5032C5.35084 21.5026 5.19604 21.4515 5.06792 21.3571C4.93981 21.2628 4.84502 21.1301 4.79726 20.9783C4.7495 20.8266 4.75124 20.6635 4.80224 20.5128L7.15349 13.5486L1.05974 9.36971C0.927741 9.27929 0.828119 9.14903 0.775425 8.99797C0.722732 8.8469 0.719728 8.68294 0.766854 8.53005C0.813979 8.37715 0.908763 8.24333 1.03736 8.14814C1.16595 8.05295 1.32162 8.00138 1.48161 8.00096H8.99942L11.2682 1.01893C11.317 0.868189 11.4124 0.736803 11.5406 0.64362C11.6688 0.550436 11.8231 0.500244 11.9816 0.500244C12.1401 0.500244 12.2945 0.550436 12.4226 0.64362C12.5508 0.736803 12.6462 0.868189 12.695 1.01893L14.9638 8.0033H22.4816C22.6418 8.00322 22.7978 8.05444 22.9268 8.14945C23.0558 8.24445 23.1509 8.37826 23.1984 8.53127C23.2458 8.68429 23.243 8.84846 23.1903 8.99976C23.1377 9.15106 23.038 9.28152 22.9058 9.37205L16.8097 13.5486L19.1596 20.511C19.1977 20.6237 19.2084 20.7438 19.1908 20.8615C19.1733 20.9792 19.128 21.091 19.0587 21.1877C18.9894 21.2845 18.8981 21.3633 18.7923 21.4178C18.6866 21.4722 18.5693 21.5007 18.4504 21.501Z" fill="#EFCF33"/>
                    </svg>
                    <h1 className="text-lg font-roboto font-medium text-mainText inline ml-2">
                        {data.score}
                    </h1>
                </div>
            </div>
            <div className={`p-3`}>
            <div className="flex justify-between items-center mb-1">
                <p className="text-mainText text-h1-mobile font-medium">
                    {name}
                </p>
                <p className={`opacity-70 text-h2-mobile`}>
                    30 мин.
                </p>
            </div>
            <div className={`text-h1-mobile font-medium mb-3`}>
            {next.serie + 1} серия, {next.season + 1} сезон
            </div>
            <p className={`text-smol opacity-70 mb-4`}>
                Смотрите далее через {timeLeft} секунд
            </p>
            <div className={`grid grid-cols-2 gap-2`}>
                    <button onClick={() => {
                        setModalOpen(false);
                    }} className="text-h2-mobile text-center text-white bg-black bg-opacity-20 opacity-50 p-2 duration-300 rounded-lg w-full flex items-center justify-center">
                        Отмена
                    </button>

                    <button onClick={() => {
                        changeSerie(currentSerie+1)
                    }} className=" text-h2-mobile text-center text-white bg-orange p-2 duration-300 rounded-lg hover:bg-orange w-full flex items-center justify-center">
                        Воспроизвести
                    </button>
            </div>
        </div>
    </div>
    </div>
    );
};

export default EndedModal