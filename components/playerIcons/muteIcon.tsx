const MuteIcon = (
    {state = true
    }
) => {
    return (
        state ?  <svg width="26" height="26" className={`w-full h-full`} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.2302 7.82928C22.9093 8.50831 23.4479 9.31444 23.8154 10.2016C24.1829 11.0888 24.372 12.0397 24.372 13C24.372 13.9603 24.1829 14.9112 23.8154 15.7984C23.4479 16.6856 22.9093 17.4917 22.2302 18.1707" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.125 17.0625H3.25C3.03451 17.0625 2.82785 16.9769 2.67548 16.8245C2.5231 16.6722 2.4375 16.4655 2.4375 16.25V9.75C2.4375 9.53451 2.5231 9.32785 2.67548 9.17548C2.82785 9.0231 3.03451 8.9375 3.25 8.9375H8.125L15.4375 3.25V22.75L8.125 17.0625Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.125 8.9375V17.0625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19.3577 10.7019C19.6595 11.0037 19.8988 11.362 20.0622 11.7563C20.2255 12.1506 20.3096 12.5732 20.3096 13C20.3096 13.4268 20.2255 13.8494 20.0622 14.2437C19.8988 14.638 19.6595 14.9963 19.3577 15.2981" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
         : <svg width="26" height="26" className={`w-full h-full`} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2307 7.83046C23.6021 9.20182 24.3725 11.0618 24.3725 13.0012C24.3725 14.9406 23.6021 16.8005 22.2307 18.1719" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.12451 8.93867V17.0637" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.3582 10.7031C19.9676 11.3126 20.3101 12.1392 20.3101 13.0012C20.3101 13.8631 19.9676 14.6898 19.3582 15.2993" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.875 4.0625L21.125 21.9375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.4375 15.6813V22.7512L8.125 17.0637H3.25C3.03451 17.0637 2.82785 16.9781 2.67548 16.8257C2.5231 16.6733 2.4375 16.4667 2.4375 16.2512V9.75119C2.4375 9.5357 2.5231 9.32904 2.67548 9.17666C2.82785 9.02429 3.03451 8.93869 3.25 8.93869H8.125L8.81793 8.39973" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3909 6.39854L15.4375 3.25122V10.8498" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


    )

}

export default MuteIcon