import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import authAxios from "../network/authAxios";

const LoginContext = React.createContext({
    userToken: null,
    loginHandler: (data) => {return new Promise((() => true))},
    logOut: (data) => {},
    registerHandler: (data) => {return new Promise((() => true))}
});

interface Props {
  children: ReactNode;
}

const LoginContextProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState(null);

  const loginHandler = async (data) => {
    const resp = await authAxios.post("/api/login", {email: data.email, _password: data._password, type: "base-login"})
    const respData = resp.data
    console.log(respData)
    if ((respData.status === "ok") && (!respData.error)) {
        logIn(respData.data["_user"])
        return true
    }
    else {
        return false
    }
   
  };

  const registerHandler = async (data) => {
      const resp = await authAxios.post('/api/register', data)
      const signupStatus = resp.data.status
      console.log(signupStatus)
      if (signupStatus === "exist") {
         const bool = await loginHandler(data)
         return bool
      }
      else {
          return false
      }
      
  }

  const logIn = (token:string) => {
    console.log("logged in " + token)
    window.localStorage.setItem("_user", token)
    setUserToken(token)
  }

  const logOut = () => {
    window.localStorage.removeItem("_user")
    setUserToken(null)
  };

  useEffect(() => {
    const token = window.localStorage.getItem("_user");
    if (token) {
        logIn(token)
    } else {
      logOut();
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        userToken,
        logOut,
        loginHandler,
        registerHandler
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

export { LoginContextProvider };