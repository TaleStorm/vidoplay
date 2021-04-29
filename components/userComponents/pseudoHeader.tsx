import { ChevronLeftIcon } from "@heroicons/react/solid"

const PseudoHeader = ({display, setDisplay}) => {
    return (
        <div className={`h-30 w-full z-30 fixed sm:hidden bg-background top-0 left-0 pt-8 py-4 px-5`}>
            <div className={`flex h-full items-center w-full justify-between relative `}>
            <img src="/icons/left-chevron.svg" className={`w-6 h-6 cursor-pointer z-10 relative ${!display && "hidden"}`} onClick={() => {setDisplay("")}} alt=""/>
            <a href="/" className={`${display && "hidden"}`}>
                    <span className="sr-only">Logo</span>
                    <img className="h-20 w-auto" src="/images/logo.png" alt="" />
            </a>
            <div className={`absolute w-full flex justify-center`}>
            {display === "data" ? "Профиль" : display === "history" ? "История просмотров" : display === "favourites" ? "Избранное" : ""}
            </div>
            <div className={`flex flex-shrink-0 z-10 relative`}>
            <img src="/icons/user.svg" className={`flex-shrink-0 w-6 h-6`} alt=""/>
            </div>
            </div>

        </div>
    )
}

export default PseudoHeader