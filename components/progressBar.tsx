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
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${data.isPlaying? "hidden" : ""}`} onClick={() => data.setPlay()}>
            <rect className="wrapper" width="42" height="42" rx="8" fill="white" fillOpacity="0.2"/>
            <path d="M31.5693 19.7533L15.3695 10.1284C15.2331 10.0473 15.0769 10.0031 14.917 10.0002C14.7571 9.99724 14.5993 10.0358 14.4598 10.1118C14.3204 10.1879 14.2042 10.2987 14.1234 10.4328C14.0426 10.567 14 10.7196 14 10.8751V30.1249C14 30.2804 14.0426 30.433 14.1234 30.5672C14.2042 30.7013 14.3204 30.8121 14.4598 30.8882C14.5993 30.9642 14.7571 31.0028 14.917 30.9998C15.0769 30.9969 15.2331 30.9527 15.3695 30.8716L31.5693 21.2467C31.7008 21.1685 31.8095 21.0588 31.885 20.9281C31.9604 20.7973 32 20.6499 32 20.5C32 20.3501 31.9604 20.2027 31.885 20.0719C31.8095 19.9412 31.7008 19.8315 31.5693 19.7533Z" fill="white"/>
        </svg>
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`playerButtons ${data.isPlaying? "" : "hidden"}`} onClick={() => data.setPlay()}>
            <path className="wrapper" d="M0 8C0 3.58172 3.58172 0 8 0H34C38.4183 0 42 3.58172 42 8V34C42 38.4183 38.4183 42 34 42H8C3.58172 42 0 38.4183 0 34V8Z" fill="white" fillOpacity="0.2"/>
            <path d="M30 10H25.5C24.9477 10 24.5 10.4477 24.5 11V31C24.5 31.5523 24.9477 32 25.5 32H30C30.5523 32 31 31.5523 31 31V11C31 10.4477 30.5523 10 30 10Z" fill="white"/>
            <path d="M16.5 10H12C11.4477 10 11 10.4477 11 11V31C11 31.5523 11.4477 32 12 32H16.5C17.0523 32 17.5 31.5523 17.5 31V11C17.5 10.4477 17.0523 10 16.5 10Z" fill="white"/>
        </svg>


        <div  className={`relative w-full h-5 cursor-pointer mx-2`} onMouseMove= {(e) => data.getMousePos(e)}  onClick= {(e) => data.setCurrentDuration(e)}>
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
    
        {/* <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => data.fullScreen()} className="playerButtons">
            <rect className="wrapper" width="42" height="42" rx="8" fill="white" fillOpacity="0.2"/>
            <path d="M25 12H30V17" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 30H12V25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 25V30H25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17V12H17" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg> */}

    </div>
    )
}