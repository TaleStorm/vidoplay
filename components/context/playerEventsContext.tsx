import React, { ReactNode, useContext, useEffect, useState } from "react";
import PlayerContext, { sendPostMessage } from "./playerContext";

const PlayerEventsContext = React.createContext({
    setText: (arg:string) => {},
    text: ''
});

interface Props {
  children: ReactNode;
}

const PlayerEventsContextProvider = ({ children }: Props) => {
  const {api, isIntro, currentSerie, currentSeason, currentTimePercent} = useContext(PlayerContext)
  const [text, setText] = useState('')
  const [is1, setIs1] = useState(false)
  const [is25, setIs25] = useState(false)
  const [is50, setIs50] = useState(false)
  const [is75, setIs75] = useState(false)
  
  useEffect(() => {
    let timer
    if (isIntro) {
      setIs1(false)
      setIs25(false)
      setIs50(false)
      setIs75(false)
    }
      if (api && !isIntro) {
          timer = setInterval(() => {
            const numberPercent = Number(currentTimePercent)
              if (numberPercent > 0.1) {
                setIs1(true)
              }
              if (numberPercent > 25) {
                setIs25(true)
              }
              if (numberPercent > 50) {
                setIs50(true)
              }
              if (numberPercent > 75) {
                setIs75(true)
              }
          }, 200)
      }
      return () => {clearTimeout(timer)}
  }, [api, isIntro, currentTimePercent])

  useEffect(() => {
    if (is1) {
      sendPostMessage("VIDEO_STARTED")
    }
  }, [is1])

  useEffect(() => {
    if (is25) {
      sendPostMessage("VIDEO_25")
    }
  }, [is25])

  useEffect(() => {
    if (is50) {
      sendPostMessage("VIDEO_50")
    }
  }, [is50])

  useEffect(() => {
    if (is75) {
      sendPostMessage("VIDEO_75")
    }
  }, [is75])

  return (
    <PlayerEventsContext.Provider
    value={{
        text,
        setText
    }}
    >
      {children}
    </PlayerEventsContext.Provider>
  );
};

export default PlayerEventsContext;

export { PlayerEventsContextProvider };