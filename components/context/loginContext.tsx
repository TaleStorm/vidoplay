import axios from "axios";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import BadToast from "../badtoast";
import GoodToast from "../goodtoast";
import authAxios from "../network/authAxios";
import AuthModalContext from "./authModalContext";
import UserContext from "./userContext";

const LoginContext = React.createContext({
    userToken: null,
    loginHandler: (data) => {return new Promise((() => true))},
    logOut: (data) => {},
    registerHandler: (data) => {return new Promise((() => true))},
    VKLoginHandler: (data) => {return new Promise((() => true))},
    passwordReset: (email) => {return new Promise((() => true))}
});


   const vkLogin = () => {

   }


interface Props {
  children: ReactNode;
}

const LoginContextProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState(null);
  const {setModalOpen} = useContext(AuthModalContext)
  const {setUser, setDefaultUser} = useContext(UserContext)

  const loginHandler = async (data) => {
    const resp = await authAxios.post("/api/login", {email: data.email, _password: data._password, type: "base-login"})
    const respData = resp.data
    if ((respData.status === "ok") && (!respData.error)) {
        logIn(respData.data["_user"])
        return true
    }
    else {
        return false
    }
  };

  
  useEffect(() => {
    (window as any).VK.init({
      apiId: 7838936,
    })
  }, [])

  const VKLoginHandler = async (data) => {
    try {
       await  (window as any).VK.Auth.login(async (r) => {
        await (window as any).VK.api(
          "users.get",
          {
            fields: "bdate,photo_50,sex, books",
            v: "5.130",
          },
          async (data) => {
            let tmp = {
              firstname: data.response[0].first_name,
              _user: data.response[0].id,
              type: "vk-login",
            }
            const response = await authAxios.post("/api/login", tmp)
            logIn(response.data.data._user)
            setModalOpen(false)
            GoodToast("Успешная авторизация")
          }
        )
      }, 272629760)

    }
    catch (e) {
      BadToast("Не получилось!")
      return false
    }

  }

  const registerHandler = async (data) => {
      const resp = await authAxios.post('/api/register', data)
      const signupStatus = resp.data.status
      if (signupStatus === "exist") {
         const bool = await loginHandler(data)
         return bool
      }
      else {
          return false
      }
      
  }

  const logIn = async (token:string) => {
    window.localStorage.setItem("_user", token)
    setUserToken(token)
    const userRes = await axios.post("/api/getUser", { userId: token })
    setUser(userRes.data)
  }

  const logOut = () => {
    window.localStorage.removeItem("_user")
    setUserToken(null)
    setDefaultUser()
  };

  const passwordReset = async (email) => {
    const resp = await authAxios.post('/api/passwordReset', {
      email: email
    })
    return true
  }

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
        registerHandler,
        VKLoginHandler,
        passwordReset
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

export { LoginContextProvider };