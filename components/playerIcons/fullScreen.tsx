const FullScreenIcon = ({isFullScreen}) => {
    if (isFullScreen) {
        return (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.25 13.5H22.5V6.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.75 22.5H13.5V29.25" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22.5 29.25V22.5H29.25" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.5 6.75V13.5H6.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        )
    } else {
        return (
            <svg width="36" height="36" className={`w-full h-full`} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5385 5.53845H30.4615V12.4615" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.4615 30.4615H5.53845V23.5385" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M30.4615 23.5385V30.4615H23.5385" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.53845 12.4615V5.53845H12.4615" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        )
    }
}

export default FullScreenIcon