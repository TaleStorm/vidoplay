import React, { ReactNode, useState } from "react";

const TextSearchContext = React.createContext({
    setText: (arg:string) => {},
    text: ''
});

interface Props {
  children: ReactNode;
}

const TextSearchContextProvider = ({ children }: Props) => {
  const [text, setText] = useState('')

  return (
    <TextSearchContext.Provider
    value={{
        text,
        setText
    }}
    >
      {children}
    </TextSearchContext.Provider>
  );
};

export default TextSearchContext;

export { TextSearchContextProvider };