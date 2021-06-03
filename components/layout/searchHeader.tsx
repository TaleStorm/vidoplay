import { useRouter } from "next/router"
import { useContext } from "react"
import SearchContext from "../context/searchContext"
import CloseIcon from "../icons/closeIcon"
import SearchInput from "../inputs/searchInput"

const SearchHeader = () => {
    const router = useRouter()
    const {openSearch, searchMode, searchInputRef, searchString, setSearchString, closeSearch} = useContext(SearchContext)
    return (
        <div className={`fixed transform 
        ${searchMode ? "top-0 scale-100 opacity-100" : "scale-75 -top-25 opacity-0"} 
        bg-cardBackground transition-all duration-400 z-60 h-25 w-full left-0 origin-center md:px-12 lg:px-16 px-6 flex py-6`}>
            <form onSubmit={(e) => {
                e.preventDefault()
                closeSearch()
                console.log("search string")
                router.push("/search")
            }}
            className={`w-full flex`}
            >
            <div className={`w-full h-full mr-4`}>
            <SearchInput
            type="search"
            name="search"
            state={searchString}
            setState={setSearchString}
            />
            </div>

            <div className={`w-52 hidden md:block`}>
            <button
            className="block text-center transition-colors duration-300 hover:bg-button-hover text-white bg-orange p-3 rounded-lg w-full h-full"
          >
            Искать
            </button>
            </div>
            </form>
            <button 
            onClick={closeSearch}
            className={`ml-4 flex items-center flex-shrink-0`}>
                <div className={`hidden xs:block`}>
                Закрыть
                </div>

            <div className={`w-6 h-6 xs:ml-3 duration-400 delay-100 transform ${searchMode ? "rotate-0" : "rotate-180"}`}>
            <CloseIcon/>
            </div>
            </button>
        </div>
    )
}

export default SearchHeader