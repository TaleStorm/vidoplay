const Checkbox = ({state, setState}) => {
    return (
        <div 
        onClick={() => {
            setState(!state)
        }}
        className={`w-full h-full p-0.5 flex items-center justify-center ${state ? "bg-orange" : "bg-cardBackground"} rounded-lg cursor-pointer transition-colors duration-200 border border-checkbox-border `}>
            <img src="/icons/check.svg" className={`w-full h-full ${state ? "opacity-100" : "opacity-0"} transition-opacity duration-150`} alt=""/>
        </div>
    )
}

export default Checkbox