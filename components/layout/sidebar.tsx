import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import LoginContext from "../context/loginContext"
import UserIcon from "../icons/userIcon"

const Sidebar = ({isSidebarOpen, setIsSidebarOpen, setAuth}) => { 
    const loginContext = useContext(LoginContext)
    const router = useRouter()
    const links = [
        {
            name: "Каталог",
            link: "/catalog"
        },
        {
            name: "Как стать частью CHILL?",
            link: "/partnership"
        }
    ]
    
    return (
        <div 
        style={{
            marginLeft: isSidebarOpen ? "0%" : "100%"
        }}
        className={`w-full top-20 h-full fixed sm:hidden bg-background transition-all duration-500 ${!isSidebarOpen ? "opacity-0" : "opacity-100"} z-50 pt-4  px-6`}>
            <div className={`w-full pt-8 grid grid-cols-1 space-y-6`}>
            {links.map((link) => {
                return (
                    <Link href={link.link}>
                        <div onClick={() => {setIsSidebarOpen(false)}} className={`text-h7 w-full justify-center text-center font-medium cursor-pointer`}>
                        {link.name}
                        </div>
                    </Link>
                )
            })}
            </div>
            <button className={`w-full py-2 mt-11 flex text-h2-mobile bg-orange justify-center items-center rounded-xl`}>
            <div className={`mr-3`}>
            {loginContext.userToken ? "Профиль" : "Авторизоваться"}
            </div>
            <div 
            onClick={() => {
                setIsSidebarOpen(false)
                if (loginContext.userToken) {
                    router.push("/user")
                }
                else {
                    setAuth()
                }
            }}
            className={`w-8 h-8`}>
            <UserIcon/>
            </div>
            </button>
        </div>
    )

}

export default Sidebar