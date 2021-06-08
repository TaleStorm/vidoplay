import { useContext, useEffect, useState } from "react"

import ModalOverlay from "../../components/layout/modalOverlay"
import DataEditor from "../../components/userComponents/dataEditor"
import Favourites from "../../components/userComponents/favourites"
import History from "../../components/userComponents/history"
import Loader from "../../components/userComponents/loader"
import UserDisplayContext from '../../components/context/userDisplayContext'
import LoginContext from "../../components/context/loginContext"
import GoodToast from "../../components/goodtoast"
import UserContext from "../../components/context/userContext"
import { useRouter } from "next/router"
import apiReq from "../../services/api-requests"
import Head from "next/head"

const ApiReq = new apiReq()

const stageHeaders = {
  data: "Редактировать профиль",
  history: "История просмотров",
  favourites: "Избранное",
}

const IndexPage = () => {
  const { logOut } = useContext(LoginContext)
  const { user, setUser } = useContext(UserContext)

  const [loading, setLoading] = useState(true)
  const [filmLoading, setFilmLoading] = useState(false)
  const { display, setDisplay } = useContext(UserDisplayContext)
  const [isNewData, setIsNewData] = useState(true)

  const [history, setHistory] = useState([])
  const [favourites, setFavourites] = useState([])

  const [email, setEmail] = useState("anhelinas@yandex.ru")

  const [name, setName] = useState("Ангелина")
  const [lastName, setLastName] = useState("Ангелинова")
  const [middleName, setMiddleName] = useState("Ангелиновна")

  const [userPassword, setUserPassword] = useState(undefined)
  const [currentPassword, setCurrentPassword] = useState(undefined)
  const [newPassword, setNewPassword] = useState(undefined)
  const [confrimPassword, setConfrimPassword] = useState(undefined)
  const router = useRouter()
  const [exitModalOpen, setExitModalOpen] = useState(false)

  useEffect(() => {
    getUser()
  }, [user])

  useEffect(() => {
    async function fetchMyAPI() {
      if (localStorage.getItem('_user')) {
        const token = localStorage.getItem("_user");
        const data = {
          _userId: token
        };
        const res = await ApiReq.getUserFavorites(data)
        console.log(res)

        const validateRes = await ApiReq.validate({token: token})
        const userId = validateRes.id
        const userInfo = await ApiReq.getUser(userId)
        if (userInfo.ok && res) {
          setUser({
            ...user,
            firstname: userInfo.profile.firstName,
            lastname: userInfo.profile.lastName,
            middleName: userInfo.profile.middleName,
            _password: userPassword,
            list: {
              favorites: res
            }
          })
        }
      }
    }

    fetchMyAPI()
    console.log(user)
  }, [])

  const getUser = async () => {
    setEmail(user.email)
    setName(user.firstname)
    setLastName(user.lastname)
    setMiddleName(user.middleName)
    setUserPassword(user._password)

    //Проверку не убирать! Если отсутствуют данные, то страница крашится!
    if (user.list) {
      //Подгружаем по запросу в будущем!!
      setFavourites(user.list.favorites)
      setHistory(user.list.favorites)
    }

    setLoading(false)
  }

  const updateUser = async () => {
    const token = localStorage.getItem("_user")
    const data = {
      firstName: name,
      lastName: lastName,
      middleName: middleName
    }
    const validateData = {
      token: token
    }
    const validateRes = await ApiReq.validate(validateData)
    const userId = validateRes.id
    const res = await ApiReq.updateUserInfo(data, userId)

    console.log(res)
    if (res.ok) {
      setUser({
        ...user,
        firstname: name,
        lastname: lastName,
        middleName: middleName,
        _password: userPassword
      })
      GoodToast("Изменения сохранены")
    }
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://chillvision.ru/user" />
        <meta property="og:title" content="Профиль Chill Vision" />
        <meta property="og:description" content="Информация о профиле, история просмотров, избранное" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://chillvision.ru/user"} />
        <meta property="og:image" content="https://chillvision.ru/images/aboutChill.png" />
      </Head>
      <ModalOverlay modalOpen={exitModalOpen} setModalOpen={setExitModalOpen} classes={`px-4`}>
        <div
          className={`w-full h-auto bg-popupBackground mt-30 flex flex-col items-center sm:px-8 px-4 pt-4 pb-8 max-w-md mx-auto`}
        >
          <h1>
            <div className={`text-h2-mobile mb-5`}> Вы точно хотите выйти?</div>
            <button
              onClick={() => {
                setExitModalOpen(false)
                router.push("/")
                localStorage.removeItem("_user")
                logOut("")


              }}
              className="mb-3 text-center text-h2-mobile text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full"
            >
              Выйти
            </button>
            <button
              onClick={() => {
                setExitModalOpen(!exitModalOpen)
              }}
              className="text-center text-h2-mobile text-white  p-3 duration-300 rounded-lg bg-user-button-gray-2 w-full"
            >
              Отмена
            </button>
          </h1>
        </div>
      </ModalOverlay>
      <div className="">
        <div className=" w-full mx-auto grid">
          <h2 className="font-roboto text-mainText mb-10 font-medium text-3xl hidden sm:block">Личное</h2>
          {loading ? (
            <Loader />
          ) : (
            <div className={`sm:flex sm:px-0`}>
              <div className={`sm:w-72 w-full flex-shrink-0 flex flex-col mr-16`}>
                <div className={`relative sm:py-4 w-full flex items-center flex-col sm:bg-cardBackground sm:mb-3 rounded-lg`}>
                  <div
                    className={`flex items-center flex-col ${display && display !== "data" ? "hidden sm:flex" : ""}`}
                  >
                    <img src="/icons/default-avatar.svg" className={`w-25 h-25 mb-1 rounded-full`} />
                    <a className={`text-orange cursor-pointer mb-4 text-h2-mobile`}>Сменить аватар</a>
                    <div className={`font-medium text-h1-mobile mb-1`}>{user.firstname}</div>
                    <div className={`sm:mb-4 mb-3 text-h2-mobile opacity-70`}>{user.email}</div>
                  </div>
                  <svg
                    className="absolute top-0 right-0 sm:hidden"
                    onClick={() => {
                      setExitModalOpen(true)
                    }}
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.394 10.0781L25.3159 15L20.394 19.9219"
                      stroke="#F8634A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.1875 15H25.3125"
                      stroke="#F8634A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.0625 25.3125H5.625C5.37636 25.3125 5.1379 25.2137 4.96209 25.0379C4.78627 24.8621 4.6875 24.6236 4.6875 24.375V5.625C4.6875 5.37636 4.78627 5.1379 4.96209 4.96209C5.1379 4.78627 5.37636 4.6875 5.625 4.6875H14.0625"
                      stroke="#F8634A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {display === "data" ? (
                    <button
                      onClick={updateUser}
                      disabled={!isNewData}
                      className={`p-2 w-48 ${isNewData ? "bg-orange" : "bg-black bg-opacity-20 text-white opacity-50"
                        } rounded-md hidden sm:block`}
                    >
                      Сохранить изменения
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setDisplay("data")
                        }}
                        className={`p-2  w-48 bg-black bg-opacity-20 text-white opacity-50 rounded-md hidden sm:block`}
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => {
                          setDisplay("data")
                        }}
                        className={`p-2 w-full ${display ? "hidden" : ""
                          } text-white rounded-md sm:hidden bg-user-button-gray mb-6`}
                      >
                        Редактировать профиль
                      </button>
                    </>
                  )}
                </div>
                <div
                  onClick={() => {
                    setDisplay("history")
                  }}
                  className={`px-5 py-6 ${display === "history" ? "bg-orange" : "bg-cardBackground"
                    } mb-3 cursor-pointer transition-all duration-300 ${!display ? "" : "hidden sm:block"} rounded-lg`}
                >
                  <div className={`flex items-center text-h1-mobile font-medium`}>
                    <img src="/icons/notebook.svg" alt="" className={`flex-shrink-0 mr-4`} />
                    История просмотров
                  </div>
                </div>
                <div
                  onClick={() => {
                    setDisplay("favourites")
                  }}
                  className={`px-5 py-6 ${display === "favourites" ? "bg-orange" : "bg-cardBackground"
                    } mb-3 cursor-pointer transition-all duration-300 ${!display ? "block" : "hidden sm:block"} rounded-lg`}
                >
                  <div className={`flex items-center text-h1-mobile font-medium`}>
                    <img src="/icons/thumbs-up.svg" alt="" className={`flex-shrink-0 mr-4`} />
                    Избранное
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="hidden sm:flex w-full justify-between">
                  <h3 className={`text-lk-header mb-5`}>{stageHeaders[display]}</h3>
                  <div className="flex mb-5 items-center cursor-pointer" onClick={() => setExitModalOpen(true)}>
                    <p className="text-orange text-base mr-1.5">Выйти</p>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.394 10.0781L25.3159 15L20.394 19.9219"
                        stroke="#F8634A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.1875 15H25.3125"
                        stroke="#F8634A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.0625 25.3125H5.625C5.37636 25.3125 5.1379 25.2137 4.96209 25.0379C4.78627 24.8621 4.6875 24.6236 4.6875 24.375V5.625C4.6875 5.37636 4.78627 5.1379 4.96209 4.96209C5.1379 4.78627 5.37636 4.6875 5.625 4.6875H14.0625"
                        stroke="#F8634A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {display === "data" ? (
                  <DataEditor
                    name={name}
                    setName={setName}
                    lastName={lastName}
                    setLastName={setLastName}
                    middleName={middleName}
                    setMiddleName={setMiddleName}
                    setConfrimPassword={setCurrentPassword}
                    {...({
                      password: userPassword,
                      setPassword: setUserPassword,
                      currentPassword,
                      setCurrentPassword,
                      setNewPassword,
                      setConfrimPassword,
                      newPassword,
                      confrimPassword
                    })}
                  />
                ) : filmLoading ? (
                  <Loader />
                ) : display === "history" ? (
                  <History films={history} />
                ) : display === "favourites" ? (
                  <Favourites films={favourites} />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default IndexPage
