import "../styles/globals.css"
import "swiper/swiper.scss"
import "swiper/components/scrollbar/scrollbar.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/components/effect-fade/effect-fade.scss"
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    const appHeight = () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    window.addEventListener("resize", appHeight);
    appHeight();
    return () => {
      window.removeEventListener("resize", appHeight);
    };
  }, [])
  
}

export default MyApp
