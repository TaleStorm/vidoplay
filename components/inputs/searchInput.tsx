import { MutableRefObject, useContext, useEffect, useRef } from "react"
import { InputProps } from "../../interfaces"
import SearchContext from "../context/searchContext"
import SearchIcon from "../icons/searchIcon"
import validator from "./validator"


const sub = validator
const SearchInput = ({ name="", type = "text", placeholder = "Поиск", state, setState}) => {

  const {searchInputRef, searchInputDiv} = useContext(SearchContext)

  return (
    <div ref={searchInputDiv} className="bg-filmReviewBackground flex focus-within:ring-2 font-medium rounded-lg h-full w-full text-ui-text transition-all duration-200 ease-out pl-16 relative">
      <div className={`absolute left-0 top-0 h-full w-full flex items-center pl-5`}>
        <div className={`w-8 h-8`}>
        <SearchIcon/>
        </div>

      </div>
      <input autoComplete={"off"} ref={searchInputRef} type={type} name={name} className={`focus:outline-none bg-transparent text-lg text-mainText  relative z-50 w-full`} placeholder={placeholder} value={state} onChange={(e) => {
        setState(e.target.value)
      }}>
      </input>
    </div>
  )
}

export default SearchInput