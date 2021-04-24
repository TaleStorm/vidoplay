import { useEffect,useState } from "react"
import Head from 'next/head'

export default function Home() {
  const[globalGplayerAPI, setPlayer] = useState(undefined);

  const getPlayer = async () => {
    const GcorePlayer = await window.GcorePlayer.gplayerAPI;
    const gplayerAPI = new GcorePlayer(document.getElementById("gplayer"))
    setPlayer(gplayerAPI);
  }

  var setFullScreen = () => {
    console.log("toggleFullscreen")
    globalGplayerAPI.method({ name: "toggleFullscreen" })
  };

  useEffect(() => {
    getPlayer()
  }, [])

  return (
    <div>
      <Head>
        <script async src="https://vplatform.gcdn.co/_players/v2.0.71/gplayerAPI.js"></script>
      </Head>
        <iframe
          width="640"
          height="360"
          src={`https://chillvision.gcdn.co/videos/18824_kyFF9u8UPlC1XKs?player_id=777`}
          allow="autoplay"
          allowFullScreen
          frameBorder="0"
          id="gplayer"
        ></iframe>
      <button onClick = {() => setFullScreen()} className="">FullScreen</button>
    </div>
    // <div>

    // </div>
  )
}
