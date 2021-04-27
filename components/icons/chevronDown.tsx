const ChevronDown = ({classname="w-full h-full", ref=null}) => {
    return (
        <svg  ref={ref} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={classname}>
        <path d="M19 10L12.25 16.75L5.5 10" stroke="#8A898F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`stroke-current`}/>
        </svg>
    )
}

export default ChevronDown