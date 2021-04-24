import { useEffect, useState } from "react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import DataEditor from "../../components/userComponents/dataEditor"
import Favourites from "../../components/userComponents/favourites"
import History from "../../components/userComponents/history"
import Loader from "../../components/userComponents/loader"
import PseudoHeader from "../../components/userComponents/pseudoHeader"
import doramas from "../../data/doramas"

const IndexPage = () => {
    const [loading, setLoading] = useState(true)
    const [filmLoading, setFilmLoading] = useState(false)
    const [display, setDisplay] = useState("")
    const [isNewData, setIsNewData] = useState(false)

    const [history, setHistory] = useState([])
    const [favourites, setFavourites] = useState([])

    const [email, setEmail] = useState("anhelinas@yandex.ru")
    const [username, setUsername] = useState("Angelina1414")


    const [name, setName] = useState("Ангелина")
    const [lastName, setLastName] = useState("Ангелинова")
    const [patronymic, setPatronymic] = useState("Ангелиновна")

    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confrimPassword, setConfrimPassword] = useState(null)

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 1000)
        if (window.innerWidth >= 640) {
            setDisplay("data")
        }
    }, [])

    useEffect(() => {
        if (display === "history" || display === "favourites") {
            setFilmLoading(true)
            if (display === "history") {
                setHistory(doramas)
            }
            if (display === "favourites") {
                setFavourites(doramas)
            }
            setTimeout(() => { setFilmLoading(false) }, 1000)
        }
    }, [display])

    return (
        <div className="bg-background text-mainText">
            <Header />
            <PseudoHeader display={display} setDisplay={setDisplay} />
            <div className="container mx-auto ">
                <div className="max-w-screen-xl w-full mx-auto grid">
                    <h2 className="font-roboto text-mainText mb-10 font-medium text-3xl hidden sm:block">
                        Личное
                    </h2>
                    {loading ? <Loader /> :
                        <div className={`sm:flex px-4 sm:px-0`}>
                            <div className={`sm:w-72 w-full flex-shrink-0 flex flex-col mr-16`}>
                                <div className={`sm:py-4 w-full flex items-center flex-col sm:bg-cardBackground sm:mb-3`}>
                                    <div className={`flex items-center flex-col ${display && display !== "data" ? "hidden sm:flex" : ""}`}>
                                        <img src="/icons/default-avatar.svg" className={`w-25 h-25 mb-1 rounded-full`} />
                                        <a className={`text-orange cursor-pointer mb-4 text-h2-mobile`}>Сменить аватар</a>
                                        <div className={`font-medium text-h1-mobile mb-1`}>{username}</div>
                                        <div className={`sm:mb-4 mb-3 text-h2-mobile opacity-70`}>{email}</div>
                                    </div>
                                    {display === "data"
                                        ?
                                        <button
                                            disabled={!isNewData}
                                            className={`p-2 w-48 ${isNewData ? "bg-orange" : "bg-black bg-opacity-20 text-white opacity-50"} rounded-md hidden sm:block`}>
                                            Сохранить изменения
                                </button>
                                        :
                                        <>
                                            <button
                                                onClick={() => {
                                                    setDisplay("data")
                                                }}
                                                className={`p-2  w-48 bg-black bg-opacity-20 text-white opacity-50 rounded-md hidden sm:block`}>
                                                Редактировать
                                </button>
                                            <button
                                                onClick={() => {
                                                    setDisplay("data")
                                                }}
                                                className={`p-2 w-full ${display ? "hidden" : ""} text-white rounded-md sm:hidden bg-user-button-gray mb-6`}>
                                                Редактировать профиль
                                </button>
                                        </>
                                    }
                                </div>
                                <div
                                    onClick={() => {
                                        setDisplay("history")
                                    }}
                                    className={`px-5 py-6 ${display === "history" ? "bg-orange" : "bg-cardBackground"} mb-3 cursor-pointer transition-all duration-300 ${!display ? "" : "hidden sm:block"}`}>
                                    <div className={`flex items-center text-h1-mobile font-medium`}>
                                        <img src="/icons/notebook.svg" alt="" className={`flex-shrink-0 mr-4`} />
                                История просмотров
                                </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setDisplay("favourites")
                                    }}
                                    className={`px-5 py-6 ${display === "favourites" ? "bg-orange" : "bg-cardBackground"} mb-3 cursor-pointer transition-all duration-300 ${!display ? "block" : "hidden sm:block"}`}>
                                    <div className={`flex items-center text-h1-mobile font-medium`}>
                                        <img src="/icons/thumbs-up.svg" alt="" className={`flex-shrink-0 mr-4`} />
                                Избранное
                                </div>
                                </div>

                            </div>
                            {display === "data"
                                ?
                                <DataEditor
                                    name={name}
                                    setName={setName}
                                    lastName={lastName}
                                    setLastName={setLastName}
                                    patronymic={patronymic}
                                    setPatronymic={setPatronymic}
                                />
                                :
                                filmLoading
                                ?
                                <Loader />
                                :
                                display === "history"
                                ?
                                <History films={history} />
                                :
                                display === "favourites"
                                ?
                                <Favourites films={favourites} />
                                :
                                null
                            }

                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default IndexPage