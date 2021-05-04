const MenuIcon = ({classname="w-full h-full", ref=null, isSidebarOpen}) => {
    return (
    <div id="nav-icon2" className={``}>
    <span className={`${isSidebarOpen ? "bg-mainText" : "bg-orange"}`}></span>
    <span className={`${isSidebarOpen ? "bg-mainText" : "bg-orange"}`}></span>
    <span className={`${isSidebarOpen ? "bg-mainText" : "bg-orange"}`}></span>
    <span className={`${isSidebarOpen ? "bg-mainText" : "bg-orange"}`}></span>
    <span className={`${isSidebarOpen ? "bg-mainText" : "bg-orange"}`}></span>
    <span className={`${isSidebarOpen ? "bg-mainText" : "bg-orange"}`}></span>
    </div>

    )
}

export default MenuIcon