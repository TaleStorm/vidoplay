import React from "react";
import Authorization from '../components/authorization'
import Registration from '../components/registration'
import ForgottenPass from '../components/forgottenPass'

import { AuthWindowData } from '../interfaces'

type AuthWindowProps = AuthWindowData

export default function AuthWindow(data: AuthWindowProps) {

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
    <div className={`${data.hidden} absolute w-screen h-screen px-6 container`}>
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:grid grid-cols-5 gap-7">
        <div className="relative flex justify-center col-span-5">
          <div className="fixed inset-0 z-40 bg-shadow opacity-10" id="shadow" />
          <div className="z-50 absolute top-3 sm:max-w-md sm:mx-auto bg-popupBackground w-full ">
            {stages[data.stage]}
          </div>
        </div>
      </div>
    </div>
  )
  if (data.stage == "auth") {
    return (
      <Authorization
        hidden={data.hidden}
        hideFunc={data.hideFunc}
        forPassFunc={data.forPassFunc}
        regFunc={data.regFunc}
      />
    );
  } else if (data.stage == "reg") {
    return (
      <Registration
        hidden={data.hidden}
        hideFunc={data.hideFunc}
        authFunc={data.authFunc}
      />
    );
  } else if (data.stage == "passChange") {
    return (
      <ForgottenPass hidden={data.hidden} hideFunc={data.hideFunc} />
    );
  }
}