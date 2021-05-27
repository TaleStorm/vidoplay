import axios from "axios";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useGoogleLogin } from "react-google-login";
import BadToast from "../badtoast";
import GoodToast from "../goodtoast";
import authAxios from "../network/authAxios";
import AuthModalContext from "./authModalContext";
import UserContext from "./userContext";

const LoginContext = React.createContext({
  userToken: null,
  loginHandler: (data) => { return new Promise((() => true)) },
  logIn: (data) => { },
  logOut: (data) => { },
  registerHandler: (data) => { return new Promise((() => true)) },
  VKLoginHandler: (data) => { },
  passwordReset: (email) => { return new Promise((() => true)) },
  handleGoogleLogin: (data) => {},
  handleFacebookLogin: (data) => {}

});

const clientId = "549411935973-lhuu4ddmi0fi39kkuk06ak22bbpr80lg.apps.googleusercontent.com"


interface Props {
  children: ReactNode;
}

const LoginContextProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState(null);
  const { setModalOpen } = useContext(AuthModalContext)
  const { setUser, setDefaultUser } = useContext(UserContext)

  const loginHandler = async (data) => {
    const {email, password} = data
        const resp = await axios.post("/api/login", {
          email,
          password,
          type: "password"
      })
      if (resp.data.error) {
          BadToast("Неправильный пароль/email")
          return
      }
      GoodToast("Логин успешен")
      logIn(resp.data.token)
  };


  useEffect(() => {
    const VKscript = document.createElement('script');
    VKscript.src = "https://vk.com/js/api/openapi.js";
    VKscript.async = true;
    VKscript.onload = () => {
        (window as any).VK.init({
            apiId: 7567371,
          })
    }
    
    const FBscript = document.createElement('script');
    FBscript.src = "https://connect.facebook.net/en_US/sdk.js"
    FBscript.async = true;
    FBscript.onload = () => {
        (window as any).FB.init({
          appId            : 2229850933730516,
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v10.0'
        });
        console.log("FB Loaded")
    }

    document.body.appendChild(VKscript);
    document.body.appendChild(FBscript)

    return () => {
      document.body.removeChild(VKscript);
      document.body.removeChild(FBscript)
    }

}, [])

const handleFacebookLogin = async () => {

  (window as any).FB.login(async function(data){
        if (data.status !== "connected") {
          console.log(data)
          BadToast("Авторизация неудачна")
          return
        }
        console.log(data);
        await (window as any).FB.api('/me', { locale: "en", fields: "email" }, async (me) => {
          const resp = await axios.post("/api/login", {
            accessToken: data.authResponse.accessToken,
            id: me.id,
            email: me.email,
            type: "facebook"
          })
          if (resp.data.error) {
            BadToast("Провал")
            return
          }
          GoodToast("Успешно");
        });
    }, {scope: 'public_profile, email', return_scopes: true});
      
  }


const handleGoogleLogin = async (data) => {
  if (data.error) {
      console.log(data)
      BadToast("Авторизация неудачна")
      return
  }
  const resp = await axios.post("/api/login", {
    accessToken: data.qc.id_token,
    id: data.googleId,
    email: data.profileObj.email,
    type: "google"
    })
    if (resp.data.error){
      BadToast("Авторизация неудачна")
      return
    }
    GoodToast("Логин успешен")
    logIn(resp.data.token)
  }




  const VKLoginHandler = async () => {
      const url = "https://oauth.vk.com/authorize?client_id=7567371&scope=email,offline&redirect_uri=https://chillvision.ru/Auth/Social_vk&response_type=token&display=popup"
      window.location.href = url

  }

  const registerHandler = async (data) => {
    const {email, password} = data
    const resp = await axios.post("/api/signup", {
      email,
      password,
    })
    if (resp.data.error) {
        BadToast("Такой email уже существует, попробуйте зайти")
        return
    }
    GoodToast("Логин успешен")
    logIn(resp.data.token)
  }

  const logIn = async (token: string) => {

    const valid = await axios.post("/api/validate", { token })
    if (valid.status === 403) {
      logOut()
      BadToast("Необходимо перезайти в аккаунт")
    }
    else {
      window.localStorage.setItem("_user", token)
      setUserToken(token)
      setDefaultUser()
    }
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
        passwordReset,
        handleGoogleLogin,
        logIn,
        handleFacebookLogin
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

export { LoginContextProvider };