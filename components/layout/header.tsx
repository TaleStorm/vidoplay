import AuthWindow from "../authWindow"
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { Router, useRouter } from "next/router"
import LoginContext from "../context/loginContext"
import SearchInput from "../inputs/searchInput"
import Sidebar from "./sidebar"
import MenuIcon from "../icons/menuIcon"
import UserIcon from "../icons/userIcon"
import AuthModalContext from "../context/authModalContext"
import ChevronLeft from "../icons/chevronLeft"
import UserDisplayContext from "../context/userDisplayContext"
import TextSearchContext from "../context/textSearchContetxt"

const HeadNav = ({ pathname, context }) => {
  const path = pathname.split("/")
  console.log(path[1])
  const navDisplayed = () => {
    if (path[1]) {
      return true
    } else return false
  }

  const currentNav = () => {
    if (path[1] && path[1] === "catalog") {
      return "Каталог"
    }
    if (path[1] && path[1] === "user") {
      if (context.display === "data") {
        return "Профиль"
      }
      if (context.display === "favourites") {
        return "Избранное"
      }
      if (context.display === "history") {
        return "История"
      }
    }
  }

  const currentHref = () => {
    if (path && path[1] !== "user") {
      return "/"
    } else {
      return
    }
  }

  return (
    <>
      {navDisplayed() ? (
        <a
          onClick={() => {
            if (context.display !== "") {
              context.setDisplay("")
              return
            }
            if (context.display === "" && path[1] === "user") {
              window.location.href = "/"
            }
          }}
          href={currentHref()}
          className={`w-8 h-8 mt-6 cursor-pointer block sm:hidden  relative z-20 transition-colors duration-300 hover:text-orange`}
        >
          <ChevronLeft />
        </a>
      ) : (
        <img src="/images/logo.png" className={`h-11 w-auto mt-6 block sm:hidden relative z-20`} />
      )}
      <div className={`absolute w-full sm:hidden flex justify-center text-ui-text mt-6`}>{currentNav()}</div>
    </>
  )
}

const HeadPC = () => {
  return (
    <>
      <div className="hidden sm:block mr-18">
        <a href="/">
          <img className="h-18 w-auto" src="/images/logo.png" alt="" />
        </a>
      </div>
      <nav className="hidden sm:flex justify-self-start font-roboto font-normal text-h2-mobile">
        <a href="/catalog" className=" text-base text-black-500 hover:text-orange mr-10">
          Каталог
        </a>
        <a href="/partnership" className=" text-base text-black-500 hover:text-orange mr-10">
          Как стать частью CHILL?
        </a>
      </nav>
    </>
  )
}
export default function Header() {
  const [auth, changeAuth] = useState("hidden")
  const [authState, changeState] = useState("auth")

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchRequest, setSearchRequest] = useState("")

  const searchInputRef = useRef() as MutableRefObject<HTMLInputElement>

  const userDisplayContext = useContext(UserDisplayContext)
  const authModalContext = useContext(AuthModalContext)
  const loginContext = useContext(LoginContext)
  const textSearch = useContext(TextSearchContext)

  const router = useRouter()

  useEffect(() => {
    console.log(router.pathname)
    console.log(router.pathname === "/search")

    if (router.pathname === "/search") {
      setIsSearchOpen(true)

      // searchInputRef.current.focus()
    } else setIsSearchOpen(false)
  }, [])

  const setAuth = () => {
    if (auth == "visible") {
      changeAuth("hidden")
      changeState("auth")
    } else {
      changeAuth("visible")
    }
  }

  const authFunc = () => {
    changeState("auth")
  }

  const regFunc = () => {
    changeState("reg")
  }

  const forPassFunc = () => {
    changeState("passChange")
  }

  const openSearch = () => {
    searchInputRef.current.focus()
  }

  useEffect(() => {
    if (isSidebarOpen) {
      document.getElementById("nav-icon2").classList.add("open")
    } else {
      document.getElementById("nav-icon2").classList.remove("open")
    }
  }, [isSidebarOpen])

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setAuth={setAuth} />
      <header className="top-0 left-0 w-full  fixed z-30 bg-background h-22 flex justify-center">
        <div
          style={{
            maxWidth: "1440px",
          }}
          className="w-full h-full md:px-16 px-6"
        >
          <div className="w-full relative py-2 h-full">
            <div className="sm:px-0 flex justify-between items-center">
              <div
                className={`absolute ${
                  isSearchOpen ? "open" : ""
                } search-container z-10 top-0 left-0 pt-4 pb-6 sm:px-0 flex justify-between items-center bg-background w-full h-full`}
              >
                {/* <SearchInput label={`Имя`} name={`name`} state={searchRequest} setState={setSearchRequest} onBlur={()=>setIsSearchOpen(false)}/> */}
                <a className=" " href="/">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline sm:hidden"
                  >
                    <path
                      d="M10.8906 13.2812L6.10937 8.5L10.8906 3.71875"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <div className="bg-filmReviewBackground flex font-medium rounded-lg sm:px-4 mt-4 py-2 px-2 sm:py-4 w-full text-ui-text transition-all duration-200 ease-out">
                  <svg
                    className={`mr-2`}
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9545 3.75C11.134 3.75 9.35443 4.28983 7.84075 5.30124C6.32708 6.31264 5.14732 7.75018 4.45065 9.43209C3.75399 11.114 3.57171 12.9647 3.92687 14.7502C4.28202 16.5357 5.15867 18.1758 6.44594 19.4631C7.73321 20.7503 9.37329 21.627 11.1588 21.9821C12.9443 22.3373 14.795 22.155 16.4769 21.4583C18.1588 20.7617 19.5964 19.5819 20.6078 18.0682C21.6192 16.5546 22.159 14.775 22.159 12.9545C22.1588 10.5134 21.189 8.17225 19.4629 6.44611C17.7367 4.71996 15.3956 3.75016 12.9545 3.75V3.75Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M19.8218 19.8217L26.2501 26.25"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    type="text"
                    name="search"
                    autoComplete="off"
                    className={`focus:outline-none bg-transparent text-lg text-mainText w-full`}
                    placeholder="Поиск"
                    value={textSearch.text}
                    onChange={(e) => {
                      textSearch.setText(e.target.value)
                    }}
                    ref={searchInputRef}
                  ></input>
                </div>
              </div>
              <div className="flex justify-between items-center h-full">
                <HeadNav pathname={router.pathname} context={userDisplayContext} />
                {/* >640px */}
                <HeadPC />
              </div>
              <nav
                className={`
            ${
              router.pathname.split("/")[1] === "search" ? "hidden" : "hidden sm:flex"
            }  justify-end mt-6 sm:mt-0 relative z-20`}
              >
                <a
                  href="/search"
                  onClick={openSearch}
                  className="text-base text-black-500 hover:text-orange ml-5 w-6 h-6 sm:h-8 sm:w-8"
                >
                  <svg
                    className={`w-full h-full`}
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9545 3.75C11.134 3.75 9.35443 4.28983 7.84075 5.30124C6.32708 6.31264 5.14732 7.75018 4.45065 9.43209C3.75399 11.114 3.57171 12.9647 3.92687 14.7502C4.28202 16.5357 5.15867 18.1758 6.44594 19.4631C7.73321 20.7503 9.37329 21.627 11.1588 21.9821C12.9443 22.3373 14.795 22.155 16.4769 21.4583C18.1588 20.7617 19.5964 19.5819 20.6078 18.0682C21.6192 16.5546 22.159 14.775 22.159 12.9545C22.1588 10.5134 21.189 8.17225 19.4629 6.44611C17.7367 4.71996 15.3956 3.75016 12.9545 3.75V3.75Z"
                      stroke="white"
                      strokeWidth="1"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M19.8218 19.8217L26.2501 26.25"
                      stroke="white"
                      strokeWidth="1"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                <div
                  onClick={() => {
                    if (loginContext.userToken) {
                      router.push("/user")
                    } else {
                      authModalContext.setModalOpen(true)
                    }
                  }}
                  className={`w-6 h-6 sm:h-8 sm:w-8
                ${router.pathname.split("/")[1] === "search" ? "hidden" : "hidden sm:block"}
                ${!loginContext.userToken ? "text-mainText" : "text-orange"} cursor-pointer ml-6`}
                >
                  <UserIcon />
                </div>

                <div
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen)
                  }}
                  className={`sm:hidden ml-5 w-6 h-6 sm:h-8 sm:w-8 cursor-pointer 
              ${isSidebarOpen ? "text-orange" : "text-mainText"}`}
                >
                  <MenuIcon isSidebarOpen={!isSidebarOpen} />
                </div>
              </nav>
            </div>
          </div>
          <AuthWindow
            hidden={auth}
            stage={authState}
            hideFunc={setAuth}
            authFunc={authFunc}
            regFunc={regFunc}
            forPassFunc={forPassFunc}
          />
        </div>
      </header>
      <div className={`w-full h-22 flex-shrink-0`}></div>
    </>
  )
}
