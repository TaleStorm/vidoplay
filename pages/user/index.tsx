import { useContext, useEffect, useState } from "react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import ModalOverlay from "../../components/layout/modalOverlay"
import DataEditor from "../../components/userComponents/dataEditor"
import Favourites from "../../components/userComponents/favourites"
import History from "../../components/userComponents/history"
import Loader from "../../components/userComponents/loader"
import PseudoHeader from "../../components/userComponents/pseudoHeader"
import doramas from "../../data/doramas"

import Router from 'next/router';
import LoginContext from "../../components/context/loginContext"

const stageHeaders = {
    data: "Редактировать профиль",
    history: "История просмотров",
    favourites: "Избранное",
}

const IndexPage = () => {
    const {logOut} = useContext(LoginContext)

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

    const [exitModalOpen, setExitModalOpen] = useState(false)

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
            <ModalOverlay modalOpen={exitModalOpen} setModalOpen={setExitModalOpen} classes={`px-4`}>
                <div className={`w-full h-auto bg-popupBackground mt-30 flex flex-col items-center sm:px-8 px-4 pt-4 pb-8 max-w-md mx-auto`}>
                    
                    <h1>
                    <div className={`text-h2-mobile mb-5`}> Вы точно хотите выйти?</div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("_user")
                            logOut("")
                            Router.push("/")
                            setExitModalOpen(false)
                        }}
                        className="mb-3 text-center text-h2-mobile text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full">
                        Выйти
                        </button>
                    <button
                        onClick={() => {
                            setExitModalOpen(!exitModalOpen);
                        }}
                        className="text-center text-h2-mobile text-white  p-3 duration-300 rounded-lg bg-user-button-gray-2 w-full">
                        Отмена
                        </button>
                        </h1>
                </div>
            </ModalOverlay>
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
                                <div className={`relative sm:py-4 w-full flex items-center flex-col sm:bg-cardBackground sm:mb-3`}>
                                    <div className={`flex items-center flex-col ${display && display !== "data" ? "hidden sm:flex" : ""}`}>
                                        <img src="/icons/default-avatar.svg" className={`w-25 h-25 mb-1 rounded-full`} />
                                        <a className={`text-orange cursor-pointer mb-4 text-h2-mobile`}>Сменить аватар</a>
                                        <div className={`font-medium text-h1-mobile mb-1`}>{username}</div>
                                        <div className={`sm:mb-4 mb-3 text-h2-mobile opacity-70`}>{email}</div>
                                    </div>
                                    <svg 
                                    className="absolute top-0 right-0 sm:hidden" 
                                    onClick={()=>{setExitModalOpen(true)}}
                                    width="30" 
                                    height="30" 
                                    viewBox="0 0 30 30" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.394 10.0781L25.3159 15L20.394 19.9219" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.1875 15H25.3125" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.0625 25.3125H5.625C5.37636 25.3125 5.1379 25.2137 4.96209 25.0379C4.78627 24.8621 4.6875 24.6236 4.6875 24.375V5.625C4.6875 5.37636 4.78627 5.1379 4.96209 4.96209C5.1379 4.78627 5.37636 4.6875 5.625 4.6875H14.0625" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
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
                            <div className="w-full">
                                <div className="hidden sm:flex w-full justify-between">
                                    <h3 className={`text-lk-header mb-5`}>
                                        {stageHeaders[display]}
                                     </h3>
                                    <div className="flex mb-5 items-center cursor-pointer" onClick={() => setExitModalOpen(true)}>
                                        <p className="text-orange text-base mr-1.5">
                                            Выйти
                                        </p>
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.394 10.0781L25.3159 15L20.394 19.9219" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.1875 15H25.3125" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.0625 25.3125H5.625C5.37636 25.3125 5.1379 25.2137 4.96209 25.0379C4.78627 24.8621 4.6875 24.6236 4.6875 24.375V5.625C4.6875 5.37636 4.78627 5.1379 4.96209 4.96209C5.1379 4.78627 5.37636 4.6875 5.625 4.6875H14.0625" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
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

                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default IndexPage