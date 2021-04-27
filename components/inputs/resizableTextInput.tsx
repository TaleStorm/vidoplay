import { MutableRefObject, useEffect, useRef } from "react"
import { ResizableInputProps } from "../../interfaces"
import validator from "./validator"
import autosize from "autosize"


const sub = validator
const ResizableTextInput = ({label, name, type="text", placeholder="", state, setState, validator=sub.true, error=false,setError=()=>{}, errorMessage="Ошибка!", rows=3}:ResizableInputProps) => {

    const inputRef = useRef() as MutableRefObject<HTMLTextAreaElement>

    useEffect(() => {
        var event = new CustomEvent("refreshDropdown");
        window.dispatchEvent(event)
    },[error])

    useEffect(() => {
        autosize(inputRef.current)
    }, [])
    
    return (
        <label className="block w-full font-medium">
            {label}
            <textarea 
            rows={rows}
            onMouseUp={() => {}}
            
            name={name} className={`border-2  rounded-lg sm:px-8 py-4 px-4 sm:py-6 mt-3 focus:outline-none bg-popupBackground w-full text-ui-text ${error ? "border-error-red" : "focus:border-orange hover:border-orange border-popupBorder"}  transition-all duration-200 ease-out resize-none`} placeholder={placeholder} value={state} onChange={(e) => {
                setState(e.target.value)
                setError(!validator(e.target.value))
            }} ref={inputRef}>

            </textarea>
            <div className={`flex items-center mt-2 ${!error && "hidden"}`}>
            <img src="/icons/warning.svg" className={`flex-shrink-0 w-5 h-5 mr-1`} alt=""/>
            <div className={`text-error-red text-sm`}>{errorMessage}</div>
            </div>
        </label>
    )
}


export default ResizableTextInput