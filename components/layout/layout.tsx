import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Footer from "./footer"
import Header from "./header"

const Layout = ({children}) => {
  const [isLayoutHidden, setLayoutHidden] = useState(false)
  const {pathname} = useRouter()

  useEffect(() => {
    if (pathname.split("/")[1] === "embed") {
      setLayoutHidden(true)
      return
    }
    setLayoutHidden(false)
  }, [pathname])
    return (
        <>
        <Header isLayoutHidden={isLayoutHidden} />
        { <div className={`h-auto w-full min-h-full flex-shrink-0 ${!isLayoutHidden && "md:px-16 px-6 pt-9"} `}>
          {children}
        </div>} 
        <Footer isLayoutHidden={isLayoutHidden} />
        </>
    )
}

export default Layout