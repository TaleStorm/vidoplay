import AuthWindow from '../components/authWindow'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

export default function Header() {
  const [auth, changeAuth] = useState("hidden")
  const [authState, changeState] = useState("auth")

  const router = useRouter()

  useEffect(() => {
    console.log(router)
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
  };

  const regFunc = () => {
    changeState("reg")
  };

  const forPassFunc = () => {
    changeState("passChange")
  };



  return (
    <header className="relative">

      <div className="container mx-auto ">
        <div className="max-w-screen-xl w-full mx-auto ">
          <div className="px-6  pt-4 pb-6 sm:px-0 flex justify-between items-center sm:py-6 md:space-x-10">
            <div className="flex justify-between items-center sm:py-6 md:space-x-10">
              {router.pathname.match(/^\/films\/+/) !== null ?
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
                :
                <div className="flex justify-center sm:hidden">
                  <a href="#">
                    <span className="sr-only">Logo</span>
                    <img className="h-20 w-auto" src="/images/logo.png" alt="" />
                  </a>
                </div>
              }
              <div className="hidden sm:flex justify-center ">
                <a href="#">
                  <span className="sr-only">Logo</span>
                  <img className="h-20 w-auto" src="/images/logo.png" alt="" />
                </a>
              </div>
              <nav className="hidden sm:flex justify-self-start space-x-8 font-roboto font-normal text-sm">
                <a href="#" className=" text-base text-black-500 hover:text-orange">
                  Лента
                  </a>
                <a href="#" className=" text-base text-black-500 hover:text-orange">
                  Каталог
                  </a>
                <a href="#" className=" text-base text-black-500 hover:text-orange">
                  Подборки
                  </a>
              </nav>
            </div>
            <nav className="flex justify-end">
              <a href="#" className="text-base text-black-500 hover:text-orange ml-5">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9545 3.75C11.134 3.75 9.35443 4.28983 7.84075 5.30124C6.32708 6.31264 5.14732 7.75018 4.45065 9.43209C3.75399 11.114 3.57171 12.9647 3.92687 14.7502C4.28202 16.5357 5.15867 18.1758 6.44594 19.4631C7.73321 20.7503 9.37329 21.627 11.1588 21.9821C12.9443 22.3373 14.795 22.155 16.4769 21.4583C18.1588 20.7617 19.5964 19.5819 20.6078 18.0682C21.6192 16.5546 22.159 14.775 22.159 12.9545C22.1588 10.5134 21.189 8.17225 19.4629 6.44611C17.7367 4.71996 15.3956 3.75016 12.9545 3.75V3.75Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                  <path d="M19.8218 19.8217L26.2501 26.25" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>
              </a>
              <a className="text-base text-black-500 hover:text-gray-900 ml-5" onClick={() => setAuth()}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18.75C19.1421 18.75 22.5 15.3921 22.5 11.25C22.5 7.10786 19.1421 3.75 15 3.75C10.8579 3.75 7.5 7.10786 7.5 11.25C7.5 15.3921 10.8579 18.75 15 18.75Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                  <path d="M3.63135 25.3114C4.78396 23.3164 6.44128 21.6598 8.43684 20.508C10.4324 19.3563 12.6959 18.75 15 18.75C17.304 18.75 19.5675 19.3564 21.563 20.5082C23.5586 21.6599 25.2159 23.3166 26.3684 25.3116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
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
  );
}
