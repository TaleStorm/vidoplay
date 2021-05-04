import React, { ReactNode, useEffect, useState } from "react";
import authAxios from "../network/authAxios";

const UserDisplayContext = React.createContext({
    setDisplay: (arg:string) => {},
    display: ""
});

interface Props {
  children: ReactNode;
}

const UserDisplayContextProvider = ({ children }: Props) => {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    if (window.innerWidth >= 640) {
        setDisplay("data")
      }
  }, [])

  return (
    <UserDisplayContext.Provider
    value={{
        setDisplay,
        display
    }}
    >
      {children}
    </UserDisplayContext.Provider>
  );
};

export default UserDisplayContext;

export { UserDisplayContextProvider };