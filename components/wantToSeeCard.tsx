import { useEffect, useRef, useState } from "react"
import apiReq from "../services/api-requests"

const ApiReq = new apiReq()

export default function WantToSeeCard(data) {
  const [voiceIsCounted, setVoiceIsCounted] = useState<boolean>(false)
  const [openDiscription, setOpenDiscription] = useState<boolean>(false)
  const [isDiscriptionLong, setIsDiscriptionLong] = useState<boolean>(false)
  const [butt, setbuut] = useState(<></>)
  const disriptionRef = useRef()

  const toggleOpen = () => setOpenDiscription(!openDiscription)

  const isOverFlowed = (element: HTMLElement) => {
    return element.scrollWidth > element.offsetWidth || element.scrollHeight > element.offsetHeight;
  }

  const setVoiceServer = async () => {
    const body = {
      movieId: data._id
    }
    const res = await ApiReq.setWantToSeeVotes(body)
    console.log(res)
  }

  useEffect(() => {    
    setIsDiscriptionLong(isOverFlowed(disriptionRef.current))
    let listener = () => {
      setIsDiscriptionLong((prev) => isOverFlowed(disriptionRef.current))
    }
    window.addEventListener("resize", listener)
    return ()=>{
      window.removeEventListener("resize", listener)
    }
  }, [])

  useEffect(() => {
    if(!isDiscriptionLong)
      setOpenDiscription(false)
  }, [isDiscriptionLong])

  return (
    <div className=" mb-4 rounded-lg p-4 bg-cardBackground">
      <div className="flex">
        <img className="h-32 sm:h-full  rounded-lg"
          // style={{ maxHeight: 244 }} 
          src={data.image} />
        <div className="w-full grid grid-cols-1 ml-5 relative" style={{ gridTemplateRows: "auto 1fr auto" }}>
          <div className="row-span-1 flex justify-between mb-1 sm:mb-2">
            <h1 className="text-mainText text-md font-medium sm:text-2xl overflow-hidden">
              {data.title}
            </h1>
            <h1 className="hidden sm:block text-dramaTag text-xl" style={{ minWidth: 110 }}>
              {data.serias}
            </h1>
          </div>
          <div className="text-secondaryText hidden sm:block">
            <div ref={disriptionRef} className="col-span-10 overflow-hidden"
              style={openDiscription ? {} : { maxHeight: 100 }}
            >
              {data.description}
            </div>
            {butt}
            {isDiscriptionLong &&
              <p onClick={toggleOpen} className="text-orange cursor-pointer hover:text-button-hover">
                {openDiscription ? '????????????' : '??????????????????'}
              </p>}
          </div>
          <div className="row-span-1 flex sm:datas-end w-full justify-between">
            <div className="text-sm sm:text-lg font-medium">
              <div className="flex">
                <h1 className="mr-2 text-secondaryText">??????:</h1>
                <h1 className="text-mainText">{data.year}</h1>
              </div>
              <div className="flex">
                <h1 className="mr-2 text-secondaryText">????????:</h1>
                <h1 className="text-mainText">{data.genre.join(", ")}</h1>
              </div>
              <div className="flex">
                <h1 className="mr-2 text-secondaryText">????????????:</h1>
                <h1 className="text-mainText">{data.country}</h1>
              </div>
            </div>
            <div className="hidden lg:flex items-end">
              {voiceIsCounted ? (<button
                className={`flex px-6 justify-center text-white transition-colors duration-300 hover:bg-voice-button-voted-hover bg-voice-button-voted p-3 rounded-lg w-full`}
                onClick={() => { 
                  setVoiceIsCounted(!voiceIsCounted) 
                }}
              >
                <div className="flex items-center">
                  <p className="mr-1 whitespace-nowrap">
                    ?????? ?????????? ??????????
                      </p>
                  <svg className="h-6" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 7L12 21L5 14.0003" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </button>) : (
                <button
                  className={`flex px-6 justify-center text-white transition-colors duration-300 hover:bg-button-hover bg-orange p-3 rounded-lg w-full`}
                  onClick={() => { 
                    setVoiceIsCounted(!voiceIsCounted);
                    setVoiceServer();
                  }}
                >
                  <div className="flex items-center">
                    <p className="mr-1 whitespace-nowrap">
                      ???????? ?????????????? ???? Chill
                      </p>
                    <svg className="h-6" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.2856 4.28564V24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M4.28564 14.2856H24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </button>)}
            </div>
          </div>
        </div>
      </div>
      <div className="text-secondaryText text-sm mt-2 sm:hidden" style={{ minHeight: 100 }}>
        {data.description}
      </div>
      <div className="flex justify-end">
        {voiceIsCounted ? (<button
          className={`lg:hidden flex mt-3 px-6 justify-center text-white transition-colors duration-300 hover:bg-voice-button-voted-hover bg-voice-button-voted p-3 rounded-lg w-full  sm:w-auto`}
          onClick={() => { 
            setVoiceIsCounted(!voiceIsCounted) 
          }}
        >
          <div className="flex items-center">
            <p className="mr-1 whitespace-nowrap">
              ?????? ?????????? ??????????
          </p>
            <svg className="h-6" width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 7L12 21L5 14.0003" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </button>) : (
          <button
            className={`lg:hidden flex mt-3 px-6 justify-center text-white transition-colors duration-300 hover:bg-button-hover bg-orange p-3 rounded-lg w-full sm:w-auto`}
            onClick={() => { 
              setVoiceIsCounted(!voiceIsCounted);
              setVoiceServer();
            }}
          >
            <div className="flex items-center">
              <p className="mr-1 whitespace-nowrap">
                ???????? ?????????????? ???? Chill
                      </p>
              <svg className="h-6" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2856 4.28564V24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.28564 14.2856H24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </button>)}
      </div>
    </div>
  )
}


