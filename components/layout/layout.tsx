import Footer from "../footer"
import Header from "../header"

const Layout = ({children}) => {
    return (
        <>
        <Header />
        <div className="container mx-auto h-full">
            <div className="max-w-screen-xl w-full mx-auto px-6 h-full">
            {children}
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Layout