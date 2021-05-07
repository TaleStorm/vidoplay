import { useEffect, useState } from "react";
import { useRouter } from 'next/router'


export default function Player(data) {
    const router = useRouter()
    const { video } = router.query
    const[globalGplayerAPI, setPlayer] = useState(undefined);
    const[tracks, setTracks] = useState(undefined);

  const getPlayer = async () => {

    const GcorePlayer = (window as any).GcorePlayer.gplayerAPI;
    const gplayerAPI = new GcorePlayer(document.getElementById("gplayer"))
    setPlayer(gplayerAPI);


    gplayerAPI.on('tracks', (info) => {
      setTracks(info)
    })

  }

  var setAudio = async (id) => {
    globalGplayerAPI.method({name: 'getPlugin', params: {
      pluginName: "audio_selector", 
      pluginMethod: "setIndexTrack",
      pluginValue: id
  }, callback: (e) => {
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
            src={`https://chillvision.gcdn.co/videos/${video}?player_id=777`}
            frameBorder="0"
            id="gplayer"
            >
        </iframe>
        {/* <button onClick= {() => setAudio()} >
    Click
        </button> */}
        {tracks ? tracks.map((track, i) => {
                        return <button key={i} onClick= {() => setAudio(track.id)} className="block">
                        ID: {track.id}
                            </button>
                    }): ""}
    </div>
  )
}
