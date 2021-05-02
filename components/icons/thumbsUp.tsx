const ThumbsUp = ({state=false, setState=()=>{}}) => {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.74927 12.1875H9.37427V24.375H3.74927C3.50063 24.375 3.26217 24.2762 3.08635 24.1004C2.91054 23.9246 2.81177 23.6861 2.81177 23.4375V13.125C2.81177 12.8764 2.91054 12.6379 3.08635 12.4621C3.26217 12.2863 3.50063 12.1875 3.74927 12.1875V12.1875Z" stroke="#8A898F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.37427 12.1875L14.0618 2.8125C14.5542 2.8125 15.0419 2.9095 15.4968 3.09795C15.9518 3.28641 16.3652 3.56263 16.7134 3.91085C17.0616 4.25907 17.3379 4.67247 17.5263 5.12744C17.7148 5.58241 17.8118 6.07004 17.8118 6.5625V9.375H25.0628C25.3287 9.375 25.5915 9.43154 25.8338 9.54087C26.0762 9.65019 26.2925 9.80981 26.4684 10.0091C26.6444 10.2084 26.7759 10.4429 26.8544 10.6969C26.9328 10.9509 26.9563 11.2188 26.9233 11.4826L25.5171 22.7326C25.4604 23.186 25.24 23.6032 24.8974 23.9056C24.5548 24.2081 24.1136 24.375 23.6566 24.375H9.37427" stroke={`#8A898F`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export default ThumbsUp