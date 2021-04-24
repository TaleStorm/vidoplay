import { ProgressBarData } from '../interfaces'

type ProgressBarProps = ProgressBarData

function convertTime(time) {
    time = Math.floor(time)
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    let hours = Math.floor(time / 3600);
    let hoursStr = String(hours)
    let minutesStr = String(minutes)
    let secondsStr = String(seconds)
    if (hours < 10) {
        hoursStr = "0" + hours
    }
    if (minutes < 10) {
        minutesStr = "0" + minutes
    } 
    if (seconds < 10) {
        secondsStr = "0" + seconds
    } 
    time = time - hours * 3600;
    return `${hoursStr}:${minutesStr}:${secondsStr}`
}

export default function ProgressBar(data:ProgressBarProps) {
    const currentTimeUser = convertTime(data.currentTime)
    const durationTimeUser = convertTime(data.durationTime)
    // const currentTimeUser = Math.floor(data.currentTime)
    // const durationTimeUser = Math.floor(data.durationTime)
    // var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

    return(
    <div  className={`absolute bottom-4 inset-x-0 mx-4 w-auto flex items-end `}>
        <div  className={`relative cursor-pointer`}>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons cursor-pointer ${data.isPlaying? "hidden" : ""}`} onClick={() => data.setPlay()}>
                <rect className="wrapper" width="42" height="42" rx="8" fill="white" fillOpacity="0.2"/>
                <path d="M31.5693 19.7533L15.3695 10.1284C15.2331 10.0473 15.0769 10.0031 14.917 10.0002C14.7571 9.99724 14.5993 10.0358 14.4598 10.1118C14.3204 10.1879 14.2042 10.2987 14.1234 10.4328C14.0426 10.567 14 10.7196 14 10.8751V30.1249C14 30.2804 14.0426 30.433 14.1234 30.5672C14.2042 30.7013 14.3204 30.8121 14.4598 30.8882C14.5993 30.9642 14.7571 31.0028 14.917 30.9998C15.0769 30.9969 15.2331 30.9527 15.3695 30.8716L31.5693 21.2467C31.7008 21.1685 31.8095 21.0588 31.885 20.9281C31.9604 20.7973 32 20.6499 32 20.5C32 20.3501 31.9604 20.2027 31.885 20.0719C31.8095 19.9412 31.7008 19.8315 31.5693 19.7533Z" fill="white"/>
            </svg>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons cursor-pointer ${data.isPlaying? "" : "hidden"}`} onClick={() => data.setPlay()}>
                <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H34C38.4183 0 42 3.58172 42 8V34C42 38.4183 38.4183 42 34 42H8C3.58172 42 0 38.4183 0 34V8Z" fill="white" fillOpacity="0.2"/>
                <path d="M30 10H25.5C24.9477 10 24.5 10.4477 24.5 11V31C24.5 31.5523 24.9477 32 25.5 32H30C30.5523 32 31 31.5523 31 31V11C31 10.4477 30.5523 10 30 10Z" fill="white"/>
                <path d="M16.5 10H12C11.4477 10 11 10.4477 11 11V31C11 31.5523 11.4477 32 12 32H16.5C17.0523 32 17.5 31.5523 17.5 31V11C17.5 10.4477 17.0523 10 16.5 10Z" fill="white"/>
            </svg>
        </div>


        <div  className={`relative w-full h-7 cursor-pointer mx-2`} onMouseMove= {(e) => data.getMousePos(e)}  onClick= {(e) => data.setCurrentDuration(e)}>
            <div className="absolute bg-white top-0 opacity-20 w-full h-full z-30">

            </div>
            {/* <div className="absolute bg-white top-0 opacity-30 w-34/100 h-full z-40">
            
            </div> */}
            <div className={`absolute bg-playerSecond top-0 h-full z-40`} style={{width:String(data.currentTimePercent)+"%"}}>
            
            </div>
            <span className="absolute inset-y-0 right-4 z-50 text-mainText text-sm pointer-events-none" >
                {currentTimeUser} | {durationTimeUser}
            </span>     
        </div>

        <div  className={``}>
            <svg width="132" height="42" viewBox="0 0 132 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons mr-2">
                <rect width="132" height="42" rx="8" fill="white" fillOpacity="0.2"/>
                <g className="cursor-pointer">
                    <path d="M30 16C30.6341 16.7223 31.1371 17.5797 31.4802 18.5234C31.8234 19.4671 32 20.4786 32 21.5C32 22.5214 31.8234 23.5329 31.4802 24.4766C31.1371 25.4203 30.6341 26.2777 30 27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.6875 25.1667H10.8125C10.597 25.1667 10.3903 25.0789 10.238 24.9226C10.0856 24.7663 10 24.5543 10 24.3333V17.6667C10 17.4457 10.0856 17.2337 10.238 17.0774C10.3903 16.9211 10.597 16.8333 10.8125 16.8333H15.6875L23 11V31L15.6875 25.1667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17V25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 19C28 19.2626 28 19.5744 28 19.9176C28 20.2608 28 20.6286 28 21C28 21.3714 28 21.7392 28 22.0824C28 22.4256 28 22.7374 28 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </svg>
        </div>
        <div  className={`cursor-pointer`}>
            <svg width="80" height="42" viewBox="0 0 80 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="playerButtons mr-2">
                <rect width="80" height="42" rx="8" fill="white" fillOpacity="0.2"/>
                <path d="M23.5268 24.6895H18.019L16.8666 28H14.2983L19.6694 13.7812H21.8862L27.267 28H24.6889L23.5268 24.6895ZM18.7123 22.6973H22.8334L20.7729 16.7988L18.7123 22.6973ZM39.0727 13.7812V23.2832C39.0727 24.7936 38.5877 25.9915 37.6177 26.877C36.6541 27.7559 35.3683 28.1953 33.7602 28.1953C32.1326 28.1953 30.8403 27.7624 29.8833 26.8965C28.9263 26.0241 28.4477 24.8164 28.4477 23.2734V13.7812H30.9087V23.293C30.9087 24.2435 31.1496 24.9694 31.6313 25.4707C32.1131 25.972 32.8227 26.2227 33.7602 26.2227C35.6613 26.2227 36.6118 25.2201 36.6118 23.2148V13.7812H39.0727ZM51.9527 15.7734H47.5191V28H45.0679V15.7734H40.6734V13.7812H51.9527V15.7734ZM64.8619 21.2617C64.8619 22.6549 64.621 23.8789 64.1392 24.9336C63.6575 25.9818 62.9673 26.7891 62.0689 27.3555C61.177 27.9154 60.1483 28.1953 58.983 28.1953C57.8306 28.1953 56.802 27.9154 55.897 27.3555C54.9986 26.7891 54.302 25.985 53.8072 24.9434C53.3189 23.9017 53.0715 22.7005 53.065 21.3398V20.5391C53.065 19.1523 53.3091 17.9284 53.7974 16.8672C54.2922 15.806 54.9856 14.9954 55.8775 14.4355C56.7759 13.8691 57.8046 13.5859 58.9634 13.5859C60.1223 13.5859 61.1477 13.8659 62.0396 14.4258C62.938 14.9792 63.6314 15.7799 64.1197 16.8281C64.608 17.8698 64.8554 19.084 64.8619 20.4707V21.2617ZM62.3912 20.5195C62.3912 18.944 62.0917 17.7363 61.4927 16.8965C60.9003 16.0566 60.0572 15.6367 58.9634 15.6367C57.8957 15.6367 57.0591 16.0566 56.4537 16.8965C55.8547 17.7298 55.5487 18.9115 55.5357 20.4414V21.2617C55.5357 22.8242 55.8384 24.0319 56.4439 24.8848C57.0559 25.7376 57.9022 26.1641 58.983 26.1641C60.0767 26.1641 60.9166 25.7474 61.5025 24.9141C62.095 24.0807 62.3912 22.8633 62.3912 21.2617V20.5195Z" fill="white"/>
            </svg>
        </div>

        <div  className={``}>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => data.fullScreen()} className="playerButtons">
                <rect className="wrapper" width="42" height="42" rx="8" fill="white" fillOpacity="0.2"/>
                <path d="M25 12H30V17" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 30H12V25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 25V30H25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17V12H17" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* <div className="absolute bg-white top-0 opacity-20 w-full h-full z-30">

            </div>
            <div className={`absolute bg-playerSecond top-0 h-full z-40`} style={{width:String(data.currentTimePercent)+"%"}}>
            
            </div> */}
        </div>

    </div>
    )
}