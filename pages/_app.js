import "../styles/globals.css"
import "swiper/swiper.scss"
import "swiper/components/scrollbar/scrollbar.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/components/effect-fade/effect-fade.scss"
import Head from "next/head"
import { useEffect } from "react"
import { LoginContextProvider } from "../components/context/loginContext"
import Layout from "../components/layout/layout"
import { AuthModalContextProvider } from "../components/context/authModalContext"
import { UserDisplayContextProvider } from "../components/context/userDisplayContext"
import { UserContextProvider } from "../components/context/userContext"
import TagManager from "react-gtm-module"
import { MovieContextProvider } from "../components/context/movieContext"
import { PlayerContextProvider } from "../components/context/playerContext"
import { PlayerEventsContextProvider } from "../components/context/playerEventsContext"
import { TextSearchContextProvider } from "../components/context/textSearchContetxt"

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
      gtmId: "GTM-WVRTJ4M",
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

  useEffect(() => {
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          ;(m[i].a = m[i].a || []).push(arguments)
        }

      m[i].l = 1 * new Date()
      (k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        a.parentNode.insertBefore(k, a)
      console.log("ymMetrickInit")
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")
    
    ym(64534015, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  }, [])

  return (
    <MovieContextProvider>
      <UserContextProvider>
        <UserDisplayContextProvider>
          <AuthModalContextProvider>
            <PlayerContextProvider>
              <LoginContextProvider>
                <TextSearchContextProvider>
                  <PlayerEventsContextProvider>
                    <Head>
                      <script src="//vk.com/js/api/openapi.js"></script>
                      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                      <script
                        async
                        defer
                        crossorigin="anonymous"
                        src="https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v10.0"
                        nonce="SUBXHY9c"
                      ></script>
                    </Head>
                    <img
                      src="https://mc.yandex.ru/watch/64534015"
                      style={{ position: "absolute", left: -9999 }}
                      alt=""
                    />
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </PlayerEventsContextProvider>
                </TextSearchContextProvider>
              </LoginContextProvider>
            </PlayerContextProvider>
          </AuthModalContextProvider>
        </UserDisplayContextProvider>
      </UserContextProvider>
    </MovieContextProvider>
  )
}

export default MyApp
