const TextInput = ({label, name, type="text", placeholder="", state, setState}) => {
    return (
        <label className="block w-full font-medium">
            {label}
            <input type={type} name={name} className="border border-popupBorder rounded-lg sm:px-8 py-4 px-4 sm:py-6 mt-3 focus:outline-none bg-popupBackground w-full text-ui-text" placeholder={placeholder} value={state} onChange={(e) => {
                setState(e.target.value)
            }}/> 
        </label>
    )
}

export default TextInput