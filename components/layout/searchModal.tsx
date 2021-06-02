import { useContext, useEffect, useState } from "react"
import SearchContext from "../context/searchContext"
import SearchFilmCard from "../filmCards/searchFilmCard"

const SearchModal = () => {
    const {searchMode, displayedMovies, searchInputDiv} = useContext(SearchContext)
    const [width, setWidth] = useState("")

    useEffect(() => {
        let listener = () => {
           setWidth(searchInputDiv?.current?.getBoundingClientRect().width || "") 
        }
        setTimeout(() => {
            listener()
        },500)
        
        window.addEventListener("resize", listener)
        return () => {window.removeEventListener("resize", listener)}
    }, [searchMode])

    return (
        <div className={`w-full h-full pt-25 left-0 fixed ${searchMode ?"visible bg-opacity-30 opacity-100" : "invisible bg-opacity-0 opacity-0"} duration-300 z-50 bg-black`}>
            <div className={`md:px-12 lg:px-16 px-6 w-full h-full py-3 overflow-y-auto`}>
                <div 
                style={{
                    width: width
                }}
                className={`grid grid-cols-1 gap-1 transition-all duration-200`}>
                    {displayedMovies.map(movie => 
                    <SearchFilmCard
                    key={`search-result-${movie.stringName}`}
                    image={movie.image}
                    title={movie.title}
                    excerpt={movie.excerpt}
                    stringName={movie.stringName}
                    />)}
                </div>
            </div>
        </div>
    )


}

export default SearchModal