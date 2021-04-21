import React from "react";
import Authorization from '../components/authorization'
import Registration from '../components/registration'
import ForgottenPass from '../components/forgottenPass'

import { AuthWindowData } from '../interfaces'

type AuthWindowProps = AuthWindowData

export default function AuthWindow(data:AuthWindowProps) {

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
        <ForgottenPass hidden={data.hidden} hideFunc={data.hideFunc}/>
      );
    }
  }