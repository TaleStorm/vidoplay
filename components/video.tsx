import PLayer from "../components/player"
import { useRef, useEffect, useState, MutableRefObject } from "react";
import axios from "axios"

export default function Video(data) {
    const targetRef = useRef() as MutableRefObject<HTMLDivElement>
    const containRef = useRef() as MutableRefObject<HTMLDivElement>
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isFullScreen, setFullScreen] = useState(false)

    console.log("video data:", data)

    useEffect(() => {
        const body = document.querySelector("body")
        if (isFullScreen) {
            body.style.overflow = "hidden"
        }
        else {
            body.style.overflow = ""
        }
    }, [isFullScreen])
    useEffect(() => {
        targetRef.current.style.height = isFullScreen ? window.innerHeight + "px" : (containRef.current.getBoundingClientRect().width * 9/16) + "px"
    },[isFullScreen])

    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, [isFullScreen]);

    const pickInFavorites = async () => {
        console.log(JSON.stringify(localStorage.getItem('_user')))
        let tmp = {
            movieId: data.movieId,
            _user: localStorage.getItem('_user')
        }
        console.log(tmp)
        const resp = await axios.post("/api/favorites", tmp)
        console.log(resp)
    }

    return (
        <>
        <h4 className="hidden mt-6 font-roboto text-mainText font-normal text-3xl sm:block mb-4 col-span-1 w-full">
            {data.name}
        </h4>
        <div ref={containRef}  className={`md:mx-auto ${isFullScreen ? "fixed max-h-screen top-0 left-0 z-50" : "max-w-4xl"}  w-full`}>

            <div className="sm:grid grid-cols-2 grid-rows-1">
                <div className="hidden text-sm col-span-1 sm:flex flex-row justify-end space-x-3">
                    <div className="hidden">
                        <a href="" className="self-center" >
                            <h4 className="font-roboto text-mainText text-base inline self-center">
                                Поделиться
                        </h4>
                        </a>
                        <a href="/#" className="self-center">
                            {/* TG logo !!Ребят, вынесите свгшки в отдельные иконки, если они модифицируются, или юзайте img, ато компонент нечитаблен!!*/}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline self-center">
                                <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71575 23.2843 0 15 0C6.71575 0 0 6.71575 0 15C0 23.2843 6.71575 30 15 30Z" fill="url(#paint0_linear)" />
                                <path d="M5.58651 15.7337C7.34 14.7679 9.29738 13.9617 11.1263 13.1515C14.2726 11.8244 17.4315 10.5202 20.6222 9.30611C21.2431 9.09923 22.3585 8.89692 22.4679 9.81692C22.408 11.1192 22.1616 12.4138 21.9926 13.7084C21.5637 16.5554 21.0679 19.3927 20.5845 22.2303C20.4179 23.1755 19.2339 23.6648 18.4762 23.0599C16.6555 21.83 14.8207 20.6122 13.0233 19.3538C12.4344 18.7555 12.9804 17.8963 13.5063 17.469C15.0059 15.9912 16.5963 14.7355 18.0176 13.1813C18.4009 12.2555 17.2682 13.0357 16.8946 13.2748C14.8416 14.6895 12.8388 16.1907 10.6743 17.434C9.56869 18.0427 8.28006 17.5225 7.17494 17.1829C6.18405 16.7727 4.73204 16.3594 5.58641 15.7338L5.58651 15.7337Z" fill="white" />
                                <defs>
                                    <linearGradient id="paint0_linear" x1="11.2517" y1="1.251" x2="3.75175" y2="18.75" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#37AEE2" />
                                        <stop offset="1" stopColor="#1E96C8" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* OK logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#F68634" />
                                <path d="M16.6225 18.4002L18.8641 20.5643C19.3234 21.0066 19.3234 21.7251 18.8641 22.1679C18.4054 22.6107 17.6619 22.6107 17.2036 22.1679L14.9996 20.0413L12.7975 22.1679C12.5679 22.3891 12.267 22.4998 11.9662 22.4998C11.6658 22.4998 11.3654 22.3891 11.1358 22.1679C10.677 21.7251 10.677 21.0071 11.1353 20.5643L13.3772 18.4002C12.5609 18.2207 11.7737 17.9085 11.0487 17.4694C10.4999 17.1354 10.3351 16.4357 10.6808 15.9056C11.0256 15.3748 11.7507 15.215 12.3004 15.5489C13.942 16.5458 16.0567 16.546 17.6993 15.5489C18.249 15.215 18.9738 15.3748 19.3193 15.9056C19.665 16.4353 19.4997 17.1354 18.951 17.4694C18.2259 17.909 17.4387 18.2207 16.6225 18.4002Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.9897 15.2408C12.7783 15.2408 10.9797 13.505 10.9797 11.371C10.9797 9.23632 12.7783 7.5 14.9897 7.5C17.2016 7.5 18.9996 9.23632 18.9996 11.371C18.9996 13.505 17.2016 15.2408 14.9897 15.2408Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.9897 9.76855C15.9052 9.76855 16.65 10.4872 16.65 11.371C16.65 12.2541 15.9052 12.9732 14.9897 12.9732C14.0748 12.9732 13.3293 12.2541 13.3293 11.371C13.3293 10.4872 14.0748 9.76855 14.9897 9.76855Z" fill="#F68634" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* VK logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#4680C2" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.5201 10.8257C24.6683 10.3599 24.5201 10.0212 23.8638 10.0212H21.6831C21.1327 10.0212 20.8786 10.3176 20.7304 10.6352C20.7304 10.6352 19.6083 13.3451 18.0416 15.1023C17.5335 15.6104 17.3006 15.7798 17.0254 15.7798C16.8772 15.7798 16.6867 15.6104 16.6867 15.1447V10.8045C16.6867 10.2541 16.5173 10 16.0515 10H12.6217C12.283 10 12.0713 10.2541 12.0713 10.5081C12.0713 11.0374 12.8546 11.1644 12.9393 12.6464V15.8645C12.9393 16.5632 12.8123 16.6902 12.5371 16.6902C11.7961 16.6902 9.99649 13.9591 8.91674 10.8469C8.70499 10.2329 8.49331 10 7.94287 10H5.74099C5.10586 10 5 10.2964 5 10.614C5 11.1856 5.74099 14.0649 8.45093 17.8758C10.2506 20.4799 12.8123 21.8772 15.12 21.8772C16.5173 21.8772 16.6867 21.5596 16.6867 21.0304V19.0614C16.6867 18.4263 16.8137 18.3204 17.2583 18.3204C17.5759 18.3204 18.1475 18.4898 19.4389 19.7389C20.9209 21.2209 21.175 21.8984 22.0007 21.8984H24.1814C24.8165 21.8984 25.1129 21.5808 24.9436 20.9668C24.753 20.3529 24.0332 19.4637 23.1016 18.4051C22.5935 17.8123 21.8313 17.156 21.5984 16.8384C21.2809 16.415 21.3656 16.2456 21.5984 15.8645C21.5773 15.8645 24.2449 12.096 24.5201 10.8257Z" fill="white" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* FB logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 15C30 6.71488 23.2851 0 15 0C6.71488 0 0 6.71488 0 15C0 22.4883 5.48438 28.6934 12.6562 29.8184V19.3359H8.84763V15H12.6562V11.6953C12.6562 7.9365 14.8946 5.85938 18.3223 5.85938C19.9629 5.85938 21.6797 6.15234 21.6797 6.15234V9.84375H19.7871C17.9238 9.84375 17.3438 11.001 17.3438 12.1875V15H21.5039L20.8389 19.3359H17.3438V29.8184C24.5156 28.6934 30 22.4883 30 15Z" fill="#1877F2" />
                                <path d="M20.8389 19.3359L21.5039 15H17.3438V12.1875C17.3438 11.001 17.9238 9.84375 19.7872 9.84375H21.6797V6.15234C21.6797 6.15234 19.9629 5.85938 18.3223 5.85938C14.8946 5.85938 12.6563 7.9365 12.6563 11.6953V15H8.84766V19.3359H12.6563V29.8184C13.4209 29.9385 14.2032 30 15 30C15.7969 30 16.5792 29.9385 17.3438 29.8184V19.3359H20.8389Z" fill="white" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* WA logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#25D366" />
                                <path d="M15.4944 23.3453H15.4907C13.9979 23.3448 12.5311 22.9703 11.2283 22.2597L6.5 23.5L7.76538 18.878C6.98483 17.5253 6.57411 15.9909 6.57478 14.4189C6.57674 9.50106 10.578 5.5 15.4943 5.5C17.8804 5.50103 20.1199 6.42992 21.8039 8.11588C23.4879 9.80176 24.4148 12.0427 24.4138 14.4259C24.4119 19.3427 20.4122 23.3433 15.4944 23.3453Z" fill="#FDFDFD" />
                                <path d="M11.4475 20.6449L11.7182 20.8056C12.8564 21.4811 14.1612 21.8385 15.4915 21.839H15.4945C19.5806 21.839 22.9063 18.5132 22.9079 14.4254C22.9087 12.4445 22.1383 10.5819 20.7386 9.18063C19.3389 7.77932 17.4776 7.00722 15.4974 7.00653C11.4082 7.00653 8.08243 10.3319 8.08081 14.4194C8.08024 15.8202 8.47218 17.1845 9.21429 18.3648L9.39055 18.6453L8.64163 21.381L11.4475 20.6449Z" fill="#25D366" />
                                <path d="M19.9879 16.5469C19.9323 16.4539 19.7837 16.3982 19.5608 16.2866C19.338 16.175 18.2423 15.6359 18.0379 15.5615C17.8337 15.4871 17.685 15.45 17.5365 15.673C17.3879 15.8961 16.9608 16.3982 16.8308 16.5469C16.7008 16.6956 16.5708 16.7143 16.348 16.6027C16.1251 16.4911 15.407 16.2558 14.5557 15.4965C13.8932 14.9055 13.4459 14.1757 13.3159 13.9526C13.1859 13.7295 13.3021 13.6089 13.4136 13.4978C13.5139 13.3979 13.6365 13.2374 13.7479 13.1073C13.8594 12.9772 13.8965 12.8842 13.9708 12.7356C14.0451 12.5867 14.0079 12.4567 13.9522 12.3451C13.8965 12.2335 13.4508 11.1365 13.2651 10.6903C13.0842 10.2557 12.9004 10.3146 12.7636 10.3077C12.6338 10.3012 12.485 10.2998 12.3365 10.2998C12.1879 10.2998 11.9465 10.3556 11.7422 10.5787C11.5379 10.8018 10.9622 11.341 10.9622 12.4379C10.9622 13.5349 11.7607 14.5947 11.8722 14.7434C11.9836 14.8922 13.4437 17.1433 15.6794 18.1086C16.2111 18.3383 16.6262 18.4754 16.9499 18.5781C17.4838 18.7478 17.9697 18.7238 18.3536 18.6664C18.7819 18.6025 19.6722 18.1273 19.858 17.6067C20.0436 17.0861 20.0436 16.6398 19.9879 16.5469Z" fill="#FDFDFD" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* TV logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#55ACEE" />
                                <path d="M14.5508 12.1922L14.5822 12.7112L14.0576 12.6477C12.148 12.404 10.4798 11.5778 9.06334 10.1902L8.37085 9.50169L8.19248 10.0101C7.81477 11.1435 8.05609 12.3405 8.843 13.1455C9.26269 13.5904 9.16826 13.654 8.4443 13.3891C8.19248 13.3044 7.97215 13.2408 7.95116 13.2726C7.87772 13.3468 8.12953 14.3107 8.32888 14.692C8.60168 15.2217 9.15777 15.7407 9.76631 16.0479L10.2804 16.2915L9.67188 16.3021C9.08432 16.3021 9.06334 16.3127 9.12629 16.5351C9.33613 17.2236 10.165 17.9545 11.0883 18.2723L11.7388 18.4947L11.1723 18.8337C10.3329 19.321 9.34663 19.5964 8.36036 19.6175C7.88821 19.6281 7.5 19.6705 7.5 19.7023C7.5 19.8082 8.78005 20.4014 9.52499 20.6344C11.7598 21.3229 14.4144 21.0264 16.4079 19.8506C17.8243 19.0138 19.2408 17.3507 19.9018 15.7407C20.2585 14.8827 20.6152 13.315 20.6152 12.5629C20.6152 12.0757 20.6467 12.0121 21.2343 11.4295C21.5805 11.0906 21.9058 10.7198 21.9687 10.6139C22.0737 10.4126 22.0632 10.4126 21.5281 10.5927C20.6362 10.9105 20.5103 10.8681 20.951 10.3915C21.2762 10.0525 21.6645 9.43813 21.6645 9.25806C21.6645 9.22628 21.5071 9.27924 21.3287 9.37458C21.1398 9.4805 20.7202 9.63939 20.4054 9.73472L19.8388 9.91479L19.3247 9.56524C19.0414 9.37458 18.6427 9.16273 18.4329 9.09917C17.8978 8.95087 17.0794 8.97206 16.5967 9.14154C15.2852 9.6182 14.4563 10.8469 14.5508 12.1922Z" fill="white" />
                            </svg>
                        </a>




                    </div>
                </div>
            </div>

            <div className="relative h-64" ref={targetRef}>
                {data.movies?.length > 0 && data.series?.length > 0 ? (
                <PLayer
                    movies={data.movies}
                    width={String(dimensions.width)}
                    height={String(dimensions.height)}
                    series={data.series}
                    name={data.name}
                    parentRef={containRef}
                    isFullScreen= {isFullScreen}
                    setFullScreen= {setFullScreen}
                />):
                (<div className="flex justify-center items-center w-full h-full">
                    <h1 className="text-h1-mobile sm:text-3xl">
                        Извините, видео скоро появится
                    </h1>
                </div>)}
            </div>

            <div className="text-sm sm:hidden mt-4 col-span-1 flex flex-wrap flex-row  items-center">
                <div className="hidden">
                    <a href="/#" className="mt-2 self-center mr-3" >
                        <h4 className="font-roboto text-mainText text-base inline self-center">
                            Поделиться
                        </h4>
                    </a>
                    <div className="mt-2 text-sm col-span-1 flex flex-row space-x-2 items-center">
                        <a href="/#" className="self-center">
                            {/* TG logo */}
                            <img
                                src={`/images/Telegram.svg`}
                                alt=""
                                style={{ minHeight: 28, minWidth: 28 }}
                            />
                        </a>

                        <a href="/#" className="self-center">
                            {/* OK logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#F68634" />
                                <path d="M16.6225 18.4002L18.8641 20.5643C19.3234 21.0066 19.3234 21.7251 18.8641 22.1679C18.4054 22.6107 17.6619 22.6107 17.2036 22.1679L14.9996 20.0413L12.7975 22.1679C12.5679 22.3891 12.267 22.4998 11.9662 22.4998C11.6658 22.4998 11.3654 22.3891 11.1358 22.1679C10.677 21.7251 10.677 21.0071 11.1353 20.5643L13.3772 18.4002C12.5609 18.2207 11.7737 17.9085 11.0487 17.4694C10.4999 17.1354 10.3351 16.4357 10.6808 15.9056C11.0256 15.3748 11.7507 15.215 12.3004 15.5489C13.942 16.5458 16.0567 16.546 17.6993 15.5489C18.249 15.215 18.9738 15.3748 19.3193 15.9056C19.665 16.4353 19.4997 17.1354 18.951 17.4694C18.2259 17.909 17.4387 18.2207 16.6225 18.4002Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.9897 15.2408C12.7783 15.2408 10.9797 13.505 10.9797 11.371C10.9797 9.23632 12.7783 7.5 14.9897 7.5C17.2016 7.5 18.9996 9.23632 18.9996 11.371C18.9996 13.505 17.2016 15.2408 14.9897 15.2408Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.9897 9.76855C15.9052 9.76855 16.65 10.4872 16.65 11.371C16.65 12.2541 15.9052 12.9732 14.9897 12.9732C14.0748 12.9732 13.3293 12.2541 13.3293 11.371C13.3293 10.4872 14.0748 9.76855 14.9897 9.76855Z" fill="#F68634" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* VK logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#4680C2" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.5201 10.8257C24.6683 10.3599 24.5201 10.0212 23.8638 10.0212H21.6831C21.1327 10.0212 20.8786 10.3176 20.7304 10.6352C20.7304 10.6352 19.6083 13.3451 18.0416 15.1023C17.5335 15.6104 17.3006 15.7798 17.0254 15.7798C16.8772 15.7798 16.6867 15.6104 16.6867 15.1447V10.8045C16.6867 10.2541 16.5173 10 16.0515 10H12.6217C12.283 10 12.0713 10.2541 12.0713 10.5081C12.0713 11.0374 12.8546 11.1644 12.9393 12.6464V15.8645C12.9393 16.5632 12.8123 16.6902 12.5371 16.6902C11.7961 16.6902 9.99649 13.9591 8.91674 10.8469C8.70499 10.2329 8.49331 10 7.94287 10H5.74099C5.10586 10 5 10.2964 5 10.614C5 11.1856 5.74099 14.0649 8.45093 17.8758C10.2506 20.4799 12.8123 21.8772 15.12 21.8772C16.5173 21.8772 16.6867 21.5596 16.6867 21.0304V19.0614C16.6867 18.4263 16.8137 18.3204 17.2583 18.3204C17.5759 18.3204 18.1475 18.4898 19.4389 19.7389C20.9209 21.2209 21.175 21.8984 22.0007 21.8984H24.1814C24.8165 21.8984 25.1129 21.5808 24.9436 20.9668C24.753 20.3529 24.0332 19.4637 23.1016 18.4051C22.5935 17.8123 21.8313 17.156 21.5984 16.8384C21.2809 16.415 21.3656 16.2456 21.5984 15.8645C21.5773 15.8645 24.2449 12.096 24.5201 10.8257Z" fill="white" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* FB logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 15C30 6.71488 23.2851 0 15 0C6.71488 0 0 6.71488 0 15C0 22.4883 5.48438 28.6934 12.6562 29.8184V19.3359H8.84763V15H12.6562V11.6953C12.6562 7.9365 14.8946 5.85938 18.3223 5.85938C19.9629 5.85938 21.6797 6.15234 21.6797 6.15234V9.84375H19.7871C17.9238 9.84375 17.3438 11.001 17.3438 12.1875V15H21.5039L20.8389 19.3359H17.3438V29.8184C24.5156 28.6934 30 22.4883 30 15Z" fill="#1877F2" />
                                <path d="M20.8389 19.3359L21.5039 15H17.3438V12.1875C17.3438 11.001 17.9238 9.84375 19.7872 9.84375H21.6797V6.15234C21.6797 6.15234 19.9629 5.85938 18.3223 5.85938C14.8946 5.85938 12.6563 7.9365 12.6563 11.6953V15H8.84766V19.3359H12.6563V29.8184C13.4209 29.9385 14.2032 30 15 30C15.7969 30 16.5792 29.9385 17.3438 29.8184V19.3359H20.8389Z" fill="white" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* WA logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#25D366" />
                                <path d="M15.4944 23.3453H15.4907C13.9979 23.3448 12.5311 22.9703 11.2283 22.2597L6.5 23.5L7.76538 18.878C6.98483 17.5253 6.57411 15.9909 6.57478 14.4189C6.57674 9.50106 10.578 5.5 15.4943 5.5C17.8804 5.50103 20.1199 6.42992 21.8039 8.11588C23.4879 9.80176 24.4148 12.0427 24.4138 14.4259C24.4119 19.3427 20.4122 23.3433 15.4944 23.3453Z" fill="#FDFDFD" />
                                <path d="M11.4475 20.6449L11.7182 20.8056C12.8564 21.4811 14.1612 21.8385 15.4915 21.839H15.4945C19.5806 21.839 22.9063 18.5132 22.9079 14.4254C22.9087 12.4445 22.1383 10.5819 20.7386 9.18063C19.3389 7.77932 17.4776 7.00722 15.4974 7.00653C11.4082 7.00653 8.08243 10.3319 8.08081 14.4194C8.08024 15.8202 8.47218 17.1845 9.21429 18.3648L9.39055 18.6453L8.64163 21.381L11.4475 20.6449Z" fill="#25D366" />
                                <path d="M19.9879 16.5469C19.9323 16.4539 19.7837 16.3982 19.5608 16.2866C19.338 16.175 18.2423 15.6359 18.0379 15.5615C17.8337 15.4871 17.685 15.45 17.5365 15.673C17.3879 15.8961 16.9608 16.3982 16.8308 16.5469C16.7008 16.6956 16.5708 16.7143 16.348 16.6027C16.1251 16.4911 15.407 16.2558 14.5557 15.4965C13.8932 14.9055 13.4459 14.1757 13.3159 13.9526C13.1859 13.7295 13.3021 13.6089 13.4136 13.4978C13.5139 13.3979 13.6365 13.2374 13.7479 13.1073C13.8594 12.9772 13.8965 12.8842 13.9708 12.7356C14.0451 12.5867 14.0079 12.4567 13.9522 12.3451C13.8965 12.2335 13.4508 11.1365 13.2651 10.6903C13.0842 10.2557 12.9004 10.3146 12.7636 10.3077C12.6338 10.3012 12.485 10.2998 12.3365 10.2998C12.1879 10.2998 11.9465 10.3556 11.7422 10.5787C11.5379 10.8018 10.9622 11.341 10.9622 12.4379C10.9622 13.5349 11.7607 14.5947 11.8722 14.7434C11.9836 14.8922 13.4437 17.1433 15.6794 18.1086C16.2111 18.3383 16.6262 18.4754 16.9499 18.5781C17.4838 18.7478 17.9697 18.7238 18.3536 18.6664C18.7819 18.6025 19.6722 18.1273 19.858 17.6067C20.0436 17.0861 20.0436 16.6398 19.9879 16.5469Z" fill="#FDFDFD" />
                            </svg>
                        </a>

                        <a href="/#" className="self-center">
                            {/* TV logo */}
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15Z" fill="#55ACEE" />
                                <path d="M14.5508 12.1922L14.5822 12.7112L14.0576 12.6477C12.148 12.404 10.4798 11.5778 9.06334 10.1902L8.37085 9.50169L8.19248 10.0101C7.81477 11.1435 8.05609 12.3405 8.843 13.1455C9.26269 13.5904 9.16826 13.654 8.4443 13.3891C8.19248 13.3044 7.97215 13.2408 7.95116 13.2726C7.87772 13.3468 8.12953 14.3107 8.32888 14.692C8.60168 15.2217 9.15777 15.7407 9.76631 16.0479L10.2804 16.2915L9.67188 16.3021C9.08432 16.3021 9.06334 16.3127 9.12629 16.5351C9.33613 17.2236 10.165 17.9545 11.0883 18.2723L11.7388 18.4947L11.1723 18.8337C10.3329 19.321 9.34663 19.5964 8.36036 19.6175C7.88821 19.6281 7.5 19.6705 7.5 19.7023C7.5 19.8082 8.78005 20.4014 9.52499 20.6344C11.7598 21.3229 14.4144 21.0264 16.4079 19.8506C17.8243 19.0138 19.2408 17.3507 19.9018 15.7407C20.2585 14.8827 20.6152 13.315 20.6152 12.5629C20.6152 12.0757 20.6467 12.0121 21.2343 11.4295C21.5805 11.0906 21.9058 10.7198 21.9687 10.6139C22.0737 10.4126 22.0632 10.4126 21.5281 10.5927C20.6362 10.9105 20.5103 10.8681 20.951 10.3915C21.2762 10.0525 21.6645 9.43813 21.6645 9.25806C21.6645 9.22628 21.5071 9.27924 21.3287 9.37458C21.1398 9.4805 20.7202 9.63939 20.4054 9.73472L19.8388 9.91479L19.3247 9.56524C19.0414 9.37458 18.6427 9.16273 18.4329 9.09917C17.8978 8.95087 17.0794 8.97206 16.5967 9.14154C15.2852 9.6182 14.4563 10.8469 14.5508 12.1922Z" fill="white" />
                            </svg>
                        </a>


                    </div>
                </div>
            </div>

            <h4 className="mt-6 font-roboto text-mainText font-normal text-xl sm:hidden block sm:mb-5 col-span-1">
                {data.name}
            </h4>

            <div className="hidden grid-cols-2 grid-rows-1 gap-4 mb-6">
                <div className="hidden mt-10 space-x-6 col-span-1 sm:flex flex-wrap content-end">
                    {/* <button className="bg-orange hover:bg-orange text-mainText font-normal py-3 px-14 rounded-md text-sm">
                        Совместный просмотр
                    </button>
                    <button className="bg-orange hover:bg-orange text-mainText font-normal py-3 px-14 rounded-md text-sm">
                        Смотреть трейлер
                    </button> */}
                </div>

            </div>

        </div>
        <div className = {`w-full`}>

        </div>
        </>
    )
}