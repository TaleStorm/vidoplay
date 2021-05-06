import { useEffect, useState } from "react";
import { useRouter } from 'next/router'


export default function Player(data) {
    // const router = useRouter()
    // const { video } = router.query
    const[globalGplayerAPI, setPlayer] = useState(undefined);

  const getPlayer = async () => {

    const GcorePlayer = (window as any).GcorePlayer.gplayerAPI;
    const gplayerAPI = new GcorePlayer(document.getElementById("gplayer"))
    setPlayer(gplayerAPI);


    gplayerAPI.on('tracks', (info) => {
      console.log('[Event]', 'tracks')
      console.log(info)
    })

  }

  var setAudio = async () => {
    globalGplayerAPI.method({name: 'getPlugin', params: {
      pluginName: "audio_selector", 
      pluginMethod: "setIndexTrack",
      pluginValue: 1
  }, callback: (e) => {
      // alert(`getPlugin  ${e}`)
      console.log(e)
  }})
  }

  

  useEffect(  () => {
    getPlayer()
  }, [])

  return (
    <div>
        <script src="https://vplatform.gcdn.co/_players/v2.0.71/gplayerAPI.js"></script>
        <iframe
            width={700}
            height={500}
            // src={`https://chillvision.gcdn.co/videos/${video}?player_id=777`}
            src={`https://chillvision.gcdn.co/videos/18824_QbtfXpKRWYhwL6z?player_id=777`}
            frameBorder="0"
            id="gplayer"
            >
        </iframe>
        <button onClick= {() => setAudio()} >
    Click
        </button>
        {/* {movies.map((card, i) => {
                        return <SwiperSlide key={i} className="">
                            <a onClick={(e) => {
                                e.preventDefault()
                                setIsSliderOpen(false)
                                setModalOpen(true)
                                setCurrentCompilationMovie(card)
                            }} className={`w-full relative z-20 cursor-pointer`}>
                                <PlayerFilmCard {...card} imageSize={"45"} />
                            </a>
                        </SwiperSlide>
                    })} */}
    </div>
  )
}
