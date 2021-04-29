import React, { useContext, useEffect, useState } from "react"

import { AuthorizationData } from "../interfaces"
import LoginContext from "./context/loginContext"
import GoodToast from "./goodtoast"

type AuthorizationProps = AuthorizationData

export default function Authorization(data: AuthorizationProps) {
  const [password, changePassword] = useState("password")
  const [fieldsData, setFieldsData] = useState({})

  const loginContext = useContext(LoginContext)

  useEffect(() => {
    // VK.init({
    //   apiId: 7838936,
    // })
  }, [])

  const setPassword = () => {
    if (password == "password") {
      changePassword("text")
    } else {
      changePassword("password")
    }
  }

  // const vkLogin = () => {
  //   VK.Auth.login(async (r) => {
  //     console.log(r)
  //     VK.api(
  //       "users.get",
  //       {
  //         fields: "bdate,photo_50,sex, books",
  //         v: "5.130",
  //       },
  //       async (data) => {
  //         console.log(data.response)
  //         let tmp = {
  //           firstname: data.response[0].first_name,
  //           _user: data.response[0].id,
  //           type: "vk-login",
  //         }
  //         let response = await fetch("/api/login", {
  //           method: "POST",
  //           body: JSON.stringify(tmp),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         })
  //         response = await response.json()
  //         console.log(response)
  //       }
  //     )
  //   }, 272629760)
  // }

  const getFieldsData = (e) => {
    setFieldsData({ ...fieldsData, [e.target.name]: e.target.value })
  }

  const baseLogin = async () => {
    let tmp = fieldsData

    tmp["type"] = "base-login"

    const loginStatus =  await loginContext.loginHandler(fieldsData) 
    if (loginStatus) {
      data.hideFunc()
      GoodToast("Успешная авторизация!")
    }

  }

  return (
    <div className={`${data.hidden}`}>
      <div className="fixed inset-0 z-40 bg-shadow opacity-10" id="shadow"></div>
      <div
        className="fixed mx-5 sm:max-w-md sm:mx-auto z-50 sm:inset-16 bg-popupBackground opacity-100"
        id="authoritation"
      >
        <div className="pt-2 pb-8 sm:py-8 px-4 sm:px-8 rounded-xl">
          <div>
            <a className="absolute sm:top-3 right-3" onClick={data.hideFunc}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 sm:h-auto"
              >
                <path
                  d="M14.1213 12L23.5608 2.56046C23.842 2.27919 24 1.89772 24 1.49996C24 1.10219 23.842 0.720719 23.5608 0.439457C23.2795 0.158195 22.898 0.000183105 22.5003 0.000183105C22.1025 0.000183105 21.721 0.158195 21.4398 0.439457L12.0003 9.87896L2.56076 0.439457C2.42149 0.30019 2.25616 0.189718 2.0742 0.114347C1.89224 0.0389762 1.69721 0.000183105 1.50026 0.000183105C1.30331 0.000183105 1.10828 0.0389762 0.926323 0.114347C0.744363 0.189718 0.579029 0.30019 0.439762 0.439457C0.1585 0.720719 0.000488281 1.10219 0.000488281 1.49996C0.000488281 1.89772 0.1585 2.27919 0.439762 2.56046L9.87926 12L0.439762 21.4395C0.1585 21.7207 0.000488281 22.1022 0.000488281 22.5C0.000488281 22.8977 0.1585 23.2792 0.439762 23.5605C0.721024 23.8417 1.1025 23.9997 1.50026 23.9997C1.89803 23.9997 2.2795 23.8417 2.56076 23.5605L12.0003 14.121L21.4398 23.5605C21.5787 23.7002 21.744 23.8112 21.926 23.8869C22.108 23.9625 22.3031 24.0015 22.5003 24.0015C22.6974 24.0015 22.8925 23.9625 23.0745 23.8869C23.2565 23.8112 23.4218 23.7002 23.5608 23.5605C23.7002 23.4213 23.8108 23.256 23.8863 23.074C23.9617 22.892 24.0006 22.697 24.0006 22.5C24.0006 22.303 23.9617 22.1079 23.8863 21.9259C23.8108 21.7439 23.7002 21.5786 23.5608 21.4395L14.1213 12Z"
                  fill="white"
                />
              </svg>
            </a>

            <h5 className="mt-3 text-center text-lg sm:text-3xl font-roboto text-mainText font-medium">Авторизация</h5>
          </div>

          <form action="" className="mt-3 sm:mt-6">
            <label htmlFor="username" className="block">
              Email
            </label>
            <div className="mb-5 text-sm">
              <input
                type="text"
                autoFocus
                id="email"
                name="email"
                onChange={(e) => getFieldsData(e)}
                className="border border-popupBorder rounded-lg px-3 sm:px-6 py-3 mt-2 sm:mt-3 focus:outline-none bg-popupBackground w-full"
                placeholder="Введите email"
              />
            </div>

            <label htmlFor="password" className="block -py-2">
              Пароль
            </label>
            <div className="text-sm relative -mt-2 mb-1 sm:mb-2">
              <input
                type={password}
                onChange={(e) => getFieldsData(e)}
                id="password"
                name="password"
                className="border border-popupBorder rounded-lg px-3 sm:px-6 py-3 mt-4 sm:mt-5 focus:outline-none bg-popupBackground w-full"
                placeholder="Введите пароль"
              />
              <button
                className="bottom-1/2 block w-7 h-7 text-center text-xl leading-0 absolute top-1/2 pb-8 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
                onClick={() => setPassword()}
              >
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 1.56165C5.625 1.56165 1.875 10.0001 1.875 10.0001C1.875 10.0001 5.625 18.4366 15 18.4366C24.375 18.4366 28.125 10.0001 28.125 10.0001C28.125 10.0001 24.375 1.56165 15 1.56165Z"
                    stroke={password == "text" ? "#F8634A" : "#646464"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 14.6876C17.5888 14.6876 19.6875 12.589 19.6875 10.0001C19.6875 7.41129 17.5888 5.31262 15 5.31262C12.4112 5.31262 10.3125 7.41129 10.3125 10.0001C10.3125 12.589 12.4112 14.6876 15 14.6876Z"
                    stroke={password == "text" ? "#F8634A" : "#646464"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="text-sm relative sm:mt-3 mb-2 pt-4">
              <input type="checkbox" id="policity" className="hidden" />
              <label htmlFor="policity" className="inline text-mainText -py-2">
                <span className="opacity-80">Я ознакомлен с</span>
                <a className="hover:text-orange" href="#">
                  {" "}
                  политикой конфиденциальности{" "}
                </a>
                <span className="opacity-80">и</span>
                <a className="hover:text-orange" href="#">
                  {" "}
                  правилами пользования сервиса
                </a>
              </label>
            </div>
          </form>

          <button
            className="block text-center text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full mt-5"
            onClick={() => baseLogin()}
          >
            Войти
          </button>

          <h3 className="text-mainText mt-5 text-center font-roboto text-base">
            <span>Впервые на Chill? </span>
            <a className="text-orange hover:text-orange underline text-base" onClick={data.regFunc}>
              Зарегестрируйтесь!
            </a>
          </h3>

          <div className="text-sm mb-5 col-span-1 flex flex-row justify-center space-x-3 mt-5">
            <a href="#" className="self-center">
              {/* GGL logo */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20Z"
                  fill="white"
                />
                <path
                  d="M20 14.6845C21.6274 14.6845 22.7252 15.3874 23.3511 15.9749L25.7971 13.5867C24.2948 12.1904 22.34 11.3334 20 11.3334C16.6104 11.3334 13.683 13.2786 12.2578 16.1097L15.06 18.286C15.763 16.1963 17.7082 14.6845 20 14.6845Z"
                  fill="#EA4335"
                />
                <path
                  d="M28.32 20.1926C28.32 19.48 28.2622 18.96 28.137 18.4208H20V21.6371H24.7763C24.68 22.4363 24.16 23.64 23.0044 24.4489L25.7393 26.5674C27.3763 25.0556 28.32 22.8311 28.32 20.1926Z"
                  fill="#4285F4"
                />
                <path
                  d="M15.0698 21.7141C14.8868 21.1748 14.7809 20.597 14.7809 20C14.7809 19.403 14.8868 18.8252 15.0602 18.2859L12.2579 16.1096C11.6705 17.2844 11.3335 18.6037 11.3335 20C11.3335 21.3963 11.6705 22.7155 12.2579 23.8904L15.0698 21.7141Z"
                  fill="#FBBC05"
                />
                <path
                  d="M20.0002 28.6667C22.3402 28.6667 24.3046 27.8963 25.7394 26.5675L23.0046 24.4489C22.2728 24.9593 21.2905 25.3156 20.0002 25.3156C17.7083 25.3156 15.7631 23.8037 15.0698 21.7141L12.2676 23.8904C13.6928 26.7215 16.6105 28.6667 20.0002 28.6667Z"
                  fill="#34A853"
                />
              </svg>
            </a>

            <a href="#" className="self-center" > 
            {/* onClick={() => vkLogin()} */}
              {/* VK logo */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20Z"
                  fill="#4680C2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M32.6933 14.4343C32.8909 13.8133 32.6933 13.3616 31.8182 13.3616H28.9107C28.1767 13.3616 27.838 13.7568 27.6404 14.1803C27.6404 14.1803 26.1442 17.7935 24.0553 20.1365C23.3778 20.814 23.0673 21.0398 22.7004 21.0398C22.5027 21.0398 22.2487 20.814 22.2487 20.193V14.406C22.2487 13.6721 22.0229 13.3334 21.4018 13.3334H16.8288C16.3772 13.3334 16.0949 13.6721 16.0949 14.0109C16.0949 14.7166 17.1393 14.886 17.2522 16.862V21.1527C17.2522 22.0843 17.0829 22.2536 16.7159 22.2536C15.7279 22.2536 13.3285 18.6121 11.8888 14.4625C11.6065 13.6439 11.3242 13.3334 10.5903 13.3334H7.6545C6.80765 13.3334 6.6665 13.7286 6.6665 14.152C6.6665 14.9142 7.6545 18.7533 11.2677 23.8345C13.6672 27.3065 17.0829 29.1696 20.1598 29.1696C22.0229 29.1696 22.2487 28.7462 22.2487 28.0405V25.4153C22.2487 24.5684 22.4181 24.4273 23.0109 24.4273C23.4343 24.4273 24.1965 24.653 25.9184 26.3185C27.8944 28.2945 28.2332 29.1979 29.3341 29.1979H32.2417C33.0885 29.1979 33.4837 28.7745 33.2579 27.9558C33.0038 27.1372 32.0441 25.9516 30.802 24.5401C30.1245 23.7498 29.1082 22.8747 28.7977 22.4512C28.3743 21.8867 28.4872 21.6609 28.7977 21.1527C28.7696 21.1527 32.3263 16.128 32.6933 14.4343Z"
                  fill="white"
                />
              </svg>
            </a>

            <a href="#" className="self-center">
              {/* FB logo */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40 20C40 8.95317 31.0468 0 20 0C8.95317 0 0 8.95317 0 20C0 29.9844 7.3125 38.2578 16.875 39.7578V25.7813H11.7968V20H16.875V15.5938C16.875 10.582 19.8594 7.8125 24.4297 7.8125C26.6172 7.8125 28.9062 8.20312 28.9062 8.20312V13.125H26.3828C23.8984 13.125 23.125 14.668 23.125 16.25V20H28.6718L27.7852 25.7813H23.125V39.7578C32.6875 38.2578 40 29.9844 40 20Z"
                  fill="#1877F2"
                />
                <path
                  d="M27.7852 25.7812L28.6719 20H23.125V16.25C23.125 14.668 23.8985 13.125 26.3829 13.125H28.9063V8.20312C28.9063 8.20312 26.6172 7.8125 24.4297 7.8125C19.8595 7.8125 16.875 10.582 16.875 15.5937V20H11.7969V25.7812H16.875V39.7578C17.8945 39.918 18.9375 40 20 40C21.0625 40 22.1055 39.918 23.125 39.7578V25.7812H27.7852Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>

          <h3 className="text-mainText mt-5 text-center font-roboto text-base">
            <a className="text-orange hover:text-orange underline" onClick={data.forPassFunc}>
              Я не помню пароль
            </a>
          </h3>
        </div>
      </div>
    </div>
  )
}
