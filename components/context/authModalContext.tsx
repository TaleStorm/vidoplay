import React, { ReactNode, useEffect, useState } from "react";
import authAxios from "../network/authAxios";

const AuthModalContext = React.createContext({
    setModalOpen: (arg:boolean) => {},
    modalOpen: false
});

interface Props {
  children: ReactNode;
}

const AuthModalContextProvider = ({ children }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <AuthModalContext.Provider
    value={{
        setModalOpen,
        modalOpen
    }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalContext;

export { AuthModalContextProvider };