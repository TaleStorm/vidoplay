const UserIcon = ({classname="w-full h-full", ref=null}) => {
    return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={classname}>
        <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke-width="1" stroke-miterlimit="10" className={`stroke-current`}/>
        <path d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.847 17.3279 20.1729 18.6533 21.0949 20.2493" className={`stroke-current`} stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    )
}

export default UserIcon