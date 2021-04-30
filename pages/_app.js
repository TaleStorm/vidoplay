import "../styles/globals.css"
import "swiper/swiper.scss"
import "swiper/components/scrollbar/scrollbar.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/components/effect-fade/effect-fade.scss"
import Head from 'next/head'
import { useEffect } from "react"
import {LoginContextProvider} from "../components/context/loginContext"
import Layout from "../components/layout/layout"

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

  return (
    <LoginContextProvider>
        <Head>
          <script src="//vk.com/js/api/openapi.js"></script>
        </Head>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </LoginContextProvider>
  )
}

export default MyApp
