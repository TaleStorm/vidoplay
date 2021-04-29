import { MutableRefObject, useEffect, useRef } from "react"
import { InputProps } from "../../interfaces"
import validator from "./validator"


const sub = validator
const SearchInput = ({ name, type = "text", placeholder = "Поиск", state, setState, onBlur }: InputProps) => {

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  return (
    <div className="bg-filmReviewBackground flex focus-within:ring-2 font-medium rounded-lg sm:px-4 py-2 px-2 sm:py-4 w-full text-ui-text transition-all duration-200 ease-out">
      <svg className={`mr-2`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9545 3.75C11.134 3.75 9.35443 4.28983 7.84075 5.30124C6.32708 6.31264 5.14732 7.75018 4.45065 9.43209C3.75399 11.114 3.57171 12.9647 3.92687 14.7502C4.28202 16.5357 5.15867 18.1758 6.44594 19.4631C7.73321 20.7503 9.37329 21.627 11.1588 21.9821C12.9443 22.3373 14.795 22.155 16.4769 21.4583C18.1588 20.7617 19.5964 19.5819 20.6078 18.0682C21.6192 16.5546 22.159 14.775 22.159 12.9545C22.1588 10.5134 21.189 8.17225 19.4629 6.44611C17.7367 4.71996 15.3956 3.75016 12.9545 3.75V3.75Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M19.8218 19.8217L26.2501 26.25" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
      </svg>
      <input autoFocus onBlur={(e)=>{onBlur(e)}} type={type} name={name} className={`focus:outline-none bg-transparent text-lg text-mainText w-full`} placeholder={placeholder} value={state} onChange={(e) => {
        setState(e.target.value)
      }} ref={inputRef}>
      </input>
    </div>
  )
}

export default SearchInput