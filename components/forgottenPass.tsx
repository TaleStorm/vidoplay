import React, { useContext, useState } from "react";

import { ForgottenPassData } from '../interfaces'
import LoginContext from "./context/loginContext";
import GoodToast from "./goodtoast";
import ChevronLeft from "./icons/chevronLeft";
import TextInput from "./inputs/textInput";

type ForgottenPassProps = ForgottenPassData

export default function Registration(data:ForgottenPassProps) {
    const [email, setEmail] = useState("")
    const loginContext = useContext(LoginContext)
    return (
        <>
          <div onClick={() => {data.authFunc()}} className={`w-12 h-12 absolute left-2 opacity-25 hover:opacity-100 transition-all duration-300 cursor-pointer`}>
            <ChevronLeft/>
          </div>
          <div className="w-full">
            <div>      
            <h1 className="mt-3 text-center text-lg sm:text-3xl font-roboto text-mainText font-medium">
              Восстановление пароля
            </h1>
            </div>
            <form className="mt-3 sm:mt-6">
              <div className={`w-full mb-6`}>
                <TextInput label={"Email"} name={"email"} type={`email`} placeholder={"Введите email"} state={email} setState={setEmail}/>
              </div>
              <button
               className="block text-center text-white bg-orange p-3 rounded-lg transition-colors duration-300 hover:bg-button-hover  w-full mt-5"
                onClick={async () => {
                  await loginContext.passwordReset(email)
                  GoodToast("Письмо отправлено!")
                  }}
                >
                Восстановить пароль
              </button>
            </form>
          </div>
        </>
    );
  }