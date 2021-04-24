import React, { useState } from "react";

import { RegistrationData } from '../interfaces'

type RegistrationProps = RegistrationData

export default function Registration(data: RegistrationProps) {
  const [password, changePassword] = useState("password")

  const setPassword = () => {
    if (password == "password") {
      changePassword("text")
    } else {
      changePassword("password")
    }
  }

  return (
    <div className={data.hidden}>
      <div className="fixed inset-0 z-40 bg-shadow opacity-10" id="shadow">
      </div>
      <div className="fixed mx-5 sm:max-w-md sm:mx-auto z-50 sm:inset-16 bg-popupBackground opacity-100" id="authoritation">
        <div className="pt-3 pb-8 sm:py-8 px-4 sm:px-8 rounded-xl">
          <div>
            <a className="absolute sm:top-3 right-3" onClick={data.hideFunc}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-auto">
                <path d="M14.1213 12L23.5608 2.56046C23.842 2.27919 24 1.89772 24 1.49996C24 1.10219 23.842 0.720719 23.5608 0.439457C23.2795 0.158195 22.898 0.000183105 22.5003 0.000183105C22.1025 0.000183105 21.721 0.158195 21.4398 0.439457L12.0003 9.87896L2.56076 0.439457C2.42149 0.30019 2.25616 0.189718 2.0742 0.114347C1.89224 0.0389762 1.69721 0.000183105 1.50026 0.000183105C1.30331 0.000183105 1.10828 0.0389762 0.926323 0.114347C0.744363 0.189718 0.579029 0.30019 0.439762 0.439457C0.1585 0.720719 0.000488281 1.10219 0.000488281 1.49996C0.000488281 1.89772 0.1585 2.27919 0.439762 2.56046L9.87926 12L0.439762 21.4395C0.1585 21.7207 0.000488281 22.1022 0.000488281 22.5C0.000488281 22.8977 0.1585 23.2792 0.439762 23.5605C0.721024 23.8417 1.1025 23.9997 1.50026 23.9997C1.89803 23.9997 2.2795 23.8417 2.56076 23.5605L12.0003 14.121L21.4398 23.5605C21.5787 23.7002 21.744 23.8112 21.926 23.8869C22.108 23.9625 22.3031 24.0015 22.5003 24.0015C22.6974 24.0015 22.8925 23.9625 23.0745 23.8869C23.2565 23.8112 23.4218 23.7002 23.5608 23.5605C23.7002 23.4213 23.8108 23.256 23.8863 23.074C23.9617 22.892 24.0006 22.697 24.0006 22.5C24.0006 22.303 23.9617 22.1079 23.8863 21.9259C23.8108 21.7439 23.7002 21.5786 23.5608 21.4395L14.1213 12Z" fill="white" />
              </svg>
            </a>

            <h1 className="font-medium mt-3 text-center text-lg sm:text-3xl font-roboto text-mainText font-medium">
              Регистрация
            </h1>
          </div>


          <form action="" className="mt-3 sm:mt-6">

            <label htmlFor="username" className="block text-black">Имя</label>
            <div className="mb-5 text-sm">
              <input type="text" autoFocus id="email" className="border border-popupBorder rounded-lg px-3 sm:px-6 py-3 mt-2 sm:mt-3 focus:outline-none bg-popupBackground w-full" placeholder="Введите имя" />
            </div>

            <label htmlFor="username" className="block text-black">Email</label>
            <div className="mb-5 text-sm">
              <input type="text" autoFocus id="email" className="border border-popupBorder rounded-lg px-3 sm:px-6 py-3 mt-2 sm:mt-3 focus:outline-none bg-popupBackground w-full" placeholder="Введите email" />
            </div>


            <label htmlFor="password" className="block text-black -py-2">Пароль</label>
            <div className="text-sm relative -mt-2 mb-1 sm:mb-2">
              <input type={password} id="password" className="border border-popupBorder rounded-lg px-3 sm:px-6 py-3 mt-4 sm:mt-5 focus:outline-none bg-popupBackground w-full" placeholder="Введите пароль" />
              <button className="bottom-1/2 block w-7 h-7 text-center text-xl leading-0 absolute top-1/2 pb-8 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors" onClick={() => setPassword()}>
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 1.56165C5.625 1.56165 1.875 10.0001 1.875 10.0001C1.875 10.0001 5.625 18.4366 15 18.4366C24.375 18.4366 28.125 10.0001 28.125 10.0001C28.125 10.0001 24.375 1.56165 15 1.56165Z" stroke={password == "text" ? "#F8634A" : "#646464"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 14.6876C17.5888 14.6876 19.6875 12.589 19.6875 10.0001C19.6875 7.41129 17.5888 5.31262 15 5.31262C12.4112 5.31262 10.3125 7.41129 10.3125 10.0001C10.3125 12.589 12.4112 14.6876 15 14.6876Z" stroke={password == "text" ? "#F8634A" : "#646464"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="text-sm relative sm:mt-3 mb-2 pt-4">
              <input type="checkbox" id="policity" className="hidden" />
              <label htmlFor="policity" className="inline text-mainText -py-2">
                <span className="opacity-80">
                  Я согласен на
                  </span>
                <a className="hover:text-orange" href="#"> персональных данных </a>
              </label>
            </div>

            <button className="block text-center text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full mt-5">
              Зарегестрироваться
              </button>
          </form>

          <h3 className="text-mainText mt-5 text-center font-roboto text-base">
            <span>У меня уже есть </span>
            <a className="text-orange hover:text-orange underline text-base" onClick={data.authFunc}>аккаунт</a>
          </h3>

        </div>
      </div>
    </div>
  );
}