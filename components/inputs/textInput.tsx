import { MutableRefObject, useEffect, useRef, useState } from "react"
import { InputProps } from "../../interfaces"
import EyeIcon from "../icons/eyeIcon"
import validator from "./validator"


const sub = validator
const TextInput = ({label, name, disabled, type="text", placeholder="", state, setState, validator=sub.true, error=false,setError=()=>{}, errorMessage="Ошибка!"}:InputProps) => {

    const [realType, setRealType] = useState(type)


    const inputRef = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        var event = new CustomEvent("refreshDropdown");
        window.dispatchEvent(event)
    },[error])
    
    return (
        <label className="block w-full font-medium relative">
            {label}
            <input type={realType} name={name} className={`border-2  rounded-lg sm:px-8 py-4 px-4 sm:py-5 mt-3 focus:outline-none bg-popupBackground w-full text-ui-text ${error ? "border-error-red" : "focus:border-orange hover:border-orange border-popupBorder"} leading-snug  transition-all duration-200 ease-out flex`} 
            placeholder={placeholder}
            disabled={disabled}
            value={state} 
            onChange={(e) => {
                setState(e.target.value)
                setError(!validator(e.target.value))
            }} ref={inputRef}/>
            <div className={`self-end flex-shrink-0 cursor-pointer w-8 h-8 absolute right-4 top-12 md:top-13 ${type !== "password" && "hidden"}`} onMouseDown={() => {
                setRealType("text")
            }}
            onMouseUp={() => {
                setRealType(type)
            }}
            >
                    <EyeIcon/>
            </div>
            <div className={`flex items-center mt-2 ${!error && "hidden"}`}>
            <img src="/icons/warning.svg" className={`flex-shrink-0 w-5 h-5 mr-1`} alt=""/>
            <div className={`text-error-red text-sm`}>{errorMessage}</div>
            </div>
        </label>
    )
}

export default TextInput