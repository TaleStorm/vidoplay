import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react"

import { AuthorizationData } from "../interfaces"
import BadToast from "./badtoast"
import AuthModalContext from "./context/authModalContext"
import LoginContext from "./context/loginContext"
import GoodToast from "./goodtoast"
import Checkbox from "./inputs/checkbox"
import TextInput from "./inputs/textInput"
import FacebookLogin from 'react-facebook-login';

type AuthorizationProps = AuthorizationData

export default function Authorization(data: AuthorizationProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [policy, setPolicy] = useState(false)

  const authModalContext = useContext(AuthModalContext)
  const loginContext = useContext(LoginContext)

  const responseFacebook = (response) => {
    console.log(response);
  }

  const vkLogin = async () => {
    loginContext.VKLoginHandler("")
  }

  const baseLogin = async () => {
    let tmp = {
      email,
      _password: password
    }

    tmp["type"] = "base-login"

    const loginStatus = await loginContext.loginHandler(tmp)
    if (loginStatus) {
      authModalContext.setModalOpen(false)
      GoodToast("Успешная авторизация!")
    }
    else {
      BadToast("Нет такой пары email/пароль")
    }
  }

  return (
    <
      >
      <div className="relative">
        <div>
          <h5 className="mt-3 text-center text-lg sm:text-3xl font-roboto text-mainText font-medium">Авторизация</h5>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          baseLogin()
        }} className="mt-3 sm:mt-6">
          <div className={`w-full mb-6`}>
            <TextInput
              label={"Email"}
              name={"email"}
              type={`email`}
              placeholder={"Введите email"}
              state={email}
              setState={setEmail}
            />
          </div>
          <div className={`w-full`}>
            <TextInput
              label={"Пароль"}
              name={"password"}
              type={`password`}
              placeholder={"Введите пароль"}
              state={password}
              setState={setPassword}
            />
          </div>
          <div className="text-sm relative sm:mt-3 mb-2 pt-4">
            <label className="flex text-mainText -py-2">
              <div className={`w-6 h-6 flex-shrink-0 mr-3`}>
                <Checkbox state={policy} setState={setPolicy} />
              </div>
              <div>
                <span className="opacity-80">Я ознакомлен с</span>
                <a className="hover:text-orange" href="/policy">
                  {" "}
                  политикой конфиденциальности{" "}
                </a>
                <span className="opacity-80">и</span>
                <a className="hover:text-orange" href="/rules">
                  {" "}
                  правилами пользования сервиса
                </a>
              </div>
            </label>
          </div>

          <button
            className="block text-center transition-colors duration-300 hover:bg-button-hover text-white bg-orange p-3 rounded-lg w-full mt-5"
            onClick={() => baseLogin()}
          >
            Войти
          </button>

        </form>
        <h3 className="text-mainText mt-5 text-center font-roboto text-base">
          <span>Впервые на Chill? </span>
          <a className="text-orange hover:text-orange underline text-base" onClick={data.regFunc}>
            Зарегестрируйтесь!
            </a>
        </h3>

        {/* <div className="text-sm mb-5 col-span-1 flex flex-row justify-center space-x-3 mt-5">
          <a
            onClick={() => {
              loginContext.googleLoginHandler()
            }}
            className="self-center"> */}
        {/* GGL logo */}
        {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          <a className="self-center" onClick={() => vkLogin()}  > */}

        {/* VK logo */}
        {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </a> */}

        {/* <FacebookLogin
            appId="2229850933730516"
            fields="name,email,picture"
            scope="public_profile,user_friends,user_actions.books"
            callback={responseFacebook}
            textButton={""}
            cssClass="my-facebook-button-class"
            icon={<a className="self-center"> */}
        {/* FB logo */}
        {/* <svg className={`mt-1`} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40 20C40 8.95317 31.0468 0 20 0C8.95317 0 0 8.95317 0 20C0 29.9844 7.3125 38.2578 16.875 39.7578V25.7813H11.7968V20H16.875V15.5938C16.875 10.582 19.8594 7.8125 24.4297 7.8125C26.6172 7.8125 28.9062 8.20312 28.9062 8.20312V13.125H26.3828C23.8984 13.125 23.125 14.668 23.125 16.25V20H28.6718L27.7852 25.7813H23.125V39.7578C32.6875 38.2578 40 29.9844 40 20Z"
                  fill="#1877F2"
                />
                <path
                  d="M27.7852 25.7812L28.6719 20H23.125V16.25C23.125 14.668 23.8985 13.125 26.3829 13.125H28.9063V8.20312C28.9063 8.20312 26.6172 7.8125 24.4297 7.8125C19.8595 7.8125 16.875 10.582 16.875 15.5937V20H11.7969V25.7812H16.875V39.7578C17.8945 39.918 18.9375 40 20 40C21.0625 40 22.1055 39.918 23.125 39.7578V25.7812H27.7852Z"
                  fill="white"
                />
              </svg>
            </a>}
          />

        </div> */}

        <h3 className="text-mainText mt-5 text-center font-roboto text-base">
          <a className="text-orange hover:text-orange underline" onClick={data.forPassFunc}>
            Я не помню пароль
            </a>
        </h3>
      </div>
    </>
  )
}
