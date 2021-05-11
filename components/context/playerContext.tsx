import React, { ReactNode, useEffect, useState } from "react";
import authAxios from "../network/authAxios";

const PlayerContext = React.createContext({
    setFullScreen: (arg:boolean) => {},
    isFullScreen: false,
    setApi: (arg: any) => {}
});

interface Props {
  children: ReactNode;
}

const PlayerContextProvider = ({ children }: Props) => {
  const [isFullScreen, setFullScreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [api, setApi] = useState(null)

  useEffect(() => {
    // Определяем, мобильное ли устройство
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true)
    }
    else {
      setIsMobile(false)
    }
    return () => {}
  }, [])

  useEffect(() => {
    if (api) {
        if (!isFullScreen) {
            api.method({
                name: "resize", params: {
                  width: "100%",
                  height: "100%"
                }})
            }
            else {
              api.method({
                name: "resize", params: {
                  width: window.screen.availWidth,
                  height: window.screen.availHeight
                }
              })
              window.dispatchEvent(new Event("resize"))
            }
    }
  }, [api, isFullScreen])

  return (
    <PlayerContext.Provider
    value={{
        setFullScreen,
        isFullScreen,
        setApi
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;

export { PlayerContextProvider };