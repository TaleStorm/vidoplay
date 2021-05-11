import "../styles/globals.css"
import "swiper/swiper.scss"
import "swiper/components/scrollbar/scrollbar.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/components/effect-fade/effect-fade.scss"
import Head from 'next/head'
import { useEffect } from "react"
import {LoginContextProvider} from "../components/context/loginContext"
import Layout from "../components/layout/layout"
import { AuthModalContextProvider } from "../components/context/authModalContext"
import { UserDisplayContextProvider } from "../components/context/userDisplayContext"
import {UserContextProvider} from "../components/context/userContext"
import TagManager from 'react-gtm-module'
import { MovieContextProvider } from "../components/context/movieContext"
import { PlayerContextProvider} from "../components/context/playerContext"


function MyApp({ Component, pageProps }) {

 
  
  useEffect(() => {
    const appHeight = () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }
    window.addEventListener("resize", appHeight)
    appHeight()
    return () => {
      window.removeEventListener("resize", appHeight)
    }
  }, [])

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'GTM-WVRTJ4M'
  }
  TagManager.initialize(tagManagerArgs)
  }, [])

  
  useEffect(() => {
    const listener = () => {
      window.dispatchEvent(new Event("resize"))
    }
    window.addEventListener("load", listener)
    return () => {
      window.removeEventListener("load", listener)
    }
  }, [])

  return (
    <MovieContextProvider>
    <UserContextProvider>
    <UserDisplayContextProvider>
    <AuthModalContextProvider>
    <PlayerContextProvider>
    <LoginContextProvider>
        <Head>
        <script src="//vk.com/js/api/openapi.js"></script>
        </Head>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </LoginContextProvider>
    </PlayerContextProvider>
    </AuthModalContextProvider>
    </UserDisplayContextProvider>
    </UserContextProvider>
    </MovieContextProvider>
  )
}

export default MyApp
