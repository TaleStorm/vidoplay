import React, { useContext, useEffect, useState } from "react"

import { RegistrationData } from "../interfaces"
import BadToast from "./badtoast"
import AuthModalContext from "./context/authModalContext"
import LoginContext from "./context/loginContext"
import GoodToast from "./goodtoast"
import Checkbox from "./inputs/checkbox"
import TextInput from "./inputs/textInput"

type RegistrationProps = RegistrationData

export default function Registration(data: RegistrationProps) {

  const authModalContext = useContext(AuthModalContext)
  const [firstname, setFirstname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [policy, setPolicy] = useState(false)


  const loginContext = useContext(LoginContext)

  const doSignup = async () => {
    const fieldsData = {
      email,
      firstname,
      _password: password
    }
    const status = await loginContext.registerHandler(fieldsData)
    if (status) {
      authModalContext.setModalOpen(false)
      GoodToast("Успешная регистрация и авторизация")
    }
    else {
      BadToast("Что-то пошло не так!")
    }
  }




  return (
    <>
      <div className="w-full">
        <div>
          <h5 className="mt-3 text-center text-lg sm:text-3xl font-roboto text-mainText font-medium">Регистрация</h5>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          doSignup()
        }} className="mt-3 sm:mt-6">
          <div className={`w-full mb-6`}>
            <TextInput label={"Имя"} placeholder={`Введите имя`} state={firstname} setState={setFirstname} name={"firstname"} type={"text"} />
          </div>
          <div className={`w-full mb-6`}>
            <TextInput label={"Email"} name={"email"} type={`email`} placeholder={"Введите email"} state={email} setState={setEmail} />
          </div>
          <div className={`w-full`}>
            <TextInput label={"Пароль"} name={"password"} type={`password`} placeholder={"Введите пароль"} state={password} setState={setPassword} />
          </div>

          <div className="text-sm relative sm:mt-3 mb-2 pt-4">
            <label className="flex text-mainText -py-2">
              <div className={`w-6 h-6 flex-shrink-0 mr-3`}>
                <Checkbox state={policy} setState={setPolicy} />
              </div>
              <span className="opacity-80 mr-1">Я согласен на </span>
              <a className="hover:text-orange" href="/conditions">
                обработку {" "}
                  персональных данных{" "}
              </a>
            </label>
          </div>
          <button
            className="block text-center text-white bg-orange p-3 rounded-lg transition-colors duration-300 hover:bg-button-hover  w-full mt-5"
            onClick={async () => {
              doSignup()
            }}
          >
            Зарегестрироваться
          </button>
        </form>

        <h3 className="text-mainText mt-5 text-center font-roboto text-base">
          <span>У меня уже есть </span>
          <a className="text-orange hover:text-orange underline text-base" onClick={data.authFunc}>
            аккаунт
            </a>
        </h3>
      </div>
    </>
  )
}
