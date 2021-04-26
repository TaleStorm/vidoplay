import { MutableRefObject, useEffect, useRef } from "react"
import { InputProps } from "../../interfaces"
import validator from "./validator"


const sub = validator
const TextInput = ({label, name, type="text", placeholder="", state, setState, validator=sub.true, error=false,setError=()=>{}, errorMessage="Ошибка!"}:InputProps) => {

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        var event = new CustomEvent("refreshDropdown");
        window.dispatchEvent(event)
    },[error])
    
    return (
        <label className="block w-full font-medium">
            {label}
            <input type={type} name={name} className={`border-2  rounded-lg sm:px-8 py-4 px-4 sm:py-6 mt-3 focus:outline-none bg-popupBackground w-full text-ui-text ${error ? "border-error-red" : "focus:border-orange hover:border-orange border-popupBorder"}  transition-all duration-200 ease-out`} placeholder={placeholder} value={state} onChange={(e) => {
                setState(e.target.value)
                setError(!validator(e.target.value))
            }} ref={inputRef}>

            </input>
            <div className={`flex items-center mt-2 ${!error && "hidden"}`}>
            <img src="/icons/warning.svg" className={`flex-shrink-0 w-5 h-5 mr-1`} alt=""/>
            <div className={`text-error-red text-sm`}>{errorMessage}</div>
            </div>
        </label>
    )
}

export default TextInput