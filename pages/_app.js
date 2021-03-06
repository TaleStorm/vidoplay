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
import { CatalogContextProvider } from "../components/context/catalogContext"
import { SearchContextProvider } from "../components/context/searchContext"
import apiReq from "../services/api-requests"

const ApiReq = new apiReq()

function MyApp({ Component, pageProps, token }) {
  console.log(token)
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
    ;(function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          ;(m[i].a = m[i].a || []).push(arguments)
        }
      m[i].l = 1 * new Date()
      ;(k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        a.parentNode.insertBefore(k, a)
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
              <LoginContextProvider loginState={token}>
                <TextSearchContextProvider>
                  <SearchContextProvider>
                    <PlayerEventsContextProvider>
                      <CatalogContextProvider>
                        <Head>
                          <title>??????-?????????????????? CHILL. ??????-?????????????? ????????????</title>
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
                          <script src="https://vplatform.gcdn.co/_players/v2.0.71/gplayerAPI.js"></script>
                        </Head>
                        <img
                          src="https://mc.yandex.ru/watch/64534015"
                          style={{ position: "absolute", left: -9999 }}
                          alt=""
                        />
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      </CatalogContextProvider>
                    </PlayerEventsContextProvider>
                  </SearchContextProvider>
                </TextSearchContextProvider>
              </LoginContextProvider>
            </PlayerContextProvider>
          </AuthModalContextProvider>
        </UserDisplayContextProvider>
      </UserContextProvider>
    </MovieContextProvider>
  )
}

MyApp.getInitialProps = async ({ component, ctx }) => {
  let token = ""
  if (ctx.req?.headers?.cookie) {
    const chips = ctx.req.headers.cookie.split(";")
    const chillToken = chips.find((a) => a.match("chill_token"))
    if (chillToken) {
      token = chillToken.split("=")[1]
      try {
        const valid = await ApiReq.validate({ token })
        if (valid == undefined || valid.status === 403) {
          token = ""
        }
      } catch (e) {
        token = ""
      }
    }
  }

  return {
    token,
  }
}
export default MyApp
