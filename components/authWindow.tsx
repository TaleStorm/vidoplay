import React, { useContext } from "react";
import Authorization from '../components/authorization'
import Registration from '../components/registration'
import ForgottenPass from '../components/forgottenPass'

import { AuthWindowData } from '../interfaces'
import AuthModalContext from "./context/authModalContext";
import ModalOverlay from "./layout/modalOverlay";
import CloseIcon from "./icons/closeIcon";

type AuthWindowProps = AuthWindowData

export default function AuthWindow(data: AuthWindowProps) {

  const authModalContext = useContext(AuthModalContext)

  const stages = {
    auth: <Authorization
      hidden={data.hidden}
      hideFunc={data.hideFunc}
      forPassFunc={data.forPassFunc}
      regFunc={data.regFunc}
    />,
    reg: <Registration
      hidden={data.hidden}
      hideFunc={data.hideFunc}
      authFunc={data.authFunc}
    />,
    passChange: <ForgottenPass hidden={data.hidden} hideFunc={data.hideFunc} />
  }

  return (
        <ModalOverlay classes={"px-4"} modalOpen={authModalContext.modalOpen} setModalOpen={authModalContext.setModalOpen}>
          <div className={`w-full h-auto rounded-xl bg-popupBackground mt-14 flex flex-col items-center sm:px-12 px-4 pt-4 pb-8 max-w-lg mx-auto relative`}>
            <div className={`w-8 h-8 cursor-pointer opacity-25 hover:opacity-100 text-mainText absolute top-5 right-5 transition-opacity duration-200 z-30`} onClick={() => {authModalContext.setModalOpen(false)}}>
            <CloseIcon/>
            </div>
            {stages[data.stage]}
          </div>
        </ModalOverlay>

  )
}