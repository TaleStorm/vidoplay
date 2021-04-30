import Footer from "../footer"
import Header from "../header"

const Layout = ({children}) => {
    return (
        <>
        <Header />
        <div className="h-auto w-full min-h-full flex-shrink-0 md:px-16 px-6 pt-9">
          {children}
        </div>
        <Footer />
        </>
    )
}

export default Layout