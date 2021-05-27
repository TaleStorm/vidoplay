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

    gplayerAPI.method({name: "setVolume", params: 100})
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
        
    </div>
  )
}
