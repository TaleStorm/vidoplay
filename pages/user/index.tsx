import { useEffect, useState } from "react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import DataEditor from "../../components/userComponents/dataEditor"
import Favourites from "../../components/userComponents/favourites"
import History from "../../components/userComponents/history"
import Loader from "../../components/userComponents/loader"
import doramas from "../../data/doramas"

const IndexPage = () => {
    const [loading, setLoading] = useState(true)
    const [filmLoading, setFilmLoading] = useState(false)
    const [display, setDisplay] = useState("data")
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
        setTimeout(() => {setLoading(false)}, 1000)
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
            setTimeout(() => {setFilmLoading(false)}, 1000)
        }
    }, [display])

    return (
        <div className="bg-background text-mainText">
            <Header />
            <div className="container mx-auto ">
                <div className="max-w-screen-xl w-full mx-auto grid">
                    <h2 className="font-roboto text-mainText mb-10 font-medium text-3xl">
                        Личное
                    </h2>
                    {loading ? <Loader/> :
                    <div className={`flex`}>
                        <div className={`w-72 flex-shrink-0 flex flex-col mr-16`}>
                            <div className={`py-4 w-full flex items-center flex-col bg-cardBackground mb-3`}>
                                <img src="/icons/default-avatar.svg" className={`w-25 h-25 mb-1 rounded-full`}/>
                                <a className={`text-orange cursor-pointer mb-4`}>Сменить аватар</a>
                                <div>{username}</div>
                                <div className={`mb-4`}>{email}</div>
                                {display === "data" 
                                ? 
                                <button 
                                disabled={!isNewData}

                                className={`p-2 w-48 ${isNewData ? "bg-orange" : "bg-black bg-opacity-20 text-white opacity-50"} rounded-md`}>
                                Сохранить изменения
                                </button>
                                :
                                <button 
                                onClick={() => {
                                    setDisplay("data")
                                }}
                                className={`p-2 w-48 bg-black bg-opacity-20 text-white opacity-50 rounded-md`}>
                                Редактировать
                                </button>
                            }
                            </div>
                            <div 
                            onClick={() => {
                                setDisplay("history")
                            }}
                            className={`px-5 py-6 ${display === "history" ? "bg-orange" : "bg-cardBackground"} mb-3 cursor-pointer transition-all duration-300`}>
                                <div className={`flex items-center`}>
                                <img src="/icons/notebook.svg" alt="" className={`flex-shrink-0 mr-4`}/>
                                История просмотров
                                </div>
                            </div>
                            <div 
                            onClick={() => {
                                setDisplay("favourites")
                            }}
                            className={`px-5 py-6 ${display === "favourites" ? "bg-orange" : "bg-cardBackground"} mb-3 cursor-pointer transition-all duration-300`}>
                                <div className={`flex items-center`}>
                                <img src="/icons/thumbs-up.svg" alt="" className={`flex-shrink-0 mr-4`}/>
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
                        <Loader/> 
                        :
                        display === "history"
                        ?
                        <History films={history}/>
                        :
                        <Favourites films={favourites}/>
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