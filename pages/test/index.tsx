import { useEffect } from "react"
// import { player } from 'lodash'

export default function Player() {
  const getPlayer = async () => {
    const GcorePlayer = (await import("../../player/player")).default
    let gplayerAPI = new GcorePlayer(document.getElementById("gplayer"))
    gplayerAPI.on("ready", () => {
      console.log("[Event]", "ready")
      gplayerAPI.method({ name: "play" })
    })
  }

  useEffect(() => {
    // console.log(player)
    getPlayer()
    // testWindow()
  }, [])

  return (
    <iframe
      width="640"
      height="360"
      src={`https://chillvision.gcdn.co/videos/18824_kyFF9u8UPlC1XKs?player_id=777`}
      allow="autoplay"
      allowFullScreen
      frameBorder="0"
      id="gplayer"
    ></iframe>
    // <div>

    // </div>
  )
}
