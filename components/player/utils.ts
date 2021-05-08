export function convertTime(time) {
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