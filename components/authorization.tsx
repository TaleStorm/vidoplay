import React, { isValidElement, MutableRefObject, useContext, useEffect, useRef, useState } from "react"

import { AuthorizationData } from "../interfaces"
import BadToast from "./badtoast"
import AuthModalContext from "./context/authModalContext"
import LoginContext from "./context/loginContext"
import GoodToast from "./goodtoast"
import Checkbox from "./inputs/checkbox"
import TextInput from "./inputs/textInput"
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from "react-google-login"
import GoogleIcon from "./icons/googleIcon"
import VKIcon from "./icons/vkIcon"
import FacebookIcon from "./icons/facebookIcon"

type AuthorizationProps = AuthorizationData

export default function Authorization(data: AuthorizationProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [policy, setPolicy] = useState(false)

  const [errors, setErrros] = useState({
    email: { state: false, message: "" },
    password: { state: false, message: "" },
    policy: false
  })


  const authModalContext = useContext(AuthModalContext)
  const loginContext = useContext(LoginContext)

  const responseFacebook = (response) => {
    console.log(response);
  }

  const vkLogin = async () => {
    loginContext.VKLoginHandler("")
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
          loginContext.loginHandler({email, password})
        }} className="mt-3 sm:mt-6">
          <div className={`w-full mb-6`}>
            <TextInput
              label={"Email"}
              name={"email"}
              type={`email`}
              placeholder={"Введите email"}
              state={email}
              setState={setEmail}
              required
              error={errors.email.state}
              errorMessage={errors.email.message}
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
              error={errors.password.state}
              errorMessage={errors.password.message}
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
            {errors.policy &&
              <div className="flex items-center mt-2">
                <img src="/icons/warning.svg" className="flex-shrink-0 w-5 h-5 mr-1" alt="" />
                <div className={`text-error-red text-sm`}>Подтвердите выбор</div>
              </div>}
          </div>

          <button
            className="block text-center transition-colors duration-300 hover:bg-button-hover text-white bg-orange p-3 rounded-lg w-full mt-5"
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

        <div className="text-sm mb-5 col-span-1 flex flex-row justify-center space-x-3 mt-5">
         <GoogleLogin
            buttonText=""
            clientId={"549411935973-lhuu4ddmi0fi39kkuk06ak22bbpr80lg.apps.googleusercontent.com"}
            onSuccess={loginContext.handleGoogleLogin}
            onFailure={loginContext.handleGoogleLogin}
            render={renderProps => (<button onClick={renderProps.onClick} disabled={renderProps.disabled} className={`ml-4 cursor-pointer w-10 h-10 rounded-full border-black border border-opacity-20`}>
            <GoogleIcon/>
            </button>)}
            />
            
          <button className={`w-10 h-10 ml-2`} onClick={loginContext.VKLoginHandler}>
                    <VKIcon/>
          </button>
          <button onClick={loginContext.handleFacebookLogin} className={`w-10 h-10 ml-2`}>
                    <FacebookIcon/>
                </button>
          </div>

        <h3 className="text-mainText mt-5 text-center font-roboto text-base">
          <a className="text-orange hover:text-orange underline" onClick={data.forPassFunc}>
            Я не помню пароль
            </a>
        </h3>
      </div>
    </>
  )
}
