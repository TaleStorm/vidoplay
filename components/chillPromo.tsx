import { MutableRefObject, useEffect, useRef } from "react"

export const ChillPromo = (data: { visible: boolean, onClose: Function }) => {
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

  useEffect(() => {
    videoRef.current.volume = 0.05
  }, [])

  useEffect(() => {
    const body = document.querySelector("body")

    if (data.visible) {
      window.scrollTo({top:0,behavior: "smooth"});
      videoRef.current.play()
      body.style.overflow = "hidden"
    }
    else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0;
      body.style.overflow = ""
    }

  }, [data.visible])

  return (
    <div className={`${data.visible ? "block" : "hidden"} flex justify-center absolute w-full z-50 `}>
      <div className="fixed inset-0 z-30 bg-shadow opacity-10" id="shadow" onClick={() => { data.onClose() }} />

      <div className="w-3/4 relative z-40">
        <a className="absolute z-10 top-4 text-mainText hover:text-orange right-4" onClick={() => { data.onClose() }}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 sm:h-auto"
          >
            <path
              d="M14.1213 12L23.5608 2.56046C23.842 2.27919 24 1.89772 24 1.49996C24 1.10219 23.842 0.720719 23.5608 0.439457C23.2795 0.158195 22.898 0.000183105 22.5003 0.000183105C22.1025 0.000183105 21.721 0.158195 21.4398 0.439457L12.0003 9.87896L2.56076 0.439457C2.42149 0.30019 2.25616 0.189718 2.0742 0.114347C1.89224 0.0389762 1.69721 0.000183105 1.50026 0.000183105C1.30331 0.000183105 1.10828 0.0389762 0.926323 0.114347C0.744363 0.189718 0.579029 0.30019 0.439762 0.439457C0.1585 0.720719 0.000488281 1.10219 0.000488281 1.49996C0.000488281 1.89772 0.1585 2.27919 0.439762 2.56046L9.87926 12L0.439762 21.4395C0.1585 21.7207 0.000488281 22.1022 0.000488281 22.5C0.000488281 22.8977 0.1585 23.2792 0.439762 23.5605C0.721024 23.8417 1.1025 23.9997 1.50026 23.9997C1.89803 23.9997 2.2795 23.8417 2.56076 23.5605L12.0003 14.121L21.4398 23.5605C21.5787 23.7002 21.744 23.8112 21.926 23.8869C22.108 23.9625 22.3031 24.0015 22.5003 24.0015C22.6974 24.0015 22.8925 23.9625 23.0745 23.8869C23.2565 23.8112 23.4218 23.7002 23.5608 23.5605C23.7002 23.4213 23.8108 23.256 23.8863 23.074C23.9617 22.892 24.0006 22.697 24.0006 22.5C24.0006 22.303 23.9617 22.1079 23.8863 21.9259C23.8108 21.7439 23.7002 21.5786 23.5608 21.4395L14.1213 12Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <video preload="metadata" onEnded={() => { data.onClose() }} className="focus:outline-none rounded-lg" ref={videoRef} src="/videos/chillPromo.mp4" controls />
      </div>
    </div>
  )
}




