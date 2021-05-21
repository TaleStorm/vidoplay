const ChevronRight = ({classname="w-full h-full", ref=null}) => {
    return (
        <svg width="50" height="50" className={`w-full h-full ${classname}`} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9688 10.9375L32.0312 25L17.9688 39.0625" className={`stroke-current`} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

export default ChevronRight