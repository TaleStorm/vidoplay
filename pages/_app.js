import "../styles/globals.css"
import "swiper/swiper.scss"
import "swiper/components/scrollbar/scrollbar.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/components/effect-fade/effect-fade.scss"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <script src="//vk.com/js/api/openapi.js?169"  ></script>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
